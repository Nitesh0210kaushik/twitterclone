

import React, { useState, useEffect } from "react";

function UserProfile() {
  const [users, setUsers] = useState([]);
  const [isFollowingMap, setIsFollowingMap] = useState({});
  const [followedUserIds, setFollowedUserIds] = useState([]);
  const [showFollowedUsers, setShowFollowedUsers] = useState(false);

  useEffect(() => {
    fetchUsersData();
    const storedFollowedUserIds = localStorage.getItem("followedUserIds");
    if (storedFollowedUserIds) {
      setFollowedUserIds(JSON.parse(storedFollowedUserIds));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("followedUserIds", JSON.stringify(followedUserIds));
  }, [followedUserIds]);

  const fetchUsersData = async () => {
    try {
      const response = await fetch('http://localhost:8000/userprofile', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const usersData = await response.json();
        setUsers(usersData);

        const initialIsFollowingMap = {};
        const initialFollowedUserIds = [];
        usersData.forEach(user => {
          initialIsFollowingMap[user._id] = user.isFollowing;
          if (user.isFollowing) {
            initialFollowedUserIds.push(user._id);
          }
        });
        setIsFollowingMap(initialIsFollowingMap);
        setFollowedUserIds(initialFollowedUserIds);
      } else {
        console.error('Error fetching users data:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const followedUsers = users.filter(user => followedUserIds.includes(user._id));

  const handleFollowToggle = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}/follow`, {
        method: "POST", 
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        if (isFollowingMap[userId]) {
          setFollowedUserIds(prevFollowedUserIds => prevFollowedUserIds.filter(id => id !== userId));
      
          const updatedFollowedUserIds = followedUserIds.filter(id => id !== userId);
          localStorage.setItem("followedUserIds", JSON.stringify(updatedFollowedUserIds));
        } else {
          setFollowedUserIds(prevFollowedUserIds => [...prevFollowedUserIds, userId]);
        }
        setIsFollowingMap(prevIsFollowingMap => ({
          ...prevIsFollowingMap,
          [userId]: !prevIsFollowingMap[userId]
        }));
      } else {
        console.error("Error toggling follow status");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  
  return (
    <div>
      {showFollowedUsers ? (
        <div>
          <h2>Followed Users</h2>
          {followedUsers.map(user => (
            <div key={user._id}>
              <h3>{user.name}</h3>
              <button onClick={() => handleFollowToggle(user._id)}>
                Unfollow
              </button>
            </div>
          ))}
          <button onClick={() => setShowFollowedUsers(false)}>Back to All Users</button>
        </div>
      ) : (
        <div>
          <h2>All Users</h2>
          {users.map(user => (
            <div key={user._id}>
              <h3>{user.name}</h3>
              <button onClick={() => handleFollowToggle(user._id)}>
                {isFollowingMap[user._id] ? "Unfollow" : "Follow"}
              </button>
            </div>
          ))}
          <button onClick={() => setShowFollowedUsers(true)}>Show Followed Users</button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;



