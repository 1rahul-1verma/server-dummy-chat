const express = require("express"),
router = express.Router();

const { userRoutes } = require("./userRoutes.js");
const { messageRoutes } = require("./messageRoutes.js");
const { chatRoutes } = require("./chatRoutes.js");

router.use("/user", userRoutes);
router.use("/message", messageRoutes);
router.use("/chat", chatRoutes);

const appRoutes = router;

module.exports = { appRoutes };