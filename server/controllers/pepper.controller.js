const PepperService = require("../services/pepper.service");

exports.getStatus = function(req, res) {
  return res.status(200).json({
    data: PepperService.getStatus(),
    message: "Pepper status fetched"
  });
};

exports.getSubscribers = async function(req, res) {
  try {
    const subscribers = await PepperService.getSubscribers();
    return res.status(200).json({
      data: subscribers,
      message: "Successfully fetched subscribers"
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.subscribe = async function(req, res) {
  if (!req.body.phone) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  try {
    const subscriber = await PepperService.subscribe({
      name: req.body.name,
      phone: req.body.phone
    });
    return res.status(200).json({
      data: subscriber,
      message: "Successfully subscribed to Pepper SMS alerts"
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.unsubscribe = async function(req, res) {
  if (!req.body.phone) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  try {
    const subscriber = await PepperService.unsubscribe(req.body.phone);
    return res.status(200).json({
      data: subscriber,
      message: "Successfully unsubscribed from Pepper SMS alerts"
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getHistory = async function(req, res) {
  try {
    const history = await PepperService.getHistory();
    return res.status(200).json({
      data: history,
      message: "Successfully fetched notification history"
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.sendTest = async function(req, res) {
  if (!req.body.phone) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  try {
    const notification = await PepperService.sendTest({
      phone: req.body.phone,
      message: req.body.message
    });
    return res.status(200).json({
      data: notification,
      message: "Test SMS sent"
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
