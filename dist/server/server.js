"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const history = require('connect-history-api-fallback');
const api_1 = __importDefault(require("../routes/api"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
//app.set("query parser", "simple")
app.use("/api", api_1.default.routes());
app.use(express_1.default.static(path_1.default.join(__dirname, "/public/")));
const port = process.env.PORT || 5000;
// app.get(/.*/, (req:Request, res:Response)=>{
//     res.sendFile(__dirname+"/public/index.html");
// })
if (process.env.NODE_ENV === 'production') {
    console.log('production');
    app.use(history());
    app.use(express_1.default.static(path_1.default.join(__dirname, '/public/')));
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + "/public/index.html");
    });
}
app.listen(port, () => {
    console.log(`App Running on port ${port}`);
});
