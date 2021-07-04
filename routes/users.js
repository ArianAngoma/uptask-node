const {Router} = require('express');
const {formCreateAccount} = require("../controllers/users");

const router = Router();

router.get('/create-account', formCreateAccount);


module.exports = router;