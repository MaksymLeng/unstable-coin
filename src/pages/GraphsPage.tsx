import {StatsGrid} from "@/components/stats/StatsGrid/StatsGrid.tsx";
import {PriceAreaCard, VolumeLineCard} from "@/components/stats/ChartCard/ChartCard.tsx";

export default function GraphsPage() {
    return (
        <div className="flex justify-center">
            <div className="space-y-6 m-10">
                <StatsGrid />
                <div className="grid gap-4 md:grid-cols-2">
                    <PriceAreaCard />
                    <VolumeLineCard />
                </div>
            </div>
        </div>

    )
}
