# Smart Goal Planner

#### A React-based financial management application that helps users set, track, and achieve their savings goals with visual progress indicators and deadline management.

#### By **Najma Boru**

## Description

Smart Goal Planner is a comprehensive financial management tool built using React JS. The application demonstrates modern React concepts including hooks, state management, API integration, and responsive design. Users can create savings goals, track their progress with visual indicators, make deposits, and receive status alerts based on deadlines. The app features a clean, intuitive interface that makes financial planning accessible and engaging.

## Screenshot

![Smart Goal Planner Screenshot](./src/assets/smart-goal-planner.png)

## Features

- **Goal Creation**: Add new savings goals with name, target amount, category, and deadline
- **Progress Tracking**: Visual progress bars showing percentage completion
- **Deposit Management**: Make deposits to specific goals and track accumulated savings
- **Status System**: Color-coded indicators (Completed/Active/Warning/Overdue)
- **Overview Dashboard**: Summary statistics of all goals and overall progress
- **Goal Management**: Edit existing goals or delete completed ones
- **Responsive Design**: Mobile-first approach ensuring usability across all devices
- **Data Persistence**: All data is stored via REST API using JSON Server

## How to Use

### Requirements

- A computer, tablet, or phone
- Access to the internet
- A modern web browser
- Node.js (for local development)

### View Live Site

Visit the deployed application at: [Smart Goal Planner](https://smart-goal-planner-psi.vercel.app/)

The live site allows you to:

- Create new savings goals with specific targets and deadlines
- Track your progress with visual progress bars
- Make deposits to your goals and watch your savings grow
- View an overview of all your financial goals in one place
- Edit or delete goals as your financial situation changes

### Local Development

If you want to run the project locally, you'll need:

- Node.js (v18 or higher) installed on your computer
- Basic understanding of React JS
- Code editor (VS Code recommended)
- Terminal/Command Line

#### Installation Process

1. Clone this repository using:

   ```bash
   git clone https://github.com/your-username/smart-goal-planner.git
   ```

   or by downloading a ZIP file of the code.

2. Navigate to the project directory:

   ```bash
   cd smart-goal-planner
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Install backend dependencies:

   ```bash
   cd backend
   npm install
   cd ..
   ```

5. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

6. Run the development servers:

   ```bash
   # Start frontend (in one terminal)
   npm run dev

   # Start backend API (in another terminal)
   npm run server
   ```

7. Open your browser and visit `http://localhost:3000`

## Technologies Used

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API requests
- **CSS3** - Custom styling with CSS variables
- **JavaScript (ES6+)** - Modern JavaScript features

### Backend
- **JSON Server** - Mock REST API
- **Node.js** - Runtime environment
- **Render.com** - Backend hosting platform

### Development Tools
- **ESLint** - Code linting and formatting
- **Vitest** - Testing framework
- **Git** - Version control

## API Integration

### Backend API

- **Repository**: [Smart Goal Planner Backend](https://github.com/your-username/smart-goal-planner-backend)
- **Deployed API**: [Live API URL](https://smart-goal-planner-2-urmp.onrender.com)

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/goals` | Fetch all goals |
| POST | `/goals` | Create new goal |
| PUT | `/goals/:id` | Update goal |
| PATCH | `/goals/:id` | Partial update (deposits) |
| DELETE | `/goals/:id` | Delete goal |

## Project Structure

```
smart-goal-planner/
├── backend/
│   ├── package.json
│   ├── db.json
│   └── README.md
├── src/
│   ├── components/
│   │   ├── GoalForm.jsx
│   │   ├── GoalList.jsx
│   │   ├── GoalItem.jsx
│   │   ├── DepositForm.jsx
│   │   └── Overview.jsx
│   ├── utils/
│   │   └── goalUtils.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── .env.production
└── README.md
```

## Deployment

### Frontend Deployment
The frontend is deployed on **Vercel** at: [https://smart-goal-planner-psi.vercel.app/](https://smart-goal-planner-psi.vercel.app/)

Alternative deployment platforms:
- **Netlify** - Great for React apps
- **GitHub Pages** - Free hosting option

### Backend Deployment
The backend is deployed on **Render.com** providing:
- Automatic deployments from GitHub
- Free tier available
- Environment variable management
- Custom domain support

## Testing

Run the test suite using:

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support and Contact Details

If you have any questions, suggestions, or need assistance, please contact:

- **Email**: najma.boru@example.com
- **GitHub**: [@najma-boru](https://github.com/najma-boru)
- **LinkedIn**: [Najma Boru](https://linkedin.com/in/najma-boru)

## License

MIT License

Copyright &copy; 2024 Najma Boru

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## Acknowledgements

- React team for the excellent framework
- JSON Server for rapid API prototyping
- Render.com for reliable backend hosting
- Vite team for the fast development experience
- Vercel for seamless frontend deployment
- The open-source community for inspiration and resources
