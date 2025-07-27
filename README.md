# Smart Goal Planner 🎯

## Table of Contents
1. [Project Description](#project-description)
2. [Features](#features)
3. [Technical Specifications](#technical-specifications)
4. [Setup Instructions](#setup-instructions)
5. [API Configuration](#api-configuration)
6. [Application Usage](#application-usage)
7. [Testing](#testing)
8. [License](#license)
9. [Acknowledgements](#acknowledgements)

## Project Description
A React-based financial management application that enables users to:
- Set measurable savings goals
- Track progress with visual indicators
- Manage deposits across multiple objectives
- Receive deadline-based status alerts

## Features
| Feature | Implementation Details |
|---------|-----------------------|
| Goal Creation | Form with validation (name, amount, category, deadline) |
| Progress Tracking | Dynamic progress bars with percentage calculation |
| Status System | Color-coded indicators (Completed/Active/Warning/Overdue) |
| Data Persistence | REST API via json-server |
| Responsive Design | Mobile-first CSS with media queries |

## Technical Specifications
### Frontend
- **Framework**: React 18
- **State Management**: React Hooks (useState, useEffect)
- **Styling**: Tailwind
- **HTTP Client**: Axios

### Backend Simulation
- **Mock API**: json-server
- **Data Structure**:
  ```json
  {
    "goals": [
      {
        "id": "uuid",
        "name": "String",
        "targetAmount": "Number",
        "savedAmount": "Number",
        "category": "String",
        "deadline": "Date",
        "createdAt": "Timestamp"
      }
    ]
  }

## Installation
  ** Install dependencies-npm install **
    ** Environment setup- cp .env.example .env**

  
  ## Running the Application
  ** Start developers server-npm run dev **
    ** In separate terminal launch mock API- npm run server**
    ** Access aplaication **

    
## Testing
  ** Test-npm Test **

This project is not licensed.
    
