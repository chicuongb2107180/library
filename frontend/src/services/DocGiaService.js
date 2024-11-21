import createApiClient from "./api_service";

class docgiaService {
  constructor(baseUrl="/api/library/docgia") {
    this.api = createApiClient(baseUrl);
  }

  async getDocGia() {
    return (await this.api.get("/")).data;
  }

  async getDocGiaById(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async createDocGia(data) {
    return (await this.api.post("/", data)).data;
  }

  async updateDocGia(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  async deleteDocGia(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  async getDocGiaByMaDocGia(maDocGia) {
    return (await this.api.get(`/msdg/${maDocGia}`)).data;
  }
}

export default new docgiaService();