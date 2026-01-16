import express from 'express';
import nodemailer from 'nodemailer';
import { generalLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Helper function to escape HTML special characters to prevent XSS
const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// Create a transporter for sending emails
const createTransporter = () => {
  // Check if email configuration is provided
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('Email configuration not found. Emails will be logged to console only.');
    return null;
  }

  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Submit contact form
router.post('/', generalLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Invalid email format' 
      });
    }

    const transporter = createTransporter();

    // If no email configuration, log the message
    if (!transporter) {
      console.log('Contact Form Submission:');
      console.log('From:', name, `<${email}>`);
      console.log('Subject:', subject);
      console.log('Message:', message);
      
      return res.status(200).json({ 
        message: 'Your message has been received. We will get back to you soon!'
      });
    }

    // Email to be sent to the site owner
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
      subject: `Contact Form: ${subject}`,
      text: `You have received a new message from your blog contact form:\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Subject: ${subject}\n\n` +
            `Message:\n${message}\n\n` +
            `---\n` +
            `This message was sent from your blog contact form.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          </div>
          <div style="margin-top: 20px;">
            <h3 style="color: #333;">Message:</h3>
            <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px;">This message was sent from your blog contact form.</p>
        </div>
      `
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      message: 'Your message has been sent successfully! We will get back to you soon.' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    
    // Provide specific error messages based on error type
    if (error.code === 'EAUTH') {
      return res.status(500).json({ 
        message: 'Email service authentication failed. Please try again later.' 
      });
    }
    
    if (error.code === 'ECONNECTION') {
      return res.status(500).json({ 
        message: 'Could not connect to email service. Please try again later.' 
      });
    }
    
    res.status(500).json({ 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

export default router;
