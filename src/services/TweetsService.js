import ApiService from "./ApiService";

class TweetsService {
  async get(cursorId = null) {
    const count = 50;
    const query = cursorId
      ? `/api?count=${count}&afterId=${cursorId}`
      : `/api?count=${count}`;
    const { data } = await ApiService.get(query);
    return data;
  }

  async reset() {
    const endpoint = `/reset`;
    const { data } = await ApiService.get(endpoint);
    return data;
  }
}

export default new TweetsService();
