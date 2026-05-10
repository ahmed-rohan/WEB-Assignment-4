# Task 1: Student Management System API

A comprehensive REST API for managing student records with Express.js and MongoDB.

## Project Structure

```
Task1_StudentManagement/
├── app.js                 # Main Express application
├── package.json          # Project dependencies
├── .env                  # Environment variables
├── .env.example          # Environment template
├── config/
│   └── db.js            # MongoDB connection
├── models/
│   └── Student.js       # Student schema
├── controllers/
│   └── studentController.js  # Student business logic
└── routes/
    └── studentRoutes.js  # Student API routes
```

## Installation & Setup

### 1. Install Dependencies
```bash
cd Task1_StudentManagement
npm install
```

### 2. Configure Environment
Create a `.env` file in the project root:
```
MONGODB_URI=mongodb://localhost:27017/task1_student_management
PORT=5000
NODE_ENV=development
```

### 3. Start MongoDB
Ensure MongoDB is running on your system:
```bash
# On Windows
mongod

# Or use MongoDB Compass for a GUI
```

### 4. Run the Server
```bash
# Development (with nodemon for auto-reload)
npm run dev

# Production
npm start
```

The server will start on `http://localhost:5000`

## Database Schema

### Student Model

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| rollNumber | String | Unique, Required | Student roll number |
| name | String | Required | Student name |
| email | String | Unique, Validated, Required | Valid email format required |
| department | String | Required | Department name (e.g., CSE, ECE) |
| cgpa | Number | Min: 0.0, Max: 4.0, Required | Cumulative GPA |
| enrollmentYear | Number | Required | Year of enrollment |
| isActive | Boolean | Default: true | Soft delete indicator |
| timestamps | - | Automatic | createdAt, updatedAt |

## API Endpoints

### 1. Create a Student
**Request:**
```http
POST /api/students HTTP/1.1
Content-Type: application/json

{
  "rollNumber": "CSE2020001",
  "name": "John Doe",
  "email": "john.doe@university.edu",
  "department": "CSE",
  "cgpa": 3.8,
  "enrollmentYear": 2020
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "Student created successfully",
  "data": {
    "_id": "65a4d2f8c1e2b3a4f5g6h7i8",
    "rollNumber": "CSE2020001",
    "name": "John Doe",
    "email": "john.doe@university.edu",
    "department": "CSE",
    "cgpa": 3.8,
    "enrollmentYear": 2020,
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "__v": 0
  }
}
```

**Error Response (400 Bad Request - Duplicate Roll Number):**
```json
{
  "success": false,
  "error": "A student with this rollNumber already exists"
}
```

---

### 2. Get All Students (with Pagination & Filtering)
**Request:**
```http
GET /api/students?page=1&limit=10&department=CSE HTTP/1.1
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Records per page (default: 10)
- `department` (optional): Filter by department (case-insensitive)

**Expected Response (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "total": 2,
  "page": 1,
  "pages": 1,
  "data": [
    {
      "_id": "65a4d2f8c1e2b3a4f5g6h7i8",
      "rollNumber": "CSE2020001",
      "name": "John Doe",
      "email": "john.doe@university.edu",
      "department": "CSE",
      "cgpa": 3.8,
      "enrollmentYear": 2020,
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 3. Search Students by Name
**Request:**
```http
GET /api/students/search?name=John HTTP/1.1
```

**Query Parameters:**
- `name` (required): Name to search (case-insensitive, partial match)

**Expected Response (200 OK):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "65a4d2f8c1e2b3a4f5g6h7i8",
      "rollNumber": "CSE2020001",
      "name": "John Doe",
      "email": "john.doe@university.edu",
      "department": "CSE",
      "cgpa": 3.8,
      "enrollmentYear": 2020,
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Please provide a name query parameter"
}
```

---

### 4. Get Student by ID
**Request:**
```http
GET /api/students/65a4d2f8c1e2b3a4f5g6h7i8 HTTP/1.1
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "65a4d2f8c1e2b3a4f5g6h7i8",
    "rollNumber": "CSE2020001",
    "name": "John Doe",
    "email": "john.doe@university.edu",
    "department": "CSE",
    "cgpa": 3.8,
    "enrollmentYear": 2020,
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Student not found"
}
```

