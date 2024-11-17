const mongoose = require('mongoose');

const TheoDoiMuonSachSchema = new mongoose.Schema({
        msdg: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'DocGia',
                required: true
        },
        masach: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Sach',
                required: true
        },
        ngaymuon: {
                type: Date,
                required: true,
                default: Date.now
        },
        ngaytra: {
                type: Date,
                validate: {
                        validator: function (value) {
                                return value >= this.ngaymuon;
                        },
                        message: 'Ngày trả phải sau hoặc bằng ngày mượn'
                }
        },
        trangthai: {
                type: String,
                enum: ['dadat', 'damuon', 'datra'],
                default: 'dadat', // Mặc định là 'damuon' khi mới tạo
        }
});

// Thiết lập khóa chính tổng hợp cho model
TheoDoiMuonSachSchema.index({ msdg: 1, masach: 1, ngaymuon: 1 }, { unique: true });

module.exports = mongoose.model('TheoDoiMuonSach', TheoDoiMuonSachSchema);
