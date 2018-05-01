const express = require('express'),
      router = express.Router();

const FooterController = require('../../controllers/footer.controller');

router.get('/', FooterController.getFooter);
router.post('/', FooterController.createFooter);
router.put('/', FooterController.updateFooter);
router.delete('/:id', FooterController.removeFooter);

module.exports = router;