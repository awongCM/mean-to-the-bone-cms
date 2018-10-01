const HeaderService = require("../services/header.service");

const _this = this;

exports.getHeaders = async function(req, res, next) {
  try {
    const header = await HeaderService.getHeaders();

    return res
      .status(200)
      .json({ data: header, message: "Successfully fetched header" });
  } catch (error) {
    return res.status(400).json({ message: e.message });
  }
};

exports.getHeader = async function(req, res, next) {
  try {
    const header_id = req.query.id;

    const header = await HeaderService.getHeader(header_id);

    return res
      .status(200)
      .json({ data: header, message: "Successfully fetched header" });
  } catch (error) {
    return res.status(400).json({ message: e.message });
  }
};

exports.createHeader = async function(req, res, next) {
  const newHeader = {
    title: req.body.title,
    content: req.body.content
  };

  try {
    const createdHeader = await HeaderService.createHeader(newHeader);
    return res
      .status(200)
      .json({ data: createdHeader, message: "Successfully saved Header" });
  } catch (error) {
    return res.status(400).json({ message: e.message });
  }
};

exports.removeHeader = async function(req, res, next) {
  const id = req.params.id;

  try {
    const deletedHeader = await HeaderService.deleteHeader(id);
    return res.status(200).json({ message: "Successfully deleted Header" });
  } catch (error) {
    return res.status(400).json({ message: e.message });
  }
};

exports.updateHeader = async function(req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ message: "Id must be present" });
  }

  const id = req.body._id;

  console.log(req.body);

  const Header = {
    id,
    title: req.body.title ? req.body.title : null,
    content: req.body.content ? req.body.content : null
  };

  try {
    const updatedHeader = await HeaderService.updateHeader(Header);
    return res
      .status(200)
      .json({ data: updatedHeader, message: "Successfully Updated Header" });
  } catch (error) {
    return res.status(400).json({ message: e.message });
  }
};
