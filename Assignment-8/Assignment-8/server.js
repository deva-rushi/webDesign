const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Create user schema
const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.use(express.json()); // Use express.json() for JSON parsing

// Create user validation chain
const createUserValidation = [
  body('fullName').isString().matches(/^[a-zA-Z\s]*$/).notEmpty().withMessage('Invalid full name format'),
  body('email').isEmail().matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/).withMessage('Invalid email format'),
  body('password').isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).withMessage('Password must be at least 8 characters long and contain at least one digit, one lowercase, and one uppercase letter'),
];

// Create user
app.post('/user/create', createUserValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();

    res.json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update user details validation chain
const updateUserValidation = [
  body('fullName').optional().isString().matches(/^[a-zA-Z\s]*$/).withMessage('Invalid full name format'),
  body('password').optional().isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).withMessage('Password must be at least 8 characters long and contain at least one digit, one lowercase, and one uppercase letter'),
];

// Update user details
app.put('/user/edit', updateUserValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, password } = req.body;

    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { fullName, password: await bcrypt.hash(password, 10) },
      { new: true }

    );

    await user.save();

    res.json({ message: 'User details updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Delete user
app.delete('/user/delete', async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOneAndDelete({ email });
    if (!user) {
      throw new Error('User not found');
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users
app.get('/user/getAll', async (req, res) => {
  try {
    const users = await User.find({}, 'fullName email password');
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'images';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and GIF formats are allowed'));
    }
  },
});
// Upload image endpoint
app.post('/user/uploadImage', upload.single('image'), async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    user.imagePath = req.file.path; // Save the image path in the user document
    await user.save();

    res.json({ message: 'Image uploaded successfully', imagePath: req.file.path });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});