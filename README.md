# Task Management API

A comprehensive RESTful API for managing tasks with user authentication, built using Node.js, Express, and MongoDB.

## Repository

https://github.com/AyushkhatiDev/Task-Management

## Features

### Core Features
- User authentication (register/login)
- JWT-based authorization
- Complete CRUD operations for tasks
- MongoDB database integration
- API documentation with Swagger

### Enhanced Task Management
- Task categorization (work, personal, shopping, health, education)
- Task tagging system
- Task comments and discussions
- File attachments support
- Task assignments to multiple users
- Priority levels and status tracking
- Due dates and reminders
- Task completion tracking

### User Features
- Detailed user profiles
- User settings and preferences
- Role-based access control
- Theme preferences
- Email notification settings

### Analytics and Search
- Comprehensive task statistics
- Task timeline visualization
- Advanced search with multiple filters
- Tasks breakdown by category, priority, and status

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd task-management-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env`
- Update the configuration in `.env`:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/task_management
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h
```

4. Start MongoDB:
- Make sure MongoDB is installed and running
- Default MongoDB URL: mongodb://localhost:27017

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`
Swagger documentation: `http://localhost:3000/api-docs`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Tasks
- GET `/api/tasks` - Get all tasks
- GET `/api/tasks/:id` - Get specific task
- POST `/api/tasks` - Create new task
- PATCH `/api/tasks/:id` - Update task
- DELETE `/api/tasks/:id` - Delete task

### Statistics and Search
- GET `/api/stats/tasks` - Get task statistics
- GET `/api/stats/search` - Search tasks with filters
- GET `/api/stats/timeline` - Get task timeline

## Task Features

### Categories
- Work
- Personal
- Shopping
- Health
- Education
- Other

### Priority Levels
- Low
- Medium
- High

### Status Options
- Todo
- In Progress
- Completed
- Archived

## Example API Usage

### Create a Task
```javascript
POST /api/tasks
{
  "title": "Project Meeting",
  "description": "Weekly team sync",
  "category": "work",
  "tags": ["meeting", "team"],
  "priority": "high",
  "dueDate": "2024-12-14T10:00:00Z",
  "assignedTo": ["user_id1", "user_id2"]
}
```

### Search Tasks
```javascript
GET /api/stats/search?query=project&category=work&priority=high&startDate=2024-12-01
```

### Get Task Statistics
```javascript
GET /api/stats/tasks
```

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Development

### Running Tests
```bash
npm test
```

### Environment Variables
Create a `.env` file with the following variables:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/task_management
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h
```

## License

MIT
