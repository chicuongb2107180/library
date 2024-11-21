const express = require('express');
const nxbController = require('../controllers/controller_nhaxuatban');

const router = express.Router();

router.route('/')
        .get(nxbController.getAll)
        .post(nxbController.create);

router.route('/:id')
        .get(nxbController.getById)
        .put(nxbController.update)
        .delete(nxbController.delete);

module.exports = router;
        