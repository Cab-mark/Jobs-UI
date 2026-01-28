import { NextResponse, type NextRequest } from "next/server";

const env = process.env.NODE_ENV?.toUpperCase() ?? "DEVELOPMENT";

function getEnv(key: string) {
  return process.env[`${key}_${env}`] ?? process.env[key];
}

export async function GET(request: NextRequest) {
  const stateCookie = request.cookies.get("govuk_oidc_state")?.value;
  const nonceCookie = request.cookies.get("govuk_oidc_nonce")?.value;
  const state = request.nextUrl.searchParams.get("state");
  const code = request.nextUrl.searchParams.get("code");

  if (!stateCookie || stateCookie !== state || !code) {
    return NextResponse.json({ error: "Invalid login response" }, { status: 400 });
  }

  const tokenEndpoint = getEnv("GOVUK_ONELOGIN_TOKEN_URL");
  const clientId = getEnv("GOVUK_ONELOGIN_CLIENT_ID");
  const clientSecret = getEnv("GOVUK_ONELOGIN_CLIENT_SECRET");
  const redirectUri = getEnv("GOVUK_ONELOGIN_REDIRECT_URI");
  const issuer = getEnv("GOVUK_ONELOGIN_ISSUER");

  if (!tokenEndpoint || !clientId || !clientSecret || !redirectUri || !issuer || !nonceCookie) {
    return NextResponse.json(
      { error: "GOV.UK One Login is not configured" },
      { status: 500 },
    );
  }

  const tokenRes = await fetch(tokenEndpoint, {
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
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.json(
      { error: "Failed to exchange code" },
      { status: 502 },
    );
  }

  const tokenJson = await tokenRes.json();
  const { id_token: idToken } = tokenJson;

  if (!idToken) {
    return NextResponse.json(
      { error: "No ID token returned" },
      { status: 502 },
    );
  }

  // For brevity we do not verify the ID token here. In production this should be validated against issuer/JWKS.

  const res = NextResponse.redirect(getEnv("GOVUK_ONELOGIN_POST_LOGIN_REDIRECT") ?? "/");
  res.cookies.delete("govuk_oidc_state");
  res.cookies.delete("govuk_oidc_nonce");
  res.cookies.set({
    name: "govuk_id_token",
    value: idToken,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
  });
  return res;
}
