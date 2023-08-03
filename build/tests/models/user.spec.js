"use strict";
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
const user_1 = require("../../models/user");
const userStore = new user_1.UserStore();
describe('User Model', () => {
    const user = {
        username: 'X3zZ',
        firstname: 'Abdulaziz',
        lastname: 'Alhaqbani',
        password: '123'
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
    it('should create a user in the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        if (createdUser) {
            expect(createdUser.username).toBe(user.username);
            expect(createdUser.firstname).toBe(user.firstname);
            expect(createdUser.lastname).toBe(user.lastname);
        }
        yield deleteUser(createdUser.id);
    }));
    it('should return the created users', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        const users = yield userStore.show(createdUser.id);
        expect(users).toEqual(createdUser);
        yield deleteUser(createdUser.id);
    }));
    it('should delete the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        yield deleteUser(createdUser.id);
        expect(createdUser.firstname).toEqual('Abdulaziz');
        expect(createdUser.lastname).toEqual('Alhaqbani');
    }));
    it('should update the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        const newUserData = {
            firstname: 'Abdulaziz',
            lastname: 'Alhaqbani'
        };
        const { firstname, lastname } = yield userStore.update(createdUser.id, newUserData);
        expect(firstname).toEqual(newUserData.firstname);
        expect(lastname).toEqual(newUserData.lastname);
        yield deleteUser(createdUser.id);
    }));
});
//# sourceMappingURL=user.spec.js.map