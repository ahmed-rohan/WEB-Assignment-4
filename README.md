# University Backend Assignment - Tasks 1 & 2

Complete backend implementation for a university assignment featuring two independent Node.js/Express/MongoDB applications: Student Management System and Blog Platform.

## 📋 Project Overview

This assignment contains two separate, fully-functional backend systems:

### **Task 1: Student Management System** 
Located in: `Task1_StudentManagement/`
- REST API for managing student records
- Student filtering, searching, and pagination
- Soft delete functionality (deactivation)
- 8 core endpoints for CRUD operations

### **Task 2: Blog Platform**
Located in: `Task2_BlogPlatform/`
- Multi-user blog system with posts and comments
- User registration with password hashing (bcryptjs)
- Post management with tag filtering
- Commenting system with cascade delete
- 11 core endpoints across users, posts, and comments

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or running instance)
- Postman (for testing endpoints)
- MongoDB Compass (optional, for visual database management)

### Task 1: Student Management Setup

```bash
cd Task1_StudentManagement
npm install
```

Create `.env`:
```
MONGODB_URI=mongodb://localhost:27017/task1_student_management
PORT=5000
NODE_ENV=development
```

Start server:
```bash
npm run dev
```

Server runs on: `http://localhost:5000`

---

### Task 2: Blog Platform Setup

```bash
cd Task2_BlogPlatform
npm install
```

Create `.env`:
```
MONGODB_URI=mongodb://localhost:27017/task2_blog_platform
PORT=5001
NODE_ENV=development
```

Start server:
```bash
npm run dev
```

Server runs on: `http://localhost:5001`

---

## 📁 Directory Structure

```
Assignment 4/
├── Task1_StudentManagement/
│   ├── app.js
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   ├── README.md              # Full Task 1 documentation
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Student.js
│   ├── controllers/
│   │   └── studentController.js
│   └── routes/
│       └── studentRoutes.js
│
├── Task2_BlogPlatform/
│   ├── app.js
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   ├── README.md              # Full Task 2 documentation
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Comment.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── postController.js
│   │   └── commentController.js
│   └── routes/
│       ├── userRoutes.js
│       ├── postRoutes.js
│       └── commentRoutes.js
│
└── README.md                   # This file
```

---

## 🎯 Task 1: Student Management API

### Features
✅ Create students with validation  
✅ Retrieve all students with pagination & department filtering  
✅ Search students by name (case-insensitive regex match)  
✅ Get single student by ID  
✅ Update student (PUT - full update)  
✅ Partially update student (PATCH)  
✅ Delete student (hard delete)  
✅ Deactivate student (soft delete - PATCH `/api/students/:id/deactivate`)  

### Core Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/students` | Create new student |
| GET | `/api/students` | Get all students (with pagination/filter) |
| GET | `/api/students/search?name=` | Search by name |
| GET | `/api/students/:id` | Get student by ID |
| PUT | `/api/students/:id` | Full update |
| PATCH | `/api/students/:id` | Partial update |
| DELETE | `/api/students/:id` | Delete student |
| PATCH | `/api/students/:id/deactivate` | Soft delete |

### Student Schema

```javascript
{
  rollNumber: String (unique, required),
  name: String (required),
  email: String (unique, validated, required),
  department: String (required),
  cgpa: Number (0.0-4.0, required),
  enrollmentYear: Number (required),
  isActive: Boolean (default: true)
}
```

**See `Task1_StudentManagement/README.md` for full documentation with request/response examples.**

---

## 🎯 Task 2: Blog Platform API

### Features
✅ User registration with bcrypt password hashing  
✅ View users with paginated list  
✅ Retrieve user with all their posts  
✅ Create posts with tags  
✅ Get posts with author details populated  
✅ Filter posts by tag  
✅ Update posts  
✅ Delete posts with cascade delete of comments  
✅ Add comments to posts  
✅ Get comments with user details populated  
✅ Delete comments  

### Core Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/users/register` | Register new user |
| GET | `/api/users` | Get all users (paginated) |
| GET | `/api/users/:id` | Get user with all posts |
| POST | `/api/posts` | Create new post |
| GET | `/api/posts` | Get all posts (with author details) |
| GET | `/api/posts?tag=` | Filter posts by tag |
| GET | `/api/posts/:id` | Get post by ID |
| PUT | `/api/posts/:id` | Update post |
| DELETE | `/api/posts/:id` | Delete post & cascade delete comments |
| POST | `/api/posts/:postId/comments` | Add comment to post |
| GET | `/api/posts/:postId/comments` | Get comments for post |
| DELETE | `/api/comments/:id` | Delete comment |

### Database Schemas

**User:**
```javascript
{
  username: String (unique, 3+ chars, required),
  email: String (unique, validated, required),
  password: String (6+ chars, hashed, required),
  createdAt: Date (automatic),
  updatedAt: Date (automatic)
}
```

**Post:**
```javascript
{
  title: String (required, max 200),
  content: String (required),
  author: ObjectId (reference to User),
  tags: [String] (lowercase),
  createdAt: Date (automatic),
  updatedAt: Date (automatic)
}
```

**Comment:**
```javascript
{
  text: String (1-1000 chars, required),
  post: ObjectId (reference to Post),
  user: ObjectId (reference to User),
  createdAt: Date (automatic),
  updatedAt: Date (automatic)
}
```

**See `Task2_BlogPlatform/README.md` for full documentation with request/response examples.**

---

## 🧪 Testing with Postman

### Import Requests
Each README file contains complete request/response examples that can be directly used in Postman.

### Sample Test Workflow

