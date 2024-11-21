import createApiClient from "./api_service";

class SachService {
        constructor(baseUrl = "/api/library/sach") {
                this.api = createApiClient(baseUrl);
        }

        async getAll() {
                return (await this.api.get("/")).data;
        }

        async getById(id) {
                return (await this.api.get(`/${id}`)).data;
        }

        async create(data) {
                return (await this.api.post("/", data)).data;
        }

        async update(id, data) {
                return (await this.api.put(`/${id}`, data)).data;
        }

        async delete(id) {
                return (await this.api.delete(`/${id}`)).data;
        }

        async getMasach(masach) {
                return (await this.api.get(`/masach/${masach}`)).data;
        }
}

export default new SachService();
