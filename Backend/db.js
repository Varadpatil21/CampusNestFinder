const mongoose=require('mongoose')

const mongoURL="mongodb+srv://varad848:Varad%4039@mycluster.pon5g7l.mongodb.net/Owner"

mongoose.connect(mongoURL,{useUnifiedTopology:true,useNewUrlParser:true})




mongoose.connection.on('error',()=>{
    console.log("Mongo Connection failed")
})

mongoose.connection.on('connected',()=>{
    console.log("Mongo database connected")
})

module.exports=mongoose

