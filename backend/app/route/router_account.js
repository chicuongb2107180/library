const express = require('express');
const router = express.Router();
const accountController = require('../controllers/controller_account');

router.post('/register', accountController.register);

// Đăng nhập
router.post('/login', accountController.login);

// Đổi mật khẩu
router.put('/change-password/:id', accountController.changePassword);

// Xem thông tin tài khoản
router.get('/:id', accountController.getAccountInfo)
        .delete('/:id', accountController.deleteAccount);

module.exports = router;
