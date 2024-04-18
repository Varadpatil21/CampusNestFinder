

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from  '../../AuthContext'
import { Buffer } from 'buffer';

export const MyRoom1 = () => {
    const { currentUser } = useAuth(); 
    const userId=currentUser.uid;
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/rooms/user/${userId}`);
        setRooms(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, [userId]);

  return (
    <div>
      <h2>Rooms for User ID: {typeof(userId)}</h2>
      <ul>
        {rooms.map(room => (
          <li key={room._id}>
            <h3>{room.name}</h3>
            <p>{room.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};


