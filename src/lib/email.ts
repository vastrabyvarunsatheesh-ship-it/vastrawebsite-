import { logger } from "./logger";

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

/**
 * Resend Email Service Architecture Stub
 */
export class ResendEmailClient {
  private apiKey: string;
  private defaultFrom: string;

  constructor() {
    this.apiKey = process.env.RESEND_API_KEY || "";
    this.defaultFrom = process.env.EMAIL_FROM_ADDRESS || "orders@vastra.com";
  }

  public async sendEmail(options: SendEmailOptions): Promise<{ id: string }> {
    logger.info("Resend transactional email stub executed", {
      to: options.to,
      subject: options.subject,
      from: this.defaultFrom,
    });

    return { id: `msg_stub_${Date.now()}` };
  }
}

export const emailClient = new ResendEmailClient();
