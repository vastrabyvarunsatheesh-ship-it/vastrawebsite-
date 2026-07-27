export const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
  },
  CATEGORY: (slug: string) => `/category/${slug}`,
  PRODUCT: (slug: string) => `/product/${slug}`,
  CART: "/cart",
  CHECKOUT: "/checkout",
  ACCOUNT: {
    PROFILE: "/account/profile",
    ORDERS: "/account/orders",
    ORDER_DETAILS: (id: string) => `/account/orders/${id}`,
    ADDRESSES: "/account/addresses",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    PRODUCTS: "/admin/products",
    ORDERS: "/admin/orders",
    CUSTOMERS: "/admin/customers",
  },
} as const;
