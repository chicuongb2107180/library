const express = require('express');
const tdmsController = require('../controllers/controller_muontrasach');

const router = express.Router();

router.route('/')
        .get(tdmsController.getAll)
        .post(tdmsController.create);

router.route('/:id')
        .get(tdmsController.getByKey)
        .put(tdmsController.update)
        .delete(tdmsController.delete);

router.route('/reverse/')
        .get(tdmsController.reserveBook);

module.exports = router;
