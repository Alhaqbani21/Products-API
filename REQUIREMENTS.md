# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index `'products/' [GET]`
- Show (args: product id) `'products/:id' [GET]`
- Create (args: Product)[token required] `'products/' [POST] (token)`
- [OPTIONAL] Top 5 most popular products `'/five-most-expensive' [GET]`
- [OPTIONAL] Products by category (args: product category)
- [ADDED] Delete: `'products/:id  [DELETE]`
- [ADDED] products_in_orders: `'/products_in_orders' [GET]`
- [ADDED] users-with-orders: `'/users-with-orders' [GET]`

#### Users

- Index [token required] `'users/' [GET] (token)`
- Show (args: id)[token required] `'users/:id' [GET] (token)`
- Create (args: User)[token required] `'users/create' [POST] (token)`

#### Orders

- Current Order by user (args: user id)[token required] `'/orders' [GET]`
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
- [ADDED] index `'/orders' [GET]`
- [ADDED] create `'/orders' [POST]`
- [ADDED] addProductToOrder `'/orders/:id/products' [POST]`

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

products (
id SERIAL PRIMARY KEY,
name VARCHAR(64) NOT NULL,
price integer NOT NULL,
category VARCHAR(64)
)

#### User

- id
- firstName
- lastName
- password

users (
id SERIAL PRIMARY KEY,
firstname VARCHAR(250) NOT NULL,
lastname VARCHAR(250) NOT NULL,
username VARCHAR(250) NOT NULL,
password_digest VARCHAR(250) NOT NULL
);

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

orders(
id SERIAL PRIMARY KEY,
status VARCHAR(64),
user_id BIGINT REFERENCES users(id)

);

### order_products

order_products (
id SERIAL PRIMARY KEY,
quantity INTEGER,
order_id BIGINT REFERENCES orders(id),
product_id BIGINT REFERENCES products(id)

);
