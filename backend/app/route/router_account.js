const express = require('express');
const router = express.Router();
const accountController = require('../controllers/controller_account');

router.post('/register', accountController.register);


router.post('/login', accountController.login);


router.put('/change-password/:id', accountController.changePassword);


router.get('/:id', accountController.getAccountInfo)
        .delete('/:id', accountController.deleteAccount);

module.exports = router;
