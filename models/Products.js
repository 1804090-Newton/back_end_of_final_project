import mongoose from "mongoose"

const Products = new mongoose.Schema({ 
    productName: {
        type: String,
        required: true,
        unique: true
    },
    productShortCode: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    imageURL:{
        type: String
    },
    isBest:{
        type: Boolean
    },
    origin: {
        type: String,
        required: true
    },    
},
 { timestamps: true }
)

export default mongoose.model("Products", Products)