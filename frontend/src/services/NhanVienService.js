import createApiClient from "./api_service";

class nhanvienService {
        constructor(baseUrl = "/api/library/nhanvien") {
                this.api = createApiClient(baseUrl);
        }

        // Lấy tất cả nhà xuất bản
        async getNhanVien() {
                return (await this.api.get("/")).data;
        }

        // Lấy nhà xuất bản theo ID
        async getNhanVienById(id) {
                return (await this.api.get(`/${id}`)).data;
        }

        // Tạo mới nhà xuất bản
        async createNhanVien(data) {
                return (await this.api.post("/", data)).data;
        }

        // Cập nhật nhà xuất bản
        async updateNhanVien(id, data) {
                return (await this.api.put(`/${id}`, data)).data;
        }

        // Xóa nhà xuất bản
        async deleteNhanVien(id) {
                return (await this.api.delete(`/${id}`)).data;
        }
}

export default new nhanvienService();
