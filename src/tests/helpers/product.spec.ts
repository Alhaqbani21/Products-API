import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';
import { BaseProduct } from '../../models/product';
import { BaseAuthUser } from '../../models/user';
import app from '../../server';

const request = supertest(app);
const SECRET = process.env.TOKEN_SECRET as Secret;

describe('Product Handler', () => {
    const product: BaseProduct = {
        name: 'Black T-shirt',
        price: 1000,
        category: 'T-shirt'
    };

    let token: string, userId: number;

    beforeAll(async () => {
        const userData: BaseAuthUser = {
            username: 'X3zZ',
            firstname: 'Abdulaziz',
            lastname: 'Alhaqbani',
            password: '123'
        };

        const { body } = await request.post('/users/create').send(userData);
        token = body;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { user } = jwt.verify(body, SECRET);
        userId = user.id;
    });

    afterAll(async () => {
        await request
            .delete(`/users/${userId}`)
            .set('Authorization', 'bearer ' + token);
    });

    it('Checked create Endpoint', async () => {
        const res = await request
            .post('/products/create')
            .send(product)
            .set('Authorization', 'bearer ' + token);

        expect(res.status).toBe(200);
    });

    it('Checked index Endpoint', async () => {
        const res = await request.get('/products');
        expect(res.status).toBe(200);
    });

    it('Checked show Endpoint', async () => {
        const res = await request.get(`/products/1`);
        expect(res.status).toBe(200);
    });

    it('Checked update Endpoint', async () => {
        const newProductData: BaseProduct = {
            ...product,
            name: 'Blue Pants',
            price: 150,
            category: 'Pants'
        };
        const res = await request
            .put(`/products/1`)
            .send(newProductData)
            .set('Authorization', 'bearer ' + token);

        expect(res.status).toBe(200);
    });

    it('Checked delete Endpoint', async () => {
        const res = await request
            .delete(`/products/1`)
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
    });
});
