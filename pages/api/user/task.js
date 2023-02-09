import UserModel from '../../../models/user.model';
import connectDB from '../../../middleware/database';
import TaskModel from '../../../models/task.model';

export default async (req, res) => {
    await connectDB();

    if(req.method === "GET"){
        return getTasks(req,res);
      
    }else if(req.method === "POST"){
        return addTask(req,res);
    }else if(req.method === "PATCH"){
        return updateTask(req,res);
    }else if(req.method === "DELETE"){
        return deleteTask(req,res);
    }else{
        return res.status(400).send({
            message : "Invalid request"
        });
    }
}

async function getTasks(req,res){
    try {
        const {userid :userId} = req.headers;

        const todaydate = new Date();
        const date = new Date(todaydate).toDateString();
        
        const tasks =await TaskModel.findOne({userId,date});
        
        return res.status(200).send({
            message : "Tasks fetched successfully",
            tasks : tasks
        });
    } catch (error) {

        return res.status(500).send({
            message : "Something went wrong",
            error : error
        });
        
    }
}

async function addTask(req,res){
    try {
        const {userid :userId} = req.headers;
        
        const todaydate = new Date();
        const date = new Date(todaydate).toDateString();
        
        const tasks =await TaskModel.findOne({userId,date});
        

        if(tasks){
            const {task} = req.body;
            tasks.tasks.push({
                task,
                status:false
            });
            await tasks.save();
            return res.status(200).send({
                message : "Tasks Added successfully",
                tasks : tasks
            });
        }else{
            const {task} = req.body;
            const newTask = await TaskModel.create({
                userId,
                date,
                tasks : [
                    {
                        task,
                        status:false
                    }
                ]
            });
            return res.status(200).send({
                message : "Tasks Added successfully",
                tasks : newTask
            });
        }
        
    } catch (error) {
            
            return res.status(500).send({
                message : "Something went wrong",
                error : error
            });
        
    }
}

async function updateTask(req,res){
    try {
        const {userid :userId} = req.headers;
        
        const todaydate = new Date();
        const date = new Date(todaydate).toDateString();
        
        const tasks =await TaskModel.findOne({userId,date});
        
        const {taskId,task,status} = req.body;

        if(tasks){
            const taskIndex = tasks.tasks.findIndex((task) => task._id == taskId);
            tasks.tasks[taskIndex].task = task;
            tasks.tasks[taskIndex].status = status;
            await tasks.save();
            return res.status(200).send({
                message : "Tasks Updated successfully",
                tasks : tasks
            });
        }


    } catch (error) {

        return res.status(500).send({
            message : "Something went wrong",
            error : error
        });
        
    }
}


async function deleteTask(req,res){
try {
    const {userid :userId} = req.headers;
        
    const todaydate = new Date();
    const date = new Date(todaydate).toDateString();
    
    const tasks =await TaskModel.findOne({userId,date});
    
    const {taskId} = req.body;

    if(tasks){
        const taskIndex = tasks.tasks.findIndex((task) => task._id == taskId);
        tasks.tasks.splice(taskIndex,1);
        await tasks.save();
        return res.status(200).send({
            message : "Tasks Deleted successfully",
            tasks : tasks
        });
    }

} catch (error) {
    
        return res.status(500).send({
            message : "Something went wrong",
            error : error
        });
    
}
}
