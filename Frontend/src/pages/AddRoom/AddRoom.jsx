import { useState } from 'react';
import React from 'react';
import './AddRoom.css';
import axios from 'axios';

export const AddRoom = () => {
    const [name, setName] = useState('');
    const [noofRooms, setNoOfRooms] = useState('');
    const [rent, setRent] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [homeImage, setHomeImage] = useState(null); // Change to null

    const addRoom = async (e) => {
        e.preventDefault();
        const formData = new FormData(); // Create FormData object
        formData.append('name', name);
        formData.append('noofRooms', noofRooms);
        formData.append('rent', rent);
        formData.append('type', type);
        formData.append('description', description);
        formData.append('homeImage', homeImage); // Append the file data

        try {
            const response = await axios.post('http://localhost:5000/api/rooms/addroom', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set content type to multipart/form-data
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='room-container'>
            <form action=''>
                <h2>Add Room</h2>
                <div className='input'>
                    <input type='text' name='PGname' placeholder='PG Name' onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className='input'>
                    <input type='number' name='noOfRooms' placeholder='Room Count' onChange={(e) => setNoOfRooms(e.target.value)} required />
                </div>
                <div className='input'>
                    <input type='number' name='rent' placeholder='Rent' onChange={(e) => setRent(e.target.value)} required />
                </div>
                <div className='input'>
                    <input type='text' name='type' placeholder='Type' onChange={(e) => setType(e.target.value)} required />
                </div>
                <div className='input'>
                    <input type='text' name='description' placeholder='Description' onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className='input1'>
                    <label htmlFor='myfile'>Select a Home Image:</label>
                    <input type='file' id='myfile' name='myfile' onChange={(e) => setHomeImage(e.target.files[0])} required /> {/* Set as required */}
                </div>
                <button type='submit' className='submit' onClick={addRoom}>
                    Add Room
                </button>
            </form>
        </div>
    );
};
