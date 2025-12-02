const { HttpsError, onCall } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');

// Bind a secret for template use. Rename TEMPLATE_SECRET to your own key name:
// firebase functions:secrets:set TEMPLATE_SECRET
const templateSecret = defineSecret('TEMPLATE_SECRET');

const maskSecret = (value) => {
  if (!value || value.length < 8) {
    return value ? `${value[0]}***` : null;
  }
  return `${value.slice(0, 4)}...${value.slice(-4)}`;
};

exports.getSecret = onCall({ secrets: [templateSecret] }, (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Sign in to access this function.');
  }

  const key = templateSecret.value();
  if (!key) {
    throw new HttpsError(
      'failed-precondition',
      'TEMPLATE_SECRET is not set. Update the secret name for your project.'
    );
  }

  return {
    message: 'Secret loaded via Firebase Secret Manager.',
    maskedValue: maskSecret(key),
    note: 'Replace this function with your own server logic as needed.',
  };
});
