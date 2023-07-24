// @ts-ignore
import Client from '../database';

export interface OrderProduct {
    product_id: number;
    quantity: number;
}

export interface BaseOrder {
    products: OrderProduct[];
    user_id: number;
    status: string;
}

export interface Order extends BaseOrder {
    id?: number;
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }

    async show(id: string): Promise<Order> {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id =$1';
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }

    async create(order: BaseOrder): Promise<Order> {
        const { products, user_id, status } = order;

        try {
            const sql =
                'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
            // @ts-ignore
            const conn = await Client.connect();
            const { rows } = await conn.query(sql, [status, user_id]);
            const newOrder = rows[0]; // Use a different variable name here to avoid conflicts

            const orderProductsSql =
                'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING product_id, quantity';
            const orderProducts = [];

            for (const product of products) {
                const { product_id, quantity } = product;
                const { rows } = await conn.query(orderProductsSql, [
                    newOrder.id, // Use the newOrder variable here
                    product_id,
                    quantity
                ]);
                orderProducts.push(rows[0]);
            }

            conn.release();

            return {
                ...newOrder, // Use the newOrder variable here
                products: orderProducts
            };
        } catch (err) {
            throw new Error(
                `Could not add new order for user ${user_id}. ${err}`
            );
        }
    }

    async destroyOrder(id: number): Promise<Order> {
        try {
            // @ts-ignore
            const conn = await Client.connect();
            const orderProductsQuery =
                'DELETE FROM order_products WHERE order_id=($1)';
            await conn.query(orderProductsQuery, [id]);
            const ordersQuery = 'DELETE FROM orders WHERE id=($1)';
            const result = await conn.query(ordersQuery, [id]);
            const orderResult = result.rows[0];
            conn.release();
            return orderResult;
        } catch (err) {
            throw new Error(
                `not able to delete order with id: ${id} , Error: ${err}`
            );
        }
    }
}
