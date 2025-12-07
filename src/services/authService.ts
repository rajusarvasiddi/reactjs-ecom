import bcrypt from "bcryptjs";

export interface LoginResponse {
  access_token: string;
  id_token: string;
  refresh_token: string;
}

// FIXED SALT for deterministic hashing (client-side only obfuscation)
// In a real scenario, the server would handle raw passwords or use a challenge-response.
const FIXED_SALT = "$2a$10$abcdefghijklmnopqrstuv";

const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, FIXED_SALT);
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const hashedPassword = await hashPassword(password);
  const response = await fetch("https://gms-serverless.vercel.app/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password: hashedPassword }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
};
