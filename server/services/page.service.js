const Page = require("../models/page");

exports.getPages = async function() {
  return Page.find().sort({ created_at: -1 });
};

exports.getPage = async function(id) {
  return Page.findById(id);
};

exports.createPage = async function(page) {
  const newPage = new Page({
    title: page.title,
    content: page.content
  });
  return newPage.save();
};

exports.deletePage = async function(id) {
  const deletedPage = await Page.remove({ _id: id });
  if (deletedPage.result.n === 0) {
    throw new Error("Page could not be deleted");
  }
  return deletedPage;
};

exports.updatePage = async function(page) {
  const currentPage = await Page.findById(page.id);
  if (!currentPage) {
    return false;
  }

  if (page.title !== undefined) {
    currentPage.title = page.title;
  }
  if (page.content !== undefined) {
    currentPage.content = page.content;
  }

  return currentPage.save();
};
