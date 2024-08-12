import { IExpenseStoreState } from "@/types";

export function Analytics({
  analytics,
}: {
  analytics: IExpenseStoreState["analytics"];
}) {
  return (
    <div className="">
      <div>{JSON.stringify(analytics, null, 2)}</div>
    </div>
  );
}
