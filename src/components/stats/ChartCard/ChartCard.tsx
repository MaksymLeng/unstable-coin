// ChartCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Line } from "recharts"
import {useEffect, useMemo} from "react"
import { useCoinStore } from "@/store/useCoinStore"
import {NETWORK, POOL} from "@/data/TokenData.ts";

const fmtPrice6 = (n: number) => Math.round(n * 1e6) / 1e6
const fmtUsdInt = (n: number) => Math.round(n)

export function PriceAreaCard() {
    const chart = useCoinStore(state => state.chart);
    const loading = useCoinStore(state => state.loading);
    const getCandles = useCoinStore(state => state.getCandles);

    useEffect(() => {
        if (chart.length === 0) {
            getCandles({ network: NETWORK, pool: POOL, timeframe: "hour", aggregate: 1, limit: 12 })
        }
    }, [chart.length, getCandles])

    const data = useMemo(() => {
        const sorted = [...chart].sort((a: any, b: any) => (a.ts ?? 0) - (b.ts ?? 0))
        return sorted.map(d => ({
            ...d,
            close: fmtPrice6(d.close),
            volume: fmtUsdInt(d.volume),
        }))
    }, [chart])

    return (
        <Card className="rounded-2xl">
            <CardHeader><CardTitle className="text-base">Price (USD)</CardTitle></CardHeader>
            <CardContent className="h-56 sm:h-64">
                {loading ? (
                    <div className="h-full grid place-items-center text-sm text-slate-500">Loading…</div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                            <defs>
                                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6}/>
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05}/>
                                </linearGradient>
                            </defs>

                            <XAxis
                                dataKey="ts"
                                type="number"
                                scale="time"
                                domain={['dataMin', 'dataMax']}
                                tickFormatter={(ts) =>
                                    new Date(ts as number).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                }
                                padding={{ left: 0, right: 0 }}
                                allowDataOverflow
                                tick={false}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                hide
                                width={0}
                                axisLine={false}
                                tickLine={false}
                                domain={['auto', 'auto']}
                            />

                            <Tooltip
                                formatter={(value: any, name) => {
                                    if (name === "close") return [`$${(Math.round((value as number) * 1e6) / 1e6)}`, "Price"]
                                    if (name === "volume") return [`$${Math.round(value as number).toLocaleString()}`, "Volume"]
                                    return [value, name]
                                }}
                                labelFormatter={(label) =>
                                    new Date(Number(label)).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                                }
                            />

                            <Area type="monotone" dataKey="close" stroke="#2563eb" fill="url(#grad)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    )
}

export function VolumeLineCard() {
    const chart = useCoinStore(state => state.chart);
    const loading = useCoinStore(state => state.loading);

    const data = useMemo(() => {
        const sorted = [...chart].sort((a: any, b: any) => (a.ts ?? 0) - (b.ts ?? 0))
        return sorted.map(d => ({
            ...d,
            close: fmtPrice6(d.close),
            volume: fmtUsdInt(d.volume),
        }))
    }, [chart])

    return (
        <Card className="rounded-2xl">
            <CardHeader><CardTitle className="text-base">Volume (USD)</CardTitle></CardHeader>
            <CardContent className="h-56 sm:h-64">
                {loading ? (
                    <div className="h-full grid place-items-center text-sm text-slate-500">Loading…</div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                            <XAxis
                                dataKey="ts"
                                type="number"
                                scale="time"
                                domain={['dataMin', 'dataMax']}
                                tickFormatter={(ts) =>
                                    new Date(ts as number).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                }
                                padding={{ left: 0, right: 0 }}
                                allowDataOverflow
                                tick={false}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                hide
                                width={0}
                                axisLine={false}
                                tickLine={false}
                                domain={['auto', 'auto']}
                            />
                            <Tooltip
                                formatter={(value: any, name) => {
                                    if (name === "close") return [`$${(Math.round((value as number) * 1e6) / 1e6)}`, "Price"]
                                    if (name === "volume") return [`$${Math.round(value as number).toLocaleString()}`, "Volume"]
                                    return [value, name]
                                }}
                                labelFormatter={(label) =>
                                    new Date(Number(label)).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                                }
                            />
                            <Line type="monotone" dataKey="volume" stroke="#10b981" strokeWidth={2} dot={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    )
}

