const NhaXuatBan = require('../model/model_nhaxuatban');


const generateManxb = async () => {
        const latestNXB = await NhaXuatBan.findOne().sort({ manxb: -1 });
        let newId = "NXB0001"; 
        if (latestNXB && latestNXB.manxb) {
                const currentIdNum = parseInt(latestNXB.manxb.slice(3), 10);
                newId = `NXB${String(currentIdNum + 1).padStart(4, "0")}`; 
        }
        return newId;
};


exports.getAll = async (req, res) => {
        try {
                const nxbs = await NhaXuatBan.find();
                res.status(200).json(nxbs);
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};


exports.getById = async (req, res) => {
        try {
                const nxb = await NhaXuatBan.findById(req.params.id);
                if (!nxb) return res.status(404).json({ message: 'Nhà xuất bản không tìm thấy' });
                res.status(200).json(nxb);
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};


exports.create = async (req, res) => {
        try {
                const newManxb = await generateManxb(); 
                const nxb = new NhaXuatBan({ ...req.body, manxb: newManxb }); 
                const newNXB = await nxb.save();
                res.status(201).json(newNXB);
        } catch (error) {
                res.status(400).json({ message: error.message });
        }
};


exports.update = async (req, res) => {
        try {
                const updatedNXB = await NhaXuatBan.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!updatedNXB) return res.status(404).json({ message: 'Nhà xuất bản không tìm thấy' });
                res.status(200).json(updatedNXB);
        } catch (error) {
                res.status(400).json({ message: error.message });
        }
};


exports.delete = async (req, res) => {
        try {
                const deletedNXB = await NhaXuatBan.findByIdAndDelete(req.params.id);
                if (!deletedNXB) return res.status(404).json({ message: 'Nhà xuất bản không tìm thấy' });
                res.status(200).json({ message: 'Nhà xuất bản đã bị xóa' });
        } catch (error) {
                res.status(500).json({ message: error.message });
        }
};
