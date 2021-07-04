const {Router} = require('express');
const {formCreateAccount, createAccount} = require("../controllers/users");

const router = Router();

router.get('/create-account', formCreateAccount);

router.post('/create-account', createAccount);

module.exports = router;