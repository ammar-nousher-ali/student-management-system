# Student Management System - Frontend

A modern React-based frontend for the Student Management System backend built with Go.

## Features

- 🔐 **Authentication System**
  - User registration and login
  - JWT token-based authentication
  - Protected routes

- 📊 **Dashboard**
  - Overview statistics
  - Recent students list
  - Quick actions

- 👥 **Student Management**
  - View all students in a responsive table
  - Add new students with form validation
  - Edit existing student information
  - Delete students with confirmation
  - Search functionality

- 🎨 **Modern UI**
  - Material-UI components
  - Responsive design
  - Clean and intuitive interface
  - Dark/light theme support

## Tech Stack

- **React 18** with TypeScript
- **Material-UI (MUI)** for UI components
- **React Router** for navigation
- **Axios** for API communication
- **Context API** for state management

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Running Go backend server on `http://localhost:3001`

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd student-management-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── dashboard/
│   │   └── Dashboard.tsx
│   ├── layout/
│   │   └── Layout.tsx
│   └── students/
│       ├── StudentList.tsx
│       └── StudentForm.tsx
├── contexts/
│   └── AuthContext.tsx
├── services/
│   └── api.ts
├── App.tsx
└── index.tsx
```

## API Endpoints

The frontend expects the following API endpoints from your Go backend:

### Authentication
- `POST /api/signin` - User login
- `POST /api/signup` - User registration

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `GET /api/students/search?q=query` - Search students
- `POST /api/students/batch` - Create multiple students

### Dashboard
- Note: Dashboard statistics are currently using mock data as the backend doesn't have a stats endpoint

## Environment Configuration

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:3001/api
```

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Features in Detail

### Authentication
- Secure login/register forms with validation
- JWT token storage in localStorage
- Automatic token refresh
- Protected route redirection

### Student Management
- **List View**: Responsive table with sorting and filtering
- **Add Student**: Form with validation for all required fields
- **Edit Student**: Pre-populated form for updating information
- **Delete Student**: Confirmation dialog before deletion
- **Search**: Real-time search across name, email, and grade

### Dashboard
- **Statistics Cards**: Total students, active students, new students, average age
- **Recent Students**: List of recently added students
- **Quick Actions**: Buttons for common tasks

## Customization

### Styling
The app uses Material-UI theming. You can customize the theme in `App.tsx`:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Your primary color
    },
    secondary: {
      main: '#dc004e', // Your secondary color
    },
  },
});
```

### API Configuration
Update the API base URL in `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://your-backend-url/api';
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure your Go backend has CORS configured
   - Check that the API URL is correct

2. **Authentication Issues**
   - Verify JWT token format
   - Check token expiration
   - Ensure backend auth endpoints are working

3. **Grid Component Errors**
   - The app uses Material-UI Grid components
   - Make sure all MUI dependencies are installed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the repository or contact the development team.
