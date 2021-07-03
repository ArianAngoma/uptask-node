const {Router} = require('express');
const {addTask, changeStateTask, deleteTask} = require("../controllers/tasks");

const router = Router();

router.post('/projects/:url', addTask);

router.patch('/tasks/:id', changeStateTask);

router.delete('/tasks/:id', deleteTask);

module.exports = router;