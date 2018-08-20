const express = require("express"),
  router = express.Router();

const PageController = require("../../controllers/page.controller");

router.get("/", PageController.getPages);
router.get("/:id", PageController.getPage);
router.post("/", PageController.createPage);
router.put("/", PageController.updatePage);
router.delete("/:id", PageController.removePage);

module.exports = router;
