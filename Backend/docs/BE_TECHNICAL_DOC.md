# DevTinder Backend - Technical Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Functional Requirements](#functional-requirements)
5. [API Documentation](#api-documentation)
6. [Database Schema](#database-schema)
7. [Authentication & Security](#authentication--security)
8. [Middleware](#middleware)
9. [Validation](#validation)
10. [Error Handling](#error-handling)
11. [Configuration](#configuration)
12. [Development Setup](#development-setup)

---

## 🎯 Project Overview

**DevTinder** is a social networking platform designed specifically for developers to connect with each other. Similar to Tinder's swipe-based matching system, DevTinder allows developers to discover, like, and connect with other developers based on their profiles, skills, and interests.

### Core Concept
- **Feed-based Discovery**: Users can browse through developer profiles in a feed
- **Swipe Mechanism**: Like or dislike profiles to express interest
- **Connection Requests**: Send and receive connection requests
- **Profile Management**: Create and edit detailed developer profiles
- **Connection Management**: View accepted connections and manage requests

---

## 🛠 Technology Stack

### Runtime & Framework
- **Node.js**: JavaScript runtime environment
- **Express.js 5.1.0**: Web application framework for building RESTful APIs

### Database
- **MongoDB**: NoSQL database for storing user data and connection requests
- **Mongoose 8.19.1**: MongoDB object modeling tool for Node.js

### Authentication & Security
- **JSON Web Token (JWT) 9.0.2**: For user authentication and session management
- **bcrypt 6.0.0**: Password hashing library for secure password storage
- **cookie-parser 1.4.7**: Middleware for parsing cookies

### Validation
- **validator 13.15.15**: Library for data validation (email, password strength, URLs)

### Utilities
- **CORS 2.8.5**: Cross-Origin Resource Sharing middleware for frontend communication

### Development Tools
- **nodemon**: Development dependency for auto-restarting server during development

---

## 📁 Project Structure

```
Backend/
├── src/
│   ├── app.js                    # Main application entry point
│   ├── config/
│   │   └── database.js           # MongoDB connection configuration
│   ├── middlewares/
│   │   └── auth.js               # JWT authentication middleware
│   ├── models/
│   │   ├── user.js               # User schema and model
│   │   └── connectionRequest.js # Connection request schema and model
│   ├── routes/
│   │   ├── auth.js               # Authentication routes (signup, login, logout)
│   │   ├── profile.js            # Profile management routes
│   │   ├── request.js            # Connection request routes
│   │   └── user.js               # User feed and connections routes
│   ├── utils/
│   │   └── validation.js         # Input validation utilities
│   ├── apiList.md                # API endpoint reference
│   └── work.md                   # Development notes
├── package.json                  # Project dependencies and scripts
├── package-lock.json            # Dependency lock file
└── .gitignore                   # Git ignore rules
```

---

## 📝 Functional Requirements

### 1. User Authentication
- **Signup**: New users can create accounts with email, password, first name, and last name
- **Login**: Existing users can authenticate using email and password
- **Logout**: Users can log out, which invalidates their session token
- **Session Management**: JWT tokens stored in HTTP-only cookies for secure authentication

### 2. Profile Management
- **View Profile**: Users can view their own profile information
- **Edit Profile**: Users can update their profile details including:
  - Personal information (firstName, lastName, age, gender)
  - Profile photo (photoUrl)
  - About section
  - Skills array (up to 10 skills)

### 3. Feed System
- **User Discovery**: Users can browse through other developers' profiles
- **Smart Filtering**: Feed excludes:
  - Current user's own profile
  - Already sent/received connection requests
  - Existing connections
- **Pagination**: Supports pagination with configurable page size (max 50 per page)

### 4. Connection Requests
- **Send Requests**: Users can like or dislike other users from the feed
- **Review Requests**: Users can accept or reject incoming connection requests
- **Request Status**: Four possible statuses:
  - `like`: Initial interest expressed
  - `dislike`: User not interested
  - `accepted`: Connection request accepted (mutual match)
  - `rejected`: Connection request rejected

### 5. Connections Management
- **View Connections**: Users can view all their accepted connections (mutual matches)
- **View Requests**: Users can view all pending connection requests they've received

### 6. Data Validation
- **Email Validation**: Ensures valid email format
- **Password Strength**: Enforces strong password requirements
- **URL Validation**: Validates photo URLs
- **Field Restrictions**: Age (18-50), gender enum, skills limit (10)

---

## 🔌 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication Routes (`/auth`)

#### POST `/signup`
Create a new user account.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "emailId": "john.doe@example.com",
  "password": "StrongPass123!"
}
```

**Response:**
```json
{
  "message": "User Added successfully!",
  "data": {
    "_id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "emailId": "john.doe@example.com",
    ...
  }
}
```

**Cookies:** Sets `token` cookie with JWT (expires in 8 hours)

---

#### POST `/login`
Authenticate an existing user.

**Request Body:**
```json
{
  "emailId": "john.doe@example.com",
  "password": "StrongPass123!"
}
```

**Response:**
```json
{
  "_id": "...",
  "firstName": "John",
  "lastName": "Doe",
  "emailId": "john.doe@example.com",
  ...
}
```

**Cookies:** Sets `token` cookie with JWT (expires in 8 hours)

---

#### POST `/logout`
Log out the current user.

**Response:**
```
"Logged out successfully!!!"
```

**Cookies:** Clears `token` cookie

---

### Profile Routes (`/profile`)

#### GET `/profile/view`
Get the authenticated user's profile.

**Headers:** Requires authentication cookie

**Response:**
```json
{
  "_id": "...",
  "firstName": "John",
  "lastName": "Doe",
  "emailId": "john.doe@example.com",
  "age": 25,
  "gender": "male",
  "photoUrl": "https://...",
  "about": "Full-stack developer...",
  "skills": ["JavaScript", "React", "Node.js"],
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

#### PATCH `/profile/edit`
Update the authenticated user's profile.

**Headers:** Requires authentication cookie

**Request Body:** (All fields optional)
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "age": 26,
  "gender": "male",
  "photoUrl": "https://example.com/photo.jpg",
  "about": "Updated about section",
  "skills": ["JavaScript", "React", "Node.js", "MongoDB"]
}
```

**Response:**
```json
{
  "message": "John, your profile updated successfully",
  "data": {
    ...
  }
}
```

---

### Connection Request Routes (`/request`)

#### POST `/request/send/:status/:toUserId`
Send a like or dislike request to another user.

**Headers:** Requires authentication cookie

**URL Parameters:**
- `status`: `"like"` or `"dislike"`
- `toUserId`: MongoDB ObjectId of the target user

**Response:**
```json
{
  "message": "John liked Jane",
  "data": {
    "_id": "...",
    "fromUserId": "...",
    "toUserId": "...",
    "status": "like",
    "createdAt": "..."
  }
}
```

**Error Cases:**
- Invalid status type
- User not found
- Connection request already exists
- Cannot send request to yourself

---

#### POST `/request/review/:status/:requestId`
Accept or reject an incoming connection request.

**Headers:** Requires authentication cookie

**URL Parameters:**
- `status`: `"accepted"` or `"rejected"`
- `requestId`: MongoDB ObjectId of the connection request

**Response:**
```json
{
  "message": "Connection request accepted successfully",
  "data": {
    "_id": "...",
    "fromUserId": "...",
    "toUserId": "...",
    "status": "accepted",
    ...
  }
}
```

**Error Cases:**
- Invalid status type
- Connection request not found
- Request is not in "like" status
- Request doesn't belong to logged-in user

---

### User Routes (`/user`)

#### GET `/user/feed`
Get a paginated feed of user profiles to browse.

**Headers:** Requires authentication cookie

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 50)

**Response:**
```json
{
  "message": "Data fetched successfully",
  "data": [
    {
      "_id": "...",
      "firstName": "Jane",
      "lastName": "Smith",
      "about": "...",
      "age": 28,
      "gender": "female",
      "skills": ["Python", "Django"],
      "photoUrl": "..."
    },
    ...
  ]
}
```

**Filtering Logic:**
- Excludes current user
- Excludes users with existing connection requests (sent or received)
- Returns only safe user data (no password, email)

---

#### GET `/user/connections`
Get all accepted connections (mutual matches).

**Headers:** Requires authentication cookie

**Response:**
```json
{
  "message": "Data fetched successfully",
  "data": [
    {
      "_id": "...",
      "firstName": "Jane",
      "lastName": "Smith",
      "about": "...",
      "age": 28,
      "gender": "female",
      "skills": ["Python", "Django"],
      "photoUrl": "..."
    },
    ...
  ]
}
```

---

#### GET `/user/requests/received`
Get all pending connection requests received by the user.

**Headers:** Requires authentication cookie

**Response:**
```json
{
  "message": "Data fetched successfully",
  "data": [
    {
      "_id": "...",
      "fromUserId": {
        "_id": "...",
        "firstName": "Bob",
        "lastName": "Johnson",
        "about": "...",
        "age": 30,
        "gender": "male",
        "skills": ["Java", "Spring"],
        "photoUrl": "..."
      },
      "toUserId": "...",
      "status": "like",
      "createdAt": "..."
    },
    ...
  ]
}
```

---

## 🗄 Database Schema

### User Model

```javascript
{
  firstName: String (required, 3-20 chars, trimmed)
  lastName: String (required, 3-20 chars, trimmed)
  emailId: String (required, unique, lowercase, trimmed, validated as email)
  password: String (required, trimmed, validated as strong password)
  age: Number (optional, min: 18, max: 50)
  gender: String (optional, enum: ["male", "female", "others"])
  photoUrl: String (optional, validated as URL)
  about: String (optional, default: "This is a default about of the user!")
  skills: [String] (optional, array of strings)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

**Methods:**
- `getJWT()`: Generates a JWT token for the user with 7-day expiration

---

### ConnectionRequest Model

```javascript
{
  fromUserId: ObjectId (required, ref: "User")
  toUserId: ObjectId (required, ref: "User")
  status: String (required, enum: ["like", "dislike", "accepted", "rejected"])
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

**Indexes:**
- Compound index on `{fromUserId: 1, toUserId: 1}` for fast querying

**Pre-save Validation:**
- Prevents users from sending connection requests to themselves

---

## 🔐 Authentication & Security

### JWT Token Management
- **Secret Key**: `"DEV@Tinder$369"` (⚠️ Should be moved to environment variables in production)
- **Expiration**: 7 days
- **Storage**: HTTP-only cookies (8-hour expiration)
- **Token Payload**: `{ _id: user._id }`

### Password Security
- **Hashing**: bcrypt with salt rounds of 10
- **Validation**: Strong password requirements enforced via validator library
- **Storage**: Passwords are never stored in plain text

### Cookie Security
- **HTTP-only**: Prevents JavaScript access (XSS protection)
- **Same-origin**: CORS configured for specific frontend origin
- **Expiration**: 8 hours from creation

### CORS Configuration
```javascript
{
  origin: "http://localhost:5173",  // Frontend URL
  credentials: true                  // Allows cookies
}
```

---

## 🛡 Middleware

### Authentication Middleware (`userAuth`)

**Location:** `src/middlewares/auth.js`

**Functionality:**
1. Extracts JWT token from request cookies
2. Verifies token signature and expiration
3. Retrieves user from database using token payload
4. Attaches user object to `req.user` for use in route handlers
5. Returns 401 Unauthorized if token is missing or invalid

**Usage:**
```javascript
router.get("/protected-route", userAuth, async (req, res) => {
  // req.user is available here
});
```

---

## ✅ Validation

### Validation Utilities (`src/utils/validation.js`)

#### `validateSignUpData(req)`
Validates signup request data:
- First name and last name must be present
- Email must be valid format
- Password must meet strong password requirements

#### `validateLoginData(req)`
Validates login request data:
- Email must be present and valid format

#### `validateProfileEditData(req)`
Validates profile edit request data:
- Age must be greater than 18
- Photo URL must be valid URL format
- Skills array cannot exceed 10 items
- Only allowed fields can be edited:
  - `firstName`, `lastName`, `age`, `gender`, `photoUrl`, `about`, `skills`

**Returns:** `true` if valid, throws error if invalid

---

## ⚠️ Error Handling

### Error Response Format
```json
{
  "error": "ERROR: <error message>"
}
```

### Common Error Scenarios

1. **401 Unauthorized**
   - Missing or invalid JWT token
   - User not found in database

2. **400 Bad Request**
   - Validation errors
   - Invalid request parameters
   - Business logic violations (e.g., duplicate connection request)

3. **Database Errors**
   - Connection failures
   - Duplicate key violations
   - Validation errors from Mongoose

### Error Handling Pattern
```javascript
try {
  // Route logic
} catch (error) {
  res.status(400).send("ERROR: " + error.message);
}
```

---

## ⚙️ Configuration

### Database Configuration (`src/config/database.js`)

**MongoDB Connection:**
- Connection string: MongoDB Atlas cluster
- Database name: `devTinder`
- Connection method: `mongoose.connect()`

**Note:** Connection string is hardcoded (⚠️ Should use environment variables in production)

### Server Configuration (`src/app.js`)

- **Port:** 3000
- **CORS Origin:** `http://localhost:5173`
- **JSON Parsing:** Enabled
- **Cookie Parsing:** Enabled

---

## 🚀 Development Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB instance)
- npm or yarn package manager

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Database**
   - Update MongoDB connection string in `src/config/database.js`
   - Or set `MONGODB_URI` environment variable

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   Uses nodemon for auto-restart on file changes

4. **Start Production Server**
   ```bash
   npm start
   ```

### Environment Variables (Recommended for Production)

Create a `.env` file:
```env
PORT=3000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key-here
FRONTEND_URL=http://localhost:5173
```

### Scripts

- `npm start`: Start production server
- `npm run dev`: Start development server with nodemon

---

## 📊 API Flow Examples

### User Registration Flow
1. User submits signup form → `POST /signup`
2. Backend validates input data
3. Password is hashed with bcrypt
4. User document is created in MongoDB
5. JWT token is generated
6. Token is set in HTTP-only cookie
7. User data is returned to frontend

### Connection Request Flow
1. User views feed → `GET /user/feed`
2. User likes a profile → `POST /request/send/like/:userId`
3. Connection request is created with status "like"
4. Target user views requests → `GET /user/requests/received`
5. Target user accepts → `POST /request/review/accepted/:requestId`
6. Status updated to "accepted"
7. Both users can see each other in connections → `GET /user/connections`

---

## 🔄 Data Flow

### Request Flow
```
Client Request
    ↓
Express App (app.js)
    ↓
CORS Middleware
    ↓
JSON Parser
    ↓
Cookie Parser
    ↓
Route Handler
    ↓
Authentication Middleware (if protected)
    ↓
Validation (if applicable)
    ↓
Business Logic
    ↓
Database Operation
    ↓
Response to Client
```

---

## 📝 Notes & Best Practices

### Current Implementation Notes
- JWT secret is hardcoded (should use environment variables)
- Database connection string is hardcoded (should use environment variables)
- Error messages are sent as plain strings (consider structured error responses)
- No rate limiting implemented
- No request logging/monitoring

### Recommended Improvements
1. **Environment Variables**: Move secrets and configuration to `.env`
2. **Error Handling**: Implement structured error responses
3. **Logging**: Add request logging (e.g., Winston, Morgan)
4. **Rate Limiting**: Implement rate limiting for API endpoints
5. **Input Sanitization**: Add input sanitization to prevent injection attacks
6. **API Documentation**: Consider using Swagger/OpenAPI
7. **Testing**: Add unit and integration tests
8. **Password Reset**: Implement password reset functionality
9. **Email Verification**: Add email verification for new signups
10. **Pagination Metadata**: Include total count and page info in paginated responses

---

## 📚 Additional Resources

- **API List**: See `src/apiList.md` for quick API reference
- **Development Notes**: See `src/work.md` for development notes

---

## 👥 Author

**Abhishek Patel**

---

## 📄 License

ISC

---

**Last Updated:** February 2025
