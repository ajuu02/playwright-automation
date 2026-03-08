export const envOverride = {
  name: 'qa',
  baseUrl: process.env.BASE_URL,
  featureFlags: {
    checkoutV2: true
  }
};
