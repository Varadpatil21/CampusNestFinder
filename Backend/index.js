const express=require('express')

const app=express();
const cors = require('cors');
app.use(cors());
app.use(express.json())
const dbconf=require('./db')
const PGRoute=require('../Backend/Routes/PGRoutes')

app.use('/api/rooms',PGRoute)

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))