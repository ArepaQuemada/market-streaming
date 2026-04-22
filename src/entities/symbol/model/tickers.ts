export const TICKERS = [
    'AAPL', 'MSFT', 'NVDA', 'GOOGL', 'AMZN',
    'META', 'TSLA', 'AVGO', 'ORCL', 'AMD',
    'NFLX', 'QCOM', 'INTC', 'ADBE', 'CSCO',
    'TXN',  'AMAT', 'PANW', 'ASML', 'KLAC',
] as const;

export type Ticker = typeof TICKERS[number];
