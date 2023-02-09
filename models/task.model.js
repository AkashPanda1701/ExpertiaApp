import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    tasks : [
        {
            task:String,
            status:Boolean,
        }
    ]
},{
    versionKey: false,
} );

export default mongoose.models.Task || mongoose.model("Task", taskSchema);