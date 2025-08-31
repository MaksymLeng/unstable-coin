import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts"

const data = Array.from({ length: 30 }, (_, i) => ({
    day: `D${i + 1}`,
    price: 0.8 + Math.sin(i / 3) * 0.2 + Math.random() * 0.1,
    volume: Math.round(100 + Math.random() * 80),
}))

export function PriceAreaCard() {
    return (
        <Card className="rounded-2xl">
            <CardHeader>
                <CardTitle className="text-base">Price (placeholder)</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.6}/>
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="day" tick={false} axisLine={false} />
                        <YAxis tick={false} axisLine={false} domain={["auto", "auto"]}/>
                        <Tooltip />
                        <Area type="monotone" dataKey="price" stroke="#2563eb" fill="url(#grad)" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

export function VolumeLineCard() {
    return (
        <Card className="rounded-2xl">
            <CardHeader>
                <CardTitle className="text-base">Volume (placeholder)</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ left: 0, right: 8, top: 10, bottom: 0 }}>
                        <XAxis dataKey="day" tick={false} axisLine={false} />
                        <YAxis tick={false} axisLine={false} />
                        <Tooltip />
                        <Line type="monotone" dataKey="volume" stroke="#10b981" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
