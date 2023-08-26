import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async() => {
        try {
            const response = await fetch('http://localhost:8000/api/users');
            if (response.ok) {
                const usersData = await response.json();
                setUsers(usersData);
            } else {
                console.error('Error fetching users:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return ( <
        div >
        <
        h2 > All Users < /h2> {
            users.map((user) => ( <
                UserProfile key = { user.id }
                user = { user }
                />
            ))
        } <
        /div>
    );
}

export default UserList;