const NhaXuatBan = require('../model/model_nhaxuatban');

// Tự động sinh mã nhà xuất bản mới
const generateManxb = async () => {
        const latestNXB = await NhaXuatBan.findOne().sort({ manxb: -1 });
        let newId = "NXB0001"; // Khởi tạo mã số đầu tiên nếu chưa có mã nào
        if (latestNXB && latestNXB.manxb) {
                const currentIdNum = parseInt(latestNXB.manxb.slice(3), 10); // Lấy phần số
                newId = `NXB${String(currentIdNum + 1).padStart(4, "0")}`; // Tăng dần và nối tiền tố "NXB"
        }
        return newId;
};

// Lấy tất cả nhà xuất bản
exports.getAll = async (req, res) => {
        try {
                const nxbs = await NhaXuatBan.find();
                res.status(200).json(nxbs);
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};

// Lấy nhà xuất bản theo ID
exports.getById = async (req, res) => {
        try {
                const nxb = await NhaXuatBan.findById(req.params.id);
                if (!nxb) return res.status(404).json({ message: 'Nhà xuất bản không tìm thấy' });
                res.status(200).json(nxb);
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};

// Tạo nhà xuất bản mới
exports.create = async (req, res) => {
        try {
                const newManxb = await generateManxb(); // Gọi hàm để sinh mã nhà xuất bản mới
                const nxb = new NhaXuatBan({ ...req.body, manxb: newManxb }); // Tạo nhà xuất bản với mã sinh tự động
                const newNXB = await nxb.save();
                res.status(201).json(newNXB);
        } catch (error) {
                res.status(400).json({ message: error.message });
        }
};

// Cập nhật nhà xuất bản
exports.update = async (req, res) => {
        try {
                const updatedNXB = await NhaXuatBan.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!updatedNXB) return res.status(404).json({ message: 'Nhà xuất bản không tìm thấy' });
                res.status(200).json(updatedNXB);
        } catch (error) {
                res.status(400).json({ message: error.message });
        }
};

// Xóa nhà xuất bản
exports.delete = async (req, res) => {
        try {
                const deletedNXB = await NhaXuatBan.findByIdAndDelete(req.params.id);
                if (!deletedNXB) return res.status(404).json({ message: 'Nhà xuất bản không tìm thấy' });
                res.status(200).json({ message: 'Nhà xuất bản đã bị xóa' });
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};
