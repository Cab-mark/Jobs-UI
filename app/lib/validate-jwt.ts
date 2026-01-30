import jwt from "jsonwebtoken";
import crypto from "crypto";

/**
 * Validate JWT signing with the private key
 * Run this to test if JWT generation works correctly
 */
export function validateJWTSetup(privateKeyStr: string, clientId: string, tokenEndpoint: string) {
  console.log("\n=== JWT Validation ===");
  
  // Step 1: Check private key format
  const unescapedKey = privateKeyStr.replace(/\\n/g, '\n');
  console.log("Private key format check:");
  console.log("- Length:", unescapedKey.length);
  console.log("- Starts with:", unescapedKey.substring(0, 30));
  console.log("- Ends with:", unescapedKey.substring(unescapedKey.length - 30));
  
  // Step 2: Try to extract public key
  try {
    const privateKeyObj = crypto.createPrivateKey(unescapedKey);
    console.log("\n✅ Private key is valid RSA format");
    console.log("Key type:", privateKeyObj.type);
    console.log("Key asymmetricKeyType:", privateKeyObj.asymmetricKeyType);
  } catch (err) {
    console.error("❌ Private key is invalid:", err instanceof Error ? err.message : err);
    return;
  }
  
  // Step 3: Try to sign a JWT
  try {
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: clientId,
      sub: clientId,
      aud: tokenEndpoint,
      iat: now,
      exp: now + 300,
    };
    
    const token = jwt.sign(payload, unescapedKey, { algorithm: "RS256" });
    console.log("\n✅ JWT signed successfully");
    console.log("Token (first 100 chars):", token.substring(0, 100));
    
    // Step 4: Verify the JWT can be decoded
    const decoded = jwt.decode(token, { complete: true });
    console.log("\n✅ JWT decoded successfully");
    console.log("Header:", decoded?.header);
    console.log("Payload:", decoded?.payload);
  } catch (err) {
    console.error("❌ JWT signing failed:", err instanceof Error ? err.message : err);
  }
}
