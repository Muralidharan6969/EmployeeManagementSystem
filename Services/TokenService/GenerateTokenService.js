require('dotenv').config({ path: `${process.cwd()}/ems_app.env`});

const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRY
        }
    );
};

module.exports = {
    generateToken
}