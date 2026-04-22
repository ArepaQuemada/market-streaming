import { useEffect } from 'react'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useSymbolStore, TICKERS } from '../../entities/symbol'
import { subscribeToQuote } from '../../shared/api'

const RootLayout = () => {
  const { loadStocks, updatePrice } = useSymbolStore()

  useEffect(() => {
    loadStocks()

    const unsubscribers = TICKERS.map(ticker =>
      subscribeToQuote(ticker, trades => {
        for (const t of trades) updatePrice(t.s, t.p, t.t)
      })
    )

    return () => unsubscribers.forEach(unsub => unsub())
  }, [loadStocks, updatePrice])

  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
      </div>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  )
}

export const Route = createRootRoute({ component: RootLayout })
