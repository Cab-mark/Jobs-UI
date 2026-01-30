import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_COOKIE_MAX_AGE, getEnv, isDevelopment } from "@/app/lib/env";
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import crypto from "crypto";

interface IdTokenPayload {
  nonce?: string;
  iss?: string;
  aud?: string | string[];
  exp?: number;
}

export async function GET(request: NextRequest) {
  console.log("=== GOV.UK One Login Callback Start ===");
  const redirectToError = (reason: string, detail?: string) => {
    const url = new URL("/auth/error", request.url);
    url.searchParams.set("reason", reason);
    if (detail) {
      url.searchParams.set("detail", detail);
    }
    return NextResponse.redirect(url);
  };

  try {
    const stateCookie = request.cookies.get("govuk_oidc_state")?.value;
    const nonceCookie = request.cookies.get("govuk_oidc_nonce")?.value;
    const codeVerifier = request.cookies.get("govuk_oidc_code_verifier")?.value;
    const state = request.nextUrl.searchParams.get("state");
    const code = request.nextUrl.searchParams.get("code");
    const error = request.nextUrl.searchParams.get("error");
    const errorDescription = request.nextUrl.searchParams.get("error_description");

  console.log("Callback received with:", {
    hasCookies: { stateCookie: !!stateCookie, nonceCookie: !!nonceCookie, codeVerifier: !!codeVerifier },
    queryParams: { state: !!state, code: !!code, error: !!error },
  });

  if (error) {
    console.error("GOV.UK One Login returned an error:", { error, errorDescription });
    return redirectToError("login_failed", errorDescription ?? error ?? "unknown_error");
  }

  if (!stateCookie || stateCookie !== state || !code) {
    return redirectToError("invalid_response", "state_or_code_missing");
  }

  const tokenEndpoint = getEnv("GOVUK_ONELOGIN_TOKEN_URL");
  const clientId = getEnv("GOVUK_ONELOGIN_CLIENT_ID");
  const clientSecret = getEnv("GOVUK_ONELOGIN_CLIENT_SECRET");
  const privateKey = getEnv("GOVUK_ONELOGIN_PRIVATE_KEY");
  const clientAuthMethod = getEnv("GOVUK_ONELOGIN_CLIENT_AUTH_METHOD");
  const redirectUri = getEnv("GOVUK_ONELOGIN_REDIRECT_URI");
  const issuer = getEnv("GOVUK_ONELOGIN_ISSUER");

  console.log("Configuration check:", {
    tokenEndpoint: !!tokenEndpoint,
    clientId: !!clientId,
    privateKey: !!privateKey,
    privateKeyLength: privateKey?.length ?? 0,
    clientSecret: !!clientSecret,
    clientAuthMethod: clientAuthMethod ?? "auto",
    redirectUri: !!redirectUri,
    issuer: !!issuer,
  });

  if (!tokenEndpoint || !clientId || !redirectUri || !issuer || !nonceCookie || !codeVerifier) {
    console.error("Missing required configuration", {
      tokenEndpoint: !tokenEndpoint,
      clientId: !clientId,
      redirectUri: !redirectUri,
      issuer: !issuer,
      nonceCookie: !nonceCookie,
      codeVerifier: !codeVerifier,
    });
    return redirectToError("configuration_error", "missing_required_configuration");
  }

  // Check that we have either a client secret OR a private key (but not both required)
  if (!clientSecret && !privateKey) {
    console.error("No authentication method configured (missing both clientSecret and privateKey)");
    return redirectToError("configuration_error", "no_authentication_method");
  }

  // Build token endpoint request parameters
  const tokenParams: Record<string, string> = {
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
    client_id: clientId,
  };

  const resolvedAuthMethod = clientAuthMethod ?? (clientSecret ? "client_secret_post" : "private_key_jwt");

  // Prefer client_secret_post when configured, unless explicitly set to private_key_jwt
  if (resolvedAuthMethod === "client_secret_post") {
    if (!clientSecret) {
      console.error("client_secret_post selected but clientSecret is missing");
      return redirectToError("configuration_error", "missing_client_secret");
    }
    console.log("Using client_secret authentication");
    // For client_secret_post, include client_secret in body
    tokenParams.client_secret = clientSecret;
  } else if (resolvedAuthMethod === "private_key_jwt") {
    if (!privateKey) {
      console.error("private_key_jwt selected but privateKey is missing");
      return redirectToError("configuration_error", "missing_private_key");
    }
    // Process the private key: handle quotes and escaped newlines
    let unescapedPrivateKey = privateKey.trim();
    
    // Remove surrounding quotes if present (can happen if .env parsing doesn't strip them)
    if ((unescapedPrivateKey.startsWith('"') && unescapedPrivateKey.endsWith('"')) ||
        (unescapedPrivateKey.startsWith("'") && unescapedPrivateKey.endsWith("'"))) {
      unescapedPrivateKey = unescapedPrivateKey.slice(1, -1);
      console.log("Removed surrounding quotes from private key");
    }
    
    // Unescape newlines in the private key (replace literal \n with actual newlines)
    unescapedPrivateKey = unescapedPrivateKey.replace(/\\n/g, '\n');
    
    const now = Math.floor(Date.now() / 1000);
    try {
      console.log("Signing JWT with private key...");
      const jti = crypto.randomBytes(16).toString("hex");
      const claims = {
        iss: clientId,
        sub: clientId,
        aud: tokenEndpoint,
        jti,
        iat: now,
        exp: now + 300, // 5 minutes
      };
      console.log("JWT claims:", { ...claims, jti: jti.substring(0, 8) + "..." });
      
      const clientAssertion = jwt.sign(
        claims,
        unescapedPrivateKey,
        { algorithm: "RS256" }
      );
      tokenParams.client_assertion_type = "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";
      tokenParams.client_assertion = clientAssertion;
      console.log("JWT signed successfully. First 50 chars:", clientAssertion.substring(0, 50) + "...");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Failed to sign JWT with private key:", {
        error: errorMessage,
        privateKeyLength: privateKey.length,
        privateKeyStart: privateKey.substring(0, 50),
        privateKeyEnd: privateKey.substring(privateKey.length - 50),
      });
      return redirectToError("configuration_error", "jwt_signing_failed");
    }
  } else {
    console.error("Unsupported client authentication method", { clientAuthMethod });
    return redirectToError("configuration_error", "unsupported_auth_method");
  }
  
  console.log("Token request params:", Object.keys(tokenParams));

  console.log("Exchanging code for token at:", tokenEndpoint);
  let tokenRes: Response;
  try {
    tokenRes = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(tokenParams),
    });
  } catch (err) {
    console.error("Token endpoint request failed:", err);
    return redirectToError("token_exchange_failed", "network_error");
  }

  console.log("Token endpoint response:", {
    status: tokenRes.status,
    statusText: tokenRes.statusText,
  });

  if (!tokenRes.ok) {
    let detail: unknown;
    try {
      detail = await tokenRes.json();
    } catch {
      detail = await tokenRes.text();
    }
    console.error("Token exchange failed:", {
      status: tokenRes.status,
      statusText: tokenRes.statusText,
      detail,
    });
    return redirectToError("token_exchange_failed", `status_${tokenRes.status}`);
  }

  let tokenJson: any;
  try {
    tokenJson = await tokenRes.json();
  } catch {
    return redirectToError("token_exchange_failed", "invalid_json");
  }
  const { id_token: idToken } = tokenJson;

  if (!idToken) {
    return redirectToError("token_exchange_failed", "missing_id_token");
  }

  let payload: IdTokenPayload;
  try {
    payload = jwtDecode<IdTokenPayload>(idToken);
  } catch (err) {
    console.error("Failed to decode ID token:", err);
    return redirectToError("invalid_response", "jwt_decode_failed");
  }
  if (payload.nonce !== nonceCookie) {
    return redirectToError("invalid_response", "nonce_mismatch");
  }

  const expectedAudiences = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
  if (!expectedAudiences.includes(clientId) || payload.iss !== issuer) {
    return redirectToError("invalid_response", "aud_or_issuer_mismatch");
  }

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp < now) {
    return redirectToError("invalid_response", "token_expired");
  }

  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const baseUrl = forwardedHost
    ? `${forwardedProto ?? request.nextUrl.protocol}://${forwardedHost}`
    : request.nextUrl.origin;
  const postLoginPath = getEnv("GOVUK_ONELOGIN_POST_LOGIN_REDIRECT") ?? "/";
  const postLoginUrl = new URL(postLoginPath, baseUrl);
  const res = NextResponse.redirect(postLoginUrl);
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
  } catch (err) {
    console.error("Unhandled error in GOV.UK One Login callback:", err);
    return redirectToError("unexpected_error", "unhandled_exception");
  }
}
