const express = require("express");
const router = express.Router();

const PepperController = require("../../controllers/pepper.controller");

router.get("/status", PepperController.getStatus);
router.get("/subscribers", PepperController.getSubscribers);
router.get("/history", PepperController.getHistory);
router.post("/subscribe", PepperController.subscribe);
router.post("/unsubscribe", PepperController.unsubscribe);
router.post("/test", PepperController.sendTest);

module.exports = router;
