# Project Management Tool (Backend)

This is the backend for the **Project Management Tool** built using **Node.js** and **Express.js**. It provides a RESTful API to manage projects and users, leveraging **MongoDB** for data storage and **JWT** for authentication.

## Features

### Team Leader Features

- **Create Project**: Team leaders can create new projects and assign them to users.
- **Assign Users**: Team leaders can assign users to specific projects and manage their roles.
- **Set Deadlines**: Define and manage deadlines for each project.
- **Delete Project**: Remove projects that are no longer needed.
- **View All Projects**: Team leaders can view all projects and their statuses.

### User Features

- **Register User**: Users can register to the platform.
- **Login**: Users can authenticate and receive a JWT token for secure access.
- **Submit Project**: Users can submit their completed projects for review.
- **View Assigned Projects**: Users can view all projects assigned to them and their submission statuses.
- **Profile Management**: Users can view and update their profile information.

### Common Features

- **Authentication**: Secure user registration and login using JWT.
- **Middleware**: Protect routes using authentication middleware to ensure only authorized users can access certain endpoints.

### Folder Structure

### Middleware

## Authentication Middleware

    Protects routes by verifying JWT tokens to ensure that only authenticated users can access certain API endpoints.

### Technologies Used

- **Node.js**: For building the server-side application.
- **Express.js**: For handling HTTP requests and responses.
- **MongoDB**: For database management and data storage.
- **Mongoose**: For defining schemas and interacting with MongoDB.
- **JSON Web Token (JWT)**: For secure user authentication.

### Achievements

- Implemented role-based access control for team leaders and users.
- Developed a secure authentication mechanism using JWT.
- Designed and built a RESTful API with full CRUD capabilities for managing projects and users.
- Successfully connected to MongoDB and implemented data validation using Mongoose.

### Acknowledgements

- **Express**
- **Mongoose**
- **JSON Web Token**
- **MongoDB**
