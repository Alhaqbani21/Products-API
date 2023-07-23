import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/users';
import orderRoutes from './handlers/order';
import productRoutes from './handlers/product';
import dashboardRoutes from './handlers/dashboard';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

userRoutes(app);
orderRoutes(app);
productRoutes(app);
dashboardRoutes(app);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello world!');
});

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
