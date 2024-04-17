import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Buffer } from "buffer"
import './Book.css'
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
        <div >
          {rooms.map(room => (
            <div key={room._id} className='room'>
              <div className="image"> <img
                src={`data:${room.homeImage.contentType};base64,${Buffer.from(room.homeImage.data).toString('base64')}`}
                alt="Room Image"
              /></div>
              <div className="description1"><div className="title"><h2>{room.name}</h2></div>
              <div className="des"><p>{room.description}</p></div>
              <div className="type"><h3>Type: {room.type}</h3></div>
              <div className="rentbutt">
                <div className="rent"><h3>₹{room.rent}</h3></div>
                <button className='bookbutton'>Book Now</button>
              </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};
