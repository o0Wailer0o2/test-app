-- Migration to add is_blocked column to users table
-- Run this if you have an existing database

USE blog_db;

-- Add is_blocked column if it doesn't exist
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS is_blocked BOOLEAN DEFAULT FALSE 
AFTER is_admin;
