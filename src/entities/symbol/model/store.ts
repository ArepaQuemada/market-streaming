import { create } from 'zustand';
import { getStockSymbol } from '../../../shared/api/stock-symbol';
import type { Stock, StockPrice, PriceTrend } from './types';
import { TICKERS } from './tickers';

interface SymbolState {
    stocks: Stock[];
    isLoading: boolean;
    loadStocks: () => Promise<void>;
    prices: Record<string, StockPrice>;
    updatePrice: (ticker: string, price: number, timestamp: number) => void;
}

const getTrend = (prev: StockPrice | undefined, next: number): PriceTrend => {
    if (!prev) return 'neutral';
    if (next > prev.price) return 'up';
    if (next < prev.price) return 'down';
    return 'neutral';
};

export const useSymbolStore = create<SymbolState>((set, get) => ({
    stocks: [],
    isLoading: false,
    loadStocks: async () => {
        if (get().stocks.length > 0) return;
        set({ isLoading: true });
        try {
            const tickerSet = new Set<string>(TICKERS);
            const all = await getStockSymbol();
            const stocks: Stock[] = all
                .filter(s => tickerSet.has(s.symbol))
                .map(s => ({ ticker: s.symbol, displaySymbol: s.displaySymbol, description: s.description }));
            set({ stocks, isLoading: false });
        } catch (err) {
            if (import.meta.env.DEV) console.error('[loadStocks]', err);
            set({ isLoading: false });
        }
    },
    prices: {},
    updatePrice: (ticker, price, timestamp) => {
        const prev = get().prices[ticker];
        set(state => ({
            prices: {
                ...state.prices,
                [ticker]: { ticker, price, timestamp, trend: getTrend(prev, price) },
            },
        }));
    },
}));
