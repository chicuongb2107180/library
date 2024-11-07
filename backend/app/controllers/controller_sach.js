const Sach = require('../model/model_sach');


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
        const sach = new Sach(req.body);
        try {
                const newSach = await sach.save();
                res.status(201).json(newSach);
        } catch (error) {
                res.status(400).json({ message: error.message });
        }
};

exports.update = async (req, res) => {
        try {
                const updatedSach = await Sach.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!updatedSach) return res.status(404).json({ message: 'Sách không tìm thấy' });
                res.status(200).json(updatedSach);
        } catch (error) {
                res.status(400).json({ message: error.message });
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
