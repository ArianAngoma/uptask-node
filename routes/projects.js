const {Router} = require('express');
const {projectsHome, formProjects} = require("../controllers/projects");
const router = Router();

router.get('/', projectsHome);

router.get('/new-project', formProjects);

module.exports = router;