export interface EmailNotificationOptions {
  to: string;
  subject: string;
  template: "WELCOME" | "ORDER_CONFIRMATION" | "SHIPPING_DISPATCH" | "PAYMENT_FAILED";
  data: Record<string, unknown>;
}

export interface WhatsAppNotificationOptions {
  phone: string;
  message: string;
}

export class NotificationService {
  public static async sendEmail(options: EmailNotificationOptions): Promise<boolean> {
    // Resend / SMTP email dispatch logic
    return true;
  }

  public static async sendWhatsApp(options: WhatsAppNotificationOptions): Promise<boolean> {
    // WhatsApp Cloud API dispatch stub
    return true;
  }

  public static async triggerOrderConfirmation(orderNumber: string, email: string, phone: string) {
    await this.sendEmail({
      to: email,
      subject: `Order Confirmed: ${orderNumber} - Vastra by Varun`,
      template: "ORDER_CONFIRMATION",
      data: { orderNumber },
    });

    if (phone) {
      await this.sendWhatsApp({
        phone,
        message: `Namaste! Your Vastra order ${orderNumber} has been confirmed. Track your order at https://vastrawebsite.pages.dev/account/orders`,
      });
    }
  }
}
