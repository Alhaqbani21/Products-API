// @ts-ignore
import Client from '../database';

export interface BaseProduct {
    name: string;
    price: number;
    category: string;
}
export interface Product extends BaseProduct {
    id: number;
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';

            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to get products: ${err}`);
        }
    }

    async show(productId: number): Promise<Product | null> {
        try {
            const sql = 'SELECT * FROM products WHERE id = $1';
            // @ts-ignore
            const result = await Client.query(sql, [productId]);
            return result.rows.length ? result.rows[0] : null;
        } catch (err) {
            throw new Error(
                `Unable to get product with ID ${productId}: ${err}`
            );
        }
    }

    async addProduct(product: BaseProduct): Promise<Product> {
        const { name, price, category } = product;
        try {
            const sql =
                'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *'; // Add "RETURNING *" to retrieve the inserted product
            const values = [name, price, category];
            //@ts-ignore
            const conn = await Client.connect();

            const result = await conn.query(sql, values);
            conn.release();

            // Make sure the insert operation was successful and that the product was returned
            if (result.rows.length === 0) {
                throw new Error('Product not created');
            }

            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to add product: ${err}`);
        }
    }

    async deleteProduct(id: number): Promise<void> {
        try {
            const sql = 'DELETE FROM products WHERE id = $1';
            // @ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to delete product with ID ${id}: ${err}`);
        }
    }
    async update(id: number, productData: BaseProduct): Promise<Product> {
        const { name: newName, price, category } = productData;
        try {
            const sql =
                'UPDATE products SET name = $1, price = $2, category = $3 WHERE id = $4 RETURNING *';
            // @ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(sql, [
                newName,
                price,
                category,
                id
            ]);

            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not update product ${newName}. ${err}`);
        }
    }
}
