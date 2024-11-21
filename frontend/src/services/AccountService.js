
import createApiClient from "./api_service";

class accountService {
        constructor(baseUrl = "/api/library/auth") {
                this.api = createApiClient(baseUrl);
        }

        
        async register(data) {
                return (await this.api.post("/register", data)).data;
        }

        async login(data) {
                return (await this.api.post("/login", data)).data;
        }

        async getAccountInfo(id) {
                return (await this.api.get(`/${id}`)).data;
        }

        
        async changePassword(id, newPassword) {
                console.log(id, newPassword);
                return (await this.api.put(`/change-password/${id}`, { newPassword })).data;
        }

        
        async deleteAccount(id) {
                return (await this.api.delete(`/${id}`)).data;
        }
}

export default new accountService();
