const express = require( 'express' );
const cors = require('cors');
const mongoose = require( "mongoose" );
const userRoute = require('./Routes/userRoute.js');
const chatRoute = require('./Routes/chatRoutes.js');
const messageRoute = require('./Routes/messageRoute.js');

const app = express();
require('dotenv').config()

app.use( express.json() );
app.use( cors() );
app.use("/api/users" , userRoute);  
app.use('/api/chats',  chatRoute);
app.use(' /api/messages', messageRoute);

app.get("/", (req, res) =>{
    res.send("Welcome our chat app APIs..")
})

const port = process.env.Port || 5000;
const uri = process.env.ATLAS_URI || 5000;

app.listen(port, (req, res) =>{
    console.log(`Server is running on port... ${port}`);
})

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log("MongoDB connection established"))
  .catch((error) => console.log("MongoDB connection failed: ", error.message));