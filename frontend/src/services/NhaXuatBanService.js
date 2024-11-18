import createApiClient from "./api_service";

class nhaxuatbanService {
        constructor(baseUrl = "/api/library/nxbs") {
                this.api = createApiClient(baseUrl);
        }

        // Lấy tất cả nhà xuất bản
        async getNhaXuatBan() {
                return (await this.api.get("/")).data;
        }

        // Lấy nhà xuất bản theo ID
        async getNhaXuatBanById(id) {
                return (await this.api.get(`/${id}`)).data;
        }

        // Tạo mới nhà xuất bản
        async createNhaXuatBan(data) {
                return (await this.api.post("/", data)).data;
        }

        // Cập nhật nhà xuất bản
        async updateNhaXuatBan(id, data) {
                return (await this.api.put(`/${id}`, data)).data;
        }

        // Xóa nhà xuất bản
        async deleteNhaXuatBan(id) {
                return (await this.api.delete(`/${id}`)).data;
        }
}

export default new nhaxuatbanService();
