const express = require('express');

const {
  createProject,
  getProjectDetails,
  deleteProject,
  updateProject,
  addDevToProject,
} = require('../controllers/project');

const router = express.Router();

router.post('/createProject/:id', createProject);
router.get('/getProject/:id', getProjectDetails);
router.delete('/deleteProject/:id', deleteProject);
router.post('/inviteToProject', addDevToProject);
router.patch('/updateProject', updateProject);

module.exports = router;
