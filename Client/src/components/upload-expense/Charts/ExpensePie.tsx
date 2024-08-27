import { Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { type ChartConfig } from "@/components/ui/chart";
import { useExpenseStore } from "../../../store/expense";

const ExpensePie = () => {
  const chartData = useExpenseStore((state) => {
    if (
      !state?.analytics.expensePercentage ||
      state.analytics.expensePercentage === 0
    )
      return [
        {
          name: "Expense %",
          value: 0,
          fill: "#c92028",
        },
        {
          name: "Deposit %",
          value: 100,
          fill: "#2563eb",
        },
      ];
    return [
      {
        name: "Expense %",
        value: state.analytics.expensePercentage,
        fill: "#c92028",
      },
      {
        name: "Deposit %",
        value: 100 - state.analytics.expensePercentage,
        fill: "#2563eb",
      },
    ];
  });

  const chartConfig = {
    Pie: {},
  } satisfies ChartConfig;

  return (
    <div className="p-5 bg-[#18181b] rounded-md">
      <p className="pl-5 mb-5">Weekly Expense</p>
      <ChartContainer config={chartConfig} className="min-h-[20px] w-full">
        <PieChart accessibilityLayer>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
};

export default ExpensePie;
