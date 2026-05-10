# Postman Testing Guide & PDF Report Instructions

Complete guide for testing both Task 1 and Task 2 APIs using Postman, with instructions for creating your PDF report with screenshots.

---

## 📋 Pre-Testing Checklist

Before starting your Postman tests:

- [ ] MongoDB is running (`mongod` command)
- [ ] Task 1 server running on port 5000 (`npm run dev`)
- [ ] Task 2 server running on port 5001 (`npm run dev`)
- [ ] Postman is open
- [ ] MongoDB Compass is installed and opened
- [ ] You have permission to take screenshots

---

## 🎯 TASK 1: STUDENT MANAGEMENT SYSTEM

Run on: `http://localhost:5000`

### Test 1: Create Student (POST)

**Setup:**
- Method: POST
- URL: `http://localhost:5000/api/students`
- Header: Content-Type: application/json

**Request Body:**
```json
{
  "rollNumber": "CSE2024001",
  "name": "Aditya Kumar",
  "email": "aditya.kumar@university.edu",
  "department": "Computer Science",
  "cgpa": 3.8,
  "enrollmentYear": 2024
}
```

**Expected Result:**
- Status: **201 Created** ✓
- Response shows student with _id, timestamps, isActive: true

**Screenshot for PDF:** 
- Show request tab with URL and body
- Show response tab with 201 status and full student object

---

### Test 2: Create Second Student (POST)

**Request Body:**
```json
{
  "rollNumber": "ECE2024002",
  "name": "Priya Sharma",
  "email": "priya.sharma@university.edu",
  "department": "Electronics",
  "cgpa": 3.9,
  "enrollmentYear": 2023
}
```

**Expected Result:**
- Status: **201 Created** ✓

**Purpose:** For filtering and pagination tests later

---

### Test 3: Create Third Student (POST)

**Request Body:**
```json
{
  "rollNumber": "CSE2024003",
  "name": "Arjun Singh",
  "email": "arjun.singh@university.edu",
  "department": "Computer Science",
  "cgpa": 3.7,
  "enrollmentYear": 2024
}
```

**Expected Result:**
- Status: **201 Created** ✓

---

### Test 4: Get All Students with Pagination (GET)

**URL:** `http://localhost:5000/api/students?page=1&limit=10`

**Expected Result:**
- Status: **200 OK** ✓
- Response shows count, total, page, pages, and data array
- Should show all 3 students created

**Screenshot for PDF:**
- Show query parameters in URL
- Show response with pagination info
- Highlight 200 OK status code

---

### Test 5: Get Students Filtered by Department (GET)

**URL:** `http://localhost:5000/api/students?department=Computer%20Science&page=1&limit=10`

**Expected Result:**
- Status: **200 OK** ✓
- Response shows only 2 students (Aditya and Arjun from CSE)
- Total: 2

**Screenshot for PDF:**
- Show URL with department filter
- Show filtered results in response
- Highlight case-insensitive filtering

---

### Test 6: Search Student by Name (GET)

**URL:** `http://localhost:5000/api/students/search?name=arjun`

**Expected Result:**
- Status: **200 OK** ✓
- Response shows 1 student matching "arjun" (case-insensitive)
- Demonstrates regex partial match

**Screenshot for PDF:**
- Show search query parameter
- Show regex match working (lowercase query matched uppercase name)
- Show 1 result returned

---

### Test 7: Get Student by ID (GET)

First, copy the `_id` from one of the previous responses. Example: "65a4d2f8c1e2b3a4f5g6h7i8"

**URL:** `http://localhost:5000/api/students/65a4d2f8c1e2b3a4f5g6h7i8`

**Expected Result:**
- Status: **200 OK** ✓
- Response shows single student with all details

**Screenshot for PDF:**
- Show full URL with student ID
- Show complete student object in response
- Highlight 200 OK status

---

### Test 8: Update Student - Full Update (PUT)

Use same student ID from Test 7

