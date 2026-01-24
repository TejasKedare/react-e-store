export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
