const Users = require('../models/users');

const formCreateAccount = async (req, res) => {
    res.render('create-account', {
        namePage: 'Crear Cuenta'
    })
}

const createAccount = async (req, res) => {
    const {email, password} = req.body;

    try {
        await Users.create({
            email, password
        });
        res.redirect('/sign-in');
    } catch (err) {
        res.render('create-account', {
            errors: err.errors,
            namePage: 'Crear Cuenta',
            email,
            password
        })
    }
}

module.exports = {
    formCreateAccount,
    createAccount
}