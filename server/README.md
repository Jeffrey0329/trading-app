POST http://localhost:5000/api/auth/register

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}

POST http://localhost:5000/api/auth/login

{
  "email": "test@example.com",
  "password": "password123"
}

GET http://localhost:5000/api/auth/profile

Authorization: Bearer <your-token>

POST http://localhost:5000/api/auth/logout

Authorization: Bearer <your-token>