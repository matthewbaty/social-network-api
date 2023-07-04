const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// get all users
router.get('/', getAllUsers);

// get single user by id
router.get('/:userId', getUserById);

// post new user
router.post('/', createUser);

// put update user
router.put('/:userId', updateUser);

// delete user
router.delete('/:userId', deleteUser);

// post add friend
router.post('/:userId/friends/:friendId', addFriend);

// delete friend
router.delete('/:userId/friends/:friendId', removeFriend);

module.exports = router;