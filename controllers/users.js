const bcryptjs = require("bcryptjs");
const Users = require('../models/users');
const {generateJWT} = require("../helpers/generate-jwt");

const formCreateAccount = (req, res) => {
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

const formSignIn = (req, res) => {
    res.render('sign-in', {
        namePage: 'Iniciar Sesión'
    })
}

const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        // Verificar si el email existe
        const user = await Users.findOne({
            where:{
                email
            }
        });
        if (!user) {
            /*return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })*/
            return res.render('sign-in', {
                errors: 'Correo no existe'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            /*return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })*/
            return res.render('sign-in', {
                errors: 'Contraseña incorrecta',
            });
        }

        // Generar el JWT
        const token = await generateJWT(user.id);

        /*res.json({
            user,
            token
        })*/

        res.redirect('/')
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    formCreateAccount,
    createAccount,
    formSignIn,
    login
}