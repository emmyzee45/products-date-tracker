const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
        title:{

                type: String,
                required: true,
        },
        userId: {
            type: String,
            required: true
        },
        desc:{
                type: String,
                required: true,
        },
        img:{
                type: String,
                required: true
        },
        categories:{
            type: Array,           
        },
        size:{
            type: Array,
        },
        color:{
            type: Array,
        },
        price:{
            type: Number,
            required: true,
        },
        expiredAt: {
            type: String,
        },
        isNoticed: {
            type: Boolean,
            default: false,
        },
        creatorEmail: {
            type: String,
            required: true
        },

}, { timestamps: true}
)

module.exports = mongoose.model("Product", ProductSchema)
