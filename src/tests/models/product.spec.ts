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

    it('should have an index method', () => {
        expect(productStore.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(productStore.show).toBeDefined();
    });

    it('should have a add method', () => {
        expect(productStore.addProduct).toBeDefined();
    });

    it('should have a delete method', () => {
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

    it('should return a list of products', async () => {
        const productList: Product[] = await productStore.index();
        expect(productList).toEqual([
            {
                id: 1,
                name: 'Blue Pants',
                price: 150,
                category: 'Pants'
            }
        ]);
    });

    it('should return the correct product', async () => {
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
