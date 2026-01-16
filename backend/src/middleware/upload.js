import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// Multer error handling middleware
export const handleMulterError = (upload) => {
  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        // Handle multer errors
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ 
              message: 'Image file size must be less than 5MB. Please select a smaller image and try again.' 
            });
          }
          return res.status(400).json({ 
            message: `Upload error: ${err.message}. Please try again.` 
          });
        }
        
        // Handle custom file filter errors
        if (err.message.includes('Only image files')) {
          return res.status(400).json({ 
            message: 'Only image files are allowed (jpeg, jpg, png, gif, webp). Please select a valid image file and try again.' 
          });
        }
        
        return res.status(400).json({ 
          message: 'Failed to upload image. Please check the file and try again.' 
        });
      }
      next();
    });
  };
};

export default upload;
