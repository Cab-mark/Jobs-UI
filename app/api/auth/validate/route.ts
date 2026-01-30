import { NextResponse } from "next/server";
import { getEnv } from "@/app/lib/env";
import { validateJWTSetup } from "@/app/lib/validate-jwt";

/**
 * Debug endpoint to validate JWT configuration
 * Visit: http://localhost:3000/api/auth/validate
 */
export async function GET() {
  const clientId = getEnv("GOVUK_ONELOGIN_CLIENT_ID");
  const tokenEndpoint = getEnv("GOVUK_ONELOGIN_TOKEN_URL");
  const privateKey = getEnv("GOVUK_ONELOGIN_PRIVATE_KEY");

  console.log("\n🔍 Validating GOV.UK One Login configuration...");
  console.log("CLIENT_ID:", clientId);
  console.log("TOKEN_ENDPOINT:", tokenEndpoint);
  console.log("HAS_PRIVATE_KEY:", !!privateKey);

  if (!clientId || !tokenEndpoint || !privateKey) {
    return NextResponse.json(
      {
        error: "Missing required configuration",
        missing: {
          clientId: !clientId,
          tokenEndpoint: !tokenEndpoint,
          privateKey: !privateKey,
        },
      },
      { status: 400 }
    );
  }

  validateJWTSetup(privateKey, clientId, tokenEndpoint);

  return NextResponse.json({
    status: "validation_complete",
    message: "Check server logs for detailed validation results",
  });
}
