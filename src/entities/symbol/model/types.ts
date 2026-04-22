export interface Stock {
    ticker: string;
    description: string;
    displaySymbol: string;
}

export type PriceTrend = 'up' | 'down' | 'neutral';

export interface StockPrice {
    ticker: string;
    price: number;
    timestamp: number;
    trend: PriceTrend;
}
