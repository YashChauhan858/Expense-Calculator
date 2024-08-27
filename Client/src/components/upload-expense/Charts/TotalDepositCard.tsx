import { numberFormatter } from "@/utils";
import { useExpenseStore } from "../../../store/expense";

const TotalDepositCard = () => {
  const totalDeposit = useExpenseStore((state) => {
    if (!state?.analytics?.totalDeposit || state?.analytics?.totalDeposit === 0)
      return 0;
    return state?.analytics?.totalDeposit;
  });
  return (
    <div className="p-5 bg-[#18181b] rounded-md w-full h-36 flex flex-col justify-center gap-2">
      <h1 className="text-white text-2xl font-bold">Total Deposit</h1>
      {totalDeposit > 0 ? (
        <p>{numberFormatter(totalDeposit)} ₹</p>
      ) : (
        <p>0 Spending</p>
      )}
    </div>
  );
};

export default TotalDepositCard;
