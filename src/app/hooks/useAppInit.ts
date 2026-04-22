import { useEffect } from 'react'
import { useSymbolStore, TICKERS } from '../../entities/symbol'
import { subscribeToQuote } from '../../shared/api'

export const useAppInit = () => {
  useEffect(() => {
    const { loadStocks, updatePrice } = useSymbolStore.getState()

    loadStocks()

    const unsubscribers = TICKERS.map(ticker =>
      subscribeToQuote(ticker, trades => {
        for (const t of trades) updatePrice(t.s, t.p, t.t)
      })
    )

    return () => unsubscribers.forEach(unsub => unsub())
  }, [])
}
