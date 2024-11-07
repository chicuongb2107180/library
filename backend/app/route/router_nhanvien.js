const express = require('express');

const router = express.Router();
const nhanviens = require('../controllers/controller_nhanvien');

router.route('/')
        .get(nhanviens.getAll)
        .post(nhanviens.create)


router.route('/:msnv')
        .get(nhanviens.findOne)
        .put(nhanviens.update)
        .delete(nhanviens.delete);
module.exports = router;
