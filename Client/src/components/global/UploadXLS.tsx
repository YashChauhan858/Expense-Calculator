import { TStatementRow, TStatementItem, TFileData } from "@/types";
import { ChangeEvent, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { File } from "lucide-react";
import { useExpenseStore } from "@/store/expense";
import { calculateAnalytics, formateDateAndGiveEpoch } from "@/utils";

const UploadXLS = () => {
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addFileData = useExpenseStore((state) => state.addFileData);
  const updateAnalytics = useExpenseStore((state) => state.updateAnalytics);
  const setIsAnalyticsPresentAsTrue = useExpenseStore(
    (state) => state.setIsAnalyticsPresentAsTrue
  );

  const saveExpenseFileData = (data: TFileData | null) => {
    if (!data) return;
    addFileData(data);
    const fileAnalytics = calculateAnalytics(Object.values(data).flat());
    if (!fileAnalytics) return;
    console.log({ fileAnalytics });
    updateAnalytics(fileAnalytics);
    // Once analytics has been calculated we can make show analytics button enable via isAnalyticsPresent key
    setIsAnalyticsPresentAsTrue();
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    setFileName(file.name);
    reader.onload = (event) => {
      if (!event?.target?.result) return;
      const workbook = XLSX.read(event?.target?.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);

      const data: Record<string, TStatementItem[]> = {};

      (sheetData as TStatementRow[]).map((statementRow) => {
        const date = formateDateAndGiveEpoch(statementRow?.Date ?? null);
        const account = statementRow?.Narration ?? null;
        const chqRefNo = statementRow?.["Chq./Ref.No."] ?? null;
        const withdraw = statementRow?.["Withdrawal Amt."] ?? 0;
        const deposit = statementRow?.["Deposit Amt."] ?? 0;

        if (!data[`${date}`]) {
          return (data[`${date}`] = [
            {
              date,
              account,
              chqRefNo,
              withdraw,
              deposit,
            },
          ]);
        }
        data[`${date}`].push({
          date,
          account,
          chqRefNo,
          withdraw,
          deposit,
        });
      });

      saveExpenseFileData(data);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <Button variant={"outline"} onClick={() => inputRef?.current?.click()}>
          <File className="mr-2 h-4 w-4" />
          Browse File
        </Button>
        {fileName && <p>File name: {fileName}</p>}
      </div>
      <Input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default UploadXLS;
