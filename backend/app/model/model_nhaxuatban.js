const mongoose = require('mongoose');

const NhaXuatBanSchema = new mongoose.Schema({
        manxb: {
                type: String,
                required: true,
                unique: true
        },
        tennxb: {
                type: String,
                required: true
        },
        diachi: {
                type: String,
                required: true
        }
});

module.exports = mongoose.model('NhaXuatBan', NhaXuatBanSchema);
