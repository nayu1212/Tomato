const orderModel=require('../models/orderModel');
const userModel=require('../models/userModel')
const Stripe=require('stripe')
// const axios = require('axios');

const apiKey = process.env.STRIPE_SECRET_KEY;
// const frontend_url = 'YOUR_FRONTEND_URL';
const express = require('express');
const app = express();


const stripe=new Stripe("sk_test_51OglEjSIdKWhCH2GX4vpbpWr8h89aydBhBZxH3KHRChIe6XHcsxgMnw2BLEMijPNUDPskiEiKKbG8hJQusjhcTsr00zbVjmGjT")

const placeOrder=async(req,res)=>{

const frontend_url='http://localhost:3000'


   try {
    const newOrder=new orderModel({
        userId:req.body.userId,
        items:req.body.items,
        amount:req.body.amount,
        address:req.body.address
    })
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
     
//     const line_items=req.body.items.map((item)=>({
// price_data:{
//     currency:"inr",
//     product_data:{
// name:item.name
//     },
//     unit_amount:item.amount*100
// },
// quantity:item.quantity
//     }))
//     line_items.push({
//         price_data:{
//             currency:"inr",
//             product_data:{
//                 name:"Delivery Charges"
//             },
//             unit_amount:2*100
//         },
//         quantity:1
//     })
    const line_items = [
        {
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100
            },
            quantity:1
        }
    ]

    const headers = {
        'Authorization': `Bearer ${apiKey}`
      };
      
    const session= await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:'payment',
        success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    
    }
    , {
        headers: headers
      })



res.json({success:true,session_url:session.url})


   } catch (error) {
    
    console.log(error);
    res.json({success:false,message:"Error"})
   }
}

app.post('/create-checkout-session',)


module.exports={placeOrder}