import { numberFormatter } from "@/utils";
import { useExpenseStore } from "../../../store/expense";

const TotalExpenseCard = () => {
  const totalWithdraw = useExpenseStore((state) => {
    if (
      !state?.analytics?.totalWithdraw ||
      state?.analytics?.totalWithdraw === 0
    )
      return 0;
    return state?.analytics?.totalWithdraw;
  });
  return (
    <div className="p-5 bg-[#18181b] rounded-md w-full h-36 flex flex-col justify-center gap-2">
      <h1 className="text-white text-2xl font-bold">Total Expense</h1>
      {totalWithdraw > 0 ? (
        <p>{numberFormatter(totalWithdraw)} ₹</p>
      ) : (
        <p>0 Spending</p>
      )}
    </div>
  );
};

export default TotalExpenseCard;