**URL:** `http://localhost:5000/api/students/65a4d2f8c1e2b3a4f5g6h7i8`

**Request Body:**
```json
{
  "name": "Aditya Kumar Singh",
  "cgpa": 3.95,
  "enrollmentYear": 2024
}
```

**Expected Result:**
- Status: **200 OK** ✓
- Response shows updated student with new values
- updatedAt timestamp changed

**Screenshot for PDF:**
- Show PUT method in URL
- Show updated values in response
- Highlight 200 OK and changed updatedAt

---

### Test 9: Partial Update Student (PATCH)

Use same student ID

**URL:** `http://localhost:5000/api/students/65a4d2f8c1e2b3a4f5g6h7i8`

**Request Body:**
```json
{
  "cgpa": 4.0
}
```

**Expected Result:**
- Status: **200 OK** ✓
- Response shows only CGPA changed to 4.0
- Other fields remain unchanged

**Screenshot for PDF:**
- Show PATCH method
- Show only one field updated (CGPA)
- Highlight that other fields preserved

---

### Test 10: Deactivate Student (PATCH /deactivate)

Use same student ID

**URL:** `http://localhost:5000/api/students/65a4d2f8c1e2b3a4f5g6h7i8/deactivate`

**Method:** PATCH

**Expected Result:**
- Status: **200 OK** ✓
- Response shows `isActive: false`
- This is soft delete (record still in database)

**Screenshot for PDF:**
- Show `/deactivate` endpoint
- Show isActive changed from true to false
- Highlight 200 OK status
- **This is the special PATCH endpoint requirement**

---

### Test 11: Delete Student (DELETE)

Use a different student ID (not the one you just deactivated)

**URL:** `http://localhost:5000/api/students/DIFFERENT_ID`

**Method:** DELETE

**Expected Result:**
- Status: **200 OK** ✓
- Response shows empty data object
- Message: "Student deleted successfully"

**Screenshot for PDF:**
- Show DELETE method
- Show 200 OK status
- Show empty data in response (hard delete)

---

### Test 12: Error Handling - Invalid Email (POST)

**URL:** `http://localhost:5000/api/students`

**Request Body:**
```json
{
  "rollNumber": "TEST001",
  "name": "Test User",
  "email": "invalid-email-format",
  "department": "CSE",
  "cgpa": 3.5,
  "enrollmentYear": 2024
}
```

**Expected Result:**
- Status: **400 Bad Request** ✓
- Error message about invalid email format

---

### Test 13: Error Handling - CGPA Out of Range (POST)

**Request Body:**
```json
{
  "rollNumber": "TEST002",
  "name": "Test User",
  "email": "test@university.edu",
  "department": "CSE",
  "cgpa": 5.0,
  "enrollmentYear": 2024
}
```

**Expected Result:**
- Status: **400 Bad Request** ✓
- Error message: "CGPA cannot be greater than 4.0"

---

### Test 14: Error Handling - Duplicate Roll Number (POST)

Try creating a student with same rollNumber as existing student

**Expected Result:**
- Status: **400 Bad Request** ✓
- Error message: "A student with this rollNumber already exists"

---

### Test 15: MongoDB Compass - Verify Data

Open MongoDB Compass and navigate to:
- Database: `task1_student_management`
- Collection: `students`

**What to verify:**
- View all created students
- Check indexes on rollNumber and email (unique flags)
- Verify deactivated student has isActive: false
- Verify timestamps on each document

**Screenshot for PDF:**
- Show collection view in MongoDB Compass
- Show 2-3 complete student documents
- Show field structure and data types

---

## 🎯 TASK 2: BLOG PLATFORM API

Run on: `http://localhost:5001`

### Test 1: Register User (POST)

**URL:** `http://localhost:5001/api/users/register`

**Method:** POST

**Request Body:**
```json
{
  "username": "alice_wonder",
  "email": "alice@example.com",
  "password": "SecurePass123"
}
```

