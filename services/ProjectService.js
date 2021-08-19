const projectModel = require("../models").Project;
const teamModel = require("../models").Team;
const userModel = require("../models").User;
const ticketModel = require("../models").Ticket;
const sendEmail = require("../utils/emailTransport");

class ProjectService {
  async createProject(dataObject, id) {
    try {
      const { projectName, projectDesc, projectStage } = dataObject;

      const newProjectStage = projectStage.split(/(?=[A-Z])/).join("-");
      console.log(projectStage, newProjectStage);
      const newProject = await projectModel.create({
        projectName,
        projectDesc,
        projectStage: newProjectStage,
      });
      //use join tabel to assign the creator of the project as a project lead
      await teamModel.create({
        userId: id,
        projectId: newProject.dataValues.id,
        role: "Project Lead",
      });

      return {
        success: true,
        msg: "Project created",
      };
    } catch (error) {
      console.log(error.original);
      return {
        success: false,
        msg: "Error creating project",
      };
    }
  }

  async getProjects(dataObject) {
    try {
      const { userID } = dataObject;

      const allProjects = await userModel.findAll({
        where: {
          id: userID,
        },
        include: [{ model: projectModel, as: "team" }],
      });

      if (allProjects === undefined) {
        return {
          success: true,
          data: [],
        };
      }
      console.log(allProjects[0].team.length);
      return {
        success: true,
        data: allProjects[0].team,
      };
    } catch (error) {
      console.log(error.original);
      return {
        success: false,
        msg: "project",
      };
    }
  }

  async addUserToProject(dataObject, queryObject) {
    try {
      const { userId, projectId } = queryObject;
      const { role, email, projectName } = dataObject;

      console.log(email);

      //create association between user and project
      await teamModel.create({
        userId,
        projectId,
        role,
      });
      await sendEmail(email, projectName, role);
      return {
        success: true,
        msg: "user added to project",
      };
    } catch (error) {
      console.log(error);
    }
  }

  async fetchProjectDetails(id) {
    try {
      const project = await projectModel.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: userModel,
            as: "users",
            attributes: ["id", "email"],
          },
          {
            model: ticketModel,
            as: "tickets",
          },
        ],
      });

      if (project === null) {
        return {
          success: false,
          msg: "This project doesnt exist",
        };
      }
      return {
        success: true,
        msg: "",
        data: project.dataValues,
      };
    } catch (error) {
      console.log(error.original);
    }
  }

  async deleteProject(id) {
    try {
      await projectModel.destroy({
        where: {
          id: id,
        },
      });
      return {
        success: false,
        msg: "project deleted",
      };
    } catch (error) {
      console.log(error.original);
    }
  }

  async updateProject(dataObject, id) {
    try {
      const { projectName, projectDesc, projectStage } = dataObject;
      const updatedProject = await projectModel.update(
        {
          projectName,
          projectDesc,
          projectStage,
        },
        {
          where: {
            id: id,
          },
        }
      );
      console.log(updatedProject);
      if (updatedProject === null) {
        return {
          success: false,
          msg: "project doesnt exist",
        };
      }
      return {
        success: true,
        msg: "project updated",
      };
    } catch (error) {
      console.log(error);
    }
  }

  async removeUserFromProject(projectID, userID) {
    try {
      const deleted = await teamModel.destroy({
        where: {
          projectId: projectID,
          userId: userID,
        },
      });

      console.log(deleted);

      return {
        success: false,
        msg: "user removed from project",
      };
    } catch (error) {
      console.log(error.original);
    }
  }
}

module.exports = ProjectService;
