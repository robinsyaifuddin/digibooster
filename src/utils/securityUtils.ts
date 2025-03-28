
// Simulasi token anti-CSRF
export const generateCSRFToken = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Mencatat percobaan login untuk rate limiting
export const loginAttempts = new Map<string, { count: number, timestamp: number }>();

// Cek kekuatan password
export const checkPasswordStrength = (password: string) => {
  let score = 0;
  let feedback = "Password lemah";
  
  // Panjang minimal
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Kompleksitas
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  // Feedback berdasarkan skor
  if (score <= 2) {
    feedback = "Password lemah - tambahkan huruf besar, angka, dan simbol";
  } else if (score <= 4) {
    feedback = "Password sedang - perpanjang password dan tambahkan variasi karakter";
  } else {
    feedback = "Password kuat";
  }
  
  return { score, feedback };
};

// Fungsi untuk memeriksa rate limiting
export const applyRateLimit = (email: string): boolean => {
  const now = Date.now();
  const attempt = loginAttempts.get(email);
  
  // Reset rate limit jika sudah lebih dari 15 menit
  if (attempt && (now - attempt.timestamp) > 15 * 60 * 1000) {
    loginAttempts.set(email, { count: 1, timestamp: now });
    return false;
  }
  
  // Tambah counter
  if (attempt) {
    // Jika ada lebih dari 5 percobaan dalam 15 menit, limit rate
    if (attempt.count >= 5) {
      return true;
    }
    
    loginAttempts.set(email, { 
      count: attempt.count + 1, 
      timestamp: attempt.timestamp 
    });
  } else {
    loginAttempts.set(email, { count: 1, timestamp: now });
  }
  
  return false;
};
