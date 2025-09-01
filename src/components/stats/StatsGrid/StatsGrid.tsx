import { StatCard } from "../StatCard/StatCard";
import { useCoinStore } from "@/store/useCoinStore";

const formatNum = (n?: number | null, d = 2) =>
    n == null ? "—" : Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: d }).format(n);

export function StatsGrid() {
    const price = useCoinStore(state => state.price);
    const marketCap = useCoinStore(state => state.marketCap);
    const volume24h = useCoinStore(state => state.volume24h);
    const fdv = useCoinStore(state => state.fdv);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <StatCard title="Price" value={`$${formatNum(price, 6)}`} hint="GeckoTerminal" />
            <StatCard title="Volume (24h)" value={`$${formatNum(volume24h)}`} hint="GeckoTerminal" />
            <StatCard title="Market Cap" value={`$${formatNum(marketCap)}`} hint="GeckoTerminal" />
            <StatCard title="FDV" value={`$${formatNum(fdv)}`} hint="GeckoTerminal" />
        </div>
    );
}


