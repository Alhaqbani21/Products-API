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
const store = new user_1.UserStore();
describe('User Model', () => {
    const user = {
        username: 'X3zZ',
        firstname: 'Abdulaziz',
        lastname: 'Alhaqbani',
        password: '123'
    };
    function createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return store.create(user);
        });
    }
    function deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return store.delete(id);
        });
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
    it('should create a user and delete it', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield createUser(user);
        if (createdUser) {
            expect(createdUser.username).toBe(user.username);
            expect(createdUser.firstname).toBe(user.firstname);
            expect(createdUser.lastname).toBe(user.lastname);
        }
        yield deleteUser(createdUser.id);
    }));
    it('Should give a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result[0].username).toEqual('X3zZ');
        expect(result[0].id).toEqual(1);
        expect(result[0].firstname).toEqual('Abdulaziz');
        expect(result[0].lastname).toEqual('Alhaqbani');
    }));
});
//# sourceMappingURL=user.spec.js.map