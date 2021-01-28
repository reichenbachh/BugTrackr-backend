const ticketModel = require("../models").Ticket;

exports.createTicket = async (req, res) => {
  try {
    const {
      ticketTitle,
      ticketDesc,
      assignedDev,
      submittedDev,
      ticketPriority,
      ticketStatus,
      ticketType,
    } = req.body;

    const { userId, projectId } = req.query;

    const newTicket = await ticketModel.create({
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

    responseCreator(200, "ticket created", res, true);
  } catch (error) {
    console.log(error.original);
    responseCreator(401, "unable to create ticket", res, false, "");
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const {
      ticketTitle,
      ticketDesc,
      assignedDev,
      submittedDev,
      ticketPriority,
      ticketStatus,
      ticketType,
    } = req.body;

    const updatedTicketData = await ticketModel.update(
      {
        ticketTitle,
        ticketDesc,
        assignedDev,
        submittedDev,
        ticketPriority,
        ticketStatus,
        ticketType,
      },
      {
        where: {
          id: req.query.ticketId,
        },
      }
    );
    console.log(updatedTicketData);
    responseCreator(200, "Ticket info updated", res, true, "");
  } catch (error) {
    console.log(error);
    responseCreator(401, "unable to update ticket data", res, false, "");
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    await ticketModel.destroy({
      where: {
        id: req.query.ticketId,
      },
    });
    responseCreator(200, "Ticket deleted", res, true, "");
  } catch (error) {
    console.log(error.original || error);
    responseCreator(401, "unable to delete", res, false, "");
  }
};

//helper functions
const responseCreator = (statusCode, message, res, success, data) => {
  return res.status(statusCode).json({
    success: success,
    msg: message,
    data: data,
  });
};
