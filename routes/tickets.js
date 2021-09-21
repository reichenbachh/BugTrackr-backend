const express = require("express");

const router = express.Router();
const {
  createTicket,
  updateTicket,
  deleteTicket,
  getTicket,
} = require("../controllers/ticket");
router.post("/createTicket", createTicket);
router.get("/getTicket", getTicket);
router.patch("/updateTicket", updateTicket);
router.delete("/deleteTicket", deleteTicket);

module.exports = router;
