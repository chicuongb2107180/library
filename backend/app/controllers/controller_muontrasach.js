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


exports.create = async (req, res) => {
        const record = new TheoDoiMuonSach({
                ...req.body,
                trangthai: req.body.trangthai || 'damuon'
        });
        try {   
                if (record.trangthai === 'damuon') {
                        const book = await Sach.findById(record.masach);
                        if (book.soquyen <= 0) {
                                return res.status(400).json({ message: 'Sách không còn trong kho' });
                        }
                        book.soquyen -= 1;
                        await book.save();
                }
                if (record.trangthai === 'dadat') {
                        const book = await Sach.findById(record.masach);
                        if (book.soquyen <= 0) {
                                return res.status(400).json({ message: 'Sách không còn trong kho' });
                        }
                        book.soquyen -= 1;
                        await book.save();
                }
                const newRecord = await record.save();
                res.status(201).json(newRecord);
        } catch (error) {
                res.status(400).json({ message: error.message });
        }
};


// Cập nhật bản ghi
exports.update = async (req, res) => {
        const { id } = req.params;
        try {
                const updatedRecord = await TheoDoiMuonSach.findOneAndUpdate({ _id: id
                }, req.body, { new: true });
                if(req.body.trangthai === 'damuon'){
                        const book = await Sach.findById(req.body.masach);
                        book.soquyen -= 1;
                        await book.save();
                }
                if(req.body.trangthai === 'datra'){
                        const book = await Sach.findById(req.body.masach);
                        book.soquyen += 1;
                        await book.save();
                }
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
        const {id} = req.params;
        try {
                const record = await TheoDoiMuonSach.findByIdAndDelete(id);
                if (!record) return res.status(404).json({ message: 'Không tìm thấy bản ghi' });
                if(record.trangthai === 'damuon'){
                        const book = await Sach.findById(record.masach);
                        book.soquyen += 1;
                        await book.save();
                }
                if(record.trangthai === 'dadat'){
                        const book = await Sach.findById(record.masach);
                        book.soquyen += 1;
                        await book.save();
                }
                res.status(200).json({ message: 'Bản ghi đã được xóa' });
        
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
                book.soquyen -= 1;

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


