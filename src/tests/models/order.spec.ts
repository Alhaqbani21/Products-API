import { BaseOrder, Order, OrderStore } from '../../models/order';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';

const orderStore = new OrderStore();

describe('Order Model', () => {
    const userStore = new UserStore();
    const productStore = new ProductStore();

    let order: BaseOrder, user_id: number, product_id: number;

    function createOrder(order: BaseOrder) {
        return orderStore.create(order);
    }

    function deleteOrder(id: number) {
        return orderStore.destroyOrder(id);
    }

    beforeAll(async () => {
        const user: User = await userStore.create({
            username: 'X3zZ',
            firstname: 'Abdulaziz',
            lastname: 'Alhaqbani',
            password: '123'
        });

        user_id = parseInt(user.id as unknown as string);

        const product: Product = await productStore.addProduct({
            name: 'Black T-shirt',
            price: 150,
            category: 'T-shirt'
        });

        product_id = parseInt(product.id as unknown as string);

        order = {
            products: [
                {
                    product_id,
                    quantity: 5
                }
            ],
            user_id,
            status: 'active'
        };
    });

    afterAll(async () => {
        await userStore.delete(user_id);
        await productStore.deleteProduct(product_id);
    });

    it('Get index method implemented', () => {
        expect(orderStore.index).toBeDefined();
    });

    it('Get show method implemented', () => {
        expect(orderStore.show).toBeDefined();
    });

    it('Get add method implemented', () => {
        expect(orderStore.create).toBeDefined();
    });

    it('Get delete method implemented', () => {
        expect(orderStore.destroyOrder).toBeDefined();
    });

    it('order should be added ', async () => {
        const createdOrder: Order = await createOrder(order);
        expect(parseInt(createdOrder.user_id as unknown as string)).toEqual(
            user_id
        );
        expect(
            parseInt(createdOrder.products[0].product_id as unknown as string)
        ).toEqual(product_id);

        if (createdOrder.id) {
            await deleteOrder(createdOrder.id);
        } else {
            fail('Invalid order id');
        }
    });

    it('order item should be removed ', async () => {
        const createdOrder: Order = await createOrder(order);
        if (createdOrder.id) {
            await deleteOrder(createdOrder.id);
            const orderList = await orderStore.index();
            expect(orderList).toEqual([]);
        } else {
            fail('Invalid order id'); // Fail the test if id is undefined
        }
    });
});
