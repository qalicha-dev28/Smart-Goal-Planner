# Smart Goal Planner 💰

A personal savings tracker app to help you achieve your financial goals. Set targets, track progress, and watch your savings grow!

## Features ✨

- **Create savings goals** with targets and deadlines
- **Track deposits** toward each goal
- **Visual progress bars** show your savings journey
- **Smart status indicators** (Completed, Active, Overdue)
- **Responsive design** works on all devices

## Tech Stack
- **Frontend**:React.js
- **Styling**: Pure CSS (no frameworks)
- **Data Mocking**:json-server
- **Build Tool**: Vite

## Installation ⚙️
-**Install dependencies**:npm install
-**Start the development**:server-npm run server
-**Run the mock API server in a separate terminal**:npm run server

## Project Structure 📂
src/
├── components/       # All React components
│   ├── GoalForm.jsx  # Add new goals
│   ├── GoalItem.jsx  # Single goal display
│   ├── GoalList.jsx  # Goals listing
│   └── Overview.jsx  # Summary stats
├── App.jsx           # Main app component
├── main.jsx          # Entry point
└── styles/           # CSS files


# How to Use 🚀

   1. Add a Goal:

        -Enter goal name, target amount, category, and deadline

       - Click "Add Goal"

   2. Make Deposits:

        -Select a goal from dropdown

        -Enter deposit amount

       - Click "Deposit"

    3. Track Progress:

       - View progress bars for each goal

         - Check status indicators (✓ Completed, ⚠️ Soon, ⌛ Overdue)











This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
