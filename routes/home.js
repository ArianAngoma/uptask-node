const {Router} = require('express');
const {home} = require("../controllers/home");
const router = Router();

router.use('/', [

], home);

module.exports = router;