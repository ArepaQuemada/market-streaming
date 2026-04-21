import { createFinnhubWsClient } from "../lib/finnhub-ws";

export const createQuoteWsClient = () => {
   return createFinnhubWsClient(); 
}