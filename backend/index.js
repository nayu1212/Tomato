const express = require('express');
const cors = require('cors');
const connectDB =require('./config/db')
const foodRouter=require('./routes/foodRoutes')
const userRoute=require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const orderRouter = require('./routes/orderRoute');
const bodyParser = require('body-parser');
require('dotenv').config();


const app=express()
const port =4000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json())
app.use(cors());
connectDB();
app.use('/api/food',foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRoute)
app.use("/api/cart",cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("api working")
   })


   app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
 })
