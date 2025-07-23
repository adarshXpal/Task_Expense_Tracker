# 💸 Expense Tracker - A Remix Application

A clean, intuitive expense tracking app that helps you monitor your daily spending. Built with Remix for fast performance and Tailwind CSS for beautiful responsive design.

## ✨ Features

- Add new expenses with details
- View all expenses in a clean list
- Edit existing entries
- Delete expenses (with confirmation)
- Fully responsive design
- Client-side validation
- Simple JSON data storage

## 🛠️ How It Works

I built this expense tracker following Remix best practices:

- **Routing**: Used Remix's file-based routing system for `/`, `/add`, `/edit/:id`, and `/delete/:id` routes
- **Data Handling**: Implemented loaders for fetching data and actions for mutations
- **Storage**: Started with JSON file storage for simplicity (easy to swap with a real database later)
- **UI**: Designed with Tailwind CSS for a modern, responsive interface
- **Validation**: Added both client-side and server-side validation for safety
- **UX**: Included helpful features like confirmation dialogs and clear success/error messages

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/adarshXpal/Task_Expense_Tracker.git
   cd Task_Expense_Tracker
   npm install
   npm run dev

### 📝 Using the Application
View Expenses: The home page shows all your recorded expenses

Add New: Click "Add Expense" to create a new entry

Edit: Click any expense to modify its details

Delete: Use the delete button (with confirmation prompt) to remove expenses

All changes are automatically saved to the JSON database file.


