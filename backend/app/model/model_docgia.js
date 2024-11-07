const mongoose = require('mongoose');

const DocGiaSchema = new mongoose.Schema({
        msdg: {
                type: String,
                required: true,
                unique: true,
        },
        holot: {
                type: String,
                required: true,
                trim: true
        },
        ten: {
                type: String,
                required: true,
                trim: true
        },
        ngaysinh: {
                type: Date,
                required: true,
                validate: {
                        validator: function (v) {
                                return v instanceof Date && v < new Date();
                        },
                        message: props => `${props.value} is not a valid date of birth! Date of birth must be a valid date before today.`
                }
        },
        diachi: {
                type: String,
                trim: true
        },
        sodienthoai: {
                type: String,
                match: /^(03|05|07|08|09)\d{8}$/,
                validate: {
                        validator: function (v) {
                                return /^(03|05|07|08|09)\d{8}$/.test(v);
                        },
                        message: props => `${props.value} is not a valid phone number! Phone number must start with '03', '05', '07', '08', or '09' followed by 8 digits.`
                }
        }
});

const DocGia = mongoose.model('DocGia', DocGiaSchema);
module.exports = DocGia;
