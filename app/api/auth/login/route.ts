import { NextResponse, type NextRequest } from "next/server";
import crypto from "crypto";

const env = process.env.NODE_ENV?.toUpperCase() ?? "DEVELOPMENT";

function getEnv(key: string) {
  return process.env[`${key}_${env}`] ?? process.env[key];
}

export async function GET(_request: NextRequest) {
  const authorizationEndpoint = getEnv("GOVUK_ONELOGIN_AUTHORIZATION_URL");
  const clientId = getEnv("GOVUK_ONELOGIN_CLIENT_ID");
  const redirectUri = getEnv("GOVUK_ONELOGIN_REDIRECT_URI");
  const scope =
    getEnv("GOVUK_ONELOGIN_SCOPE") ??
    "openid email phone offline_access profile";

  if (!authorizationEndpoint || !clientId || !redirectUri) {
    return NextResponse.json(
      { error: "GOV.UK One Login is not configured" },
      { status: 500 },
    );
  }

  const state = crypto.randomBytes(16).toString("hex");
  const nonce = crypto.randomBytes(16).toString("hex");

  const url = new URL(authorizationEndpoint);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", scope);
  url.searchParams.set("state", state);
  url.searchParams.set("nonce", nonce);

  const response = NextResponse.redirect(url.toString());
  response.cookies.set({
    name: "govuk_oidc_state",
    value: state,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
  });
  response.cookies.set({
    name: "govuk_oidc_nonce",
    value: nonce,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
  });

  return response;
}
