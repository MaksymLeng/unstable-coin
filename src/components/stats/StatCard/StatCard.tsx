import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatCard({title, value, hint,}: { title: string; value: string; hint?: string }) {
    return (
        <Card className="rounded-2xl block">
            <CardHeader className="pb-2">
                <CardTitle className="text-md text-slate-500">{title}</CardTitle>
            </CardHeader>
            <CardContent className="px-3 md:px-6">
                <div className="text-3xl font-bold font-sans pb-2">{value}</div>
                {hint && <div className="text-xs text-slate-500 mt-1 mx-4 md:mx-0">{hint}</div>}
            </CardContent>
        </Card>
    )
}
