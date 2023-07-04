const { Thought, User } = require('../models');

// get all thoughts
const getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error) {
        res.status(500).json(error);
    }
};

// get single thought by id
const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
    } catch (error) {
        res.status(500).json(error);
    }
};

// post new thought
// const createThought = async (req, res) => {
//     const { thoughtText, username, userId } = req.body;

//     try {
//         const newThought = new Thought({ thoughtText, username, userId });
//         const createdThought = await newThought.save();
//         res.status(201).json(createdThought);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };

const createThought = async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);

        const userPushThought = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: newThought._id } },
            { new: true }
        );
        res.status(200).json(newThought);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};

// put update thought
const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
        } else {
            res.json(thought);
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// delete thought
const deleteThought = async (req, res) => {
    const thoughtId = { _id: req.params.thoughtId };
    try {
        const thought = await Thought.findByIdAndDelete(thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json({ message: 'Thought deleted!' });
    } catch (error) {
        res.status(500).json(error);
    }
};

// post add reaction
const createReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
    } catch (error) {
        res.status(500).json(error);
    }
};

// delete reaction
const deleteReaction = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
};