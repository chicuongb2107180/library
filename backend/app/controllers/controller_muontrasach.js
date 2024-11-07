const TheoDoiMuonSach = require('../model/model_muontrasach');

// Lấy tất cả bản ghi theo dõi mượn sách
exports.getAll = async (req, res) => {
        try {
                const records = await TheoDoiMuonSach.find();
                res.status(200).json(records);
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};

// Lấy bản ghi theo khóa chính tổng hợp
exports.getByKey = async (req, res) => {
        try {
                const { msdg, masach, ngaymuon } = req.params;
                const record = await TheoDoiMuonSach.findOne({ msdg, masach, ngaymuon });
                if (!record) return res.status(404).json({ message: 'Không tìm thấy bản ghi' });
                res.status(200).json(record);
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};

// Tạo bản ghi mới
exports.create = async (req, res) => {
        const record = new TheoDoiMuonSach({
                ...req.body,
                trangthai: req.body.trangthai || 'damuon'  // Thiết lập trạng thái mặc định là 'damuon'
        });
        try {
                const newRecord = await record.save();
                res.status(201).json(newRecord);
        } catch (error) {
                res.status(400).json({ message: error.message });
        }
};


// Cập nhật bản ghi
exports.update = async (req, res) => {
        const { msdg, masach, ngaymuon } = req.params;
        try {
                const updatedRecord = await TheoDoiMuonSach.findOneAndUpdate(
                        { msdg, masach, ngaymuon },
                        req.body,
                        { new: true }
                );
                if (!updatedRecord) return res.status(404).json({ message: 'Không tìm thấy bản ghi' });
                res.status(200).json(updatedRecord);
        } catch (error) {
                res.status(400).json({ message: error.message });
        }
};

exports.getByStatus = async (req, res) => {
        const { trangthai } = req.params;
        try {
                const records = await TheoDoiMuonSach.find({ trangthai });
                res.status(200).json(records);
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};


// Xóa bản ghi
exports.delete = async (req, res) => {
        const { msdg, masach, ngaymuon } = req.params;
        try {
                const deletedRecord = await TheoDoiMuonSach.findOneAndDelete({ msdg, masach, ngaymuon });
                if (!deletedRecord) return res.status(404).json({ message: 'Không tìm thấy bản ghi' });
                res.status(200).json({ message: 'Bản ghi đã bị xóa' });
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};
