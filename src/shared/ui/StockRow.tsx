type PriceTrend = 'up' | 'down' | 'neutral'

interface StockRowProps {
    ticker: string
    displaySymbol: string
    description: string
    price?: number
    trend?: PriceTrend
}

const trendClass: Record<PriceTrend, string> = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-400',
}

const StockRow = ({ ticker, displaySymbol, description, price, trend = 'neutral' }: StockRowProps) => (
    <div key={ticker} className="flex justify-between items-center p-2 border-b">
        <div>
            <div className="font-bold">{displaySymbol}</div>
            <div className="text-sm text-gray-500">{description}</div>
        </div>
        <div className={`text-lg font-mono ${trendClass[trend]}`}>
            {price !== undefined ? price.toFixed(2) : '--'}
        </div>
    </div>
)

export default StockRow
