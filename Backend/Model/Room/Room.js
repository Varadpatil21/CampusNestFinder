const mongoose = require('mongoose');

const roomSchema = mongoose.Schema(
    {
        id: {
            type: String,
        },
        owner: {
            type: String,
        },
        name: {
            type: String,
        },
        noofRooms: {
            type: Number,
        },
        contact: {
            type: Number,
        },
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
        rent: {
            type: Number,
        },
       features: [],
        currentBookings: [],
        type: {
            type: String,
        },
        description: {
            type: String,
        },
        homeImage: {
            data: Buffer, 
            contentType: String, 
        },
    },
    {
        timestamps: true,
    }
);

const roomModel = mongoose.model('rooms', roomSchema);
module.exports = roomModel;
