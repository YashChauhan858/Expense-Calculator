export type TStatementRow = {
  Date: string;
  Narration: string;
  "Chq./Ref.No.": string;
  "Value Dt": string;
  "Withdrawal Amt.": string;
  "Closing Balance": string; // can ignore this
  "Deposit Amt.": string;
};

export type TStatementItem = {
  date: number | null;
  account: string;
  chqRefNo: string;
  withdraw: string;
  deposit: string;
  tags?: string[];
};

export type TFileData = Record<string, TStatementItem[]>;
