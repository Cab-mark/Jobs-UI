import crypto from "crypto";
import { getEnv } from "@/app/lib/env";

/**
 * Extract and display the public key from the private key
 * Use this to verify it matches what's registered in GOV.UK One Login
 */
export async function GET() {
  const privateKey = getEnv("GOVUK_ONELOGIN_PRIVATE_KEY");
  
  if (!privateKey) {
    return new Response("No private key configured", { status: 400 });
  }

  const unescapedKey = privateKey.replace(/\\n/g, '\n');
  
  try {
    const privateKeyObj = crypto.createPrivateKey(unescapedKey);
    const publicKeyObj = crypto.createPublicKey(privateKeyObj);
    const publicKeyPem = publicKeyObj.export({ format: 'pem', type: 'spki' });
    
    return new Response(publicKeyPem, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': 'attachment; filename="public_key.pem"'
      }
    });
  } catch (err) {
    return new Response(
      `Error extracting public key: ${err instanceof Error ? err.message : err}`,
      { status: 500 }
    );
  }
}
