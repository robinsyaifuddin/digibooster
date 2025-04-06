
/**
 * Check password strength and provide feedback
 * @param password The password to check
 * @returns Object containing score (0-5) and feedback
 */
export const checkPasswordStrength = (password: string) => {
  let score = 0;
  let feedback = '';

  if (!password) {
    return { score: 0, feedback: 'Password tidak boleh kosong' };
  }

  // Length check
  if (password.length < 8) {
    feedback = 'Password terlalu pendek. Gunakan minimal 8 karakter.';
  } else {
    score++;
  }

  // Check for uppercase letters
  if (password.match(/[A-Z]/)) {
    score++;
  }

  // Check for lowercase letters
  if (password.match(/[a-z]/)) {
    score++;
  }

  // Check for numbers
  if (password.match(/[0-9]/)) {
    score++;
  }

  // Check for special characters
  if (password.match(/[^A-Za-z0-9]/)) {
    score++;
  }

  // Generate feedback based on score
  if (score < 2) {
    feedback = 'Password sangat lemah. Tambahkan huruf kapital, angka, dan simbol.';
  } else if (score < 3) {
    feedback = 'Password lemah. Tambahkan lebih banyak variasi karakter.';
  } else if (score < 4) {
    feedback = 'Password cukup kuat, namun bisa ditingkatkan lagi.';
  } else if (score < 5) {
    feedback = 'Password kuat!';
  } else {
    feedback = 'Password sangat kuat!';
  }

  return { score, feedback };
};

/**
 * Generate a secure random password
 * @param length Length of the password to generate
 * @returns A secure random password
 */
export const generateSecurePassword = (length = 12) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

/**
 * Hash a string (client-side only, not secure for production)
 * Note: This is just for demo purposes, use server-side hashing in production
 */
export const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
};

/**
 * Detect suspicious login attempts based on time and location
 * This is a mock implementation for demo purposes
 */
export const detectSuspiciousLogin = () => {
  // Random result for demo purposes
  const isSuspicious = Math.random() > 0.8;
  return {
    suspicious: isSuspicious,
    reason: isSuspicious ? 'Unusual login location detected' : null,
    riskLevel: isSuspicious ? 'high' : 'low'
  };
};
