const DocGia = require('../model/model_docgia');
const Account = require('../model/model_account');
const bcrypt = require('bcrypt');

const generateMsdg = async () => {
        const latestDocGia = await DocGia.findOne().sort({ msdg: -1 });
        let newId = "D0000001"; 
        if (latestDocGia && latestDocGia.msdg) {
                const currentIdNum = parseInt(latestDocGia.msdg.slice(1), 10); // Lấy phần số
                newId = `D${String(currentIdNum + 1).padStart(7, "0")}`; // Tăng dần và nối tiền tố "D"
        }
        return newId;
};

// Lấy tất cả các độc giả
exports.getAll = async (req, res) => {
        try {
                const docgia = await DocGia.find();
                res.status(200).json(docgia);
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};
exports.create = async (req, res) => {
        try {
                const { holot, ten, ngaysinh, diachi, sodienthoai } = req.body;

                newMsdg = await generateMsdg();
                const username = newMsdg;
                const password = "password123";

                const newDocGia = new DocGia({ msdg: newMsdg, holot, ten, ngaysinh, diachi, sodienthoai });
                await newDocGia.save();
                const hashedPassword = await bcrypt.hash(password, 10);
                const newAccount = new Account({
                        username,
                        password: hashedPassword,
                        role: "docgia",
                        needsPasswordChange: true, 
                });
                await newAccount.save();

                res.status(201).json({ message: "DocGia and Account created successfully", msdg: newMsdg, username, password });
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};

// Lấy độc giả theo ID
exports.getById = async (req, res) => {
        try {
                const docgia = await DocGia.findById(req.params.msdg);
                if (!docgia) {
                        return res.status(404).json({ message: 'DocGia not found' });
                }
                res.status(200).json(docgia);
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};

// Tạo độc giả mới
// exports.create = async (req, res) => {
//         try {
//                 const newMsdg = await generateMsdg();
//                 const docgia = new DocGia({ ...req.body, msdg: newMsdg });
//                 const newDocGia = await docgia.save();
//                 res.status(201).json(newDocGia);
//         } catch (error) {
//                 res.status(400).json({ message: error.message });
//         }
// };

// Cập nhật độc giả
exports.update = async (req, res) => {
        try {
                const updatedDocGia = await DocGia.findByIdAndUpdate(req.params.msdg, req.body, { new: true });
                if (!updatedDocGia) {
                        return res.status(404).json({ message: 'DocGia not found' });
                }
                res.status(200).json(updatedDocGia);
        } catch (error) {
                res.status(400).json({ message: error.message });
        }
};

// Xóa độc giả
exports.delete = async (req, res) => {
        try {
                const deletedDocGia = await DocGia.findByIdAndDelete(req.params.msdg);
                if (!deletedDocGia) {
                        return res.status(404).json({ message: 'DocGia not found' });
                }
                res.status(200).json({ message: 'DocGia deleted' });
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};
