import { NextResponse, type NextRequest } from "next/server";
import crypto from "crypto";
import { DEFAULT_COOKIE_MAX_AGE, getEnv, isDevelopment } from "@/app/lib/env";

export async function GET(_request: NextRequest) {
  console.log("=== GOV.UK One Login Login Route ===");
  const authorizationEndpoint = getEnv("GOVUK_ONELOGIN_AUTHORIZATION_URL");
  const clientId = getEnv("GOVUK_ONELOGIN_CLIENT_ID");
  const redirectUri = getEnv("GOVUK_ONELOGIN_REDIRECT_URI");
  const scope =
    getEnv("GOVUK_ONELOGIN_SCOPE") ??
    "openid email phone offline_access profile";

  console.log("Configuration:", {
    authorizationEndpoint,
    clientId,
    redirectUri,
    scope,
  });

  if (!authorizationEndpoint || !clientId || !redirectUri) {
    console.error("Missing required configuration");
    return NextResponse.json(
      { error: "GOV.UK One Login is not configured" },
      { status: 500 },
    );
  }

  const state = crypto.randomBytes(16).toString("hex");
  const nonce = crypto.randomBytes(16).toString("hex");
  const codeVerifier = crypto.randomBytes(32).toString("base64url");
  const codeChallenge = crypto
    .createHash("sha256")
    .update(codeVerifier)
    .digest("base64url");

  const url = new URL(authorizationEndpoint);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", scope);
  url.searchParams.set("state", state);
  url.searchParams.set("nonce", nonce);
  url.searchParams.set("code_challenge", codeChallenge);
  url.searchParams.set("code_challenge_method", "S256");

  const response = NextResponse.redirect(url.toString());
  response.cookies.set({
    name: "govuk_oidc_state",
    value: state,
    httpOnly: true,
    sameSite: "lax",
    secure: !isDevelopment,
    path: "/",
    maxAge: DEFAULT_COOKIE_MAX_AGE,
  });
  response.cookies.set({
    name: "govuk_oidc_nonce",
    value: nonce,
    httpOnly: true,
    sameSite: "lax",
    secure: !isDevelopment,
    path: "/",
    maxAge: DEFAULT_COOKIE_MAX_AGE,
  });
  response.cookies.set({
    name: "govuk_oidc_code_verifier",
    value: codeVerifier,
    httpOnly: true,
    sameSite: "lax",
    secure: !isDevelopment,
    path: "/",
    maxAge: DEFAULT_COOKIE_MAX_AGE,
  });

  return response;
}
