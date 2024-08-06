import { TStatementRow, TStatementItem } from "@/types";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ChangeEvent } from "react";
import * as XLSX from "xlsx";
export const Route = createLazyFileRoute("/upload-csv")({
  component: Index,
});

function Index() {
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      if (!event?.target?.result) return;
      const workbook = XLSX.read(event?.target?.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);

      const data: Record<string, TStatementItem[]> = {};

      (sheetData as TStatementRow[]).map((statementRow) => {
        const date = statementRow?.Date ?? null;
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

      console.log({ data });
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
  );
}
