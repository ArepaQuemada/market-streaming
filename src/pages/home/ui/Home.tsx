import { useSymbolStore } from "../../../entities/symbol";
import StockRow from "../../../shared/ui/StockRow";

const Home = () => {
    const { stocks } = useSymbolStore()
    return (
        <section>
            <StockRow stocks={stocks} />
        </section>

    )
}

export default Home;