const User = require('../models/User');

const getUsers = async (page = 1, limit = 10, search = '') => {
    const skip = (page - 1) * limit;

    const query = {};
    if (search) {
        query.$or = [
            { firstName: { $regex: search, $options: 'i' } },
            { lastName: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ];
    }

    const users = await User.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await User.countDocuments(query);

    return {
        users,
        total,
        pages: Math.ceil(total / limit)
    };
};

const createUser = async (userData) => {
    return await User.create(userData);
};

const updateUser = async (id, userData) => {
    return await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
};

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

const getUserById = async (id) => {
    return await User.findById(id);
};

const getAllUsersForExport = async () => {
    return await User.find().sort({ createdAt: -1 });
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getAllUsersForExport
};
