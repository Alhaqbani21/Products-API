import { BaseAuthUser, BaseUser, User, UserStore } from '../../models/user';

const userStore = new UserStore();

describe('User Model', () => {
    const user: BaseAuthUser = {
        username: 'X3zZ',
        firstname: 'Abdulaziz',
        lastname: 'Alhaqbani',
        password: '123'
    };

    async function createUser(user: BaseAuthUser) {
        return userStore.create(user);
    }

    async function deleteUser(id: number) {
        return userStore.delete(id);
    }

    it('Get user method implemented', () => {
        expect(userStore.index).toBeDefined();
    });

    it('show method implemented ', () => {
        expect(userStore.show).toBeDefined();
    });

    it('create method implemented', () => {
        expect(userStore.create).toBeDefined();
    });

    it('remove method implemented', () => {
        expect(userStore.delete).toBeDefined();
    });

    it('should create a user in the database', async () => {
        const createdUser = await createUser(user);
        if (createdUser) {
            expect(createdUser.username).toBe(user.username);
            expect(createdUser.firstname).toBe(user.firstname);
            expect(createdUser.lastname).toBe(user.lastname);
        }
        await deleteUser(createdUser.id);
    });

    it('should return the created users', async () => {
        const createdUser: User = await createUser(user);
        const users = await userStore.show(createdUser.id);
        expect(users).toEqual(createdUser);
        await deleteUser(createdUser.id);
    });

    it('should delete the user', async () => {
        const createdUser: User = await createUser(user);
        await deleteUser(createdUser.id);
        expect(createdUser.firstname).toEqual('Abdulaziz');
        expect(createdUser.lastname).toEqual('Alhaqbani');
    });

    it('should update the user', async () => {
        const createdUser: User = await createUser(user);
        const newUserData: BaseUser = {
            firstname: 'Abdulaziz',
            lastname: 'Alhaqbani'
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
