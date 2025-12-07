export interface LoginResponse {
  access_token: string;
  id_token: string;
  refresh_token: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch("https://gms-serverless.vercel.app/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
};
