import { HOSTS } from "../config/hosts";
import { KEYS } from "../config/key";

let socket: WebSocket | null = null;
const pendingMessages: object[] = [];

export const createFinnhubWsClient = () => {
    if (!socket || socket.readyState === WebSocket.CLOSED) {
        socket = new WebSocket(`${HOSTS.ws.finnhub}?token=${KEYS.finnhub}`);
        socket.addEventListener('open', () => {
            for (const msg of pendingMessages.splice(0)) {
                socket!.send(JSON.stringify(msg));
            }
        });
    }
    const ws = socket;
    return {
        send(message: object): void {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(message));
            } else {
                pendingMessages.push(message);
            }
        },
        onMessage(handler: (event: MessageEvent) => void): () => void {
            ws.addEventListener('message', handler);
            return () => ws.removeEventListener('message', handler);
        },
        close(): void {
            ws.close();
            socket = null;
        }
    };
};
