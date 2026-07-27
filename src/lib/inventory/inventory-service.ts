export interface InventoryItem {
  productId: string;
  variantId: string;
  sku: string;
  availableStock: number;
  reservedStock: number;
  soldStock: number;
  lowStockThreshold: number;
}

export interface InventoryLog {
  id: string;
  sku: string;
  changeType: "STOCK_IN" | "STOCK_OUT" | "RESERVED" | "DAMAGED";
  quantity: number;
  reason: string;
  createdAt: string;
}

export class InventoryService {
  public static checkAvailability(item: InventoryItem, requestedQty: number): boolean {
    return item.availableStock >= requestedQty;
  }

  public static reserveStock(item: InventoryItem, qty: number): InventoryItem {
    if (item.availableStock < qty) {
      throw new Error(`Insufficient stock for SKU ${item.sku}`);
    }

    return {
      ...item,
      availableStock: item.availableStock - qty,
      reservedStock: item.reservedStock + qty,
    };
  }

  public static isLowStock(item: InventoryItem): boolean {
    return item.availableStock <= item.lowStockThreshold;
  }
}
