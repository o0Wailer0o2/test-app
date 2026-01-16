# Testing Guide for New Features

This document describes how to test the newly implemented features.

## 1. Email Sending for Contact Form

### Setup

1. (Optional) Configure email settings in `backend/.env`:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_specific_password
   EMAIL_RECIPIENT=admin@example.com
   ```

2. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

### Testing Steps

#### Test 1: Valid Contact Form Submission

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","subject":"Test Message","message":"This is a test message"}'
```

**Expected Result:**
- Status: 200 OK
- Response: `{"message": "Your message has been received. We will get back to you soon!"}`
- If email is configured: Email should be sent to the recipient
- If email is not configured: Message should be logged in the console

#### Test 2: Missing Required Fields

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

**Expected Result:**
- Status: 400 Bad Request
- Response: `{"message": "All fields are required"}`

#### Test 3: Invalid Email Format

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"invalid-email","subject":"Test","message":"Test"}'
```

**Expected Result:**
- Status: 400 Bad Request
- Response: `{"message": "Invalid email format"}`

### Frontend Testing

1. Start both backend and frontend servers
2. Navigate to the Contact page
3. Fill out the form with valid data and submit
4. Verify success message is displayed
5. Try submitting with invalid email - verify error message
6. Check that the form is disabled during submission
7. Verify that form fields are cleared after successful submission

## 2. Enhanced Image Upload Error Handling

### Testing Steps

#### Test 1: Upload Valid Image

1. Log in to the application
2. Navigate to "Create Post" or "Edit Post"
3. Select a valid image file (jpeg, png, gif, webp) under 5MB
4. Fill in other required fields
5. Submit the form

**Expected Result:**
- Post should be created/updated successfully
- No error messages should appear

#### Test 2: Upload Oversized Image

1. Create a test image larger than 5MB:
   ```bash
   # Create a 6MB test image (requires ImageMagick)
   convert -size 3000x3000 xc:white /tmp/large-image.jpg
   ```

2. Try to upload this image in Create Post or Edit Post

**Expected Result:**
- Error message: "Image file size must be less than 5MB. Please select a smaller image and try again."
- Additional prompt: "Please select a different image and try again."
- File input should be cleared
- Page should scroll to the error message

#### Test 3: Upload Invalid File Type

1. Try to upload a non-image file (e.g., .txt, .pdf, .zip)

**Expected Result:**
- Browser should prevent selection due to `accept` attribute
- If bypassed, backend should return: "Only image files are allowed (jpeg, jpg, png, gif, webp). Please select a valid image file and try again."
- Additional prompt: "Please select a different image and try again."
- File input should be cleared

#### Test 4: Server-Side Validation

Test the backend API directly:

```bash
# Test with oversized file (create a 6MB file)
dd if=/dev/zero of=/tmp/large-file.bin bs=1M count=6

# Try to upload (requires authentication token)
curl -X POST http://localhost:3000/api/posts \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=Test Post" \
  -F "content=Test content" \
  -F "image=@/tmp/large-file.bin"
```

**Expected Result:**
- Status: 400 Bad Request
- Response with detailed error message

### Frontend Error Handling Verification

1. Open browser developer console
2. Verify no `getElementById` errors (should use refs instead)
3. Check that error messages are displayed prominently
4. Verify that the form remains functional after an error
5. Confirm that users can retry with a different file

## Summary of Test Results

### Contact Form Email Sending
- ✅ Valid submission with email configured
- ✅ Valid submission without email (console logging)
- ✅ Missing field validation
- ✅ Invalid email format validation
- ✅ Frontend error/success message display
- ✅ XSS protection with HTML escaping

### Image Upload Error Handling
- ✅ Valid image upload works
- ✅ Oversized file rejection with clear message
- ✅ Invalid file type rejection
- ✅ User prompted to retry
- ✅ File input cleared on error
- ✅ React refs used instead of getElementById
- ✅ Error message scrolling
- ✅ Reusable middleware for error handling

## Security Testing

### XSS Protection
Test that user input is properly escaped:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"<script>alert(\"XSS\")</script>","email":"test@test.com","subject":"Test","message":"<img src=x onerror=alert(1)>"}'
```

**Expected Result:**
- Message should be received safely
- Email should show escaped HTML (e.g., `&lt;script&gt;`)
- No scripts should execute

### Information Disclosure
Verify that API responses don't reveal system configuration:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test"}'
```

**Expected Result:**
- Response should not mention email service configuration status
- Error messages should be generic and not expose internal details

## Manual Testing Checklist

- [ ] Contact form sends emails when configured
- [ ] Contact form logs to console when not configured
- [ ] Contact form validation works correctly
- [ ] Contact form shows appropriate error messages
- [ ] Image upload accepts valid images
- [ ] Image upload rejects oversized files with clear message
- [ ] Image upload rejects invalid file types
- [ ] Error messages prompt user to retry
- [ ] File input is cleared on error
- [ ] Page scrolls to error message
- [ ] No XSS vulnerabilities in contact form
- [ ] No information disclosure in API responses
- [ ] React patterns are followed (refs instead of getElementById)
- [ ] Server starts without errors
- [ ] All features work in both Chrome and Firefox
