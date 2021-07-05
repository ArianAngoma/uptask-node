const {Router} = require('express');
const {check} = require('express-validator');
const {formCreateAccount, createAccount, formSignIn, login} = require("../controllers/users");
const {validateFields} = require("../middlewares/validate-fields");

const router = Router();

router.get('/create-account', formCreateAccount);

router.post('/create-account', createAccount);

router.get('/sign-in', formSignIn);

router.post('/sign-in', [
    check('email', 'Correo es requerido').notEmpty(),
    check('password', 'Contraseña es requerida').notEmpty(),
    validateFields
], login);

module.exports = router;