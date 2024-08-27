import { createFileRoute } from "@tanstack/react-router";

/** -------- @Component ----------- */
import UploadXLS from "@/components/global/UploadXLS";
import ExpenseTable from "@/components/upload-expense/Table";
import { Button } from "@/components/ui/button";
import Analytics from "@/components/upload-expense/Analytics";

/** -------- @Store ----------- */
import { useExpenseStore } from "@/store/expense";

export const Route = createFileRoute("/_dashboardLayout/upload-expense")({
  component: UploadExpense,
});

function UploadExpense() {
  const fileData = useExpenseStore((state) => state.fileData);
  const analytics = useExpenseStore((state) => state.analytics);
  const showAnalyticsSection = useExpenseStore(
    (state) => state.showAnalyticsSection
  );

  console.log({ analytics });

  const toggleAnalyticsSection = useExpenseStore(
    (state) => state.toggleAnalyticsSection
  );

  return (
    <section className="pt-10">
      <h1 className="text-2xl font-bold">Upload Your Excel File</h1>
      <p className="mt-2 w-[70%] text-gray-600">
        Upload your Excel file to generate a table for saving to the backend and
        generating analytics. Simply choose your file and click upload. Once
        processed, you will be able to review and save the data.
      </p>

      <section className="w-full mt-4 flex gap-3">
        <UploadXLS />
        <Button
          variant={"outline"}
          onClick={toggleAnalyticsSection}
          disabled={!showAnalyticsSection.isAnalyticsPresent}
        >
          {showAnalyticsSection.show ? "Table" : "Analytics"}
        </Button>
      </section>

      <section
        className={`${showAnalyticsSection.show ? "w-full" : "w-[90%]"}`}
      >
        {showAnalyticsSection.show ? (
          <Analytics />
        ) : (
          <ExpenseTable
            fileData={fileData ? Object.values(fileData).flat() : null}
          />
        )}
      </section>
    </section>
  );
}
