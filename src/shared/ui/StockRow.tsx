import type { Stock } from "../../entities/symbol"

const StockRow = ({ stocks }: { stocks: Stock[] }) => {
    return (
        <section className="border rounded">
            {stocks.map(stock => (
                <div key={stock.ticker} className="flex justify-between p-2 border-b">
                    <div>
                        <div className="font-bold">{stock.displaySymbol}</div>
                        <div className="text-sm text-gray-500">{stock.description}</div>
                    </div>
                    <div className="text-lg font-mono">--</div>
                </div>
            ))}
        </section>
    )
}

export default StockRow