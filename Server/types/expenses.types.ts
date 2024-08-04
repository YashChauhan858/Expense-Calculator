import { z } from "zod";

export const ExpenseInput = z.object({
  id: z.number(),
  description: z.string().optional(),
  date: z.string(),
  amount: z
    .number()
    .finite()
    .positive({
      message: "Please provide a valid amount",
    })
    .min(0, { message: "Please provide an amount" }),
});

export type TExpenseInput = z.infer<typeof ExpenseInput>;
