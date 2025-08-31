import { StatCard } from "../StatCard/StatCard.tsx"

export function StatsGrid() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Market Cap" value="$—" hint="placeholder" />
            <StatCard title="Volume (24h)" value="$—" hint="placeholder" />
            <StatCard title="Holders" value="—" hint="placeholder" />
            <StatCard title="FDV" value="$—" hint="placeholder" />
        </div>
    )
}
