// Two-factor authentication configuration
export const OTP_MAX_LENGTH = 6;

// Hook for two-factor authentication (placeholder implementation)
export const useTwoFactorAuth = () => {
  // This can be expanded with actual two-factor auth logic when needed
  return {
    maxLength: OTP_MAX_LENGTH,
  };
};