const Account = require('../model/model_account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Đăng ký tài khoản
exports.register = async (req, res) => {
        try {
                const { username, password, role } = req.body;

                // Kiểm tra xem tài khoản đã tồn tại chưa
                const existingAccount = await Account.findOne({ username });
                if (existingAccount) {
                        return res.status(400).send({ message: "Account already exists." });
                }

                // Tạo tài khoản mới
                const account = new Account({ username, password, role });
                const savedAccount = await account.save();
                res.status(201).send(savedAccount);
        } catch (error) {
                res.status(500).send({ message: error.message });
        }
};

// Đăng nhập
exports.login = async (req, res) => {
        try {
                const { username, password } = req.body;

                // Kiểm tra tài khoản có tồn tại
                const account = await Account.findOne({ username });
                if (!account) {
                        return res.status(404).send({ message: "Account not found." });
                }

                // Kiểm tra mật khẩu
                const isMatch = await bcrypt.compare(password, account.password);
                if (!isMatch) {
                        return res.status(400).send({ message: "Invalid password." });
                }

                // Kiểm tra yêu cầu đổi mật khẩu
                if (account.needsPasswordChange) {
                        return res.status(403).send({ message: "Password change required." });
                }

                // Tạo token JWT
                const token = jwt.sign({ id: account._id, role: account.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.send({ message: "Login successful", token });
        } catch (error) {
                res.status(500).send({ message: error.message });
        }
};

// Đổi mật khẩu
exports.changePassword = async (req, res) => {
        try {
                const { id } = req.params;
                const { newPassword } = req.body;

                // Kiểm tra tài khoản có tồn tại
                const account = await Account.findById(id);
                if (!account) {
                        return res.status(404).send({ message: "Account not found." });
                }

                // Mã hóa và cập nhật mật khẩu mới
                account.password = newPassword;
                account.needsPasswordChange = false; // Đã đổi mật khẩu, không cần đổi lần sau
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

                const account = await Account.findById(id).select('-password'); // Loại bỏ mật khẩu khi trả về
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
