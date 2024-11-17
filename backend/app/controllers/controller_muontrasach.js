const TheoDoiMuonSach = require('../model/model_muontrasach');
const Sach = require('../model/model_sach');

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
exports.reserveBook = async (req, res) => {
        const { msdg, masach } = req.body;

        try {
                const book = await Sach.findById(masach);
                if (!book || book.soquyen <= 0) {
                        return res.status(400).json({ message: 'Sách không còn trong kho' });
                }

                const record = new TheoDoiMuonSach({
                        msdg,
                        masach,
                        trangthai: 'dadat'
                });
                await record.save();

                res.status(201).json({ message: 'Đặt sách thành công', record });
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};


exports.borrowBook = async (req, res) => {
        const { msdg, masach, ngaymuon } = req.params;

        try {
                const record = await TheoDoiMuonSach.findOneAndUpdate(
                        { msdg, masach, ngaymuon, trangthai: 'dadat' },
                        { trangthai: 'damuon' },
                        { new: true }
                );

                if (!record) {
                        return res.status(404).json({ message: 'Không tìm thấy bản ghi hoặc trạng thái không hợp lệ' });
                }

                const book = await Sach.findById(masach);
                if (book.soquyen <= 0) {
                        return res.status(400).json({ message: 'Sách không đủ để mượn' });
                }

                book.soquyen -= 1;
                await book.save();

                res.status(200).json({ message: 'Đã chuyển trạng thái thành "đã mượn"', record });
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};


exports.returnBook = async (req, res) => {
        const { msdg, masach, ngaymuon } = req.params;

        try {
                const record = await TheoDoiMuonSach.findOneAndUpdate(
                        { msdg, masach, ngaymuon, trangthai: 'damuon' },
                        { trangthai: 'datra', ngaytra: new Date() },
                        { new: true }
                );

                if (!record) {
                        return res.status(404).json({ message: 'Không tìm thấy bản ghi hoặc trạng thái không hợp lệ' });
                }

                const book = await Sach.findById(masach);
                book.soquyen += 1;
                await book.save();

                res.status(200).json({ message: 'Đã chuyển trạng thái thành "đã trả"', record });
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};
exports.borrowBook = async (req, res) => {
        const { msdg, masach, ngaymuon } = req.params;

        try {
                const record = await TheoDoiMuonSach.findOneAndUpdate(
                        { msdg, masach, ngaymuon, trangthai: 'dadat' },
                        { trangthai: 'damuon' },
                        { new: true }
                );

                if (!record) {
                        return res.status(404).json({ message: 'Không tìm thấy bản ghi hoặc trạng thái không hợp lệ' });
                }

                const book = await Sach.findById(masach);
                if (book.soquyen <= 0) {
                        return res.status(400).json({ message: 'Sách không đủ để mượn' });
                }

                book.soquyen -= 1;
                await book.save();

                res.status(200).json({ message: 'Đã chuyển trạng thái thành "đã mượn"', record });
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};
exports.cancelReservation = async (req, res) => {
        const { msdg, masach, ngaymuon } = req.params;

        try {
                // Tìm bản ghi mượn sách với trạng thái "đã đặt" và hủy nó
                const record = await TheoDoiMuonSach.findOneAndDelete({
                        msdg,
                        masach,
                        ngaymuon,
                        trangthai: 'dadat'  // Chỉ hủy nếu trạng thái là "đã đặt"
                });

                if (!record) {
                        return res.status(404).json({ message: 'Không tìm thấy bản ghi đặt sách để hủy' });
                }

                // Tăng số lượng sách lên 1
                const book = await Sach.findById(masach);
                if (book) {
                        book.soquyen += 1;
                        await book.save();
                }

                res.status(200).json({ message: 'Đơn đặt đã hủy và số lượng sách đã được cập nhật', record });
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};
