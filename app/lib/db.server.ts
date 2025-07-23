import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db', 'expenses.json');

export async function getExpenses() {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function saveExpenses(expenses) {
  fs.writeFileSync(dbPath, JSON.stringify(expenses, null, 2));
}

export async function addExpense(expense) {
  const expenses = await getExpenses();
  const newExpense = { id: expenses.length + 1, ...expense };
  expenses.push(newExpense);
  await saveExpenses(expenses);
  return newExpense;
}

export async function updateExpense(id, updatedExpense) {
  const expenses = await getExpenses();
  const index = expenses.findIndex(expense => expense.id === id);
  if (index !== -1) {
    expenses[index] = { ...expenses[index], ...updatedExpense };
    await saveExpenses(expenses);
    return expenses[index];
  }
  return null;
}

export async function deleteExpense(id) {
  const expenses = await getExpenses();
  const filteredExpenses = expenses.filter(expense => expense.id !== id);
  await saveExpenses(filteredExpenses);
}
