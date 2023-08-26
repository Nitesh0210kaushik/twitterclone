import React from 'react';
import Tweet from './Tweet';

const Timeline = ({ tweets, onDelete, onUpdate }) => {
  return (
    <div className="timeline">
      {tweets.map((tweet) => (
        <Tweet
          key={tweet._id} 
          tweet={tweet}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default Timeline;
