const express = require('express');
const router = express.Router();
const multer = require('multer');

const Room = require('../Model/Room/Room');

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/getrooms', async (req, res) => {
    try {
        const rooms = await Room.find({});
        return res.json({ rooms });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/addroom", upload.single('homeImage'), async (req, res) => {
    try {
        const {id, name, noofRooms, rent, type, description,latitude,longitude,features } = req.body;
        const homeImage = {
            data: req.file.buffer, 
            contentType: req.file.mimetype 
        };

      
        const newRoom = new Room({
            id,
            name,
            noofRooms,
            rent,
            type,
            description,
            homeImage,
            latitude,
            longitude,features 
        });
        console.log(req.file)
        await newRoom.save();

        return res.status(201).json({ message: "New Room Added Successfully", room: newRoom });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
router.put('/book/:roomId', async (req, res) => {
    const { roomId } = req.params;
    const { userId } = req.body;
  
    try {
      const room = await Room.findById(roomId);
  
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }

      // Check if userId already exists in currentBookings array
      if (room.currentBookings.includes(userId)) {
        return res.status(400).json({ message: 'User already booked this room' });
      }
  
      // Add userId to currentBookings array
      room.currentBookings.push(userId);
      await room.save();
  
      res.status(200).json({ message: 'Room booked successfully', room });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
});
router.get('/:id', async (req, res) => {
    try {
      const roomId = req.params.id;
      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
      res.json(room);
    } catch (error) {
      console.error('Error fetching room details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.get('user/:userId', async (req, res) => {
    try {
      const userid = req.params.userId;
      console.log(userid)
      const rooms = await Room.find({ ID:userid }); // Assuming userId field in the room document
      res.json(rooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
module.exports = router;
