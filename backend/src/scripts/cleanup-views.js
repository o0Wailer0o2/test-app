/**
 * Cleanup script for post_views table
 * 
 * This script removes old post view records to prevent excessive database growth.
 * Run this as a scheduled job (e.g., weekly or monthly).
 * 
 * Usage:
 *   node cleanup-views.js [days]
 * 
 * Example:
 *   node cleanup-views.js 90  # Remove views older than 90 days
 */

import pool from '../config/database.js';

const DEFAULT_RETENTION_DAYS = 90;

async function cleanupOldViews() {
  try {
    const retentionDays = parseInt(process.argv[2]) || DEFAULT_RETENTION_DAYS;
    
    console.log(`Starting cleanup of post views older than ${retentionDays} days...`);
    
    const [result] = await pool.query(
      `DELETE FROM post_views 
       WHERE viewed_at < DATE_SUB(NOW(), INTERVAL ? DAY)`,
      [retentionDays]
    );
    
    console.log(`✓ Cleanup complete. Deleted ${result.affectedRows} old view records.`);
    
    // Get current table size
    const [stats] = await pool.query(
      `SELECT COUNT(*) as total_views 
       FROM post_views`
    );
    
    console.log(`Current post_views table size: ${stats[0].total_views} records`);
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('Error during cleanup:', error);
    await pool.end();
    process.exit(1);
  }
}

cleanupOldViews();
