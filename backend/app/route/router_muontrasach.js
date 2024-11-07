const express = require('express');
const tdmsController = require('../controllers/controller_muontrasach');

const router = express.Router();

router.route('/')
        .get(tdmsController.getAll)
        .post(tdmsController.create);

router.route('/:msdg/:masach/:ngaymuon')
        .get(tdmsController.getByKey)
        .put(tdmsController.update)
        .delete(tdmsController.delete);

module.exports = router;
