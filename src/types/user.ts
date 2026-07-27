export type UserRole = "CUSTOMER" | "ADMIN" | "VENDOR" | "WHOLESALER";

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserSession {
  user: User;
  token: string;
  expiresAt: string;
}

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  streetAddress: string;
  landmark?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}
