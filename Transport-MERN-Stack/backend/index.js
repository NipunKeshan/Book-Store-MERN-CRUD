import express, { request, response } from  "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import transportsRoute from './routes/transportsRoute.js';
import cors from 'cors';
import vehiclesRoute from './routes/vehiclesRoute.js';


const app = express();

//Middleware for passing request body
app.use(express.json());

//Middleware for handling CORS policy
//option 1:Allow All orogons with default of cors(*)
app.use(cors());

app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send('Welcome to MERN Stack Tutorial');
});

app.use('/transports',transportsRoute);
app.use('/vehicles',vehiclesRoute);


mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT,()=>{
            console.log(`App is listning to port: ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    });