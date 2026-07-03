const HeaderService = require("../services/header.service");

exports.getHeaders = async function(req, res, next) {
  try {
    const headers = await HeaderService.getHeaders();
    return res
      .status(200)
      .json({ data: headers, message: "Successfully fetched headers" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getHeader = async function(req, res, next) {
  try {
    const header = await HeaderService.getHeader(req.params.id);
    return res
      .status(200)
      .json({ data: header, message: "Successfully fetched header" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.createHeader = async function(req, res, next) {
  try {
    const createdHeader = await HeaderService.createHeader({
      title: req.body.title,
      content: req.body.content
    });
    return res
      .status(200)
      .json({ data: createdHeader, message: "Successfully created header" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.removeHeader = async function(req, res, next) {
  try {
    await HeaderService.deleteHeader(req.params.id);
    return res.status(200).json({ message: "Successfully deleted header" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.updateHeader = async function(req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ message: "Id must be present" });
  }

  try {
    const updatedHeader = await HeaderService.updateHeader({
      id: req.body._id,
      title: req.body.title,
      content: req.body.content
    });
    return res
      .status(200)
      .json({ data: updatedHeader, message: "Successfully updated header" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
