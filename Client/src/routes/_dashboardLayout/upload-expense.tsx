import UploadXLS from "@/components/global/UploadXLS";
import ExpenseTable from "@/components/upload-expense/Table";
import { TFileData } from "@/types";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_dashboardLayout/upload-expense")({
  component: UploadExpense,
});

function UploadExpense() {
  const [fileData, setFileData] = useState<TFileData | null>(null);

  const saveExpenseFileData = (data: TFileData | null) => {
    if (!data) return;
    setFileData(data);
  };

  return (
    <section className="pt-10">
      <h1 className="text-2xl font-bold">Upload Your Excel File</h1>
      <p className="mt-2 w-[70%] text-gray-600">
        Upload your Excel file to generate a table for saving to the backend and
        generating analytics. Simply choose your file and click upload. Once
        processed, you will be able to review and save the data.
      </p>

      <section className="w-full mt-4">
        <UploadXLS saveExpenseFileData={saveExpenseFileData} />
      </section>

      <section className="w-[90%]">
        <ExpenseTable
          fileData={fileData ? Object.values(fileData).flat() : null}
        />
      </section>
    </section>
  );
}
