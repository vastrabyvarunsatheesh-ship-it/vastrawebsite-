export const siteConfig = {
  name: "VASTRA BY VARUN",
  subtitle: "Couture & Luxury Indian Fashion",
  description: "Exquisite Indian Ethnic Fashion, Sarees, Designer Kurtis, and Artisanal Dress Materials for the Modern Connoisseur.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://vastra.pages.dev",
  ogImage: "https://vastra.pages.dev/og-image.jpg",
  contact: {
    email: "support@vastra.com",
    phone: "+91 98765 43210",
    address: "Vastra Luxury Flagship Studio, Jubilee Hills, Hyderabad, India",
  },
  navCategories: [
    { title: "Sarees", href: "/category/sarees" },
    { title: "Kurtis", href: "/category/kurtis" },
    { title: "Dress Materials", href: "/category/dress-materials" },
    { title: "Women's Fashion", href: "/category/womens-fashion" },
    { title: "New Arrivals", href: "/collection/new-arrivals" },
    { title: "Bestsellers", href: "/collection/bestsellers" },
  ],
  socials: {
    instagram: "https://instagram.com/vastrabyvarun",
    facebook: "https://facebook.com/vastrabyvarun",
    pinterest: "https://pinterest.com/vastrabyvarun",
  },
} as const;