**Expected Result:**
- Status: **201 Created** ✓
- Response shows user data WITHOUT password
- Includes createdAt timestamp
- **IMPORTANT:** Note the user _id for later tests

**Screenshot for PDF:**
- Show POST request to /register
- Show 201 Created status
- Show user object WITHOUT password field
- Save user _id for next tests

---

### Test 2: Register Second User (POST)

**Request Body:**
```json
{
  "username": "bob_builder",
  "email": "bob@example.com",
  "password": "SecurePass456"
}
```

**Expected Result:**
- Status: **201 Created** ✓
- **IMPORTANT:** Note this user _id also

---

### Test 3: Get All Users (GET)

**URL:** `http://localhost:5001/api/users?page=1&limit=10`

**Expected Result:**
- Status: **200 OK** ✓
- Shows 2 users in array
- Pagination info included
- NO passwords in response

**Screenshot for PDF:**
- Show pagination parameters
- Show 200 OK status
- Show users array (without passwords)
- Highlight count, total, pages

---

### Test 4: Create Post (POST)

Use first user _id from Test 1

**URL:** `http://localhost:5001/api/posts`

**Request Body:**
```json
{
  "title": "Getting Started with Node.js and Express",
  "content": "Node.js is a powerful JavaScript runtime that allows you to build server-side applications. In this comprehensive guide, we'll explore how to build RESTful APIs using Express.js framework...",
  "author": "FIRST_USER_ID_HERE",
  "tags": ["nodejs", "javascript", "backend"]
}
```

**Expected Result:**
- Status: **201 Created** ✓
- Response shows post with author details populated (username, email only)
- Includes _id and timestamps
- **IMPORTANT:** Note the post _id

**Screenshot for PDF:**
- Show POST request to /posts
- Show 201 Created status
- Show author object populated with username/email
- Show tags array
- Save post _id

---

### Test 5: Create Second Post (POST)

Use second user _id from Test 2

**Request Body:**
```json
{
  "title": "MongoDB Best Practices for Production",
  "content": "MongoDB is a flexible NoSQL database that scales horizontally. When deploying MongoDB to production, there are several critical best practices to follow...",
  "author": "SECOND_USER_ID_HERE",
  "tags": ["mongodb", "database", "backend"]
}
```

**Expected Result:**
- Status: **201 Created** ✓
- **IMPORTANT:** Note this post _id

---

### Test 6: Get All Posts (GET)

**URL:** `http://localhost:5001/api/posts?page=1&limit=10`

**Expected Result:**
- Status: **200 OK** ✓
- Shows 2 posts
- Author details populated in each post
- Pagination info

**Screenshot for PDF:**
- Show GET request
- Show 200 OK status
- Show posts array with author populated
- Highlight pagination

---

### Test 7: Filter Posts by Tag (GET)

**URL:** `http://localhost:5001/api/posts?tag=backend`

**Expected Result:**
- Status: **200 OK** ✓
- Shows 2 posts (both have "backend" tag)
- Author details populated

**Screenshot for PDF:**
- Show tag filter parameter
- Show filtered results
- Highlight 200 OK

---

### Test 8: Get Post by ID (GET)

Use first post _id from Test 4

**URL:** `http://localhost:5001/api/posts/FIRST_POST_ID`

**Expected Result:**
- Status: **200 OK** ✓
- Shows single post with full details
- Author populated

---

### Test 9: Get User with All Posts (GET)

Use first user _id from Test 1

**URL:** `http://localhost:5001/api/users/FIRST_USER_ID`

**Expected Result:**
- Status: **200 OK** ✓
- Response shows user object and array of all their posts
- postCount: 1
- Password NOT included

**Screenshot for PDF:**
- Show user + posts relationship
- Show all user's posts populated
- Show 200 OK status
- Highlight postCount

---

### Test 10: Add Comment to Post (POST)

Use first post _id and second user _id

**URL:** `http://localhost:5001/api/posts/FIRST_POST_ID/comments`

