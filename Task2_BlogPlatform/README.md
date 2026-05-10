# Task 2: Blog Platform API

A comprehensive REST API for a blog platform with user authentication, post management, and commenting system using Express.js, MongoDB, and bcryptjs.

## Project Structure

```
Task2_BlogPlatform/
├── app.js                 # Main Express application
├── package.json          # Project dependencies
├── .env                  # Environment variables
├── .env.example          # Environment template
├── config/
│   └── db.js            # MongoDB connection
├── models/
│   ├── User.js          # User schema with password hashing
│   ├── Post.js          # Post schema with author reference
│   └── Comment.js       # Comment schema with relationships
├── controllers/
│   ├── userController.js       # User business logic
│   ├── postController.js       # Post business logic
│   └── commentController.js    # Comment business logic
└── routes/
    ├── userRoutes.js    # User API routes
    ├── postRoutes.js    # Post API routes
    └── commentRoutes.js # Comment API routes
```

## Installation & Setup

### 1. Install Dependencies
```bash
cd Task2_BlogPlatform
npm install
```

### 2. Configure Environment
Create a `.env` file in the project root:
```
MONGODB_URI=mongodb://localhost:27017/task2_blog_platform
PORT=5001
NODE_ENV=development
```

### 3. Start MongoDB
Ensure MongoDB is running:
```bash
# On Windows
mongod

# Or use MongoDB Compass for GUI management
```

### 4. Run the Server
```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

The server will start on `http://localhost:5001`

## Database Schemas

### User Model

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| username | String | Unique, Required, Min: 3 chars | User's display name |
| email | String | Unique, Validated, Required | Valid email format required |
| password | String | Required, Min: 6 chars, Hashed | Automatically hashed with bcrypt |
| timestamps | - | Automatic | createdAt, updatedAt |

### Post Model

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| title | String | Required, Max: 200 chars | Post title |
| content | String | Required | Post body content |
| author | ObjectId | Reference to User | Foreign key to User |
| tags | [String] | Default: [] | Array of tags (auto-lowercase) |
| timestamps | - | Automatic | createdAt, updatedAt |

### Comment Model

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| text | String | Required, Max: 1000 chars | Comment content |
| post | ObjectId | Reference to Post | Foreign key to Post |
| user | ObjectId | Reference to User | Foreign key to User |
| timestamps | - | Automatic | createdAt, updatedAt |

## API Endpoints

---

## USER ENDPOINTS

### 1. Register User
**Request:**
```http
POST /api/users/register HTTP/1.1
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "65a4d2f8c1e2b3a4f5g6h7i8",
    "username": "johndoe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400 Bad Request - Duplicate Email):**
```json
{
  "success": false,
  "error": "Email already in use"
}
```

**Error Response (400 Bad Request - Missing Fields):**
```json
{
  "success": false,
  "error": "Please provide username, email, and password"
}
```

---

### 2. Get All Users
**Request:**
```http
GET /api/users?page=1&limit=10 HTTP/1.1
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Records per page (default: 10)

**Expected Response (200 OK):**
```json
{
  "success": true,
  "count": 1,
  "total": 1,
  "page": 1,
  "pages": 1,
  "data": [
    {
      "_id": "65a4d2f8c1e2b3a4f5g6h7i8",
      "username": "johndoe",
      "email": "john@example.com",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 3. Get User by ID with All Posts
**Request:**
```http
GET /api/users/65a4d2f8c1e2b3a4f5g6h7i8 HTTP/1.1
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "65a4d2f8c1e2b3a4f5g6h7i8",
      "username": "johndoe",
      "email": "john@example.com",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    "posts": [
      {
        "_id": "65a4e3g9d2f3c4b5a6h7i8j9",
        "title": "My First Blog Post",
        "content": "This is the content of my first post...",
        "author": {
          "_id": "65a4d2f8c1e2b3a4f5g6h7i8",
          "username": "johndoe",
          "email": "john@example.com"
        },
        "tags": ["javascript", "nodejs"],
        "createdAt": "2024-01-15T11:00:00.000Z",
        "updatedAt": "2024-01-15T11:00:00.000Z"
      }
    ],
    "postCount": 1
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": "User not found"
}
```

---

## POST ENDPOINTS

### 4. Create Post
**Request:**
```http
POST /api/posts HTTP/1.1
Content-Type: application/json

