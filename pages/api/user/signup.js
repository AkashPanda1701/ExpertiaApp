import UserModel from '../../../models/user.model';
import connectDB from '../../../middleware/database';

export default async (req, res) => {

    await connectDB();

    if(req.method === "GET"){
        const users = await UserModel.find({});
        return res.status(200).json({
            message: "Users fetched successfully",
            users : users
        });
    } 

    if(req.method === "POST"){
       try {
        const {username, email, password} = req.body;
        const userExist = await UserModel.findOne({username});
        if(userExist){
            return res.status(400).send({
                message : "User already exists please login"
            });
        }
        const user = await UserModel.create({username, email, password});
        return res.status(201).json({
            message: "User created successfully",
            user : {
                username : user.username,
                email : user.email,
            }
        });
       } catch (error) {
              console.log(error);
              res.status(500).send({
                message: "Something went wrong",
                error: error
              });
        
       }

    } else {
        res.status(400).json({
            message: "Invalid request"

        });
    }
}