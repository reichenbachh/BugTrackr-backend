const express = require("express");

const {
  createProject,
  getProjectDetails,
  deleteProject,
  updateProject,
  addDevToProject,
  removeUserFromProject,
} = require("../controllers/project");

const router = express.Router();

router.post("/createProject/:id", createProject);
router.get("/getProject/:id", getProjectDetails);
router.delete("/deleteProject/:id", deleteProject);
router.post("/inviteToProject", addDevToProject);
router.patch("/updateProject/:id", updateProject);
router.delete(
  "/removerUserFromProject/:projectID/:userID",
  removeUserFromProject
);

module.exports = router;
