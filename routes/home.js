const {Router} = require('express');
const {home, about} = require("../controllers/home");
const router = Router();

router.get('/', [

], home);

module.exports = router;