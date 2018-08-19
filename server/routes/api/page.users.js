const express = require("express"),
  router = express.Router();

const UserController = require("../../controllers/user.controller");

router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUser);
router.post("/", UserController.insertUser);
router.put("/", UserController.updateUser);
router.delete("/:id", UserController.removeUser);

module.exports = router;
