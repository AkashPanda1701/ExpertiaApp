import mongoose from "mongoose";
mongoose.set('strictQuery', false);


async function connectDB (){
    return mongoose.connect(process.env.DB_URL)
}

export default connectDB;