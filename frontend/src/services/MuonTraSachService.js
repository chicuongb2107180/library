import createApiClient from "./api_service";

class muontrasachService {
        constructor(baseUrl = "/api/library/mts") {
                this.api = createApiClient(baseUrl);
        }


        async get() {
                return (await this.api.get("/")).data;
        }


        async getMuonTraSachById(id) {
                return (await this.api.get(`/${id}`)).data;
        }


        async createMuonTraSach(data) {
                return (await this.api.post("/", data)).data;
        }

        async updateMuonTraSach(id, data) {
                return (await this.api.put(`/${id}`, data)).data;
        }

        
        async deleteMuonTraSach(id) {
                return (await this.api.delete(`/${id}`)).data;
        }
}

export default new muontrasachService();
