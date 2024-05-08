const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://agrawalnayan1212:nayan1212@cluster0.wfvdrhm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB connected");
    } catch (error) {
        console.error("Error connecting to database:", error.message);
    }
}

module.exports = connectDB;
