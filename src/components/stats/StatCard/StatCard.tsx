import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatCard({
                             title,
                             value,
                             hint,
                         }: { title: string; value: string; hint?: string }) {
    return (
        <Card className="rounded-2xl">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-500">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold tracking-wide">{value}</div>
                {hint && <div className="text-xs text-slate-500 mt-1">{hint}</div>}
            </CardContent>
        </Card>
    )
}
