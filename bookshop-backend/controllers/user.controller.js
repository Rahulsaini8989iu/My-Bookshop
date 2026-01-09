const User = require('../models/User.models');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    console.log('Fetching all users...');
    
    // Check if user is superadmin
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied. SuperAdmin rights required.' 
      });
    }

    const users = await User.find().select('-password');
    console.log(`Found ${users.length} users`);
    
    res.status(200).json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Create new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user is superadmin
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied. SuperAdmin rights required.' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'Email already exists' 
      });
    }

    // Create user
    const user = new User({ name, email, password, role });
    await user.save();

    const userResponse = await User.findById(user._id).select('-password');

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: userResponse
    });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Update user role
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.params.id;

    // Check if user is superadmin
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied. SuperAdmin rights required.' 
      });
    }

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Prevent modifying own role
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({ 
        success: false,
        message: 'Cannot modify your own role' 
      });
    }

    user.role = role;
    await user.save();

    const userResponse = await User.findById(user._id).select('-password');
    
    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      data: userResponse
    });
  } catch (err) {
    console.error('Error updating user role:', err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Update user profile
exports.updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.params.id;

    // Check if user is superadmin
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied. SuperAdmin rights required.' 
      });
    }

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Check if email already exists (for other users)
    if (email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ 
          success: false,
          message: 'Email already exists' 
        });
      }
    }

    user.name = name;
    user.email = email;
    await user.save();

    const userResponse = await User.findById(user._id).select('-password');

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: userResponse
    });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user is superadmin
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ 
        success: false,
        message: 'Access denied. SuperAdmin rights required.' 
      });
    }

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Prevent self-deletion
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({ 
        success: false,
        message: 'Cannot delete your own account' 
      });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};