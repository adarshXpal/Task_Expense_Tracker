import { redirect, type ActionArgs } from "@remix-run/node";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
import { addExpense } from "~/lib/db.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const description = formData.get("description");
  const amount = parseFloat(formData.get("amount") as string);
  const category = formData.get("category");
  const date = formData.get("date");

  const errors: Record<string, string> = {};
  if (!description) errors.description = "Description is required";
  if (isNaN(amount)) errors.amount = "Amount is required and must be a number";
  if (!category) errors.category = "Category is required";
  if (!date) errors.date = "Date is required";

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await addExpense({ description, amount, category, date });
  return redirect("/add?success=true");
}

export default function AddExpense() {
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      {success && (
        <p className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          Expense added successfully!
        </p>
      )}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Expense</h1>
      <Form method="post" className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {actionData?.errors?.description && (
            <p className="mt-1 text-sm text-red-600">{actionData.errors.description}</p>
          )}
        </div>

        <div>
          <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {actionData?.errors?.amount && (
            <p className="mt-1 text-sm text-red-600">{actionData.errors.amount}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select a category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          {actionData?.errors?.category && (
            <p className="mt-1 text-sm text-red-600">{actionData.errors.category}</p>
          )}
        </div>

        <div>
          <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {actionData?.errors?.date && (
            <p className="mt-1 text-sm text-red-600">{actionData.errors.date}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Expense
        </button>
      </Form>
    </div>
  );
}
