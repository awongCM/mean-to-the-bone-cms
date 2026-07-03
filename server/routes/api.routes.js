const express = require("express"),
  router = express.Router();

//Setting up API routes
const users = require("./api/user.routes");
const pages = require("./api/page.routes");
const headers = require("./api/header.routes");
const footers = require("./api/footer.routes");
const pepper = require("./api/pepper.routes");

router.use("/users", users);
router.use("/pages", pages);
router.use("/headers", headers);
router.use("/footers", footers);
router.use("/pepper", pepper);

router.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to CMS-to-the-bone MEAN stack API service" });
});

module.exports = router;
