import createApiClient from "./api_service";

class nhaxuatbanService {
        constructor(baseUrl = "/api/library/nxbs") {
                this.api = createApiClient(baseUrl);
        }

        
        async getNhaXuatBan() {
                return (await this.api.get("/")).data;
        }


        async getNhaXuatBanById(id) {
                return (await this.api.get(`/${id}`)).data;
        }

        
        async createNhaXuatBan(data) {
                return (await this.api.post("/", data)).data;
        }

        
        async updateNhaXuatBan(id, data) {
                return (await this.api.put(`/${id}`, data)).data;
        }

        // Xóa nhà xuất bản
        async deleteNhaXuatBan(id) {
                return (await this.api.delete(`/${id}`)).data;
        }
}

export default new nhaxuatbanService();
