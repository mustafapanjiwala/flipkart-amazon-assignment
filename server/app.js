const express = require('express');
const mongoose = require('mongoose');
const flipkartRoutes = require('./routes/flipkartRoutes');
const cors = require('cors');
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(() => {
    const PORT = process.env.PORT || 8000
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error: ", error.message);
});

//routes
app.use('/flipkart', flipkartRoutes);







