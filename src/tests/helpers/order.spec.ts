import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';
import { BaseOrder, Order, OrderStore } from '../../models/order';
import { BaseProduct } from '../../models/product';
import { BaseAuthUser } from '../../models/user';
import app from '../../server';

const request = supertest(app);

describe('Order Handler', () => {
    let token: string;

    beforeAll(async () => {
        const userData: BaseAuthUser = {
            username: 'X3zZ',
            firstname: 'Abdulaziz',
            lastname: 'Alhaqbani',
            password: '123'
        };

        const productData: BaseProduct = {
            name: 'Blue Pants',
            price: 234,
            category: 'Pants'
        };

        const { body: userBody } = await request
            .post('/users/create')
            .send(userData);
        token = userBody;

        spyOn(OrderStore.prototype, 'create').and.returnValue(
            Promise.resolve({
                id: 1,
                products: [
                    {
                        product_id: 5, // Convert product_id to number
                        quantity: 5
                    }
                ],
                user_id: 3,
                status: 'active'
            } as Order) // Explicitly cast the return value to Order type
        );
    });

    it('Checked create order Endpoint', async () => {
        const res = await request
            .post('/orders/create')
            .set('Authorization', 'Bearer ' + token)
            .send({
                id: 1,
                products: [
                    {
                        product_id: 5,
                        quantity: 5
                    }
                ],
                user_id: 3,
                status: 'active'
            });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            id: 1,
            products: [
                {
                    product_id: 5,
                    quantity: 5
                }
            ],
            user_id: 3,
            status: 'active'
        });
    });

    it('Checked index Endpoint', async () => {
        const res = await request
            .get('/orders')
            .set('Authorization', 'bearer ' + token);

        expect(res.status).toBe(200);
    });

    it('Checked show Endpoint', async () => {
        const res = await request
            .get(`/orders/1`)
            .set('Authorization', 'bearer ' + token);

        expect(res.status).toBe(200);
    });

    it('Checked delete Endpoint', async () => {
        const res = await request
            .delete(`/orders/2`)
            .set('Authorization', 'bearer ' + token);

        expect(res.status).toBe(200);
    });
});