{
  "title": "Getting Started with Node.js",
  "content": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. In this post, we'll explore...",
  "author": "65a4d2f8c1e2b3a4f5g6h7i8",
  "tags": ["nodejs", "javascript", "backend"]
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "_id": "65a4e3g9d2f3c4b5a6h7i8j9",
    "title": "Getting Started with Node.js",
    "content": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine...",
    "author": {
      "_id": "65a4d2f8c1e2b3a4f5g6h7i8",
      "username": "johndoe",
      "email": "john@example.com"
    },
    "tags": ["nodejs", "javascript", "backend"],
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z",
    "__v": 0
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Please provide title, content, and author"
}
```

---

### 5. Get All Posts (with Filtering by Tag)
**Request:**
```http
GET /api/posts?page=1&limit=10&tag=nodejs HTTP/1.1
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Records per page (default: 10)
- `tag` (optional): Filter by tag (case-insensitive)

**Expected Response (200 OK):**
```json
{
  "success": true,
  "count": 1,
  "total": 1,
  "page": 1,
  "pages": 1,
  "data": [
    {
      "_id": "65a4e3g9d2f3c4b5a6h7i8j9",
      "title": "Getting Started with Node.js",
      "content": "Node.js is a JavaScript runtime...",
      "author": {
        "_id": "65a4d2f8c1e2b3a4f5g6h7i8",
        "username": "johndoe",
        "email": "john@example.com"
      },
      "tags": ["nodejs", "javascript", "backend"],
      "createdAt": "2024-01-15T11:00:00.000Z",
      "updatedAt": "2024-01-15T11:00:00.000Z"
    }
  ]
}
```

---

### 6. Get Post by ID
**Request:**
```http
GET /api/posts/65a4e3g9d2f3c4b5a6h7i8j9 HTTP/1.1
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "65a4e3g9d2f3c4b5a6h7i8j9",
    "title": "Getting Started with Node.js",
    "content": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine...",
    "author": {
      "_id": "65a4d2f8c1e2b3a4f5g6h7i8",
      "username": "johndoe",
      "email": "john@example.com"
    },
    "tags": ["nodejs", "javascript", "backend"],
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

---

### 7. Update Post
**Request:**
```http
PUT /api/posts/65a4e3g9d2f3c4b5a6h7i8j9 HTTP/1.1
Content-Type: application/json

{
  "title": "Advanced Node.js Concepts",
  "content": "Updated content here...",
  "tags": ["nodejs", "advanced", "backend"]
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Post updated successfully",
  "data": {
    "_id": "65a4e3g9d2f3c4b5a6h7i8j9",
    "title": "Advanced Node.js Concepts",
    "content": "Updated content here...",
    "author": {
      "_id": "65a4d2f8c1e2b3a4f5g6h7i8",
      "username": "johndoe",
      "email": "john@example.com"
    },
    "tags": ["nodejs", "advanced", "backend"],
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T12:30:00.000Z"
  }
}
```

---

### 8. Delete Post (Cascade Delete Comments)
**Request:**
```http
DELETE /api/posts/65a4e3g9d2f3c4b5a6h7i8j9 HTTP/1.1
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Post and associated comments deleted successfully",
  "data": {}
}
```

**Note:** All comments associated with this post are automatically deleted (cascade delete).

---

## COMMENT ENDPOINTS

### 9. Add Comment to Post
**Request:**
```http
POST /api/posts/65a4e3g9d2f3c4b5a6h7i8j9/comments HTTP/1.1
Content-Type: application/json

