import { TFileData } from "./uploadCsv.types";

export interface IExpenseStoreState {
  fileData: TFileData | null;
  analytics: {
    totalDeposit: number;
    totalWithdraw: number;
    expensePercentage: number;
    weeklyExpense: number[];
    weeklyExpensePercentage: number[];
    monthlyExpense: number[];
    monthlyExpensePercentage: number[];
    startDate: number | null;
    endDate: number | null;
  };
  showAnalyticsSection: {
    show: boolean;
    isAnalyticsPresent: boolean;
  };
}

export interface IExpenseStoreActions {
  addFileData: (fileData: TFileData) => void;
  updateAnalytics: (
    analytics:
      | keyof IExpenseStoreState["analytics"]
      | Partial<IExpenseStoreState["analytics"]>,
    value?: number
  ) => void;
  toggleAnalyticsSection: () => void;
  setIsAnalyticsPresentAsTrue: () => void;
}
