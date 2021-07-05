const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        res.render('sign-in', {
            namePage: 'Inicio de sesión',
            errors: 'Token no válido'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

        // Leer usuario que corresponde al uid
        const user = await Users.findByPk(uid);
        if (!user) {
            res.render('sign-in', {
                namePage: 'Inicio de sesión',
                errors: 'Token no válido'
            })
        }

        req.user = user;

        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    validateJWT
}