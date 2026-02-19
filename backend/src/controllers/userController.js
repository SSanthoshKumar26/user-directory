const userService = require('../services/userService');
const { createObjectCsvWriter } = require('csv-writer');
const path = require('path');
const fs = require('fs');

// @desc    Get all users with pagination and search
// @route   GET /api/users
// @access  Public
const getUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';

        const result = await userService.getUsers(page, limit, search);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

// @desc    Create a new user
// @route   POST /api/users
// @access  Public
const createUser = async (req, res, next) => {
    try {
        const userData = { ...req.body };
        if (req.file) {
            userData.profileImage = req.file.filename;
        }
        const user = await userService.createUser(userData);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Public
const updateUser = async (req, res, next) => {
    try {
        const userData = { ...req.body };
        if (req.file) {
            userData.profileImage = req.file.filename;
        }
        const user = await userService.updateUser(req.params.id, userData);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Public
const deleteUser = async (req, res, next) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        res.status(200).json({ message: 'User removed' });
    } catch (error) {
        next(error);
    }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public
const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// @desc    Search users
// @route   GET /api/users/search
// @access  Public
const searchUsers = async (req, res, next) => {
    try {
        const search = req.query.q || '';
        const result = await userService.getUsers(1, 100, search);
        res.status(200).json(result.users);
    } catch (error) {
        next(error);
    }
};

// @desc    Export users to CSV
// @route   GET /api/users/export-csv
// @access  Public
const exportCsv = async (req, res, next) => {
    try {
        const users = await userService.getAllUsersForExport();

        const csvPath = path.join(__dirname, '../../uploads/users.csv');
        const csvWriter = createObjectCsvWriter({
            path: csvPath,
            header: [
                { id: 'firstName', title: 'First Name' },
                { id: 'lastName', title: 'Last Name' },
                { id: 'email', title: 'Email' },
                { id: 'mobile', title: 'Mobile' },
                { id: 'gender', title: 'Gender' },
                { id: 'status', title: 'Status' },
                { id: 'location', title: 'Location' },
                { id: 'createdAt', title: 'Created At' },
            ]
        });

        await csvWriter.writeRecords(users);

        res.download(csvPath, 'users.csv', (err) => {
            if (err) {
                next(err);
            }
            // Optional: Delete file after download
            // fs.unlinkSync(csvPath);
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    searchUsers,
    exportCsv
};
