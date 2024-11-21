const Sach = require('../model/model_sach');
const NhaXuatBan = require('../model/model_nhaxuatban');
const mongoose = require('mongoose');

// Tạo mã sách tự động
const generateMasach = async () => {
        const latestSach = await Sach.findOne().sort({ masach: -1 });
        let newId = "MS0000001";
        if (latestSach && latestSach.masach) {
                const currentIdNum = parseInt(latestSach.masach.slice(2), 10);
                newId = `MS${String(currentIdNum + 1).padStart(7, "0")}`;
        }
        return newId;
};

// Lấy tất cả các sách
exports.getAll = async (req, res) => {
        try {
                const sachs = await Sach.find();
                res.status(200).json(sachs);
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};


exports.getById = async (req, res) => {
        try {
                const sach = await Sach.findById(req.params.id);
                if (!sach) return res.status(404).json({ message: 'Sách không tìm thấy' });
                res.status(200).json(sach);
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};


exports.create = async (req, res) => {
        try {
                const { tensach, dongia, soquyen, namxuatban, manxb } = req.body;
                const nxb = await NhaXuatBan.findOne({ _id: manxb });
                if (!nxb) {
                        return res.status(404).json({ message: 'Nhà xuất bản không tồn tại' });
                }
                const newMasach = await generateMasach();
                const newSach = new Sach({ masach: newMasach, tensach, dongia, soquyen, namxuatban, manxb: nxb._id });
                await newSach.save();

                res.status(201).json({ message: "Sách đã được tạo thành công", newSach });
        } catch (error) {
                res.status(500).json({ message: `Lỗi: ${error.message}` });
        }
};



exports.update = async (req, res) => {
        try {
                const { manxb } = req.body;
                if (manxb) {
                        const nxb = await NhaXuatBan.findOne({ _id: manxb });
                        if (!nxb) {
                                return res.status(404).json({ message: 'Nhà xuất bản không tồn tại' });
                        }
                }
                const updatedSach = await Sach.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!updatedSach) return res.status(404).json({ message: 'Sách không tìm thấy' });

                res.status(200).json({ message: 'Sách đã được cập nhật thành công', updatedSach });
        } catch (error) {
                res.status(400).json({ message: `Lỗi: ${error.message}` });
        }
};



exports.delete = async (req, res) => {
        try {
                const deletedSach = await Sach.findByIdAndDelete(req.params.id);
                if (!deletedSach) return res.status(404).json({ message: 'Sách không tìm thấy' });
                res.status(200).json({ message: 'Sách đã bị xóa' });
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};

exports.getByMaSach = async (req, res) => {
        try {   
                console.log(req.params.masach);
                const sach = await Sach.findOne({ masach: req.params.masach });
                if (!sach) return res.status(404).json({ message: 'Sách không tìm thấy' });
                res.status(200).json(sach);
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};

