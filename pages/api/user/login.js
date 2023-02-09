import UserModel from '../../../models/user.model';
import connectDB from '../../../middleware/database';

export default async (req, res) => {

    await connectDB();

    if(req.method === "POST"){
       try {
        const {username, password} = req.body;
        const userExist = await UserModel.findOne({username});
        if(userExist){
            
            if(userExist.password == password){
                return res.status(200).send({
                    message : "User logged in successfully",
                    user:{
                        username : userExist.username,
                        email : userExist.email,
                    }
                    
                });
            }else{
                return res.status(400).send({
                    message : "Invalid Credentials"
                });
            }
        }else{
            return res.status(400).send({
                message : "User does not exist please signup"
            });
        }
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