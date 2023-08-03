import { BaseProduct, Product, ProductStore } from '../../models/product';

const productStore = new ProductStore();

describe('Product Model', () => {
    const product: BaseProduct = {
        name: 'Black T-shirt',
        price: 1000,
        category: 'T-shirt'
    };

    async function createProduct(product: BaseProduct) {
        return productStore.addProduct(product);
    }

    async function deleteProduct(id: number) {
        return productStore.deleteProduct(id);
    }

    it('Get index method implemented', () => {
        expect(productStore.index).toBeDefined();
    });

    it('Get show method implemented', () => {
        expect(productStore.show).toBeDefined();
    });

    it('Get add method implemented', () => {
        expect(productStore.addProduct).toBeDefined();
    });

    it('Get delete method implemented', () => {
        expect(productStore.deleteProduct).toBeDefined();
    });

    it('should add a product', async () => {
        const createdProduct: Product = await createProduct(product);
        expect(createdProduct).toEqual({
            id: createdProduct.id,
            ...product
        });
        await deleteProduct(createdProduct.id);
    });

    it('should return the product', async () => {
        const createdProduct: Product = await createProduct(product);
        const productData = await productStore.show(createdProduct.id);
        expect(productData).toEqual(createdProduct);
        await deleteProduct(createdProduct.id);
    });

    it('should update the product', async () => {
        const createdProduct: Product = await createProduct(product);
        const newProduct: BaseProduct = {
            name: 'New Product List',
            price: 1234,
            category: 'New category'
        };
        const { name, price, category } = await productStore.update(
            createdProduct.id,
            newProduct
        );
        expect(name).toEqual(newProduct.name);
        expect(price).toEqual(newProduct.price);
        expect(category).toEqual(newProduct.category);
        await deleteProduct(createdProduct.id);
    });

    it('should remove the product', async () => {
        const createdProduct: Product = await createProduct(product);
        expect(createdProduct).toEqual({
            id: createdProduct.id,
            name: 'Black T-shirt',
            price: 1000,
            category: 'T-shirt'
        });
    });
});
