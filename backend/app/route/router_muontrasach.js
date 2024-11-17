const express = require('express');
const tdmsController = require('../controllers/controller_muontrasach');

const router = express.Router();

router.route('/')
        .get(tdmsController.getAll)
        .post(tdmsController.reserveBook);

router.route('/:msdg/:masach/:ngaymuon')
        .get(tdmsController.getByKey)
        .put(tdmsController.update)
        .delete(tdmsController.delete);
router.route('/:msdg/:masach/:ngaymuon/borrow')
        .put(tdmsController.borrowBook);

router.route('/:msdg/:masach/:ngaymuon/borrow')
        .put(tdmsController.borrowBook);

router.route('/:msdg/:masach/:ngaymuon/return')
        .put(tdmsController.returnBook);
module.exports = router;
