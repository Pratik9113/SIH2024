import mongoose from "mongoose";
export const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.monogDb_Url);
        console.log(`db is connected`)
    } catch (error) {
        console.log(error)
    }
}