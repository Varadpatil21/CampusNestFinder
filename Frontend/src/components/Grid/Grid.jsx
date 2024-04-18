import React, { useState } from 'react';
import './Grid.css';

export const Grid = () => {
  // State to manage the booking status of each room
  const [rooms, setRooms] = useState(Array(50).fill(false)); // Initially, all rooms are not booked

  // Function to toggle the booking status of a room
  const toggleBookingStatus = (index) => {
    const newRooms = [...rooms];
    newRooms[index] = !newRooms[index];
    setRooms(newRooms);
  };

  return (
    <div>
        <h2>Snatosh Hostel</h2>
        <h3>Akurdi</h3>
         <div className="grid-container">
      {/* Render a grid of cells */}
     
      {rooms.map((isBooked, index) => (
        <div
          key={index}
          className={`grid-cell ${isBooked ? 'booked' : 'not-booked'}`}
          onClick={() => toggleBookingStatus(index)}
        >
          {/* Display room number */}
          Room {index + 1}
        </div>
      ))}
    </div>
    </div>
   
  );
};
