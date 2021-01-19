const express = require('express');
const {
  createProject,
  getProjectDetails,
  deleteProject,
  updateProject,
} = require('../controllers/project');

const router = express.Router();

router.post('/createProject/:id', createProject);
router.get('/getProject/:id', getProjectDetails);
router.delete('/deleteProject/:id', deleteProject);
router.patch('/updateProject', updateProject);

module.exports = router;
