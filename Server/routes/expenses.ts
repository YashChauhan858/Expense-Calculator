import { Hono } from "hono";
import { ExpenseInput, type TExpenseInput } from "../types/expenses.types";
import { zValidator } from "@hono/zod-validator";

const fakeExpenses: TExpenseInput[] = [
  { id: 1, description: "Rent", date: "2021-01-01", amount: 123.1 },
  { id: 2, description: "Food", date: "2021-01-02", amount: 123.1 },
  { id: 3, description: "Internet", date: "2021-01-03", amount: 123.1 },
  { id: 4, description: "Electricity", date: "2021-01-04", amount: 123.1 },
];

const expensesRoute = new Hono();

expensesRoute.get("/", (c) => c.json({ data: fakeExpenses }));

// zValidator middleware to validate the request body against the ExpenseInput zod schema so we have run type validation
expensesRoute.post("/", zValidator("json", ExpenseInput), (c) => {
  // return the validated data from zValidator and gives type to the returned data
  const expense = c.req.valid("json");

  fakeExpenses.push(expense);
  return c.json({ message: "Expense created!", data: expense });
});

/**
 * specifying that the expenseId path parameter should be a number
 * vai regex
 * It will automatically return 404 if the path parameter is not a number
 */
expensesRoute.get("/:expenseId{[0-9]+}", (c) => {
  // Any path parameter is type string by default so we parse it to number
  const expenseId = Number(c.req.param("expenseId"));

  const expense = fakeExpenses.find((e) => e.id === expenseId);

  if (!expense) {
    // This will return a 404 status code to client
    return c.notFound();
  }

  return c.json({ data: expense });
});

/**
 * specifying that the expenseId path parameter should be a number
 * vai regex
 * It will automatically return 404 if the path parameter is not a number
 */
expensesRoute.delete("/:expenseId{[0-9]+}", (c) => {
  // Any path parameter is type string by default so we parse it to number
  const expenseId = Number(c.req.param("expenseId"));

  const expenseIndex = fakeExpenses.findIndex((e) => e.id === expenseId);

  if (expenseIndex === -1) {
    // This will return a 404 status code to client
    return c.notFound();
  }

  fakeExpenses.splice(expenseIndex, 1);

  return c.json({ message: "Expense deleted!" });
});

export default expensesRoute;
