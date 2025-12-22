import express from "express";
import mongoose from 'mongoose';
import {PORT,mongoDBURL} from "./config.js";
import {Book} from "./models/bookModels.js"
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

mongoose.set('strictQuery', true);

const app=express();
app.use(cors());

app.use(express.json());
app.get('/',(request,response)=>{
    console.log(request.url);
    return response.status(234).send("Heloooo");
});

//middleware for passing request body

app.use('/books',booksRoute);

//middleware for handling cors policy
//Option 1: allow all origins with default of cors(*)



//option 2 :Allow cors

// app.use(
//     cors({
//         origin:'http://localhost:3000',
//         methods:['GET','POST','PUT','DELETE'],
//         allowHeaders:['Content-Type'],
//     })
// )


mongoose
.connect(mongoDBURL)
.then(()=>{
console.log("app connected to database")
app.listen(PORT,()=>{
    console.log(`app is listening to port : ${PORT}`);
});
})
.catch((error)=>{
    console.log(error)
});