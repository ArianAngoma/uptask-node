const {Router} = require('express');
const {addTask, changeStateTask} = require("../controllers/tasks");

const router = Router();

router.post('/projects/:url', addTask);

router.patch('/tasks/:id', changeStateTask);

module.exports = router;