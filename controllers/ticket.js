const ticketModel = require('../models').Ticket;

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

    const { userId, projectId } = req.params;

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

    responseCreator(200, 'ticket created', res, true, newTicket.dataValues);
  } catch (error) {
    responseCreator(401, 'unable to create ticket', res, false, '');
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
