import {StatsGrid} from "@/components/stats/StatsGrid/StatsGrid.tsx";
import {PriceAreaCard, VolumeLineCard} from "@/components/stats/ChartCard/ChartCard.tsx";

export default function GraphsPage() {
    return (
        <div className="w-full">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-5">
                <StatsGrid />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    <PriceAreaCard />
                    <VolumeLineCard />
                </div>
            </div>
        </div>
    );
}
