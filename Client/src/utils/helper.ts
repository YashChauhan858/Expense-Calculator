import { IExpenseStoreState, TStatementItem } from "@/types";

/**
 * Truncates a text to a specified length and appends an ellipsis if necessary.
 * @param text - The text to truncate.
 * @param maxLength - The maximum length of the truncated text.
 * @returns The truncated text with an ellipsis if it exceeds the maximum length.
 */
export const truncateText = (text: string, maxLength: number = 10): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - 3) + "...";
};

export const calculateAnalytics = (
  fileData: TStatementItem[]
): IExpenseStoreState["analytics"] | null => {
  if (!fileData) return null;
  const analytics: IExpenseStoreState["analytics"] = {
    totalDeposit: 0,
    totalWithdraw: 0,
    expensePercentage: 0,
    weeklyExpense: [],
    weeklyExpensePercentage: [],
    monthlyExpense: [],
    monthlyExpensePercentage: [],
    startDate: null,
    endDate: null,
  };

  // Calculate total deposit and withdraw
  fileData.map((record) => {
    analytics.totalDeposit += parseFloat(record.deposit);
    analytics.totalWithdraw += parseFloat(record.withdraw);
  });

  if (analytics.totalWithdraw > 0) {
    analytics.expensePercentage =
      (analytics.totalWithdraw / analytics.totalDeposit) * 100;
  }

  analytics.startDate = fileData?.[0]?.date ?? null;
  analytics.endDate = fileData?.[fileData?.length - 1]?.date ?? null;

  const isValidStartAndEndDate =
    fileData?.[0]?.date && fileData?.[fileData?.length - 1]?.date;

  // Check if date difference is less then a well
  if (
    isValidStartAndEndDate &&
    differenceInDays(
      fileData?.[0]?.date,
      fileData?.[fileData?.length - 1]?.date
    ) < 7
  ) {
    analytics.weeklyExpense = [analytics.totalWithdraw];
    analytics.weeklyExpensePercentage = [analytics.expensePercentage];
  }

  // Weekly Calculation
  if ((fileData?.[0]?.date, fileData?.[fileData?.length - 1]?.date)) {
    const weeklyExpenseArray = weeklyCalculation(
      fileData?.[0]?.date,
      fileData?.[fileData?.length - 1]?.date,
      fileData
    );
    if (weeklyExpenseArray) {
      analytics.weeklyExpense = weeklyExpenseArray;
      analytics.weeklyExpensePercentage = weeklyExpenseArray.map(
        (e) => (e / analytics.totalDeposit) * 100
      );
    }
  }

  // Monthly Calculation
  if ((fileData?.[0]?.date, fileData?.[fileData?.length - 1]?.date)) {
    const monthlyExpenseArray = monthlyCalculation(
      fileData?.[0]?.date,
      fileData?.[fileData?.length - 1]?.date,
      fileData
    );
    if (monthlyExpenseArray) {
      analytics.monthlyExpense = monthlyExpenseArray;
      analytics.monthlyExpensePercentage = monthlyExpenseArray.map(
        (e) => (e / analytics.totalDeposit) * 100
      );
    }
  }

  return analytics;
};

export const formateDateAndGiveEpoch = (date: string) => {
  if (!date) return null;
  const dateArray = date.split("/");
  [dateArray[0], dateArray[1]] = [dateArray[1], dateArray[0]];
  return new Date(dateArray.join("/")).getTime();
};

export const differenceInDays = (
  date1: number | null,
  date2: number | null
) => {
  if (!date1 || !date2) return 0;
  return (
    Math.abs(new Date(date1).getTime() - new Date(date2).getTime()) /
    (1000 * 60 * 60 * 24)
  );
};

const weeklyCalculation = (
  startDate: number | null,
  endDate: number | null,
  fileData: TStatementItem[]
) => {
  if (!startDate || !endDate || !fileData) return null;
  const numberOfDays = differenceInDays(startDate, endDate);

  // Checking days range, should not be below 7 and more than 30
  if (numberOfDays <= 7 && numberOfDays >= 30) return;

  const milliSecondsInOneWeek = 7 * 24 * 60 * 60 * 1000;
  let weeklyExpenseArray: number[] = [];
  const totalWeeklyExpenseArray: number[] = [];

  let nextWeek = milliSecondsInOneWeek + startDate;

  for (let i = 0; i < fileData.length; i++) {
    const expense = fileData[i];
    if (nextWeek && expense.date && expense.date <= nextWeek) {
      weeklyExpenseArray.push(Number(expense.withdraw));
    } else {
      // once the week is over, calculate the total expense for that week
      totalWeeklyExpenseArray.push(
        weeklyExpenseArray.reduce((a, b) => a + b, 0)
      );

      weeklyExpenseArray = [Number(expense?.withdraw)];
      nextWeek += milliSecondsInOneWeek;
    }
  }
  // final week addition
  totalWeeklyExpenseArray.push(weeklyExpenseArray.reduce((a, b) => a + b, 0));

  return totalWeeklyExpenseArray;
};

const monthlyCalculation = (
  startDate: number | null,
  endDate: number | null,
  fileData: TStatementItem[]
) => {
  if (!startDate || !endDate || !fileData) return null;
  const numberOfDays = differenceInDays(startDate, endDate);

  // Checking days range, should not be below 30
  if (numberOfDays <= 30) return;

  const milliSecondsInOneMonth = 30 * 7 * 24 * 60 * 60 * 1000;
  let monthlyExpenseArray: number[] = [];
  const totalWeeklyExpenseArray: number[] = [];

  let nextWeek = milliSecondsInOneMonth + startDate;

  for (let i = 0; i < fileData.length; i++) {
    const expense = fileData[i];
    if (nextWeek && expense.date && expense.date <= nextWeek) {
      monthlyExpenseArray.push(Number(expense.withdraw));
    } else {
      // once the week is over, calculate the total expense for that week
      totalWeeklyExpenseArray.push(
        monthlyExpenseArray.reduce((a, b) => a + b, 0)
      );

      monthlyExpenseArray = [Number(expense?.withdraw)];
      nextWeek += milliSecondsInOneMonth;
    }
  }
  // final left over addition
  totalWeeklyExpenseArray.push(monthlyExpenseArray.reduce((a, b) => a + b, 0));

  return totalWeeklyExpenseArray;
};
