const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// get all thoughts
router.get('/', getAllThoughts);

// get single thought by id
router.get('/:thoughtId', getThoughtById);

// post new thought
router.post('/', createThought);

// put update thought
router.put('/:thoughtId', updateThought);

// delete thought
router.delete('/:thoughtId', deleteThought);

// post add reaction
router.post('/:thoughtId/reactions', createReaction);

// delete reaction
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;