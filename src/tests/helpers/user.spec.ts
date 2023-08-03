import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';

import { BaseAuthUser } from '../../models/user';
import app from '../../server';

const request = supertest(app);
const SECRET = process.env.TOKEN_SECRET as Secret;

describe('User Handler spec', () => {
    const userData: BaseAuthUser = {
        username: 'X3zZ',
        firstname: 'Abdulaziz',
        lastname: 'Alhaqbani',
        password: '123'
    };

    let token: string,
        userId = 1;

    it('Checked create Endpoint', async () => {
        const res = await request.post('/users/create').send(userData);

        const { body, status } = res;
        token = body;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { user } = jwt.verify(token, SECRET);
        userId = user.id;

        expect(status).toBe(200);
    });

    it('Checked index Endpoint', async () => {
        const res = await request
            .get('/users')
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
    });

    it('Checked read Endpoint', async () => {
        const res = await request
            .get(`/users/${userId}`)
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
    });

    it('Checked update Endpoint', async () => {
        const newUserData: BaseAuthUser = {
            ...userData,
            firstname: 'Ahmed',
            lastname: 'Saad'
        };

        const res = await request
            .put(`/users/${userId}`)
            .send(newUserData)
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
    });

    it('Checked authenticate Endpoint', async () => {
        const res = await request
            .post('/users/authenticate')
            .send({
                username: userData.username,
                password: userData.password
            })
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
    });

    it('Checked wrong data authenticate Endpiont', async () => {
        const res = await request
            .post('/users/authenticate')
            .send({
                username: userData.username,
                password: '1234531w'
            })
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(401);
    });

    it('Checked delete Endpoint', async () => {
        const res = await request
            .delete(`/users/${userId}`)
            .set('Authorization', 'bearer ' + token);
        expect(res.status).toBe(200);
    });
});
