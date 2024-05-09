const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');
const Stripe = require('stripe');
const express = require('express');

const apiKey = "sk_test_51OglEjSIdKWhCH2GX4vpbpWr8h89aydBhBZxH3KHRChIe6XHcsxgMnw2BLEMijPNUDPskiEiKKbG8hJQusjhcTsr00zbVjmGjT";
const frontend_url = 'http://localhost:3000';
const stripe = new Stripe(apiKey);
const app = express();

const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: "Delivery Charges"
                    },
                    unit_amount: 2 * 100
                },
                quantity: 1
            }
        ];

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

app.post('/create-checkout-session', placeOrder);

module.exports = { placeOrder };
