import { useExpenseStore } from "../../../store/expense";

const TotalExpensePercentCard = () => {
  const expensePercentage = useExpenseStore((state) => {
    if (
      !state?.analytics?.expensePercentage ||
      state?.analytics?.expensePercentage === 0
    )
      return 0;
    return state?.analytics?.expensePercentage;
  });
  return (
    <div className="p-5 bg-[#18181b] rounded-md w-full h-36 flex flex-col justify-center gap-2">
      <h1 className="text-white text-2xl font-bold">Total Expense %</h1>
      {expensePercentage > 0 ? (
        <p>{expensePercentage.toFixed(2)} %</p>
      ) : (
        <p>0%</p>
      )}
    </div>
  );
};

export default TotalExpensePercentCard;
