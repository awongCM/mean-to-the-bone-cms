const Page = require("../models/page");

const _this = this;

exports.getPages = async function() {
  try {
    const pages = await Page.find();
    return pages;
  } catch (error) {
    throw Error("Error when fetcing Pages ");
  }
};

exports.getPage = async function(id) {
  try {
    const page = await Page.findById(id);
    return page;
  } catch (error) {
    throw Error("Error when fetcing Page by id: ");
  }
};

exports.createPage = async function(page) {
  const newPage = new Page({
    title: page.title,
    content: page.content
  });

  try {
    const savedPage = await newPage.save();
    return savedPage;
  } catch (error) {
    throw Error("Error when saving Page");
  }
};

exports.deletePage = async function(id) {
  try {
    const deletedPage = await Page.remove({ _id: id });
    if (deletedPage.result.n === 0) {
      throw Error("Page could not be deleted");
    }
    return deletedPage;
  } catch (error) {
    throw Error("Error when deleting Page");
  }
};

exports.updatePage = async function(page) {
  const current_id = page.id;

  try {
    const currentPage = await newPage.findById(current_id);
  } catch (error) {
    throw Error("Error when finding Page");
  }

  if (!currentPage) {
    return false;
  }

  console.log(currentPage);

  currentPage.title = page.title;
  currentPage.content = page.content;

  console.log(currentPage);

  try {
    const savedPage = await currentPage.save();
    return savedPage;
  } catch (error) {
    throw Error("Error when updating page");
  }
};
