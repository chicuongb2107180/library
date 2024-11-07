const express = require('express');
const cors = require('cors');
const ApiError = require('./app/api_error');
const app = express();
const nhanvien_Router = require('./app/route/router_nhanvien');
const docgia_Router = require('./app/route/router_docgia');
const account_Router = require('./app/route/router_account');
const nxb_Router = require('./app/route/router_nhaxuatban');
const muontra_Router = require('./app/route/router_muontrasach');
const sach_Router = require('./app/route/router_sach');

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
        res.json({ message: 'Well come to librarymanagament application' });
});
app.use("/api/library/nhanvien", nhanvien_Router);
app.use("/api/library/docgia", docgia_Router);
app.use("/api/library/auth", account_Router);
app.use("/api/library/nxbs", nxb_Router);
app.use("/api/library/tdms", muontra_Router);
app.use("/api/library/sach", sach_Router);
app.use((req, res, next) => {
        return next(new ApiError(404, 'Not found'));
});
app.use((err, req, res, next) => {
        return res.status(err.statuscode || 500).json({ message: err.message || 'Internal server error' });
});
module.exports = app;