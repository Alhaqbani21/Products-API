import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products';
      const result = await Client.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get products: ${err}`);
    }
  }

  async show(productId: number): Promise<Product | null> {
    try {
      const sql = 'SELECT * FROM products WHERE id = $1';
      const result = await Client.query(sql, [productId]);
      return result.rows.length ? result.rows[0] : null;
    } catch (err) {
      throw new Error(`Unable to get product with ID ${productId}: ${err}`);
    }
  }

  async addProduct(product: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price, category) VALUES ($1, $2, $3)';
      const values = [product.name, product.price, product.category];
      const result = await Client.query(sql, values);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to add product: ${err}`);
    }
  }

  async deleteProduct(productId: number): Promise<void> {
    try {
      const sql = 'DELETE FROM products WHERE id = $1';
      await Client.query(sql, [productId]);
    } catch (err) {
      throw new Error(`Unable to delete product with ID ${productId}: ${err}`);
    }
  }
}