**Request Body:**
```json
{
  "text": "Great article! I learned a lot about Node.js best practices.",
  "user": "SECOND_USER_ID_HERE"
}
```

**Expected Result:**
- Status: **201 Created** ✓
- Response shows comment with user details populated (username, email)
- Includes comment _id
- **IMPORTANT:** Note comment _id

**Screenshot for PDF:**
- Show nested route /comments
- Show 201 Created status
- Show user details populated
- Save comment _id

---

### Test 11: Add Second Comment to Post (POST)

Use same post ID and first user ID

**Request Body:**
```json
{
  "text": "This tutorial is exactly what I needed to start with backend development!",
  "user": "FIRST_USER_ID_HERE"
}
```

**Expected Result:**
- Status: **201 Created** ✓

---

### Test 12: Get Comments for Post (GET)

Use first post _id

**URL:** `http://localhost:5001/api/posts/FIRST_POST_ID/comments?page=1&limit=10`

**Expected Result:**
- Status: **200 OK** ✓
- Shows 2 comments
- User details populated in each comment
- Pagination working

**Screenshot for PDF:**
- Show pagination working
- Show 200 OK status
- Show comments array with users populated
- Show count and total

---

### Test 13: Update Post (PUT)

Use first post _id

**URL:** `http://localhost:5001/api/posts/FIRST_POST_ID`

**Request Body:**
```json
{
  "title": "Complete Guide: Getting Started with Node.js and Express",
  "content": "Updated content here... Node.js is increasingly popular for building scalable backend applications. This updated guide covers the latest best practices and techniques for 2024...",
  "tags": ["nodejs", "javascript", "backend", "express"]
}
```

**Expected Result:**
- Status: **200 OK** ✓
- Response shows updated post with new title and tags
- updatedAt timestamp changed

**Screenshot for PDF:**
- Show PUT method
- Show 200 OK status
- Show updated title and tags
- Show updated timestamp

---

### Test 14: Delete Comment (DELETE)

Use comment _id from Test 10

**URL:** `http://localhost:5001/api/comments/COMMENT_ID`

**Expected Result:**
- Status: **200 OK** ✓
- Message: "Comment deleted successfully"

**Screenshot for PDF:**
- Show DELETE method
- Show 200 OK status
- Show empty data object

---

### Test 15: Delete Post (Cascade Delete) (DELETE)

Use second post _id from Test 5

**URL:** `http://localhost:5001/api/posts/SECOND_POST_ID`

**Expected Result:**
- Status: **200 OK** ✓
- Message: "Post and associated comments deleted successfully"

**Important:** Verify cascade delete by checking comments collection

---

### Test 16: Verify Cascade Delete in MongoDB Compass

Open MongoDB Compass:
- Database: `task2_blog_platform`
- Collection: `comments`

**What to verify:**
- Query with filter: `{ post: "SECOND_POST_ID" }`
- Should show NO results (all comments deleted)

**Screenshot for PDF:**
- Show MongoDB Compass with comments collection
- Show search filter for the deleted post
- Show empty results = cascade delete worked ✓

---

### Test 17: Error Handling - Missing Fields (POST)

**URL:** `http://localhost:5001/api/users/register`

**Request Body:**
```json
{
  "username": "test_user"
}
```

**Expected Result:**
- Status: **400 Bad Request** ✓
- Error: "Please provide username, email, and password"

---

### Test 18: Error Handling - Duplicate Email (POST)

Try registering with existing email

**Expected Result:**
- Status: **400 Bad Request** ✓
- Error: "Email already in use"

---

### Test 19: Error Handling - Invalid Post Data (POST)

**Request Body:**
```json
{
  "title": "X",
  "content": "Test",
  "author": "INVALID_ID",
  "tags": []
}
```

**Expected Result:**
- Status: **400 Bad Request** ✓
- Validation error

---

### Test 20: MongoDB Compass - View All Collections

Show database structure for Task 2

**Collections to screenshot:**
1. `users` - Show 2 user documents
2. `posts` - Show remaining posts
3. `comments` - Show comments under first post

