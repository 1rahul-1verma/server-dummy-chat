const express = require("express"),
  chatRoutes = express.Router();

const { ChatController } = require("../controller/ChatController");
const chatController = new ChatController();

chatRoutes.use(express.json());

chatRoutes.get("/", (req, res) => {
  chatController
    .getChats()
    .then((data) => {
      res.end(JSON.stringify(data));
    })
    .catch((err) => res.end(err.toString()));
});

chatRoutes.get("/id", (req, res) => {
  const chatId = req.query.chatId;
  chatController
    .getChatById(chatId)
    .then((data) => {
      res.end(JSON.stringify(data));
    })
    .catch((err) => res.end(err.toString()));
});

chatRoutes.get("/page", (req, res) => {
  const chatId = req.query.chatId;
  const lastMessage = req.query.lastMessage;
  chatController
    .getChatsByPage(chatId, lastMessage)
    .then((data) => {
      res.end(JSON.stringify(data));
    })
    .catch((err) => res.end(err.toString()));
});

chatRoutes.get("/chatAfter", (req, res) => {
  const chatId = req.query.chatId;
  const lastMessage = req.query.lastMessage;
  chatController
    .getChatsAfter(chatId, lastMessage)
    .then((data) => {
      res.end(JSON.stringify(data));
    })
    .catch((err) => res.end(err.toString()));
});

chatRoutes.post("/id", (req, res) => {
  const payload = req.body;
  chatController.addNewMessageInChat(payload)
    .then((data) => {
      res.end(JSON.stringify(data));
    })
    .catch((err) => res.end(err.toString()));
});

chatRoutes.post("/new", (req, res) => {
  const payload = req.body;
  chatController.addNewChatRoom(payload)
    .then((data) => {
      res.end(JSON.stringify(data));
    })
    .catch((err) => res.end(err.toString()));
});

chatRoutes.post("/newUser", (req, res) => {
  const payload = req.body;
  chatController.addNewMember(payload)
    .then((data) => {
      res.end(JSON.stringify(data));
    })
    .catch((err) => res.end(err.toString()));
});

module.exports = { chatRoutes };
