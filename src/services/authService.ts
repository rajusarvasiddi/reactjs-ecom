import bcrypt from "bcryptjs";
import api from "./api";

// FIXED SALT for deterministic hashing (client-side only obfuscation)
// In a real scenario, the server would handle raw passwords or use a challenge-response.
const FIXED_SALT = "$2a$10$abcdefghijklmnopqrstuv";

const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, FIXED_SALT);
};

export const login = async (email: string, password: string): Promise<any> => {
  // const hashedPassword = await hashPassword(password);
  const response = await api.post("/auth/login", { email, password: password });
  return response.data;
};

export const register = async (email: string, password: string): Promise<void> => {
  // const hashedPassword = await hashPassword(password);
  await api.post("/auth/register", { email, password: password });
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const createUser = async (userData: any): Promise<void> => {
  await api.post("/auth/create-user", userData);
};
