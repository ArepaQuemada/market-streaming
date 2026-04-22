import { createFinnhubWsClient } from "../lib/finnhub-ws";
import type { FinnhubMessage, FinnhubTrade } from "../lib/finnhub-ws.types";

export const subscribeToQuote = (
    symbol: string,
    onTrade: (trades: FinnhubTrade[]) => void
): () => void => {
    const ws = createFinnhubWsClient();

    ws.send({ type: 'subscribe', symbol });

    const unsubscribeListener = ws.onMessage((event: MessageEvent) => {
        const msg: FinnhubMessage = JSON.parse(event.data);
        if (msg.type !== 'trade') return;
        const trades = msg.data.filter(trade => trade.s === symbol);
        if (trades.length > 0) onTrade(trades);
    });

    return () => {
        unsubscribeListener();
        ws.send({ type: 'unsubscribe', symbol });
    };
};
