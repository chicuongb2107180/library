import createApiClient from "./api_service";

class nhanvienService {
        constructor(baseUrl = "/api/library/nhanvien") {
                this.api = createApiClient(baseUrl);
        }

        
        async getNhanVien() {
                return (await this.api.get("/")).data;
        }

        
        async getNhanVienById(id) {
                return (await this.api.get(`/${id}`)).data;
        }

        
        async createNhanVien(data) {
                return (await this.api.post("/", data)).data;
        }

        async updateNhanVien(id, data) {
                return (await this.api.put(`/${id}`, data)).data;
        }

        
        async deleteNhanVien(id) {
                return (await this.api.delete(`/${id}`)).data;
        }
        
}

export default new nhanvienService();
