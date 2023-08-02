"use strict";
// import { BaseAuthUser, BaseUser, User, UserStore } from '../../models/user';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const user_1 = require("../../models/user");
const userStore = new user_1.UserStore();
describe('User Model', () => {
    const user = {
        username: 'ChrisAnne',
        firstname: 'Chris',
        lastname: 'Anne',
        password: 'password123'
    };
    function createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return userStore.create(user);
        });
    }
    function deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return userStore.delete(id);
        });
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
    it('should create a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        if (createdUser) {
            expect(createdUser.username).toBe(user.username);
            expect(createdUser.firstname).toBe(user.firstname);
            expect(createdUser.lastname).toBe(user.lastname);
        }
        yield deleteUser(createdUser.id);
    }));
    it('should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield userStore.index();
        expect(result[0].username).toEqual('ChrisAnne');
        expect(result[0].id).toEqual(1);
        expect(result[0].firstname).toEqual('Chris');
        expect(result[0].lastname).toEqual('Anne');
    }));
    it(' should return the correct users', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        const users = yield userStore.show(createdUser.id);
        expect(users).toEqual(createdUser);
        yield deleteUser(createdUser.id);
    }));
    it('should remove the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        yield deleteUser(createdUser.id);
        expect(createdUser.firstname).toEqual('Chris');
        expect(createdUser.lastname).toEqual('Anne');
    }));
    it('should update the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        const newUserData = {
            firstname: 'Kris',
            lastname: 'Han'
        };
        const { firstname, lastname } = yield userStore.update(createdUser.id, newUserData);
        expect(firstname).toEqual(newUserData.firstname);
        expect(lastname).toEqual(newUserData.lastname);
        yield deleteUser(createdUser.id);
    }));
});
//# sourceMappingURL=user.spec.js.map