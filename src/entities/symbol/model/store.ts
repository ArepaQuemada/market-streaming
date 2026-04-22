import { create } from 'zustand';
import type { StockPrice, PriceTrend } from './types';

interface SymbolState {
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