#### Task 1 Testing Sequence:
1. POST - Create student → Get `_id`
2. GET - Retrieve all students
3. GET - Search by name
4. GET - Get specific student
5. PATCH - Update CGPA only
6. PUT - Update multiple fields
7. PATCH - Deactivate student
8. DELETE - Delete student

#### Task 2 Testing Sequence:
1. POST - Register user → Get `_id`
2. POST - Create post → Get `_id`
3. GET - Retrieve all posts
4. POST - Add comment → Get comment `_id`
5. GET - Retrieve comments
6. PUT - Update post
7. DELETE - Delete comment
8. DELETE - Delete post (verify comments are deleted)

---

## 📊 MongoDB Collections Reference

### Task 1 Database: `task1_student_management`
- Collection: `students`

### Task 2 Database: `task2_blog_platform`
- Collection: `users`
- Collection: `posts`
- Collection: `comments`

Use MongoDB Compass to:
- View collections and documents
- Verify data storage
- Check indexes
- Monitor cascade deletes

---

## 🔐 Key Technical Features

### Error Handling
- Consistent JSON error format across all endpoints
- Specific HTTP status codes (200, 201, 400, 404, 500)
- Validation error messages in array format

### Data Validation
- Email format validation using regex
- CGPA range constraints (0.0-4.0)
- Password hashing with bcryptjs (10 salt rounds)
- Unique constraints on rollNumber, email, username

### Data Relationships
- Post documents reference User documents
- Comment documents reference both Post and User
- Author/User details populated in responses

### Cascade Delete
- Task 2: Deleting a post automatically removes all associated comments
- Implemented at controller level for reliability

### Pagination
- Implemented on all collection GET endpoints
- Customizable `page` and `limit` query parameters
- Returns total count and calculated page numbers

---

## 💡 Implementation Notes

### Architecture
- **Modular Structure**: Separation of concerns (routes, controllers, models)
- **Error Middleware**: Global error handling for uncaught exceptions
- **Request Logging**: Timestamps for all incoming requests
- **Environment Configuration**: Dotenv for secure credential management

### Database Connection
- Mongoose for ODM
- Connection pooling with useNewUrlParser and useUnifiedTopology
- Automatic index creation on schema fields

### API Response Format
All successful responses:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

All error responses:
```json
{
  "success": false,
  "error": "Error message or array"
}
```

---

## 📝 For Your PDF Report

### Screenshots to Include:

**Task 1 Section:**
1. Create Student - 201 status
2. Get All Students - 200 status with pagination
3. Search by Name - 200 status showing regex match
4. Get by ID - 200 status
5. Update (PUT) - 200 status
6. Partial Update (PATCH) - 200 status
7. Deactivate - 200 status showing isActive=false
8. Delete - 200 status
9. MongoDB Compass showing students collection

**Task 2 Section:**
1. Register User - 201 status
2. Get All Users - 200 status
3. Get User with Posts - 200 status
4. Create Post - 201 status with author populated
5. Get All Posts - 200 status
6. Filter by Tag - 200 status with filtered results
7. Create Comment - 201 status
8. Get Comments - 200 status
9. Delete Post - 200 status
10. Verify comments deleted in MongoDB Compass
11. MongoDB Compass showing users, posts, comments collections

---

## 🛠️ Development Commands

### Task 1
```bash
cd Task1_StudentManagement

# Install dependencies
npm install

# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

### Task 2
```bash
cd Task2_BlogPlatform

# Install dependencies
npm install

# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

---

## 📚 Dependencies

### Task 1
- express ^4.18.2
- mongoose ^7.5.0
- dotenv ^16.3.1
- nodemon ^3.0.1 (dev)

### Task 2
- express ^4.18.2
- mongoose ^7.5.0
- bcryptjs ^2.4.3
- dotenv ^16.3.1
- nodemon ^3.0.1 (dev)

---

## ✅ Assignment Requirements Met

✅ **Project Architecture**: Two separate directories with modular folder structure  
✅ **Package.json**: All dependencies specified (express, mongoose, bcrypt, dotenv)  
✅ **Task 1**: Full student CRUD with all specified endpoints  
✅ **Task 1**: Soft delete functionality via `/api/students/:id/deactivate`  
✅ **Task 2**: User registration with password hashing  
✅ **Task 2**: Post/Comment relationships with population  
✅ **Task 2**: Cascade delete when post is deleted  
✅ **Documentation**: Complete README for each task with examples  
✅ **Postman Guide**: Expected request/response for every endpoint  
✅ **Error Handling**: HTTP status codes (200, 201, 400, 404, 500)  
✅ **Validation**: Email, CGPA, password constraints  
✅ **Coding Style**: ES6+ with proper error handling  

---

## 📞 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify port (default: 27017)

### Port Already in Use
- Task 1 runs on port 5000
- Task 2 runs on port 5001
- Change in `.env` if needed

### Module Not Found
- Run `npm install` in the specific task directory
- Verify all files are in correct folders

### Validation Errors
- Check email format (must be valid)
- CGPA must be between 0.0 and 4.0
- Password must be 6+ characters
- Username must be 3+ characters

---

## 📄 License

This is a university assignment project.

---

## 🎓 Academic Notes

Both applications follow best practices for:
- REST API design
- Data validation and sanitization
- Error handling and status codes
- Database relationships and referential integrity
- Password security (hashing, not storing plaintext)
- Modular code organization
- Environmental configuration management

Each task is independent and can be run separately for testing and demonstration purposes.

---

**Ready to deploy and test! Follow the Quick Start section to get both servers running.** 🚀
