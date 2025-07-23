import { redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { getExpenses, updateExpense } from "~/lib/db.server";

export async function loader({ params }) {
  const expenses = await getExpenses();
  const expense = expenses.find(expense => expense.id.toString() === params.id);
  if (!expense) {
    throw new Response("Not Found", { status: 404 });
  }
  return { expense };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedExpense = {
    description: formData.get("description"),
    amount: parseFloat(formData.get("amount")),
    category: formData.get("category"),
    date: formData.get("date"),
  };

  await updateExpense(parseInt(params.id), updatedExpense);
  return redirect("/");
}

export default function EditExpense() {
  const { expense } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Expense</h1>
      <Form method="post" className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            defaultValue={expense.description}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            defaultValue={expense.amount}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            defaultValue={expense.category}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={expense.date}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Update Expense
        </button>
      </Form>
    </div>
  );
}
