const Header = require('../models/header');

const _this = this;

exports.getHeader = async function(id) {
  
  try {
    const header = await Header.findById(id);
    return header;
  } catch (error) {
    throw Error('Error when fetcing Header by id: ');
  }
}

exports.createHeader = async function(header) {

  const newHeader = new Header({
    title: header.title,
    content: header.content
  });

  try {
    const savedHeader = await newHeader.save();
    return savedHeader;
  } catch (error) {
    throw Error('Error when saving Header');
  }
}

exports.deleteHeader = async function(id) {

  try {
    const deletedHeader = await Header.remove({_id: id});
    if (deletedHeader.result.n === 0) {
      throw Error("Header could not be deleted");
    }
    return deletedHeader;

  } catch (error) {
    throw Error('Error when deleting Header');
  }
}

exports.updateHeader = async function(header) {
  const current_id = header.id;

  try {
    const currentHeader = await newHeader.findById(current_id);
  } catch (error) {
    throw Error('Error when finding Header');
  }

  if (!currentHeader) {
    return false;
  }

  console.log(currentHeader);

  currentHeader.title = header.title;
  currentHeader.content = header.content;

  console.log(currentHeader);

  try {
    const savedHeader = await currentHeader.save();
    return savedHeader;
  } catch (error) {
    throw Error('Error when updating Header');
  }

}
