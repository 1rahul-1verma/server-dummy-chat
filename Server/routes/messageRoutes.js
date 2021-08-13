const express = require("express"),
  messageRoutes = express.Router();
messageRoutes.use(express.json());

const { MessageController } = require("../controller/MessageController.js");
const messageController = new MessageController();

messageRoutes.get("/id", (req, res) => {
  const messageId = req.query.messageId;
  messageController
    .getMessage(messageId)
    .then((data) => {
      res.end(JSON.stringify(data));
    })
    .catch((err) => {
      res.end(err.toString());
    });
});

messageRoutes.post("/", (req, res) => {
  const payload = req.body;
  messageController
    .postMessage(payload)
    .then((data) => {
      res.end(JSON.stringify(data));
    })
    .catch((err) => {
      res.end(err.toString());
    });
});

module.exports = { messageRoutes };
