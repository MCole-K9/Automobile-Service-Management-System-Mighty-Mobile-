"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const pinia_1 = require("pinia");
const App_vue_1 = __importDefault(require("./App.vue"));
const router_1 = __importDefault(require("./router"));
require("./index.css");
const vue_datepicker_1 = __importDefault(require("@vuepic/vue-datepicker"));
require("@vuepic/vue-datepicker/dist/main.css");
const app = (0, vue_1.createApp)(App_vue_1.default);
app.use((0, pinia_1.createPinia)());
app.use(router_1.default);
app.component('Datepicker', vue_datepicker_1.default);
app.mount('#app');
