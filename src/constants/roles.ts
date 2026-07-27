import { UserRole } from "@/types/user";

export const ROLES: Record<UserRole, UserRole> = {
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
  VENDOR: "VENDOR",
  WHOLESALER: "WHOLESALER",
};

export const PERMISSIONS = {
  MANAGE_PRODUCTS: ["ADMIN", "VENDOR"] as UserRole[],
  MANAGE_ORDERS: ["ADMIN"] as UserRole[],
  MANAGE_USERS: ["ADMIN"] as UserRole[],
  BULK_DISCOUNT: ["WHOLESALER"] as UserRole[],
} as const;
