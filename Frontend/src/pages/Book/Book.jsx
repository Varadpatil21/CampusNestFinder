import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Buffer} from "buffer" 
export const Book = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomsData = (await axios.get('http://localhost:5000/api/rooms/getrooms')).data.rooms;
        setRooms(roomsData);
        setIsLoading(false); 
        console.log(roomsData[10].homeImage.data)
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {rooms.map(room => (
            <div key={room._id}>
              <h1>{room.owner}</h1>
              {room.homeImage &&  ( <img
        src={`data:${room.homeImage.contentType};base64,${Buffer.from(room.homeImage.data).toString('base64')}`}
        alt="Room Image"
    />)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
