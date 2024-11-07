const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AccountSchema = new mongoose.Schema({
        username: {
                type: String,
                required: true,
                unique: true, 
                validate: {
                        validator: function (v) {
                                return /^D\d{7}$/.test(v) || /^N\d{7}$/.test(v);
                        },
                        message: props => `${props.value} is not a valid username! Username must start with 'D' or 'N' followed by 7 digits.`
                }
        },
        password: {
                type: String,
                required: true
        },
        role: {
                type: String,
                enum: ["docgia", "nhanvien", "admin"],
                required: true
        },
        needsPasswordChange: {
                type: Boolean,
                default: function () {
                        return this.role !== "admin";
                }
        }
});


AccountSchema.pre('save', async function (next) {
        if (this.isModified('password')) {
                const salt = await bcrypt.genSalt(10);
                this.password = await bcrypt.hash(this.password, salt);
        }
        next();
});

const Account = mongoose.model('Account', AccountSchema);
module.exports = Account;
