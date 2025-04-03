"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import env from './utils/validateEnv';
// Load the environment variables
dotenv_1.default.config({ path: 'backend/src/config/.env' });
const app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
// Route middleware
// Custom Error Middleware to handle error
app.get('/', (req, res) => {
    res.send('we are in home page, better');
});
app.get('/greet', (req, res) => {
    res.send('Hello Guys');
});
app.get('/time', (req, res) => {
    res.json({ time: new Date().toISOString() });
});
exports.default = app;
//# sourceMappingURL=app.js.map