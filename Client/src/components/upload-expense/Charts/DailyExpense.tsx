import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { type ChartConfig } from "@/components/ui/chart";
import { useExpenseStore } from "../../../store/expense";

const DailyExpense = () => {
  const analytics = useExpenseStore((state) => {
    if (!state?.fileData || Object.values(state?.fileData ?? {}).length === 0)
      return [];
    return Object.values(state?.fileData).flat();
  });

  const chartData = analytics.map((e) => {
    return {
      dailyExpense: Number(e.withdraw),
      date: e.date ? new Date(e.date ?? 0).toLocaleDateString() : "",
    };
  });

  const chartConfig = {
    dailyExpense: {
      label: "Daily Expense",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <div className="p-5 bg-[#18181b] rounded-md">
      <p className="pl-5 mb-5">Daily Expense</p>
      <ChartContainer config={chartConfig} className="min-h-[20px] w-full">
        <LineChart accessibilityLayer data={chartData}>
          <XAxis dataKey={"date"} tickMargin={20} />
          <YAxis dataKey={"dailyExpense"} tickMargin={20} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <CartesianGrid vertical={false} />
          <Line
            type="natural"
            dataKey="dailyExpense"
            stroke="#2563eb"
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default DailyExpense;
