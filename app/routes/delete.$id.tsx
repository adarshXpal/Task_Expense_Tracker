import { redirect } from "@remix-run/node";
import { deleteExpense } from "~/lib/db.server";

export async function action({ params }) {
  await deleteExpense(parseInt(params.id));
  return redirect("/");
}
