// @ts-ignore
import Client from '../database';
import bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;

export interface BaseUser {
    firstname: string;
    lastname: string;
}
export interface BaseAuthUser {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
}
export interface User extends BaseAuthUser {
    id: number;
}

export class UserStore {
    async index(): Promise<User[]> {
        //@ts-ignore
        const conn = await Client.connect();

        try {
            const sql = 'SELECT * FROM users';

            const result = await conn.query(sql);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`unable get users: ${err}`);
        }
    }

    async show(id: number): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            //@ts-ignoreX$
            const conn = await Client.connect();

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`unable show user ${id}: ${err}`);
        }
    }

    async create(user: BaseAuthUser): Promise<User> {
        const { firstname, lastname, username, password } = user;

        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql =
                'INSERT INTO users (firstname, lastname, username, password_digest) VALUES($1, $2, $3, $4) RETURNING *';
            const hash = bcrypt.hashSync(
                password + process.env.BCRYPT_PASSWORD,
                parseInt(process.env.SALT_ROUNDS as string, 10)
            );

            const { rows } = await conn.query(sql, [
                firstname,
                lastname,
                username,
                hash
            ]);

            conn.release();

            return rows[0];
        } catch (err) {
            throw new Error(
                `Could not add new user ${firstname} ${lastname}. ${err}`
            );
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'DELETE FROM users WHERE id=($1)';

            await conn.query(sql, [id]);
            conn.release();

            return true;
        } catch (err) {
            throw new Error(`unable delete user (${id}): ${err}`);
        }
    }
    async update(id: number, newUserData: BaseUser): Promise<User> {
        try {
            const sql =
                'UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING *';
            //@ts-ignore
            const conn = await Client.connect();
            const { rows } = await conn.query(sql, [
                newUserData.firstname,
                newUserData.lastname,
                id
            ]);
            conn.release();
            return rows[0];
        } catch (err) {
            throw new Error(
                `Not able to update user ${newUserData.firstname}. ${err}`
            );
        }
    }

    async authenticate(
        username: string,
        password: string
    ): Promise<User | null> {
        try {
            //@ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT password_digest FROM users WHERE username=($1)';

            const result = await conn.query(sql, [username]);

            if (result.rows.length) {
                const user = result.rows[0];

                if (
                    bcrypt.compareSync(password + pepper, user.password_digest)
                ) {
                    return user;
                }
            }
            return null;
        } catch (err) {
            throw new Error(
                `Not able to authenticate user ${username}. ${err}`
            );
        }
    }
}
