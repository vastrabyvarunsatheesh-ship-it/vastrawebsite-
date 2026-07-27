import { User, UserSession } from "@/types/user";

export interface IAuthService {
  login(email: string, password?: string): Promise<UserSession>;
  register(email: string, name: string, password?: string): Promise<UserSession>;
  getCurrentUser(token: string): Promise<User | null>;
  logout(token: string): Promise<void>;
}

export class AuthService implements IAuthService {
  async login(): Promise<UserSession> {
    throw new Error("AuthService not implemented in Chapter 1.");
  }

  async register(): Promise<UserSession> {
    throw new Error("AuthService not implemented in Chapter 1.");
  }

  async getCurrentUser(): Promise<User | null> {
    return null;
  }

  async logout(): Promise<void> {}
}

export const authService = new AuthService();
