import { useSymbolStore } from '../../../entities/symbol'
import { StockRow } from '../../../shared/ui'

const Watchlist = () => {
    const stocks = useSymbolStore(s => s.stocks)
    const prices = useSymbolStore(s => s.prices)

    return (
        <section className="border rounded divide-y">
            {stocks.map(stock => {
                const price = prices[stock.ticker]
                return (
                    <StockRow
                        key={stock.ticker}
                        ticker={stock.ticker}
                        displaySymbol={stock.displaySymbol}
                        description={stock.description}
                        price={price?.price}
                        trend={price?.trend}
                    />
                )
            })}
        </section>
    )
}

export default Watchlist
