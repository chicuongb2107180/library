const DocGia = require('../model/model_docgia');
const Account = require('../model/model_account');
const bcrypt = require('bcrypt');

const generateMsdg = async () => {
        const latestDocGia = await DocGia.findOne().sort({ msdg: -1 });
        let newId = "D0000001"; 
        if (latestDocGia && latestDocGia.msdg) {
                const currentIdNum = parseInt(latestDocGia.msdg.slice(1), 10); 
                newId = `D${String(currentIdNum + 1).padStart(7, "0")}`;
        }
        return newId;
};


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
                const newAccount = new Account({
                        username,
                        password,
                        role: "docgia",
                        needsPasswordChange: true, 
                });
                await newAccount.save();

                res.status(201).json({ message: "DocGia and Account created successfully", msdg: newMsdg, username, password });
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};


exports.getById = async (req, res) => {
        try {
                const docgia = await DocGia.findById(req.params.id);
                if (!docgia) {
                        return res.status(404).json({ message: 'DocGia not found' });
                }
                res.status(200).json(docgia);
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};

exports.update = async (req, res) => {
        try {
                const updatedDocGia = await DocGia.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!updatedDocGia) {
                        return res.status(404).json({ message: 'DocGia not found' });
                }
                res.status(200).json(updatedDocGia);
        } catch (error) {
                res.status(400).json({ message: error.message });
        }
};


exports.delete = async (req, res) => {
        try {
                // Tìm độc giả cần xóa
                const deletedDocGia = await DocGia.findByIdAndDelete(req.params.id);
                if (!deletedDocGia) {
                        return res.status(404).json({ message: 'DocGia not found' });
                }

                // Tìm và xóa tài khoản dựa trên username (msdg)
                const deletedAccount = await Account.findOneAndDelete({ username: deletedDocGia.msdg });
                if (!deletedAccount) {
                        return res.status(404).json({ message: 'Account not found for this DocGia' });
                }

                res.status(200).json({ message: 'DocGia and related Account deleted successfully' });
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};

exports.getByMSDG = async (req, res) => {
        try {
                const docgia = await DocGia.findOne({ msdg: req.params.msdg });
                if (!docgia) {
                        return res.status(404).json({ message: 'DocGia not found' });
                }
                res.status(200).json(docgia);
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};
