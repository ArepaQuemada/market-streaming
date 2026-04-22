export interface FinnhubTrade {
    s: string;   // symbol
    p: number;   // price
    t: number;   // timestamp (ms)
    v: number;   // volume
    c: string[] | null;
}

export interface FinnhubTradeMessage {
    type: 'trade';
    data: FinnhubTrade[];
}

export interface FinnhubPingMessage {
    type: 'ping';
}

export type FinnhubMessage = FinnhubTradeMessage | FinnhubPingMessage;
