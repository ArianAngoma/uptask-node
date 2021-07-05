const {Router} = require('express');
const {addTask, changeStateTask, deleteTask} = require("../controllers/tasks");
const {validateJWT} = require("../middlewares/validate-jwt");

const router = Router();

router.post('/projects/:url', [
    validateJWT
],addTask);

router.patch('/tasks/:id', [
    validateJWT
], changeStateTask);

router.delete('/tasks/:id', [
    validateJWT
], deleteTask);

module.exports = router;