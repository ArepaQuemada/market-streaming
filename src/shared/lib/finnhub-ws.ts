import { HOSTS } from "../config/hosts";
import { KEYS } from "../config/key";
import type { FinnhubMessage, FinnhubTrade } from "../api/finnhub.types";

let socket: WebSocket | null = null;

export const createFinnhubWsClient = () => {
    if (!socket || socket.readyState === WebSocket.CLOSED) {
        socket = new WebSocket(`${HOSTS.ws.finnhub}?token=${KEYS.finnhub}`);
    }
    const ws = socket;
    return {
        subscribe(symbol: string, onMessage: (trades: FinnhubTrade[]) => void): () => void {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: 'subscribe', symbol }));
            } else {
                ws.addEventListener('open', () => {
                    ws.send(JSON.stringify({ type: 'subscribe', symbol }));
                }, { once: true });
            }
            const messageHandler = (event: MessageEvent) => {
                const msg: FinnhubMessage = JSON.parse(event.data);
                if (msg.type !== 'trade') return;
                const trades = msg.data.filter(trade => trade.s === symbol);
                if (trades.length > 0) onMessage(trades);
            };
            ws.addEventListener('message', messageHandler);
            return () => ws.removeEventListener('message', messageHandler);
        },
        close(): void {
            ws.close();
            socket = null;
        }
    }
}



