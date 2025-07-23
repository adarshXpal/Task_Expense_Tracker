import { useLoaderData, Link } from "@remix-run/react";
import { getExpenses } from "~/lib/db.server";
import { Form } from "@remix-run/react";
export async function loader() {
  const expenses = await getExpenses();
  const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
  return { expenses, totalAmount };
}


export default function Index() {
  const { expenses, totalAmount } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Expense Tracker</h1>
        <p className="text-lg text-gray-600">💰 Total Amount: ₹{totalAmount}</p>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-md shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Description</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td className="px-4 py-2 text-sm text-gray-800">{expense.description}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">₹{expense.amount}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{expense.category}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{expense.date}</td>
                  <td className="px-4 py-2 text-sm text-blue-600 space-x-2">
                    <Link to={`/edit/${expense.id}`} className="hover:underline">Edit</Link>
                    <Form method="post" action={`/delete/${expense.id}`} className="inline" onSubmit={(e) => {
                      if (!confirm("Are you sure you want to delete this expense?")) e.preventDefault();
                    }}>
                      <button type="submit" className="text-red-600 hover:underline">Delete</button>
                    </Form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <Link
            to="/add"
            className="inline-block bg-indigo-600 text-white font-medium px-6 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            ➕ Add New Expense
          </Link>
        </div>
      </div>
    </div>

  );
}
