import { KEYS } from "../config/key";

export async function finnhubRest<T>(url: string): Promise<T> {
    const urlWithToken = new URL(url);
    urlWithToken.searchParams.set('token', KEYS.finnhub);

    return fetch(urlWithToken.toString()).then(response => {
        if (!response.ok) {
            throw new Error(`Finnhub API request failed: ${response.status} ${response.statusText}`);
        }
        return response.json() as Promise<T>;
    });
};