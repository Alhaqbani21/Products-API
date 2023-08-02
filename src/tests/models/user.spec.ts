// import { BaseAuthUser, BaseUser, User, UserStore } from '../../models/user';

// const store = new UserStore();

// describe('User Model', () => {
//     const user: BaseAuthUser = {
//         username: 'X3zZ',
//         firstname: 'Abdulaziz',
//         lastname: 'Alhaqbani',
//         password: '123'
//     };

//     async function createUser(user: BaseAuthUser) {
//         return store.create(user);
//     }

//     async function deleteUser(id: number) {
//         return store.delete(id);
//     }

//     it('should show specific user', () => {
//         expect(store.show).toBeDefined();
//     });

//     it('should have delete method implemented', () => {
//         expect(store.delete).toBeDefined();
//     });

//     it('should have index for users', () => {
//         expect(store.index).toBeDefined();
//     });

//     it('should create a user and delete it', async () => {
//         const createdUser = await createUser(user);
//         if (createdUser) {
//             expect(createdUser.username).toBe(user.username);
//             expect(createdUser.firstname).toBe(user.firstname);
//             expect(createdUser.lastname).toBe(user.lastname);
//         }
//         await deleteUser(createdUser.id);
//     });

//     it('Should give a list of users', async () => {
//         const result: any = await store.index();
//         expect(result[0].username).toEqual('X3zZ');
//         expect(result[0].id).toEqual(1);
//         expect(result[0].firstname).toEqual('Abdulaziz');
//         expect(result[0].lastname).toEqual('Alhaqbani');
//     });
// });

import { BaseAuthUser, BaseUser, User, UserStore } from '../../models/user';

const userStore = new UserStore();

describe('User Model', () => {
    const user: BaseAuthUser = {
        username: 'ChrisAnne',
        firstname: 'Chris',
        lastname: 'Anne',
        password: 'password123'
    };

    async function createUser(user: BaseAuthUser) {
        return userStore.create(user);
    }

    async function deleteUser(id: number) {
        return userStore.delete(id);
    }

    it('should have getUser method', () => {
        expect(userStore.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(userStore.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(userStore.create).toBeDefined();
    });

    it('should have a remove method', () => {
        expect(userStore.delete).toBeDefined();
    });

    it('should create a user', async () => {
        const createdUser = await createUser(user);
        if (createdUser) {
            expect(createdUser.username).toBe(user.username);
            expect(createdUser.firstname).toBe(user.firstname);
            expect(createdUser.lastname).toBe(user.lastname);
        }
        await deleteUser(createdUser.id);
    });

    it('should return a list of users', async () => {
        const result: any = await userStore.index();
        expect(result[0].username).toEqual('ChrisAnne');
        expect(result[0].id).toEqual(1);
        expect(result[0].firstname).toEqual('Chris');
        expect(result[0].lastname).toEqual('Anne');
    });

    it(' should return the correct users', async () => {
        const createdUser: User = await createUser(user);
        const users = await userStore.show(createdUser.id);
        expect(users).toEqual(createdUser);
        await deleteUser(createdUser.id);
    });

    it('should remove the user', async () => {
        const createdUser: User = await createUser(user);
        await deleteUser(createdUser.id);
        expect(createdUser.firstname).toEqual('Chris');
        expect(createdUser.lastname).toEqual('Anne');
    });

    it('should update the user', async () => {
        const createdUser: User = await createUser(user);
        const newUserData: BaseUser = {
            firstname: 'Kris',
            lastname: 'Han'
        };

        const { firstname, lastname } = await userStore.update(
            createdUser.id,
            newUserData
        );
        expect(firstname).toEqual(newUserData.firstname);
        expect(lastname).toEqual(newUserData.lastname);

        await deleteUser(createdUser.id);
    });
});
