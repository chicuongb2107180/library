const mongoose = require('mongoose');

const SachSchema = new mongoose.Schema({
        masach: {
                type: String,
                required: true,
                unique: true
        },
        tensach: {
                type: String,
                required: true
        },
        dongia: {
                type: Number,
                required: true,
                min: [0, 'Đơn giá phải lớn hơn hoặc bằng 0']
        },
        soquyen: {
                type: Number,
                required: true,
                min: [0, 'Số quyển phải lớn hơn hoặc bằng 0']
        },
        namxuatban: {
                type: Number,
                required: true,
                validate: {
                        validator: function (v) {
                                return Number.isInteger(v) && v > 0;
                        },
                        message: props => `${props.value} không phải là năm xuất bản hợp lệ!`
                }
        },
        manxb: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'NhaXuatBan',
                required: true
        }
});

module.exports = mongoose.model('Sach', SachSchema);
