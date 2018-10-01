const express = require("express"),
  router = express.Router();

const HeaderController = require("../../controllers/header.controller");

router.get("/:id", HeaderController.getHeader);
router.get("/", HeaderController.getHeaders);
router.post("/", HeaderController.createHeader);
router.put("/", HeaderController.updateHeader);
router.delete("/:id", HeaderController.removeHeader);

module.exports = router;
