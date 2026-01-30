import { NextResponse } from "next/server";
import { getEnv } from "@/app/lib/env";
import crypto from "crypto";

export async function GET() {
  const privateKey = getEnv("GOVUK_ONELOGIN_PRIVATE_KEY");
  const clientSecret = getEnv("GOVUK_ONELOGIN_CLIENT_SECRET");
  const clientId = getEnv("GOVUK_ONELOGIN_CLIENT_ID");

  let authMethod = "none";
  let publicKeyPreview = null;

  if (privateKey) {
    authMethod = "private_key_jwt";
    try {
      const unescapedPrivateKey = privateKey.replace(/\\n/g, '\n');
      const privateKeyObj = crypto.createPrivateKey(unescapedPrivateKey);
      const publicKeyObj = crypto.createPublicKey(privateKeyObj);
      const publicKeyPEM = publicKeyObj.export({ type: 'spki', format: 'pem' }) as string;
      // Get first and last lines for verification
      const lines = publicKeyPEM.split('\n');
      publicKeyPreview = `${lines[0]}\n...\n${lines[lines.length - 2]}`;
    } catch (err) {
      publicKeyPreview = `Error: ${err}`;
    }
  } else if (clientSecret) {
    authMethod = "client_secret_post";
  }

  return NextResponse.json({
    clientId,
    authMethod,
    publicKeyPreview,
    environment: process.env.NODE_ENV,
    note: authMethod === "none" 
      ? "No authentication method configured!"
      : authMethod === "private_key_jwt"
      ? "Ensure this public key is registered in GOV.UK One Login with private_key_jwt auth method"
      : "Using client_secret_post authentication"
  });
}
