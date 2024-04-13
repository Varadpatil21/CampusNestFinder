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
        const { name, noofRooms, rent, type, description } = req.body;
        const homeImage = {
            data: req.file.buffer, 
            contentType: req.file.mimetype 
        };

      
        const newRoom = new Room({
            name,
            noofRooms,
            rent,
            type,
            description,
            homeImage // This assumes you're saving the image directly to the database as Buffer
        });
        console.log(req.file)
        await newRoom.save();

        return res.status(201).json({ message: "New Room Added Successfully", room: newRoom });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

module.exports = router;
