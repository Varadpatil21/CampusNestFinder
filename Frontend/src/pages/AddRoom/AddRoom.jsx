import { useState } from 'react'
import React from 'react'
import './AddRoom.css'
import axios from 'axios'


export const AddRoom = () => {
    const [name,setName]=useState("")
    const [noofRooms,setnoOfRooms]=useState()
    const [rent,setRent]=useState()
    const [type,setType]=useState("")
    const [description,setDescription]=useState("")
    
    const addRoom= async(e)=>{
        e.preventDefault();
        const formData={
            name,
            noofRooms,
            rent,
            type,
            description
        }
        try {
            const response = await axios.post('http://localhost:5000/api/rooms/addroom', formData);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='room-container'>
            <form action="">
                <h2>Add Room</h2>
                <div className='input'>
                    <input type="text" name='PGname' placeholder='PG Name' onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className='input'>
                    <input type="number" name='noOfRooms' placeholder='Room Count' onChange={(e) => setnoOfRooms(e.target.value)} required />
                </div>
                <div className='input'>
                    <input type="Number" name='rent' placeholder='Rent' onChange={(e) => setRent(e.target.value)} required />
                </div>
                <div className='input'>
                    <input type="text" name='type' placeholder='Type' onChange={(e) => setType(e.target.value)} required />
                </div>
                <div className='input'>
                    <input type="text" name='description' placeholder='Description' onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <button type='submit' className='submit' onClick={addRoom} >Add Room</button>
            </form>
        </div>
    )
}
