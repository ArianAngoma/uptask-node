const {Router} = require('express');
const {projectsHome, formProjects, newProject} = require("../controllers/projects");
const router = Router();

router.get('/', projectsHome);

router.get('/new-project', formProjects);

router.post('/new-project', newProject);

module.exports = router;