---

### 5. Update Student (Full Update - PUT)
**Request:**
```http
PUT /api/students/65a4d2f8c1e2b3a4f5g6h7i8 HTTP/1.1
Content-Type: application/json

{
  "name": "Jane Doe",
  "cgpa": 3.9,
  "enrollmentYear": 2021
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Student updated successfully",
  "data": {
    "_id": "65a4d2f8c1e2b3a4f5g6h7i8",
    "rollNumber": "CSE2020001",
    "name": "Jane Doe",
    "email": "john.doe@university.edu",
    "department": "CSE",
    "cgpa": 3.9,
    "enrollmentYear": 2021,
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:45:00.000Z"
  }
}
```

---

### 6. Partially Update Student (PATCH)
**Request:**
```http
PATCH /api/students/65a4d2f8c1e2b3a4f5g6h7i8 HTTP/1.1
Content-Type: application/json

{
  "cgpa": 3.95
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Student updated successfully",
  "data": {
    "_id": "65a4d2f8c1e2b3a4f5g6h7i8",
    "rollNumber": "CSE2020001",
    "name": "Jane Doe",
    "email": "john.doe@university.edu",
    "department": "CSE",
    "cgpa": 3.95,
    "enrollmentYear": 2021,
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  }
}
```

---

### 7. Delete Student (Hard Delete)
**Request:**
```http
DELETE /api/students/65a4d2f8c1e2b3a4f5g6h7i8 HTTP/1.1
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Student deleted successfully",
  "data": {}
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Student not found"
}
```

---

### 8. Soft Delete Student (Deactivate)
**Request:**
```http
PATCH /api/students/65a4d2f8c1e2b3a4f5g6h7i8/deactivate HTTP/1.1
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Student deactivated successfully",
  "data": {
    "_id": "65a4d2f8c1e2b3a4f5g6h7i8",
    "rollNumber": "CSE2020001",
    "name": "Jane Doe",
    "email": "john.doe@university.edu",
    "department": "CSE",
    "cgpa": 3.95,
    "enrollmentYear": 2021,
    "isActive": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T12:15:00.000Z"
  }
}
```

---

## HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| **200** | OK | Successful GET, PUT, PATCH, DELETE |
| **201** | Created | Successful POST |
| **400** | Bad Request | Validation error, duplicate, invalid input |
| **404** | Not Found | Student not found |
| **500** | Server Error | Database or server error |

## Postman Collection Tips

For your PDF report screenshots:

1. **Create Student** - Show POST request with 201 status
2. **Get All Students** - Show GET with pagination parameters and 200 status
3. **Search by Name** - Show regex search working with case-insensitive match
4. **Get by ID** - Show 200 OK response with complete student data
5. **Update (PUT)** - Show fields being updated and 200 status
6. **Partial Update (PATCH)** - Show only certain fields updated
7. **Delete** - Show 200 OK with empty data object
8. **Deactivate** - Show isActive changed to false (soft delete)
9. **MongoDB Screenshot** - Show the student_management collection in MongoDB Compass

## Error Handling

All errors follow this format:
```json
{
  "success": false,
  "error": "Error message or array of messages"
}
```

### Common Validation Errors

- **Invalid Email**: "Please provide a valid email address"
- **CGPA Out of Range**: "CGPA cannot be less than 0.0" or "CGPA cannot be greater than 4.0"
- **Duplicate Roll Number**: "A student with this rollNumber already exists"
- **Duplicate Email**: "A student with this email already exists"
- **Missing Required Field**: "[Field] is required"

## Notes

- The Student model enforces unique constraints on `rollNumber` and `email`
- Email validation uses regex pattern for standard email format
- CGPA is validated to be between 0.0 and 4.0
- Timestamps (createdAt, updatedAt) are automatically managed by Mongoose
- Soft delete sets `isActive` to false without removing the record
- Hard delete completely removes the student from the database
- All responses include a `success` boolean indicator

## Development Notes

- Use `.env` file for local development
- MongoDB connection uses the URI from environment variables
- Error messages are descriptive to help debug API issues
- Controllers handle all business logic
- Routes define API structure
- Models enforce data validation
