import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Bar } from "recharts/types/cartesian/Bar";
import { CartesianGrid, Line, LineChart, ReferenceLine, XAxis, YAxis } from "recharts";
import { format } from "date-fns";

const chartConfig = {
    weight: {
        label: "Gewicht",
        color: "#2563eb",
    },
} satisfies ChartConfig

export const WeightChart = () => {

    const [weightData, setWeightData] = useState<any[]>([]);

    const handleLoadInitialData = async () => {
        const { data, error } = await supabase
            .from('vitals')
            .select('*')
            .order('created_at', { ascending: true })
            .limit(100);

        if (error) {
            console.error('Error loading initial data:', error);
        } else {
            console.log(data)
            setWeightData(data);
        }
    };

    useEffect(() => {
        handleLoadInitialData();

        const channels = supabase.channel('weight_channel')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'vitals' },
                (payload: any) => {
                    // console.log('Change received!', payload)
                    setWeightData((prevData) => [...prevData, payload.new]);
                }
            )
            .subscribe()
        // Initialize the weight chart here, e.g., fetch data or set up a chart library
        console.log("WeightChart component mounted");

        return () => {
            channels.unsubscribe();
        };
    }, []);

    return (
        <div className="w-full h-full  rounded-2xl border flex flex-col justify-between p-6">
            <p className="mb-1 font-semibold text-xl">Gewicht über die Zeit</p>
            <p className="text-sm text-muted-foreground mb-8">Letzte Messung: {weightData[weightData.length - 1]?.weight} kg</p>
            <ChartContainer config={chartConfig} className="min-h-[200px] max-h-[700px] w-full">
                <LineChart accessibilityLayer data={weightData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="created_at"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => format(new Date(value), 'dd.MM.')}
                    />
                    <YAxis
                        dataKey="weight"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => `${value} kg`}
                    />
                    <ReferenceLine y={100} stroke="red" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line dataKey="weight" fill="var(--color-weight)" strokeWidth={2} />
                </LineChart>
            </ChartContainer>

            <div className="flex flex-row items-center justify-center gap-10 mt-4">
                <div className="flex flex-row items-center gap-2">
                    <div className="h-4 w-4 bg-red-500 rounded-md"/>
                    <p className="text-muted-foreground">Ziel (100Kg)</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <div className="h-4 w-4 bg-blue-500 rounded-md"/>
                    <p className="text-muted-foreground">Gemessenes Gewicht</p>
                </div>
            </div>
        </div>
    );
}