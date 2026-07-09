const FooterService = require("../services/footer.service");

exports.getFooters = async function(req, res, next) {
  try {
    const footers = await FooterService.getFooters();
    return res
      .status(200)
      .json({ data: footers, message: "Successfully fetched footers" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getFooter = async function(req, res, next) {
  try {
    const footer = await FooterService.getFooter(req.params.id);
    return res
      .status(200)
      .json({ data: footer, message: "Successfully fetched footer" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.createFooter = async function(req, res, next) {
  try {
    const createdFooter = await FooterService.createFooter({
      title: req.body.title,
      content: req.body.content
    });
    return res
      .status(200)
      .json({ data: createdFooter, message: "Successfully created footer" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.removeFooter = async function(req, res, next) {
  try {
    await FooterService.deleteFooter(req.params.id);
    return res.status(200).json({ message: "Successfully deleted footer" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.updateFooter = async function(req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ message: "Id must be present" });
  }

  try {
    const updatedFooter = await FooterService.updateFooter({
      id: req.body._id,
      title: req.body.title,
      content: req.body.content
    });
    return res
      .status(200)
      .json({ data: updatedFooter, message: "Successfully updated footer" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
