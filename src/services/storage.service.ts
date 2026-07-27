export interface IStorageService {
  uploadProductImage(file: ArrayBuffer, fileName: string): Promise<string>;
  deleteProductImage(fileKey: string): Promise<void>;
}

export class StorageService implements IStorageService {
  async uploadProductImage(): Promise<string> {
    return "https://media.vastra.com/placeholder-saree.jpg";
  }

  async deleteProductImage(): Promise<void> {}
}

export const storageService = new StorageService();
