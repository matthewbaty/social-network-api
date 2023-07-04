const { User } = require('../models');

// get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

// get single user by id
const getUserById = async (req, res) => {
    const userId = req.params.userId

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

// post new user
const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
};

// put update user
// const updateUser = async (req, res) => {
//     const userId = req.params.id;
//     const updates = req.body;

//     try {
//         const user = await User.findOneAndUpdate(userId, updates, { new: true });
//         if (!user) {
//             return res.status(404).json({ message: 'No user found with this id!' });
//         }
//         res.json(user);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };

const updateUser = async (req, res) => {

// delete user
const deleteUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findOneAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

// post add friend
const addFriend = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.friendId || req.params.friendId } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

// delete friend
const removeFriend = async ({ params }, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        const friendIndex = !user.friends.includes(params.friendId);

        if (friendIndex) {
            res.json
        } else {
            res.json(user);
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
};