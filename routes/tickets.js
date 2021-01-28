const express = require("express");

const router = express.Router();
const {
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticket");
router.post("/createTicket", createTicket);
router.patch("/updateTicket", updateTicket);
router.delete("/deleteTicket", deleteTicket);

module.exports = router;
