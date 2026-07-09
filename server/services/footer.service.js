const Footer = require("../models/footer");

exports.getFooters = async function() {
  return Footer.find().sort({ created_at: -1 });
};

exports.getFooter = async function(id) {
  return Footer.findById(id);
};

exports.createFooter = async function(footer) {
  const newFooter = new Footer({
    title: footer.title,
    content: footer.content
  });
  return newFooter.save();
};

exports.deleteFooter = async function(id) {
  const deletedFooter = await Footer.remove({ _id: id });
  if (deletedFooter.result.n === 0) {
    throw new Error("Footer could not be deleted");
  }
  return deletedFooter;
};

exports.updateFooter = async function(footer) {
  const currentFooter = await Footer.findById(footer.id);
  if (!currentFooter) {
    return false;
  }

  if (footer.title !== undefined) {
    currentFooter.title = footer.title;
  }
  if (footer.content !== undefined) {
    currentFooter.content = footer.content;
  }

  return currentFooter.save();
};
