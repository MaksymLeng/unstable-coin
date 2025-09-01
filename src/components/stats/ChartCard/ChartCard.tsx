import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts";
import { useCoinStore } from "@/store/useCoinStore";

export function PriceAreaCard() {
    const chart = useCoinStore(state => state.chart);
    const loading = useCoinStore(state => state.loading);

    return (
        <Card className="rounded-2xl">
            <CardHeader><CardTitle className="text-base">Price (USD)</CardTitle></CardHeader>
            <CardContent className="h-56 sm:h-64">
                {loading ? (
                    <div className="h-full grid place-items-center text-sm text-slate-500">Loading…</div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chart} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
                            <defs>
                                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6}/>
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="time" tick={false} axisLine={false} />
                            <YAxis tick={false} axisLine={false} domain={["auto", "auto"]} />
                            <Tooltip />
                            <Area type="monotone" dataKey="close" stroke="#2563eb" fill="url(#grad)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}

export function VolumeLineCard() {
    const chart = useCoinStore(state => state.chart);
    const loading = useCoinStore(state => state.loading);

    return (
        <Card className="rounded-2xl">
            <CardHeader><CardTitle className="text-base">Volume (USD)</CardTitle></CardHeader>
            <CardContent className="h-56 sm:h-64">
                {loading ? (
                    <div className="h-full grid place-items-center text-sm text-slate-500">Loading…</div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chart} margin={{ left: 0, right: 6, top: 8, bottom: 0 }}>
                            <XAxis dataKey="time" tick={false} axisLine={false} />
                            <YAxis tick={false} axisLine={false} />
                            <Tooltip />
                            <Line type="monotone" dataKey="volume" stroke="#10b981" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}

