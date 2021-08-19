const ProjectService = require("../services/ProjectService");

const projectService = new ProjectService();

exports.createProject = async (req, res) => {
  try {
    const serviceValue = await projectService.createProject(
      req.body,
      req.params.id
    );
    res.status(200).json(serviceValue);
  } catch (error) {
    console.log(error.original);
    res.status(400).json({
      success: false,
    });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const serviceValue = await projectService.getProjects(req.params);

    res.status(200).json(serviceValue);
  } catch (error) {
    console.log(error.original);
    res.status(400).json({
      success: false,
    });
  }
};

exports.addDevToProject = async (req, res) => {
  try {
    const serviceValue = await projectService.addUserToProject(
      req.body,
      req.query
    );
    res.status(200).json(serviceValue);
  } catch (error) {
    console.log(error.original);
    res.status(401).json({
      success: false,
      msg: "failed to add user to project",
    });
  }
};

exports.getProjectDetails = async (req, res) => {
  try {
    const serviceValue = await projectService.fetchProjectDetails(
      req.params.id
    );

    if (serviceValue.success === false) {
      res.status(401).json(serviceValue);
    }

    res.status(200).json(serviceValue);
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const serviceValue = await projectService.deleteProject(req.params.id);
    res.status(200).json(serviceValue);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const serviceValue = await projectService.updateProject(
      req.body,
      req.params.id
    );
    res.status(200).json(serviceValue);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
    });
  }
};

exports.removeUserFromProject = async (req, res) => {
  try {
    const serviceValue = await projectService.removeUserFromProject(
      req.params.projectID,
      req.params.userID
    );
    res.status(200).json(serviceValue);
  } catch (error) {
    res.status(404).json({
      success: false,
    });
  }
};
