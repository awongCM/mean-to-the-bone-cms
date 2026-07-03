const express = require("express");
const router = express.Router();

const SmsController = require("../../controllers/sms.controller");

router.get("/status", SmsController.getStatus);
router.get("/subscribers", SmsController.getSubscribers);
router.get("/history", SmsController.getHistory);
router.post("/subscribe", SmsController.subscribe);
router.post("/unsubscribe", SmsController.unsubscribe);
router.post("/test", SmsController.sendTest);

module.exports = router;
