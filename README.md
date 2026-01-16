# Personal Blog Web Application

A full-stack personal blog application built with React, Node.js, Express, and MySQL.

## Features

### For Logged-in Users:
- Create new blog posts with **enhanced image upload error handling**
- Read posts created by others
- Comment on posts made by others
- Edit and delete their own posts
- Manage personal posts

### For Guests:
- Read blog posts
- View comments
- Browse categories
- **Send contact messages via email**

### Admin Features:
- Manage all posts
- Add new posts with image uploads
- Create and manage tags
- Assign tags to posts
- Delete posts and comments
- Manage categories
- Manage users (create, edit, delete, block/unblock)
- Block/unblock users from accessing the platform

## Tech Stack

- **Frontend**: React 19 with Vite
- **Backend**: Node.js with Express
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Custom CSS

## Project Structure

```
test-app/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Entry point
│   └── package.json
│
├── backend/               # Node.js backend application
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # API routes
│   │   └── server.js      # Server entry point
│   ├── database/          # Database schema
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v20+)
- MySQL (v8.0+)
- npm or yarn

### Database Setup

1. Make sure MySQL is running
2. Create the database and tables:

```bash
mysql -u root -p < backend/database/schema.sql
```

Or manually execute the SQL commands in `backend/database/schema.sql`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update the `.env` file with your database credentials:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=blog_db
JWT_SECRET=your_secret_key
```

5. (Optional) Configure email settings for the contact form in the `.env` file:
```
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
EMAIL_RECIPIENT=admin@example.com
```

**Note:** For Gmail, you need to generate an [App Password](https://support.google.com/accounts/answer/185833) instead of using your regular password. If email is not configured, contact form submissions will be logged to the console.

6. Start the backend server:
```bash
npm run dev
```

The backend API will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts` - Get all posts (with pagination)
- `GET /api/posts/:id` - Get a single post
- `POST /api/posts` - Create a new post (requires authentication)
- `PUT /api/posts/:id` - Update a post (requires authentication and ownership)
- `DELETE /api/posts/:id` - Delete a post (requires authentication and ownership)

### Comments
- `GET /api/comments/post/:postId` - Get all comments for a post
- `POST /api/comments` - Create a comment (requires authentication)
- `DELETE /api/comments/:id` - Delete a comment (requires authentication and ownership)

### Contact
- `POST /api/contact` - Send a contact form message via email

## Default Admin Account

- Email: `admin@gmail.com`
- Password: `admin`

## Building for Production

### Frontend
```bash
cd frontend
npm run build
```

The build output will be in the `frontend/dist` directory.

### Backend
```bash
cd backend
npm start
```

## Features Implemented

### Frontend Components:
- ✅ Navigation bar with Home, About, Contact, Login, Logout links
- ✅ Featured post section with hero image
- ✅ Latest posts section with pagination
- ✅ Account profile card with avatar and description
- ✅ Sidebar with categories and search functionality
- ✅ Admin panel links for managing posts
- ✅ Responsive design
- ✅ Modern, user-friendly interface

### Backend Features:
- ✅ User authentication with JWT
- ✅ Password hashing with bcrypt
- ✅ Post CRUD operations
- ✅ Comment system
- ✅ Authorization middleware
- ✅ MySQL database integration
- ✅ **Email sending for contact form** (with optional configuration)
- ✅ **Enhanced image upload error handling with user-friendly messages**

## Recent Feature Enhancements

### 1. Email Sending for Contact Form

The contact form now sends emails to a specified recipient when users submit messages. 

**Features:**
- Sends formatted HTML emails with contact details
- Validates email format and required fields
- Falls back to console logging if email is not configured
- Handles email service errors gracefully
- User-friendly error and success messages

**Configuration:**
To enable email sending, add the following to your `.env` file:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
EMAIL_RECIPIENT=admin@example.com
```

For Gmail, you must use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

### 2. Enhanced Image Upload Error Handling

Image uploads now provide better error messages and user prompts:

**Features:**
- Detailed error messages for file size limits (5MB maximum)
- Clear messages for invalid file types (only jpeg, jpg, png, gif, webp allowed)
- Automatic clearing of invalid file selections
- User prompt to reattempt upload after errors
- Scroll to error message for better visibility
- Server-side validation with specific error codes

**Error Handling:**
- File size exceeds 5MB: "Image file size must be less than 5MB. Please select a smaller image and try again."
- Invalid file type: "Only image files are allowed (jpeg, jpg, png, gif, webp). Please select a valid image file and try again."
- General upload error: "Failed to upload image. Please check the file and try again."

All errors include a prompt to help users understand what went wrong and how to fix it.

## Contributing

Feel free to submit issues and enhancement requests!

## License

ISC