import config from "../../../config/index";
import { IUser } from "./user.interface";
import { User } from "./user.model"
import { generateUserId } from "./user.utils";


const createUser =  async (user:IUser):Promise<IUser | null> => {
    // auto genrated incremental id
    const id = await generateUserId()
    user.id = id 
    // default password
    if(!user.password){
        user.password = config.default_user_password as string
    }
        const  createdUser = await User.create(user);
        if(!createdUser){
            throw new Error('Failed to create user!')
        }
        return createdUser;
}






export default{
    createUser
} 