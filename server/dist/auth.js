"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const saltRounds = 10;
function generateHashSync(password) {
    return bcrypt.hashSync(password, saltRounds);
}
exports.default = generateHashSync;
