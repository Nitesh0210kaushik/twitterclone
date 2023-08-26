import React, { useState, useEffect } from 'react';
import './Home.css';
import TweetForm from './TweetForm';
import Timeline from './Timeline';


const Home = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
 //   fetchUserData();
    fetchTweets();
  }, []);


  
  
 

    const fetchTweets = async () => {
        try {
            const storedTweets = localStorage.getItem('tweets');
            if (storedTweets) {
                setTweets(JSON.parse(storedTweets));
            } else {
                const response = await fetch('http://localhost:8000/api/tweets');
                if (response.ok) {
                    const data = await response.json();
                    setTweets(data);
                    localStorage.setItem('tweets', JSON.stringify(data));
                } else {
                    console.error('Error fetching tweets:', response.statusText);
                }
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const addTweet = (newTweet) => {
        setTweets([newTweet, ...tweets]);
        localStorage.setItem('tweets', JSON.stringify([newTweet, ...tweets]));
    };

    const updateTweet = async (tweetId, updatedContent) => {
        try {
            const response = await fetch(`http://localhost:8000/api/tweets/${tweetId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: updatedContent,
                }),
            });

            if (response.ok) {
                setTweets((prevTweets) =>
                    prevTweets.map((tweet) =>
                        tweet._id === tweetId ? { ...tweet, content: updatedContent } : tweet
                    )
                );
                localStorage.setItem(
                    'tweets',
                    JSON.stringify(tweets.map((tweet) => (tweet._id === tweetId ? { ...tweet, content: updatedContent } : tweet)))
                );
            } else {
                console.error('Tweet could not be updated.');
            }
        } catch (error) {
            console.error('Error updating tweet:', error);
        }
    };

    const deleteTweet = async (tweetId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/tweets/${tweetId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setTweets(tweets.filter((tweet) => tweet._id !== tweetId));
                localStorage.setItem('tweets', JSON.stringify(tweets.filter((tweet) => tweet._id !== tweetId)));
            } else {
                console.error('Tweet could not be deleted.');
            }
        } catch (error) {
            console.error('Error deleting tweet:', error);
        }
    };


   
    return (
        <div className="home">
           
          <TweetForm onAddTweet={addTweet} />
          <Timeline tweets={tweets} onDelete={deleteTweet} onUpdate={updateTweet} />
        </div>
      );
    };
    
    export default Home;