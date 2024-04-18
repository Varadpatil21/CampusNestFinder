import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import './Book.css';
import { useAuth } from '../../AuthContext';
import { auth, database } from '../../../Firebase/';
import { ref, set, get } from 'firebase/database';

export const Book = () => {
  const { currentUser } = useAuth(); 
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [bookedRoom, setBookedRoom] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomsData = (await axios.get('http://localhost:5000/api/rooms/getrooms')).data.rooms;
        setRooms(roomsData);
        setIsLoading(false);
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

  const handleBookNow = async (roomId) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/rooms/book/${roomId}`, { userId: currentUser.uid });
  
      if (response.status === 200) {
        console.log('Popup should be visible now');
        setPopupVisible(true);
        const updatedRoom = response.data.room;
        setBookedRoom(updatedRoom);
  
        // Fetch user data from Firebase
        const userRef = ref(database, 'users/' + currentUser.uid);
        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            // Create a new variable to store the room ID
            const updatedUserData = {
              ...userData,
              bookedRoomId: roomId,
            };
            // Set the updated user data back to Firebase
            set(userRef, updatedUserData);
          } else {
            console.log('User data not found');
          }
        }).catch((error) => {
          console.error('Error fetching user data:', error);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {rooms.map(room => (
            <div key={room._id} className='room'>
              <div className="image">
                <img
                  src={`data:${room.homeImage.contentType};base64,${Buffer.from(room.homeImage.data).toString('base64')}`}
                  alt="Room Image"
                />
              </div>
              <div className="description1">
                <div className="title"><h2>{room.name}</h2></div>
                <div className="des"><p>{room.description}</p></div>
                <div className="type"><h3>Type: {room.type}</h3></div>
                <div className="rentbutt">
                  <div className="rent"><h3>₹{room.rent}</h3></div>
                  <button className='bookbutton' onClick={() => handleBookNow(room._id)}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {popupVisible && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Room Booked Successfully!</h2>
            <p>You have successfully booked {bookedRoom.name}.</p>
            <button onClick={() => setPopupVisible(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
