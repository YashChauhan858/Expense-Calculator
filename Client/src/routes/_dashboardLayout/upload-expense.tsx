import UploadXLS from "@/components/global/UploadXLS";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboardLayout/upload-expense")({
  component: UploadExpense,
});

function UploadExpense() {
  return (
    <section className="pt-10">
      <h1 className="text-2xl font-bold">Upload Your Excel File</h1>
      <p className="mt-2 w-[70%] text-gray-600">
        Upload your Excel file to generate a table for saving to the backend and
        generating analytics. Simply choose your file and click upload. Once
        processed, you will be able to review and save the data.
      </p>
      <div className="w-full mt-4">
        <UploadXLS />
      </div>
    </section>
  );
}
