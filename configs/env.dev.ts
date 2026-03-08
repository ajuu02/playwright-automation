export const envOverride = {
  name: 'dev',
  baseUrl: process.env.BASE_URL,
  featureFlags: {
    checkoutV2: false
  }
};
