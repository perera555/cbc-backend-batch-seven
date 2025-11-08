import express from 'express';
import mongoose from 'mongoose';
import studentRouter from './routers/studentRouter.js';
import userRouter from './routers/userRouter.js';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import productRouter from './routers/productRoutes.js';
import dotenv from 'dotenv';



dotenv.config();


const app = express();
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {

    let token = req.header('Authorization');

    if (token != null) {
        token = token.replace("Bearer ", "");
        jwt.verify(token, "jwt-secret", (err, decoded) => {
            if (decoded == null) {
                res.json({
                    message: "Invalid Token please login again"
                })
                return;
            } else {

                req.user = decoded;

            }

        }

        )
    }
    next();


})


const connectionString = process.env.MONGO_URI;
mongoose.connect(connectionString).then(() => {
    console.log("Connected to the database");
})
    .catch((err) => {
        console.log("Error connecting to the database", err);
    })

app.use('/students', studentRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);



app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

