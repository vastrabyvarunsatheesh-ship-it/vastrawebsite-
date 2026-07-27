import { Order } from "@/types/order";
import { formatCurrency } from "@/lib/utils";

export function generateGSTInvoiceHTML(order: Order): string {
  const sellerGSTIN = "32AAAFV1234A1Z5";
  const stateCode = "32 - KERALA";

  const totalGST = Math.round(order.totalAmount * 0.05); // 5% GST on Apparel
  const cgst = Math.round(totalGST / 2);
  const sgst = Math.round(totalGST / 2);
  const taxableAmount = order.totalAmount - totalGST;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Tax Invoice - ${order.orderNumber}</title>
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #0F0F11; padding: 40px; background: #fff; }
    .header { display: flex; justify-content: space-between; border-b: 2px solid #D4AF37; padding-bottom: 20px; }
    .title { font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #0F0F11; }
    .subtitle { font-size: 10px; color: #D4AF37; letter-spacing: 3px; text-transform: uppercase; }
    .details-table { width: 100%; margin-top: 30px; border-collapse: collapse; }
    .details-table th, .details-table td { border: 1px solid #E5E5E5; padding: 10px; text-align: left; font-size: 12px; }
    .details-table th { background: #FAF8F5; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
    .summary-box { float: right; width: 300px; margin-top: 20px; font-size: 12px; }
    .summary-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #eee; }
    .summary-row.grand { font-weight: bold; font-size: 14px; color: #B38F24; border-bottom: 2px solid #B38F24; }
    .footer { margin-top: 80px; text-align: center; font-size: 10px; color: #888; border-top: 1px solid #eee; padding-top: 20px; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="title">VASTRA BY VARUN</div>
      <div class="subtitle">Couture & Luxury Indian Fashion</div>
      <p style="font-size: 11px; margin-top: 8px;">GSTIN: ${sellerGSTIN} | State: ${stateCode}</p>
    </div>
    <div style="text-align: right;">
      <h2 style="margin: 0; font-size: 16px; color: #B38F24;">TAX INVOICE</h2>
      <p style="font-size: 12px; margin: 4px 0;"><strong>Invoice No:</strong> ${order.orderNumber}</p>
      <p style="font-size: 12px; margin: 0;"><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
    </div>
  </div>

  <table class="details-table" style="margin-top: 20px;">
    <thead>
      <tr>
        <th>Item Description</th>
        <th>HSN Code</th>
        <th>Qty</th>
        <th>Unit Price</th>
        <th>Taxable Value</th>
        <th>Total (INR)</th>
      </tr>
    </thead>
    <tbody>
      ${(order.orderItems || [])
        .map(
          (item) => `
        <tr>
          <td><strong>${item.productTitle}</strong><br/><span style="font-size: 10px; color: #666;">Variant: ${item.color} ${item.size ? `| Size: ${item.size}` : ""}</span></td>
          <td>5407 (Silk Fabric)</td>
          <td>${item.quantity}</td>
          <td>${formatCurrency(item.unitPrice)}</td>
          <td>${formatCurrency(item.unitPrice * item.quantity - Math.round(item.unitPrice * item.quantity * 0.05))}</td>
          <td><strong>${formatCurrency(item.totalPrice)}</strong></td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>

  <div class="summary-box">
    <div class="summary-row"><span>Taxable Value:</span> <span>${formatCurrency(taxableAmount)}</span></div>
    <div class="summary-row"><span>CGST (2.5%):</span> <span>${formatCurrency(cgst)}</span></div>
    <div class="summary-row"><span>SGST (2.5%):</span> <span>${formatCurrency(sgst)}</span></div>
    <div class="summary-row"><span>Shipping Fee:</span> <span>${order.shippingFee === 0 ? "FREE" : formatCurrency(order.shippingFee)}</span></div>
    <div class="summary-row grand"><span>Total Amount Payable:</span> <span>${formatCurrency(order.totalAmount)}</span></div>
  </div>

  <div style="clear: both;"></div>

  <div class="footer">
    <p>This is a computer-generated invoice and requires no physical signature.</p>
    <p>VASTRA BY VARUN COUTURE ATELIER • KERALA, INDIA • SUPPORT@VASTRABYVARUN.COM</p>
  </div>
</body>
</html>
  `;
}
