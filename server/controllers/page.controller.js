const PageService = require("../services/page.service");

exports.getPages = async function(req, res, next) {
  try {
    const pages = await PageService.getPages();
    return res
      .status(200)
      .json({ data: pages, message: "Successfully fetched pages" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getPage = async function(req, res, next) {
  try {
    const page = await PageService.getPage(req.params.id);
    return res
      .status(200)
      .json({ data: page, message: "Successfully fetched page" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.createPage = async function(req, res, next) {
  try {
    const createdPage = await PageService.createPage({
      title: req.body.title,
      content: req.body.content
    });
    return res
      .status(200)
      .json({ data: createdPage, message: "Successfully created page" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.removePage = async function(req, res, next) {
  try {
    await PageService.deletePage(req.params.id);
    return res.status(200).json({ message: "Successfully deleted page" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.updatePage = async function(req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ message: "Id must be present" });
  }

  try {
    const updatedPage = await PageService.updatePage({
      id: req.body._id,
      title: req.body.title,
      content: req.body.content
    });
    return res
      .status(200)
      .json({ data: updatedPage, message: "Successfully updated page" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
