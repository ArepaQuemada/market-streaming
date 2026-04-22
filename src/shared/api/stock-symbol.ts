import { ENDPOINTS } from "../config/endpoints";
import { HOSTS } from "../config/hosts";
import { finnhubRest } from "../lib/finnhub-rest";

export interface StockSymbol {
    currency: string;
    description: string;
    displaySymbol: string;
    figi: string;
    mic: string;
    symbol: string;
    symbol2: string;
    type: string;
}

export const getStockSymbol = (): Promise<StockSymbol[]> => {
    return finnhubRest<StockSymbol[]>(`${HOSTS.http.finnhub}${ENDPOINTS.stockSymbol}?exchange=US&mic=XNAS`);
}