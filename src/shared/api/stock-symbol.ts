import { ENDPOINTS } from "../config/endpoints";
import { HOSTS } from "../config/hosts";
import { finnhubRest } from "../lib/finnhub-rest";

type Res = {
    currency: string;
    description: string;
    displaySymbol: string;
    figi: string;
    mic: string;
    symbol: string;
    symbol2: string;
    type: string;

}

export const getStockSymbol = () => {
    return finnhubRest<Res>(`${HOSTS.http.finnhub}${ENDPOINTS.stockSymbol}?exchange=US&mic=XNAS`);
}