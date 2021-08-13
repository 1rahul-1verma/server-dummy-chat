const express = require("express"),
  userRoutes = express.Router();

const { UserController } = require("../controller/UserController.js");
const userController = new UserController();

userRoutes.use(express.json());

userRoutes.get("/", (req, res) => {
  userController
    .getUsers()
    .then((data) => {
      res.end(JSON.stringify(data));
    })
    .catch((err) => res.end(err.toString()));
});

userRoutes.get("/id", (req, res) => {
  const userId = req.query.userId;
  userController
    .getUserById(userId)
    .then((data) => {
      res.end(JSON.stringify(data));
    })
    .catch((err) => res.end(err.toString()));
});

userRoutes.post("/", (req, res) => {
  const payload = req.body;
  userController
    .addUserChat(payload)
    .then((data) => {
      res.end(JSON.stringify(data));
    })
    .catch((err) => res.end(err.toString()));
});

module.exports = { userRoutes };
