const mongo = require("mongoose")

const UserSchema = new mongo.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const ProductSchema = new mongo.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    image:{type:String},
    creatorId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const User = mongo.model("User", UserSchema);
const Product = mongo.model("Product", ProductSchema);

module.exports = { User, Product };
