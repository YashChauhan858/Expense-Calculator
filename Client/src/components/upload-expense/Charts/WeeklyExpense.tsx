import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { type ChartConfig } from "@/components/ui/chart";
import { useExpenseStore } from "../../../store/expense";

const WeeklyExpense = () => {
  const analytics = useExpenseStore((state) => {
    if (
      !state?.analytics.weeklyExpense ||
      state?.analytics?.weeklyExpense?.length === 0
    )
      return [];
    return state?.analytics.weeklyExpense;
  });

  const chartData = analytics.map((e) => {
    return {
      weeklyExpense: Number(e),
    };
  });

  const chartConfig = {
    weeklyExpense: {
      label: "Weekly Expense",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <div className="p-5 bg-[#18181b] rounded-md">
      <p className="pl-5 mb-5">Weekly Expense</p>
      <ChartContainer config={chartConfig} className="min-h-[20px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <YAxis dataKey={"weeklyExpense"} tickMargin={20} />
          <XAxis
            tickMargin={20}
            tickFormatter={(_, index) => String(index + 1)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="weeklyExpense"
            fill="var(--color-weeklyExpense)"
            radius={4}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default WeeklyExpense;
