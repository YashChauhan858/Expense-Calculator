import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { type ChartConfig } from "@/components/ui/chart";
import { useExpenseStore } from "../../../store/expense";

const DailyInOut = () => {
  const analytics = useExpenseStore((state) => {
    if (!state?.fileData || Object.values(state?.fileData ?? {}).length === 0)
      return [];
    return Object.values(state?.fileData).flat();
  });

  const chartData = analytics.map((e) => {
    return {
      dailyIn: Number(e.deposit),
      dailyOut: Number(e.withdraw) * -1,
      date: e.date ? new Date(e.date ?? 0).toLocaleDateString() : "",
    };
  });

  const chartConfig = {
    dailyIn: {
      label: "Daily In",
      color: "#2563eb",
    },
    dailyOut: {
      label: "Daily Out",
      color: "#c92028",
    },
  } satisfies ChartConfig;

  return (
    <div className="p-5 bg-[#18181b] rounded-md">
      <p className="pl-5 mb-5">Daily In & Out</p>
      <ChartContainer config={chartConfig} className="min-h-[20px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <YAxis tickMargin={20} />
          <XAxis dataKey={"date"} tickMargin={20} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="dailyIn" fill="var(--color-dailyIn)" radius={4} />
          <Bar dataKey="dailyOut" fill="var(--color-dailyOut)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default DailyInOut;
