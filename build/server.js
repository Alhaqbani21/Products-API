"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var users_1 = __importDefault(require("./handlers/users"));
var order_1 = __importDefault(require("./handlers/order"));
var product_1 = __importDefault(require("./handlers/product"));
var dashboard_1 = __importDefault(require("./handlers/dashboard"));
var app = (0, express_1.default)();
var address = '0.0.0.0:3000';
app.use(body_parser_1.default.json());
(0, users_1.default)(app);
(0, order_1.default)(app);
(0, product_1.default)(app);
(0, dashboard_1.default)(app);
app.get('/', function (req, res) {
    res.send('Hello world!');
});
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
