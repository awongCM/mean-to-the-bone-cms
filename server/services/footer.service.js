const Footer = require('../models/footer');

const _this = this;

exports.getFooter = async function(id) {
  
  try {
    const footer = await Footer.findById(id);
    return footer;
  } catch (error) {
    throw Error('Error when fetcing footer by id: ');
  }
}

exports.createFooter = async function(footer) {

  const newFooter = new Footer({
    title: footer.title,
    content: footer.content
  });

  try {
    const savedFooter = await newFooter.save();
    return savedFooter;
  } catch (error) {
    throw Error('Error when saving Footer');
  }
}

exports.deleteFooter = async function(id) {

  try {
    const deletedFooter = await Footer.remove({_id: id});
    if (deletedFooter.result.n === 0) {
      throw Error("Footer could not be deleted");
    }
    return deletedFooter;

  } catch (error) {
    throw Error('Error when deleting Footer');
  }
}

exports.updateFooter = async function(footer) {
  const current_id = footer.id;

  try {
    const currentFooter = await Footer.findById(current_id);
  } catch (error) {
    throw Error('Error when finding Page');
  }

  if (!currentFooter) {
    return false;
  }

  console.log(currentFooter);

  currentFooter.title = footer.title;
  currentFooter.content = footer.content;

  console.log(currentFooter);

  try {
    const savedFooter = await currentFooter.save();
    return savedFooter;
  } catch (error) {
    throw Error('Error when updating page');
  }

}
