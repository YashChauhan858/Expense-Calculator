import { TFileData } from "./uploadCsv.types";

export interface IUploadXLS {
  saveExpenseFileData: (data: TFileData | null) => void;
}
