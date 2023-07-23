import Client from '../database';

export type Order = {
    userId: string;
    status: string;
};
export type OrderProduct = {
    id?: number;
    order_id: number;
    product_id: number;
    quantity: number;
};

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
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
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id =$1';
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql =
                'INSERT INTO orders (status, user_id) VALUES($1,$2) RETURNING *';

            const result = await conn.query(sql, [o.status, o.userId]);
            console.log(o.status, o.userId, result.rows);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not create order: Error: ${err}`);
        }
    }

    async addProductToOrder(orderProduct: OrderProduct): Promise<OrderProduct> {
        const conn = await Client.connect();
        const { order_id, product_id, quantity } = orderProduct;
        try {
            // Step 1: Check if the order exists and has 'active' status
            const getOrderQuery = 'SELECT * FROM orders WHERE id = $1';
            const getOrderResult = await conn.query(getOrderQuery, [
                orderProduct.order_id
            ]);
            const order = getOrderResult.rows[0];

            if (!order || order.status !== 'active') {
                throw new Error(
                    `Could not add product ${orderProduct.product_id} to order ${orderProduct.order_id}`
                );
            }

            const sql =
                'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
            const values = [order_id, product_id, quantity];
            const result = await conn.query(sql, values);

            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could not add product ${orderProduct.product_id} to order ${orderProduct.order_id}: ${err}`
            );
        } finally {
            conn.release();
        }
    }
}
