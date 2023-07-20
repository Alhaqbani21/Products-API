import Client from '../database';

export class DashboardQueries {
  // Get all products that have been included in orders
  async productsInOrders(): Promise<
    { name: string; price: number; order_id: string; quantity: number }[]
  > {
    try {
      const conn = await Client.connect();
      const sql = `SELECT products.name, products.price, order_products.order_id 
      FROM products 
      INNER JOIN order_products ON products.id = order_products.product_id
`;
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable to get products and orders: ${err}`);
    }
  }

  async usersWithOrders(): Promise<{ firstName: String; lastname: string }[]> {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT username FROM users INNER JOIN orders ON users.id = orders.user_id';
      const result = await conn.query(sql);
      conn.release;
      return result.rows;
    } catch (err) {
      throw new Error(`unable get users with orders: ${err}`);
    }
  }

  async fiveMostExpensive(): Promise<{ name: string; price: number }[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT name, price FROM products ORDER BY price DESC LIMIT 5';
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products by price: ${err}`);
    }
  }
}
