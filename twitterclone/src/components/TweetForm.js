import React, { useState } from 'react';
import './Tweetform.css'; 

const TweetForm = ({ onAddTweet }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (content.trim() !== '') {
            try {
                const response = await fetch('http://localhost:8000/api/tweets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        content: content,
                    }),
                });

                if (response.ok) {
                    const newTweet = await response.json();
                    onAddTweet(newTweet);
                    setContent('');
                } else {
                    console.error('Tweet could not be saved.');
                }
            } catch (error) {
                console.error('Error saving tweet:', error);
            }
        }
    };

    return (
        <div className="tweet-form-container">
            <div className="tweet-profile-pic">
              
            </div>
            <div className="tweet-input">
                <textarea
                    placeholder="What's happening?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className="tweet-action-buttons">
                    <button className="tweet-button" onClick={handleSubmit}>
                        Tweet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TweetForm;
