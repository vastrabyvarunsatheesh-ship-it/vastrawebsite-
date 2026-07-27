export interface IEmailService {
  sendOrderConfirmation(email: string, orderNumber: string): Promise<boolean>;
  sendPasswordReset(email: string, resetToken: string): Promise<boolean>;
}

export class EmailService implements IEmailService {
  async sendOrderConfirmation(): Promise<boolean> {
    return true;
  }

  async sendPasswordReset(): Promise<boolean> {
    return true;
  }
}

export const emailService = new EmailService();
