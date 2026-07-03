const PageService = require("../services/page.service");
const PepperService = require("../services/pepper.service");

const _this = this;

exports.getPages = async function(req, res, next) {
  try {
    const pages = await PageService.getPages();

    return res
      .status(200)
      .json({ data: pages, message: "Successfully fetched Page" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getPage = async function(req, res, next) {
  try {
    const page_id = req.params.id;

    const page = await PageService.getPage(page_id);

    return res
      .status(200)
      .json({ data: page, message: "Successfully fetched Page" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.createPage = async function(req, res, next) {
  const newPage = {
    title: req.body.title,
    content: req.body.content
  };

  try {
    const createdPage = await PageService.createPage(newPage);
    PepperService.notifyPagePublished(createdPage, "published").catch((err) => {
      console.error("[Pepper] publish notification failed:", err.message);
    });
    return res
      .status(200)
      .json({ data: createdPage, message: "Successfully created Page" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.removePage = async function(req, res, next) {
  const id = req.params.id;

  try {
    const deletedPage = await PageService.deletePage(id);
    return res.status(200).json({ message: "Successfully deleted Page" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.updatePage = async function(req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({ message: "Id must be present" });
  }

  const id = req.body._id;

  console.log(req.body);

  const page = {
    id,
    title: req.body.title ? req.body.title : null,
    content: req.body.content ? req.body.content : null
  };

  try {
    const updatedPage = await PageService.updatePage(page);
    if (updatedPage) {
      PepperService.notifyPagePublished(updatedPage, "updated").catch((err) => {
        console.error("[Pepper] update notification failed:", err.message);
      });
    }
    return res
      .status(200)
      .json({ data: updatedPage, message: "Successfully Updated Page" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
