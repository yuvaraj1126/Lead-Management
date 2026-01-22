Lead Management Module

Objective:
Build a basic Lead Management module with authentication and clean CRUD operations.
The focus of this project is on correctness, structure, and clarity, not extra features.

Tech Stack:

//Backend
Node.js
Express.js
MongoDB (Mongoose)
JWT for authentication
bcrypt for password hashing

//Frontend
HTML
CSS
JavaScript (Fetch API)

Authentication (Basic)
//Login Method
1.Users log in using email and password
2.Passwords are hashed using bcrypt before storing
3.On successful login, the backend returns a JWT token
4.The token is stored in localStorage and used to access protected APIs
//User Creation (Hardcoded / One-Time Register)
1.The assignment allows a hardcoded user or simple registration
2.A user is created once using a backend-only API

Features:

//Add lead
1.View all leads (table)
2.Edit lead
3.Delete lead

All lead APIs are protected using JWT authentication.

//How to Run the Project

//Backend Setup
cd backend
npm install
node server.js

//Use postman  to creatae the user for first time 
POST http://localhost:5000/api/auth/register