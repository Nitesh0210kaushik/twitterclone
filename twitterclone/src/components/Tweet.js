import React, { useState } from 'react';
import './Tweet.css'; // Import your CSS file for styling

const Tweet = ({ tweet, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(tweet.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(tweet._id, editedContent);
    setIsEditing(false);
  };

  return (
    <div className="tweet">
      {/* <img className="tweet-avatar" src={tweet.userAvatar} alt="User Avatar" /> */}
      <div className="tweet-content">
        <p className="tweet-username">{tweet.username}</p>
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <p className="tweet-text">{tweet.content}</p>
        )}
        <div className="tweet-buttons">
          {isEditing ? (
            <>
              <button className="tweet-button save-button" onClick={handleSave}>
                Save
              </button>
              <button
                className="tweet-button cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className="tweet-button edit-button" onClick={handleEdit}>
                Edit
              </button>
              <button
                className="tweet-button delete-button"
                onClick={() => onDelete(tweet._id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tweet;
