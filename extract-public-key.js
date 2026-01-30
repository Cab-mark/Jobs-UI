const fs = require('fs');
const crypto = require('crypto');

// Read the .env file
const envContent = fs.readFileSync('.env', 'utf8');

// Extract the private key
const match = envContent.match(/GOVUK_ONELOGIN_PRIVATE_KEY_DEVELOPMENT="([^"]+)"/);
if (!match) {
  console.error('Could not find GOVUK_ONELOGIN_PRIVATE_KEY_DEVELOPMENT in .env');
  process.exit(1);
}

const privateKeyPEM = match[1].replace(/\\n/g, '\n');

// Create public key from private key
const privateKey = crypto.createPrivateKey(privateKeyPEM);
const publicKey = crypto.createPublicKey(privateKey);
const publicKeyPEM = publicKey.export({ type: 'spki', format: 'pem' });

console.log(publicKeyPEM);
