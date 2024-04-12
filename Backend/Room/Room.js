const mongoose=require('mongoose')

const roomSchema=mongoose.Schema({
    id:{
        type:String,
    },
    owner:{
        type:String,
    },
    name:{
        type:String,
    },
    noofRooms:{
        type:Number,
    },
    contact:{
        type:Number,
    },
    rent:{
        type:Number,
    },
    imageurls:[],
    currentBookings:[],
    type:{
        type:String,
    },
    description:{
        type:String,
    }},
    {
        timestamps:true
    }
)
const roomModel=mongoose.model('rooms',roomSchema)
module.exports=roomModel