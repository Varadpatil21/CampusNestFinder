const express=require('express')
const router=express.Router()

const Room=require('../Room/Room')

router.get('/getrooms',async(req,res)=>{
    try{
        const rooms=await Room.find({})
        return res.json({rooms})
    }
    catch(error){
        return res.status(400).json({message:error});
    }
   
})

router.post("/addroom", async (req, res) => {
    try {
        const { name, noofRooms, rent, type, description } = req.body;
        
       
        const newRoom = new Room({
            name,
            noofRooms,
            rent,
            type,
            description
        });

        
        await newRoom.save();

       
        return res.status(201).json({ message: "New Room Added Successfully", room: newRoom });
    } catch (error) {
       
        return res.status(400).json({ error: error.message });
    }
});


module.exports=router;