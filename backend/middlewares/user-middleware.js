const { Users } = require("../db");
const { verifyToken } = require("../utils/utils");


const validate = (schema) => (req, res, next) => {
    try {
        schema.safeParse(req.body);
        next();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const verifyAuthToken = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if(!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const decoded = verifyToken(token);
    const user = await Users.findById(decoded.id);
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    req.userId = decoded;
    next();
}

module.exports = {
    validate,
    verifyAuthToken
}
