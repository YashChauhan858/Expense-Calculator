import { IExpenseStoreActions, IExpenseStoreState, TFileData } from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useExpenseStore = create<
  IExpenseStoreState & IExpenseStoreActions
>()(
  immer((set) => ({
    fileData: null,
    analytics: {
      totalDeposit: 0,
      totalWithdraw: 0,
      expensePercentage: 0,
      weeklyExpense: [],
      weeklyExpensePercentage: [],
      monthlyExpense: [],
      monthlyExpensePercentage: [],
      startDate: null,
      endDate: null,
    },
    showAnalyticsSection: {
      show: false,
      isAnalyticsPresent: false,
    },
    addFileData: (data: TFileData) => {
      if (!data) return;
      set((state) => {
        state.fileData = data;
      });
    },
    updateAnalytics: (
      ObjOrKey:
        | keyof IExpenseStoreState["analytics"]
        | Partial<IExpenseStoreState["analytics"]>,
      value?: any
    ) => {
      if (!ObjOrKey) return;
      set((state) => {
        if (typeof ObjOrKey === "object") {
          state.analytics = { ...state.analytics, ...ObjOrKey };
        } else {
          state.analytics[ObjOrKey] = value;
        }
      });
    },
    toggleAnalyticsSection: () =>
      set((state) => {
        state.showAnalyticsSection.show = !state.showAnalyticsSection.show;
      }),
    setIsAnalyticsPresentAsTrue: () =>
      set((state) => {
        state.showAnalyticsSection.show = false;
        state.showAnalyticsSection.isAnalyticsPresent = true;
      }),
  }))
);