{
  "text": "This is a great post! Thanks for sharing.",
  "user": "65a4d2f8c1e2b3a4f5g6h7i8"
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "message": "Comment added successfully",
  "data": {
    "_id": "65a4f4h0e3g4d5c6b7i8j9k0",
    "text": "This is a great post! Thanks for sharing.",
    "post": "65a4e3g9d2f3c4b5a6h7i8j9",
    "user": {
      "_id": "65a4d2f8c1e2b3a4f5g6h7i8",
      "username": "johndoe",
      "email": "john@example.com"
    },
    "createdAt": "2024-01-15T12:00:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z",
    "__v": 0
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Please provide text and user"
}
```

---

### 10. Get Comments for Post
**Request:**
```http
GET /api/posts/65a4e3g9d2f3c4b5a6h7i8j9/comments?page=1&limit=10 HTTP/1.1
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Records per page (default: 10)

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
      "_id": "65a4f4h0e3g4d5c6b7i8j9k0",
      "text": "This is a great post! Thanks for sharing.",
      "post": "65a4e3g9d2f3c4b5a6h7i8j9",
      "user": {
        "_id": "65a4d2f8c1e2b3a4f5g6h7i8",
        "username": "johndoe",
        "email": "john@example.com"
      },
      "createdAt": "2024-01-15T12:00:00.000Z",
      "updatedAt": "2024-01-15T12:00:00.000Z"
    }
  ]
}
```

---

### 11. Delete Comment
**Request:**
```http
DELETE /api/comments/65a4f4h0e3g4d5c6b7i8j9k0 HTTP/1.1
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Comment deleted successfully",
  "data": {}
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Comment not found"
}
```

---

## HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| **200** | OK | Successful GET, PUT, DELETE |
| **201** | Created | Successful POST |
| **400** | Bad Request | Validation error, missing fields, duplicate |
| **404** | Not Found | Resource not found |
| **500** | Server Error | Database or server error |

## Key Features

### Password Security
- Passwords are hashed using bcryptjs (salting rounds: 10)
- Passwords are never returned in API responses
- `select: false` on password field prevents accidental exposure

### Data Relationships
- Posts have a reference to their author (User)
- Comments reference both the post and user
- Population includes author/user details in responses

### Cascade Delete
- When a post is deleted, all associated comments are automatically deleted
- This prevents orphaned comments in the database

### Tag Filtering
- Posts can be filtered by tags
- Tags are automatically converted to lowercase for consistency

### Timestamps
- All resources automatically track createdAt and updatedAt
- Sorted by createdAt in descending order for latest-first display

## Postman Collection Testing Guide

For your PDF report, include screenshots in this order:

### Task 2 Screenshots to Capture:

1. **Register User** 
   - Show POST /api/users/register with 201 status
   - Display the user data in response (without password)

2. **Get All Users**
   - Show GET /api/users with pagination
   - Display 200 OK status

3. **Get User with Posts**
   - Show GET /api/users/:id with 200 status
   - Display user profile and their posts array

4. **Create Post**
   - Show POST /api/posts with 201 status
   - Include author populated with username/email

5. **Get All Posts by Tag**
   - Show GET /api/posts?tag=nodejs with 200 status
   - Display filtered results

6. **Create Comment**
   - Show POST /api/posts/:postId/comments with 201 status
   - Display user details populated

7. **Get Post Comments**
   - Show GET /api/posts/:postId/comments with 200 status
   - Display pagination working

8. **Update Post**
   - Show PUT /api/posts/:id with 200 status

9. **Delete Comment**
   - Show DELETE /api/comments/:id with 200 OK

10. **Delete Post (Cascade)**
    - Show DELETE /api/posts/:id with 200 OK
    - Then query comments collection to show they're deleted

11. **MongoDB Compass Screenshots**
    - Show users collection with 2-3 documents
    - Show posts collection with documents
    - Show comments collection before/after cascade delete

## Error Handling

All error responses follow this format:
```json
{
  "success": false,
  "error": "Error message or array of messages"
}
```

### Common Validation Errors

- **Invalid Email**: "Please provide a valid email address"
- **Username Too Short**: "Username must be at least 3 characters long"
- **Password Too Short**: "Password must be at least 6 characters long"
- **Duplicate Username**: "Username already taken"
- **Duplicate Email**: "Email already in use"
- **Missing Required Fields**: "Please provide [field names]"

## Development Notes

- Use `.env` for local development configuration
- MongoDB must be running before starting the server
- All user IDs and Post IDs can be obtained from previous responses
- When creating a post, the `author` field must be a valid User ID
- When adding a comment, both `post` (from URL) and `user` (from body) must be valid IDs
- Tags are automatically converted to lowercase for consistency
- Comments are sorted by newest first (descending createdAt)

## Performance Considerations

- Pagination implemented on all collection endpoints
- Indexes should be created on frequently queried fields (email, username, tags)
- Population of references includes only necessary fields (username, email)
- Cascade delete is performed at application level for reliability

## Security Notes

- Passwords are never logged or returned
- Use HTTPS in production
- Implement rate limiting for production deployment
- Add authentication middleware for protected routes in production
- Validate and sanitize all user inputs
