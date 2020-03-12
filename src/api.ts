import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
  responseType: "json",
  headers: {
    "Content-Type": "application/json"
  }
});

interface IQuote {
  title: string;
  writer: string;
  quote: string;
}

export const quoteApi = {
  getQuotes: () => api.get("quotes"),
  getQuote: (id: string) => api.get(`quotes/${id}`),
  createQuote: (newQuote: IQuote) => api.post("quotes", newQuote),
  deleteQuote: (id: string) => api.delete(`quotes/${id}`)
};
