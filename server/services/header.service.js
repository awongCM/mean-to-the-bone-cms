const Header = require("../models/header");

exports.getHeaders = async function() {
  return Header.find().sort({ created_at: -1 });
};

exports.getHeader = async function(id) {
  return Header.findById(id);
};

exports.createHeader = async function(header) {
  const newHeader = new Header({
    title: header.title,
    content: header.content
  });
  return newHeader.save();
};

exports.deleteHeader = async function(id) {
  const deletedHeader = await Header.remove({ _id: id });
  if (deletedHeader.result.n === 0) {
    throw new Error("Header could not be deleted");
  }
  return deletedHeader;
};

exports.updateHeader = async function(header) {
  const currentHeader = await Header.findById(header.id);
  if (!currentHeader) {
    return false;
  }

  if (header.title !== undefined) {
    currentHeader.title = header.title;
  }
  if (header.content !== undefined) {
    currentHeader.content = header.content;
  }

  return currentHeader.save();
};
