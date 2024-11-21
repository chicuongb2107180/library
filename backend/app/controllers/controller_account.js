const Account = require('../model/model_account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');


exports.register = async (req, res) => {
        try {
                const { username, password, role } = req.body;
                const existingAccount = await Account.findOne({ username });
                if (existingAccount) {
                        return res.status(400).send({ message: "Account already exists." });
                }

                const account = new Account({ username, password, role });
                const savedAccount = await account.save();
                res.status(201).send(savedAccount);
        } catch (error) {
                res.status(500).send({ message: error.message });
        }
};

exports.protect = async (req, res, next) => {
        try {
        if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
                return res.status(401).send({ message: 'Unauthorized' });
        }
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, config.app.secret);
        const account = await Account.findById(decoded.id);
        if(!account) {
                return res.status(404).send({ message: 'Account not found' });
        }

        req.account = account;
        next();
        } catch (error) {
                res.status(500).send({ message: error.message });
        }
}

exports.restrictTo = (...roles) => {
        return (req, res, next) => {
                if(!roles.includes(req.account.role)) {
                        return res.status(403).send({ message: 'Forbidden' });
                }
                next();
        }
}

exports.login = async (req, res) => {
        try {
                const { username, password } = req.body;
                console.log(username, password);
                const account = await Account.findOne({ username });
                console.log(account);
                if (!account) {
                        return res.status(404).send({ message: "Account not found." });
                }

                const isMatch = await bcrypt.compare(password, account.password);
                if (!isMatch) {
                        return res.status(400).send({ message: "Invalid password." });
                }

                
                if (account.needsPasswordChange) {
                        return res.status(200).send({ message:"Password change required", id: account._id });
                }

                
                const token = jwt.sign({ id: account._id, role: account.role,username:username }, config.app.secret, { expiresIn: '1h' });
                res.send({ message: "Login successful", token, role: account.role, username: username, id: account._id });
        } catch (error) {
                res.status(500).send({ message: error.message });
        }
};

// Đổi mật khẩu
exports.changePassword = async (req, res) => {
        try {   
                console.log(req.params._id);
                const { id } = req.params;
                const { newPassword } = req.body;

                // Kiểm tra tài khoản có tồn tại
                const account = await Account.findById(id);
                if (!account) {
                        return res.status(404).send({ message: "Account not found." });
                }

                account.password = newPassword;
                account.needsPasswordChange = false; 
                await account.save();

                res.send({ message: "Password changed successfully." });
        } catch (error) {
                res.status(500).send({ message: error.message });
        }
};

// Xem thông tin tài khoản
exports.getAccountInfo = async (req, res) => {
        try {
                const { id } = req.params;

                const account = await Account.findById(id).select('-password');
                if (!account) {
                        return res.status(404).send({ message: "Account not found." });
                }

                res.send(account);
        } catch (error) {
                res.status(500).send({ message: error.message });
        }
};

// Xóa tài khoản
exports.deleteAccount = async (req, res) => {
        try {
                const { id } = req.params;

                const deletedAccount = await Account.findByIdAndDelete(id);
                if (!deletedAccount) {
                        return res.status(404).send({ message: "Account not found." });
                }

                res.send({ message: "Account deleted successfully." });
        } catch (error) {
                res.status(500).send({ message: error.message });
        }
};
