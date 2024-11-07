const NhanVien = require('../model/model_nhanvien');
const Account = require('../model/model_account');
const bcrypt = require('bcrypt');
const generateMsnv = async () => {
        const latestNhanVien = await NhanVien.findOne().sort({ msnv: -1 });
        let newId = "N0000001";
        if (latestNhanVien && latestNhanVien.msnv) {
                const currentIdNum = parseInt(latestNhanVien.msnv.slice(1), 10);
                newId = `N${String(currentIdNum + 1).padStart(7, "0")}`;
        }
        return newId;
};


exports.create = async (req, res) => {
        try {
                const newMsnv = await generateMsnv();
                const nhanvien = new NhanVien({ ...req.body, msnv: newMsnv });
                const newNhanVien = await nhanvien.save();
                res.status(201).json(newNhanVien);
        } catch (error) {
                res.status(400).json({ message: error.message });
        }
};

exports.create = async (req, res) => {
        try {
                const { hoten, chucvu, diachi, sodienthoai } = req.body;
                const newMsnv = await generateMsnv();
                const username = newMsnv;
                const password = "password123"; // Mật khẩu mặc định

                // Lưu thông tin nhân viên vào database
                const newNhanVien = new NhanVien({ msnv: newMsnv, hoten,chucvu, diachi, sodienthoai });
                await newNhanVien.save();

                // Hash mật khẩu và lưu thông tin tài khoản vào database
                const hashedPassword = await bcrypt.hash(password, 10);
                const newAccount = new Account({
                        username,
                        password: hashedPassword,
                        role: "nhanvien",
                        needsPasswordChange: true  // Đánh dấu cần thay đổi mật khẩu khi đăng nhập lần đầu
                });
                await newAccount.save();

                res.status(201).json({ message: "NhanVien and Account created successfully", msnv: newMsnv, username, password });
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};

exports.getAll = async (req, res) => {
        try {
                const nhanviens = await NhanVien.find();
                res.send(nhanviens);
        } catch (error) {
                res.status(500).send({ message: error.message });
        }
};


exports.findOne = async (req, res) => {
        try {
                const nhanvien = await NhanVien.findOne({ msnv: req.params.msnv });
                if (!nhanvien) {
                        return res.status(404).send({ message: "Employee not found" });
                }
                res.send(nhanvien);
        } catch (error) {
                res.status(500).send({ message: error.message });
        }
};



exports.update = async (req, res) => {
        try {
                const updatedNhanVien = await NhanVien.findOneAndUpdate(
                        { msnv: req.params.msnv },
                        req.body,
                        { new: true }
                );
                if (!updatedNhanVien) {
                        return res.status(404).send({ message: "Employee not found" });
                }
                res.send(updatedNhanVien);
        } catch (error) {
                res.status(500).send({ message: error.message });
        }
};



exports.delete = async (req, res) => {
        try {
                const deletedNhanVien = await NhanVien.findOneAndDelete({ msnv: req.params.msnv });
                if (!deletedNhanVien) {
                        return res.status(404).send({ message: "Employee not found" });
                }
                res.send({ message: "Employee deleted successfully" });
        } catch (error) {
                res.status(500).send({ message: error.message });
        }
};



exports.deleteAll = async (req, res) => {
        try {
                await NhanVien.deleteMany();
                res.send({ message: "All employees deleted successfully" });
        } catch (error) {
                res.status(500).send({ message: error.message });
        }
};
