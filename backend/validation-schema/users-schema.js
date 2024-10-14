const zod = require('zod');

const userSchema = zod.object({
    firstName: zod.string().min(3).max(50),
    lastName: zod.string().min(3).max(50),
    username: zod.string().email(),
    password: zod.string().min(6),
});

const loginSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
});

module.exports = {
    userSchema,
    loginSchema
}

