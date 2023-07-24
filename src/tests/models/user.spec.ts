import { BaseAuthUser, BaseUser, User, UserStore } from '../../models/user';

const store = new UserStore();

describe('User Model', () => {
    const user: BaseAuthUser = {
        username: 'X3zZ',
        firstname: 'Abdulaziz',
        lastname: 'Alhaqbani',
        password: '123'
    };

    async function createUser(user: BaseAuthUser) {
        return store.create(user);
    }

    async function deleteUser(id: number) {
        return store.delete(id);
    }

    it('should show specific user', () => {
        expect(store.show).toBeDefined();
    });

    it('should have delete method implemented', () => {
        expect(store.delete).toBeDefined();
    });

    it('should have index for users', () => {
        expect(store.index).toBeDefined();
    });

    it('should create a user and delete it', async () => {
        const createdUser = await createUser(user);
        if (createdUser) {
            expect(createdUser.username).toBe(user.username);
            expect(createdUser.firstname).toBe(user.firstname);
            expect(createdUser.lastname).toBe(user.lastname);
        }
        await deleteUser(createdUser.id);
    });

    it('Should give a list of users', async () => {
        const result: any = await store.index();
        expect(result[0].username).toEqual('X3zZ');
        expect(result[0].id).toEqual(1);
        expect(result[0].firstname).toEqual('Abdulaziz');
        expect(result[0].lastname).toEqual('Alhaqbani');
    });
});
