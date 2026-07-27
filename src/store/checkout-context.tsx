"use client";

import * as React from "react";
import { Address } from "@/types/user";

export type CheckoutStep = "info" | "address" | "shipping" | "review";

export interface CustomerInfo {
  email: string;
  phone: string;
  fullName: string;
}

export interface ShippingMethod {
  id: string;
  title: string;
  price: number;
  deliveryEstimate: string;
}

interface CheckoutContextType {
  currentStep: CheckoutStep;
  customerInfo: CustomerInfo;
  shippingAddress: Address | null;
  selectedShippingMethod: ShippingMethod;
  paymentMethod: "RAZORPAY_CARD" | "RAZORPAY_UPI" | "RAZORPAY_NETBANKING" | "COD";
  setStep: (step: CheckoutStep) => void;
  setCustomerInfo: (info: CustomerInfo) => void;
  setShippingAddress: (addr: Address) => void;
  setSelectedShippingMethod: (method: ShippingMethod) => void;
  setPaymentMethod: (method: "RAZORPAY_CARD" | "RAZORPAY_UPI" | "RAZORPAY_NETBANKING" | "COD") => void;
}

const DEFAULT_SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "std",
    title: "Standard Express Shipping",
    price: 150,
    deliveryEstimate: "3-5 Business Days across India",
  },
  {
    id: "atelier_priority",
    title: "Atelier Priority Air Delivery",
    price: 350,
    deliveryEstimate: "1-2 Business Days Priority Dispatch",
  },
];

const CheckoutContext = React.createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setStep] = React.useState<CheckoutStep>("info");
  const [customerInfo, setCustomerInfo] = React.useState<CustomerInfo>({
    email: "",
    phone: "",
    fullName: "",
  });
  const [shippingAddress, setShippingAddress] = React.useState<Address | null>(null);
  const [selectedShippingMethod, setSelectedShippingMethod] = React.useState<ShippingMethod>(
    DEFAULT_SHIPPING_METHODS[0]
  );
  const [paymentMethod, setPaymentMethod] = React.useState<"RAZORPAY_CARD" | "RAZORPAY_UPI" | "RAZORPAY_NETBANKING" | "COD">("RAZORPAY_UPI");

  return (
    <CheckoutContext.Provider
      value={{
        currentStep,
        customerInfo,
        shippingAddress,
        selectedShippingMethod,
        paymentMethod,
        setStep,
        setCustomerInfo,
        setShippingAddress,
        setSelectedShippingMethod,
        setPaymentMethod,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = React.useContext(CheckoutContext);
  if (!context) throw new Error("useCheckout must be used within CheckoutProvider");
  return context;
};
