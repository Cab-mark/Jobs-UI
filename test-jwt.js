// Test script to validate JWT signing with the private key from .env
const fs = require('fs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Load env vars
require('dotenv').config();

const privateKey = process.env.GOVUK_ONELOGIN_PRIVATE_KEY_DEVELOPMENT;
const clientId = process.env.GOVUK_ONELOGIN_CLIENT_ID_DEVELOPMENT;
const tokenEndpoint = process.env.GOVUK_ONELOGIN_TOKEN_URL_DEVELOPMENT;

console.log('=== JWT Signing Test ===\n');
console.log('Configuration:');
console.log('- Client ID:', clientId);
console.log('- Token Endpoint:', tokenEndpoint);
console.log('- Private Key Length:', privateKey?.length);
console.log('- Private Key First 50 chars:', JSON.stringify(privateKey?.substring(0, 50)));
console.log('- Private Key Last 50 chars:', JSON.stringify(privateKey?.substring((privateKey?.length || 0) - 50)));

if (!privateKey || !clientId || !tokenEndpoint) {
  console.error('\n❌ Missing required environment variables');
  process.exit(1);
}

try {
  // Simulate the callback route logic
  let unescapedPrivateKey = privateKey.replace(/\\n/g, '\n');
  
  // Remove surrounding quotes if present
  if (unescapedPrivateKey.startsWith('"') && unescapedPrivateKey.endsWith('"')) {
    unescapedPrivateKey = unescapedPrivateKey.slice(1, -1);
    console.log('\n✓ Removed surrounding quotes from private key');
  }
  
  console.log('\nAfter processing:');
  console.log('- First 50 chars:', JSON.stringify(unescapedPrivateKey.substring(0, 50)));
  console.log('- Contains literal backslash-n:', unescapedPrivateKey.includes('\\n'));
  console.log('- Contains newline chars:', unescapedPrivateKey.includes('\n'));
  
  // Try to parse the key
  console.log('\nTesting key parsing...');
  const keyObj = crypto.createPrivateKey(unescapedPrivateKey);
  console.log('✓ Private key parsed successfully');
  console.log('- Key type:', keyObj.type);
  console.log('- Asymmetric key type:', keyObj.asymmetricKeyType);
  
  // Try to sign a JWT
  console.log('\nTesting JWT signing...');
  const now = Math.floor(Date.now() / 1000);
  const claims = {
    iss: clientId,
    sub: clientId,
    aud: tokenEndpoint,
    jti: crypto.randomBytes(16).toString('hex'),
    iat: now,
    exp: now + 300,
  };
  
  const clientAssertion = jwt.sign(claims, unescapedPrivateKey, { algorithm: 'RS256' });
  console.log('✓ JWT signed successfully!');
  console.log('- Token (first 80 chars):', clientAssertion.substring(0, 80));
  console.log('- Token length:', clientAssertion.length);
  
  console.log('\n✅ All tests passed! JWT signing is working correctly.');
  process.exit(0);
} catch (err) {
  console.error('\n❌ Error:', err.message);
  if (err.stack) {
    console.error('Stack:', err.stack.split('\n').slice(0, 5).join('\n'));
  }
  process.exit(1);
}
