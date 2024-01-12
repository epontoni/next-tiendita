import axios from "axios";
import Papa from "papaparse";
import { Product } from "../types/product";

const URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQkQSguG_PHTOsnIAVnqznUgfzwea1Cs3FxLA8TgBf3nj2gusMrOcFrBuZJEzRCR-4AUvM738RN2j74/pub?output=csv";
export const api = {
  list: async (): Promise<Product[]> => {
    return axios
      .get(URL, {
        responseType: "blob",
      })
      .then((response) => {
        return new Promise<Product[]>((resolve, reject) => {
          Papa.parse(response.data, {
            header: true,
            complete: (results) => {
              const products = results.data as Product[];
              resolve(
                products.map((product) => ({
                  ...product,
                  price: Number(product.price),
                }))
              );
            },
            error: (error) => {
              reject(error);
            },
          });
        })
      });
  },
};

export default api;
