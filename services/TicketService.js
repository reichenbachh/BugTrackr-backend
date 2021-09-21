const ticketModel = require("../models").Ticket;

class TicketService {
  async createTicket(dataObject, queryObject) {
    try {
      const {
        ticketTitle,
        ticketDesc,
        assignedDev,
        submittedDev,
        ticketPriority,
        ticketStatus,
        ticketType,
      } = dataObject;

      const { userId, projectId } = queryObject;

      await ticketModel.create({
        ticketTitle,
        ticketDesc,
        userId,
        projectId,
        assignedDev,
        submittedDev,
        ticketPriority,
        ticketStatus,
        ticketType,
      });

      return {
        success: true,
        msg: "ticket created",
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getTicket(id) {
    try {
      const ticket = await ticketModel.findOne({
        where: {
          id,
        },
      });

      return {
        success: true,
        msg: "ticket fetched",
        data: ticket.dataValues,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async updateTicket(dataObject, id) {
    try {
      const { ticketStatus } = dataObject;

      await ticketModel.update(
        {
          ticketStatus,
        },
        {
          where: {
            id,
          },
        }
      );
      return {
        success: true,
        msg: "ticket updated",
      };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTicket(id) {
    try {
      await ticketModel.destroy({
        where: {
          id: id,
        },
      });
      return {
        success: true,
        msg: "ticket deleted",
      };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = TicketService;
