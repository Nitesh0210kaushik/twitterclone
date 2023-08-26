const express = require('express');
const mongoose = require('mongoose');
const User = require('../db/Model'); // Import the User model
const Tweet = require('../db/TweetModel'); // Import the Tweet model

const router = express.Router();

// Fetch user's profile
// router.get('/userprofile', async(req, res) => {
//     try {
//         const userId = (req.body._id);
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({ error: 'User not found.' });
//         }

//         res.json(user);
//         console.log(user)
//     } catch (error) {
//         console.error('Error fetching user profile:', error);
//         res.status(500).json({ error: 'An error occurred.' });
//     }
// });

// Create a new tweet
router.post('/tweets', async(req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ error: 'Content is required.' });
        }

        const newTweet = new Tweet({ content });
        await newTweet.save();

        res.status(201).json(newTweet);
    } catch (error) {
        console.error('Error creating tweet:', error);
        res.status(500).json({ error: 'An error occurred.' });
    }
});

// Toggle user follow status

router.post('/users/:id/follow', async(req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        user.isFollowing = !user.isFollowing;
        await user.save();

        res.json(user);
    } catch (error) {
        console.error('Error toggling follow status:', error);
        res.status(500).json({ error: 'An error occurred.' });
    }
});

// Update a tweet
router.put('/tweets/:id', async(req, res) => {
    try {
        const tweetId = req.params.id;
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ error: 'Content is required.' });
        }

        const updatedTweet = await Tweet.findByIdAndUpdate(tweetId, { content }, { new: true });

        if (!updatedTweet) {
            return res.status(404).json({ error: 'Tweet not found.' });
        }

        res.json(updatedTweet);
    } catch (error) {
        console.error('Error updating tweet:', error);
        res.status(500).json({ error: 'An error occurred.' });
    }
});

// Delete a tweet
router.delete('/tweets/:id', async(req, res) => {
    try {
        const tweetId = req.params.id;
        const deletedTweet = await Tweet.findByIdAndDelete(tweetId);

        if (!deletedTweet) {
            return res.status(404).json({ error: 'Tweet not found.' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting tweet:', error);
        res.status(500).json({ error: 'An error occurred.' });
    }
});

module.exports = router;