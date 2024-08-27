import DailyExpense from "./Charts/DailyExpense";
import DailyInOut from "./Charts/DailyInOut";
import Grid from "@mui/material/Grid";
import WeeklyExpense from "./Charts/WeeklyExpense";
import ExpensePie from "./Charts/ExpensePie";
import TotalExpenseCard from "./Charts/TotalExpenseCard";
import TotalDepositCard from "./Charts/TotalDepositCard";
import TotalExpensePercentCard from "./Charts/TotalExpensePercentCard";

export default function Analytics() {
  return (
    <div className="mt-5 p-5 pl-0">
      <Grid container rowSpacing={5} columnSpacing={3}>
        <Grid item lg={3} alignItems="center" justifyContent="center">
          <TotalExpenseCard />
        </Grid>
        <Grid item lg={3} alignItems="center" justifyContent="center">
          <TotalDepositCard />
        </Grid>
        <Grid item lg={3} alignItems="center" justifyContent="center">
          <TotalExpensePercentCard />
        </Grid>
        <Grid item lg={5}>
          <DailyExpense />
        </Grid>
        <Grid item lg={5}>
          <DailyInOut />
        </Grid>
        <Grid item lg={5}>
          <WeeklyExpense />
        </Grid>
        <Grid item lg={5}>
          <ExpensePie />
        </Grid>
      </Grid>
    </div>
  );
}
