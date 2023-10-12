import axios from "../api/";

class CurrencyService {
  async getAllCurrencies(name?: string, value?: number) {
    try {
      const response = await axios.get(
        `/currencies?name=${name}&value=${value}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async getAllCurrencyConversions(sort?: string, order?: string) {
    try {
      const response = await axios.get(
        `/currencies/conversions?sort=${sort}&order=${order}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new CurrencyService();