**Screenshot for PDF:**
- Show all three collections in MongoDB Compass
- Show sample documents from each
- Demonstrate data relationships

---

## 📊 PDF Report Structure

Organize your PDF with these sections:

### Front Matter
- Title: "Backend Assignment - Task 1 & Task 2"
- Date: [Today's date]
- Student Name: [Your name]
- Table of Contents

### Task 1: Student Management (Pages 1-10)
- Overview and architecture
- Database schema diagram
- Screenshots (in order):
  1. Create Student (201)
  2. Get All Students (200)
  3. Search by Name (200)
  4. Get by ID (200)
  5. Update PUT (200)
  6. Update PATCH (200)
  7. Deactivate - Soft Delete (200, isActive=false)
  8. Delete Hard (200)
  9. Error Handling screenshots (2-3)
  10. MongoDB Compass - students collection

### Task 2: Blog Platform (Pages 11-20)
- Overview and architecture
- Database schemas and relationships
- Screenshots (in order):
  1. Register User (201, no password in response)
  2. Get All Users (200, pagination)
  3. Create Post (201, author populated)
  4. Get All Posts (200, author populated)
  5. Filter by Tag (200)
  6. Get User with Posts (200)
  7. Add Comment (201, user populated)
  8. Get Comments (200, pagination)
  9. Update Post (200)
  10. Delete Post (200)
  11. Verify Cascade Delete (MongoDB shows deleted comments)
  12. Error Handling (2-3 screenshots)
  13. MongoDB Compass - users, posts, comments

### Additional Sections
- Status Code Reference
- Endpoint Summary Table
- Key Features Checklist
- Testing Notes

---

## ✅ Checklist for Grading Requirements

- [ ] All 8 Task 1 endpoints tested and screenshotted
- [ ] All status codes visible (200, 201, 400, 404, 500)
- [ ] Pagination working (shown in screenshots)
- [ ] Filtering working (department, tag)
- [ ] Search/Regex working (case-insensitive)
- [ ] Soft delete visible (isActive: false)
- [ ] Hard delete working
- [ ] Password hashing working (password not in responses)
- [ ] Author/User population working (shown in screenshots)
- [ ] Cascade delete verified in MongoDB Compass
- [ ] All error handling covered
- [ ] MongoDB Compass screenshots for both databases
- [ ] Collections visible: students, users, posts, comments
- [ ] Timestamps present on all documents
- [ ] Unique constraints enforced (duplicates rejected)

---

## 💡 Pro Tips for Screenshots

1. **Status Codes**: Make sure 200/201 is clearly visible in header
2. **Response Body**: Show complete JSON response
3. **Query Parameters**: Show full URL with parameters
4. **Headers**: Include Content-Type headers in requests
5. **MongoDB**: Zoom in to show document structure clearly
6. **Errors**: Show validation error messages
7. **Pagination**: Show page count and total count
8. **Relationships**: Highlight populated fields
9. **Timestamps**: Show createdAt/updatedAt changes
10. **Data Changes**: Before/After comparisons for updates

---

## 🎯 Expected Test Result Summary

**Task 1 Expected Results:**
- ✅ 8 CRUD endpoints working
- ✅ Status codes: 200, 201, 400, 404
- ✅ Pagination: page, limit, pages
- ✅ Search: case-insensitive regex
- ✅ Filter: department matching
- ✅ Soft delete: isActive = false
- ✅ Hard delete: record removed
- ✅ Validations: email, CGPA, unique constraints

**Task 2 Expected Results:**
- ✅ 11 endpoints across 3 resources
- ✅ Password hashing: bcryptjs
- ✅ Population: author/user details
- ✅ Cascade delete: comments removed with post
- ✅ Status codes: 200, 201, 400, 404
- ✅ Tag filtering: working
- ✅ Pagination: all collections
- ✅ Error handling: validation errors

---

**All tests passing! Ready for PDF report! 🎓**
