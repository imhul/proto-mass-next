import { useEffect, useState } from "react"
// components
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@components/ui/chart"

const chartConfig = {
    value: {
        label: "Значення",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

const DevChart = ({ currentValue }: { currentValue: number }) => {
    const [chartData, setChartData] = useState<{ time: string; value: number }[]>([])

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date()
            const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}:${now
                .getSeconds()
                .toString()
                .padStart(2, "0")}`

            setChartData((prev) => [
                ...prev.slice(-2000),
                { time, value: currentValue },
            ])
        }, 1000)

        return () => clearInterval(interval)
    }, [currentValue])

    return (
        <Card className="w-full absolute top-[84px] left-0">
            <CardHeader>
                <CardTitle className="text-4xl text-center font-bold">{currentValue}</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                        height={400}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Area
                            height={400}
                            dataKey="value"
                            type="linear"
                            fill="var(--color-value)"
                            fillOpacity={0.4}
                            stroke="var(--color-value)"
                            isAnimationActive={false}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default DevChart
