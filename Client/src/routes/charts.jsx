import { createFileRoute } from "@tanstack/react-router";
import WeeklyExpense from "../components/upload-expense/Charts/DailyInOut";
export const Route = createFileRoute("/charts")({
  component: Index,
});

function Index() {
  return (
    <div>
      <h1>HELLO</h1>
      <WeeklyExpense />
    </div>
  );
}
