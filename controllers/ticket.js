const TicketService = require("../services/TicketService")

const ticketService = new TicketService()

exports.createTicket = async (req, res) => {
  try {
    const serviceValue = await ticketService.createTicket(req.body, req.query)

    res.status(200).json(serviceValue)
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: "unable to create ticket",
    })
  }
}

exports.updateTicket = async (req, res) => {
  try {
    const serviceValue = await ticketService.updateTicket(
      req.body,
      req.query.id
    )

    res.status(200).json(serviceValue)
  } catch (error) {
    console.log(error)
    res.status(401).json({
      success: false,
      msg: "unable to update ticket",
    })
  }
}

exports.deleteTicket = async (req, res) => {
  try {
    const serviceValue = await ticketService.deleteTicket(req.query.id)

    res.status(200).json(serviceValue)
  } catch (error) {
    console.log(error.original || error)
    res.status(404).json({
      success: false,
      msg: "unable to delete ticket",
    })
  }
}
