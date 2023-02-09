import mongoose from "mongoose";

async function connectDB (){
    return mongoose.connect(process.env.DB_URL)
}

export default connectDB;