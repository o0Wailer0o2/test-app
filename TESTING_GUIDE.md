# Testing Guide

This document provides step-by-step instructions to test the new features implemented for category filtering and recent posts tracking.

## Prerequisites

1. MySQL server running
2. Node.js installed
3. Dependencies installed in both backend and frontend

## Setup Instructions

### 1. Database Setup

```bash
# Navigate to backend directory
cd backend

# Run schema to create tables (including new post_views table)
mysql -u root -p < database/schema.sql

# Run seed data to populate with English posts
mysql -u root -p blog_db < database/seed.sql
```

### 2. Backend Setup

```bash
# In backend directory
cp .env.example .env
# Edit .env with your MySQL credentials

# Install dependencies
npm install

# Start backend server
npm run dev
```

Backend should start on http://localhost:3000

### 3. Frontend Setup

```bash
# In frontend directory
npm install

# Start frontend dev server
npm run dev
```

Frontend should start on http://localhost:5173

## Features to Test

### 1. Category Navigation

**What changed:**
- Added `/api/posts/categories` endpoint to fetch all categories with post counts
- Added `/api/posts?category=<name>` query parameter to filter posts by category
- Created new `/category/:slug` route in frontend
- Categories are now fetched dynamically from the backend

**How to test:**
1. Open http://localhost:5173
2. Check the sidebar - categories should be displayed
3. Click on any category (e.g., "Cooking", "Sports", "Travel")
4. You should be redirected to `/category/<slug>` page
5. Only posts from that category should be displayed
6. The page header should show the category name and post count
7. Test pagination if there are many posts in a category

**Expected behavior:**
- Category clicks navigate to category-specific pages
- Posts are filtered correctly by category
- Post count is accurate
- Pagination works on category pages

### 2. English Post Content

**What changed:**
- Replaced all 7 Vietnamese posts with English content
- Added 10 new posts with complete English content
- Total of 17 posts covering various categories

**How to test:**
1. Navigate through different pages
2. Click on any post to view details
3. All post titles and content should be in English
4. Posts should be categorized as: Cooking, Sports, Lifestyle, Tips & Tricks, Travel, Health

**Expected posts:**
1. 10 Easy Dinner Recipes for Busy Weeknights (Cooking)
2. The Complete Guide to Baking Homemade Bread (Cooking)
3. Morning Yoga Routine for Flexibility and Energy (Sports)
4. The Ultimate Guide to Organizing Your Closet (Lifestyle)
5. Top 5 Must-Visit Destinations in Southeast Asia (Travel)
6. 10 Simple Ways to Save Energy at Home (Tips & Tricks)
7. Running for Beginners: A Complete Guide (Sports)
8. Meal Prep 101: Save Time and Eat Healthy (Cooking)
9. 15-Minute Home Workouts: No Equipment Needed (Sports)
10. Creating a Minimalist Home: Room by Room Guide (Lifestyle)
11. Healthy Smoothie Recipes for Every Day (Health)
12. Digital Detox: How to Unplug and Recharge (Lifestyle)
13. Budget-Friendly Travel Tips for Adventure Seekers (Travel)
14. Stress Management Techniques for a Calmer Life (Health)
15. Urban Gardening: Growing Food in Small Spaces (Lifestyle)
16. Photography Basics: Capturing Better Photos (Tips & Tricks)

### 3. Recent Posts Tracking

**What changed:**
- Added `post_views` table to track when users view posts
- Session tracking implemented using session IDs stored in localStorage
- GET `/api/posts/:id` now records a view in post_views table
- GET `/api/posts/recent` returns posts based on user's viewing history
- If no history exists, returns most recently created posts

**How to test:**
1. Open the site in an incognito/private window (fresh session)
2. Check the "Recent Posts" section in the sidebar - it should show the 5 most recent posts by creation date
3. Click on several different posts to read them (e.g., post 1, 5, 3, 7, 2)
4. Return to home page
5. Check "Recent Posts" section again - it should now show the posts you just viewed, in the order you viewed them (most recent first)
6. Refresh the page - recent posts should persist (stored in localStorage session)
7. Open the site in a different browser or clear localStorage - you'll see default recent posts again

**Expected behavior:**
- Initial load shows newest posts by creation date
- After viewing posts, recent posts section updates to show your viewing history
- Most recently viewed post appears first
- Up to 5 recent posts are shown
- Session persists across page refreshes
- Different browsers/sessions have independent tracking

### 4. API Endpoints

Test the following endpoints using curl or Postman:

```bash
# Get all posts (paginated)
curl http://localhost:3000/api/posts?page=1&limit=10

# Get posts by category
curl http://localhost:3000/api/posts?category=Cooking

# Get single post (records a view)
curl -H "X-Session-ID: test-session-123" http://localhost:3000/api/posts/1

# Get all categories with counts
curl http://localhost:3000/api/posts/categories

# Get recent posts for a session
curl -H "X-Session-ID: test-session-123" http://localhost:3000/api/posts/recent?limit=5
```

## Verification Checklist

- [ ] All 17 posts are in English
- [ ] Posts are properly categorized
- [ ] Category links in sidebar work correctly
- [ ] Category pages show filtered posts
- [ ] Category pages show correct post count
- [ ] Pagination works on category pages
- [ ] Recent posts initially show newest posts
- [ ] Recent posts update after viewing posts
- [ ] Recent posts persist after page refresh
- [ ] Recent posts are session-specific
- [ ] No console errors in browser
- [ ] No server errors in backend logs
- [ ] Database queries execute successfully

## Troubleshooting

### Categories not showing
- Check that database seed script ran successfully
- Verify categories table has 6 entries
- Check browser console for fetch errors

### Posts not filtering by category
- Verify query parameter is being sent correctly
- Check backend logs for SQL query errors
- Ensure category names match exactly (case-sensitive)

### Recent posts not updating
- Check localStorage has sessionId
- Verify X-Session-ID header is being sent
- Check post_views table has entries
- Verify backend route is recording views correctly

### Database connection errors
- Verify MySQL is running
- Check .env file has correct credentials
- Ensure blog_db database exists
- Check all tables were created successfully
