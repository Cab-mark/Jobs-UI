#!/bin/bash
# Extract public key from the private key in .env file

PRIVATE_KEY=$(grep "GOVUK_ONELOGIN_PRIVATE_KEY_DEVELOPMENT=" .env | cut -d'=' -f2- | tr -d '"')

echo "$PRIVATE_KEY" | openssl rsa -pubout 2>/dev/null
