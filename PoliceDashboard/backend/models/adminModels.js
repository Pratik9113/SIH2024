import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true, unique:true},
    password : {type : String, required : true},
}, { timestamps: true })

const userModel = mongoose.models.user || mongoose.model("policeUser", adminSchema)
export default userModel