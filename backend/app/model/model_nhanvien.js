const mongoose = require('mongoose');

const NhanVienSchema = new mongoose.Schema({
        msnv: {
                type: String,
                required: true,
                unique: true,
        },
        hoten: {
                type: String,
                required: true
        },
        diachi: {
                type: String
        },
        chucvu: {
                type: String
        },
        sodienthoai: {
                type: String,
                match: /^(03|05|07|08|09)\d{8}$/, // Ràng buộc số điện thoại Việt Nam hợp lệ
                validate: {
                        validator: function (v) {
                                return /^(03|05|07|08|09)\d{8}$/.test(v);
                        },
                        message: props => `${props.value} is not a valid phone number! Phone number must start with '03', '05', '07', '08', or '09' followed by 8 digits.`
                }
        }
});

const NhanVien = mongoose.model('NhanVien', NhanVienSchema);
module.exports = NhanVien;
