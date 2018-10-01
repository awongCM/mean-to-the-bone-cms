const FooterService = require("../services/footer.service");

const _this = this;

exports.getFooters = async function(req, res, next) {
  try {
    const footer = await FooterService.getFooters();

    return res
      .status(200)
      .json({ data: footer, message: "Successfully fetched Footers" });
  } catch (error) {
    return res.status(400).json({ message: e.message });
  }
};

exports.getFooter = async function(req, res, next) {
  try {
    const footer_id = req.query.id;

    const footer = await FooterService.getFooter(footer_id);

    return res
      .status(200)
      .json({ data: footer, message: "Successfully fetched Footer" });
  } catch (error) {
    return res.status(400).json({ message: e.message });
  }
};

exports.createFooter = async function(req, res, next) {
  const newFooter = {
    title: req.body.title,
    content: req.body.content
  };

  try {
    const createdFooter = await FooterService.createFooter(newFooter);
    return res
      .status(200)
      .json({ data: createdFooter, message: "Successfully saved Footer" });
  } catch (error) {
    return res.status(400).json({ message: e.message });
  }
};

exports.removeFooter = async function(req, res, next) {
  const id = req.params.id;

  try {
    const deletedFooter = await FooterService.deleteFooter(id);
    return res.status(200).json({ message: "Successfully deleted Footer" });
  } catch (error) {
    return res.status(400).json({ message: e.message });
  }
};

exports.updateFooter = async function(req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ message: "Id must be present" });
  }

  const id = req.body._id;

  console.log(req.body);

  const footer = {
    id,
    title: req.body.title ? req.body.title : null,
    content: req.body.content ? req.body.content : null
  };

  try {
    const updatedFooter = await FooterService.updateFooter(footer);
    return res
      .status(200)
      .json({ data: updatedFooter, message: "Successfully Updated Footer" });
  } catch (error) {
    return res.status(400).json({ message: e.message });
  }
};
