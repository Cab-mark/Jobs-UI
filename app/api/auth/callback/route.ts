import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_COOKIE_MAX_AGE, getEnv, isDevelopment } from "@/app/lib/env";
import jwtDecode from "jwt-decode";

interface IdTokenPayload {
  nonce?: string;
  iss?: string;
  aud?: string | string[];
  exp?: number;
}

export async function GET(request: NextRequest) {
  const stateCookie = request.cookies.get("govuk_oidc_state")?.value;
  const nonceCookie = request.cookies.get("govuk_oidc_nonce")?.value;
  const codeVerifier = request.cookies.get("govuk_oidc_code_verifier")?.value;
  const state = request.nextUrl.searchParams.get("state");
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");
  const errorDescription = request.nextUrl.searchParams.get("error_description");

  if (error) {
    return NextResponse.json(
      { error: "Login was not completed", detail: errorDescription ?? error },
      { status: 400 },
    );
  }

  if (!stateCookie || stateCookie !== state || !code) {
    return NextResponse.json({ error: "Invalid login response" }, { status: 400 });
  }

  const tokenEndpoint = getEnv("GOVUK_ONELOGIN_TOKEN_URL");
  const clientId = getEnv("GOVUK_ONELOGIN_CLIENT_ID");
  const clientSecret = getEnv("GOVUK_ONELOGIN_CLIENT_SECRET");
  const redirectUri = getEnv("GOVUK_ONELOGIN_REDIRECT_URI");
  const issuer = getEnv("GOVUK_ONELOGIN_ISSUER");

  if (!tokenEndpoint || !clientId || !clientSecret || !redirectUri || !issuer || !nonceCookie || !codeVerifier) {
    return NextResponse.json(
      { error: "Login is currently unavailable" },
      { status: 500 },
    );
  }

  let tokenRes: Response;
  try {
    tokenRes = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
        code_verifier: codeVerifier,
      }),
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Unable to reach login service" },
      { status: 502 },
    );
  }

  if (!tokenRes.ok) {
    let detail: unknown;
    try {
      detail = await tokenRes.json();
    } catch {
      detail = await tokenRes.text();
    }
    return NextResponse.json(
      { error: "Failed to exchange code", detail },
      { status: 502 },
    );
  }

  let tokenJson: any;
  try {
    tokenJson = await tokenRes.json();
  } catch {
    return NextResponse.json(
      { error: "Unexpected login response" },
      { status: 502 },
    );
  }
  const { id_token: idToken } = tokenJson;

  if (!idToken) {
    return NextResponse.json(
      { error: "No ID token returned" },
      { status: 502 },
    );
  }

  const payload = jwtDecode<IdTokenPayload>(idToken);
  if (payload.nonce !== nonceCookie) {
    return NextResponse.json({ error: "Invalid login response" }, { status: 400 });
  }

  const expectedAudiences = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!expectedAudiences.includes(clientId) || payload.iss !== issuer) {
    return NextResponse.json({ error: "Invalid login response" }, { status: 400 });
  }

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) {
    return NextResponse.json({ error: "Login has expired" }, { status: 400 });
  }

  const res = NextResponse.redirect(getEnv("GOVUK_ONELOGIN_POST_LOGIN_REDIRECT") ?? "/");
  res.cookies.delete("govuk_oidc_state");
  res.cookies.delete("govuk_oidc_nonce");
  res.cookies.delete("govuk_oidc_code_verifier");
  res.cookies.set({
    name: "govuk_id_token",
    value: idToken,
    httpOnly: true,
    sameSite: "lax",
    secure: !isDevelopment,
    path: "/",
    maxAge: payload.exp ? payload.exp - now : DEFAULT_COOKIE_MAX_AGE,
  });
  return res;
}
