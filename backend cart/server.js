const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv=require("dotenv")
const port=5000;
dotenv.config();
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Db connected succesfully");
})
.catch((err)=>{
    console.log("db connected error",err)
})
const authRoutes = require("./Routes/authroutes");
const productRoutes = require("./Routes/productroutes");
const cartRoutes = require("./Routes/Cart");

const app = express();
app.use(express.json());
app.use(cors());


app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);

app.listen(port, () =>{

    console.log(`server running at port ${port}`);
})
