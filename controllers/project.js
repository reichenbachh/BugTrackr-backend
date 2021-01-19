const projectModel = require('../models').Project;
const teamModel = require('../models').Team;
const userModel = require('../models').User;

exports.createProject = async (req, res) => {
  try {
    const { projectName, projectDesc, projectStage } = req.body;
    const newProject = await projectModel.create({
      projectName,
      projectDesc,
      projectStage,
    });
    //use join tabel to assign the creator of the project as a project lead
    const newTeam = await teamModel.create({
      userId: req.params.id,
      projectId: newProject.dataValues.id,
      role: 'Project Lead',
    });
    console.log(newTeam);
    responseCreator(200, 'Project created', res, true, newProject.dataValues);
  } catch (error) {
    responseCreator(401, 'failed to create project', res, false, '');
  }
};

exports.getProjectDetails = async (req, res) => {
  try {
    projectID = req.params.id;

    const project = await projectModel.findOne({
      where: {
        id: projectID,
      },
      include: [
        {
          model: userModel,
          as: 'users',
          attributes: ['id', 'email'],
        },
      ],
    });

    if (project === null) {
      return responseCreator(404, 'Project does not exist', res, false, '');
    }

    responseCreator(200, '', res, true, project.dataValues);
  } catch (error) {
    responseCreator(401, 'failed to query project', res, false, '');
  }
};

exports.deleteProject = async (req, res) => {
  try {
    projectID = req.params.id;
    await projectModel.destroy({
      where: {
        id: projectID,
      },
    });
    responseCreator(200, 'project deleted', res, true, '');
  } catch (error) {
    console.log(error.original);
    responseCreator(401, 'failed to delete project', res, false, '');
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { projectName, projectDesc, projectStage } = req.body;
    projectID = req.query.id;
    const updatedProject = await projectModel.update(
      {
        projectName,
        projectDesc,
        projectStage,
      },
      {
        where: {
          id: projectID,
        },
      }
    );
    console.log(updatedProject);
    responseCreator(200, 'project changes saved', res, true, '');
  } catch (error) {
    console.log(error.original);
    responseCreator(
      401,
      'failed to update project infromation',
      res,
      false,
      ''
    );
  }
};

const responseCreator = (statusCode, message, res, success, data) => {
  return res.status(statusCode).json({
    success: success,
    msg: message,
    data: data,
  });
};
