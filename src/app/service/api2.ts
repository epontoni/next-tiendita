import { Product } from "../types/product";

const URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQkQSguG_PHTOsnIAVnqznUgfzwea1Cs3FxLA8TgBf3nj2gusMrOcFrBuZJEzRCR-4AUvM738RN2j74/pub?output=csv";

const api2 = {
        list: async (): Promise<Product[]> => {
            return fetch(URL)
                    .then((response) => response.text())
                    .then((text) => {
                        return text
                                .split('\n')
                                .slice(1)
                                .map((row) => {
                                    const [id, title, category, description, price] = row.split(',');
                                    return {
                                        id,
                                        title,
                                        category,
                                        description,
                                        price: Number(price)
                                    } as Product;
                                })
                    })

        },
}

export default api2;