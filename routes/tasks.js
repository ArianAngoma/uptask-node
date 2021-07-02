const {Router} = require('express');
const {check} = require('express-validator');
const {addTask} = require("../controllers/tasks");
const {validateFields} = require('../middlewares/validate-fields');

const router = Router();

router.post('/projects/:url', addTask)

module.exports = router;