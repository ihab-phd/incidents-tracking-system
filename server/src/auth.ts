import * as bcrypt from 'bcrypt';

const saltRounds = 10;  // 2^slatRounds iteration to hash

export default function generateHashSync(password) {
    return bcrypt.hashSync(password, saltRounds);
}