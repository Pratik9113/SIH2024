// import userModel from "../models/userModels.js";
// import jwt from "jsonwebtoken";
// import path from 'path';
// import fs from 'fs'; 
// import { spawn } from 'child_process';;
// import validator from "validator";
// const __dirname = path.resolve();
// import dotenv from "dotenv";
// dotenv.config()
// const loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await userModel.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User does not exist" });
//         }
//         const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
//             expiresIn: '12h'
//         });
//         res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });
       
//         const batchFilePath = path.join(__dirname, '..', '1SIHFACE', 'runPythonScript.bat');

//                 const executePythonScript = () => {
//                     return new Promise((resolve, reject) => {
//                         const pythonProcess = spawn('cmd.exe', ['/c', batchFilePath]);
        
//                         pythonProcess.stdout.on('data', (data) => {
//                             console.log(`stdout: ${data.toString()}`);
//                         });
        
//                         pythonProcess.stderr.on('data', (data) => {
//                             console.error(`stderr: ${data.toString()}`);
//                         });
        
//                         pythonProcess.on('close', (code) => {
//                             console.log(`Python process exited with code ${code}`);
//                             if (code === 0) {
//                                 resolve(); 
//                             } else {
//                                 reject(new Error(`Python script failed with exit code ${code}`));
//                             }
//                         });
//                     });
//                 };
        
//                 await executePythonScript();
        

//         const loginStatusPath = path.join(__dirname, '..', '1SIHFACE', 'face-attendance-system', 'login_status.txt' );
//         const readLoginStatus = () => {
//             return new Promise((resolve, reject) => {
//                 fs.readFile(loginStatusPath, 'utf8', (err, data) => {
//                     if (err) {
//                         return reject(err);
//                     }
//                     resolve(data);
//                 });
//             });
//         };

//         let loginStatus;
//         try {
//             loginStatus = await readLoginStatus();
//             console.log('Current login status:', loginStatus);
//         } catch (error) {
//             console.error('Error reading login status:', error);
//         }
//         if(loginStatus === `Logged in as ${email}`){
//             return res.status(200).json({
//                 success: true,
//                 message: 'User login successfully',
//                 token: token
//             });

//         }else{
//             console.error("Login Error:", error);
//         res.status(500).json({ success: false, message: "Internal server error" });
//         }
//     } catch (error) {
//         console.error("Login Error:", error);
//         res.status(500).json({ success: false, message: "Internal server error" });
//     }
// };
// const SignUp = async (req, res) => {
//     const { name, password, email } = req.body;
//     try {
//         const exists = await userModel.findOne({ email });
//         if (exists) {
//             return res.status(400).json({ success: false, message: "User already exists" });
//         }
//         if (!validator.isEmail(email)) {
//             return res.status(400).json({ success: false, message: "Please enter a valid email" });
//         }
//         if (password.length < 8) {
//             return res.status(400).json({ success: false, message: "Please enter a strong password (at least 8 characters)" });
//         }
//         const newUser = new userModel({
//             name,
//             email,
//             password
//         });
//         const user = await newUser.save();
//         const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
//             expiresIn: '12h'
//         });
//         res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });
//         return res.status(200).json({
//             success: true,
//             message: 'User signup successful',
//             token: token
//         });
//     } catch (error) {
//         console.error("Registration Error:", error);
//         res.status(500).json({ success: false, message: "Internal server error" });
//     }
// };

// export { loginUser, SignUp };




import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";
import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';
import validator from "validator";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.resolve();

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '12h' });
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });

        const batchFilePath = path.join(__dirname, '..', '1SIHFACE', 'runPythonScript.bat');

        const executePythonScript = () => {
            return new Promise((resolve, reject) => {
                const pythonProcess = spawn('cmd.exe', ['/c', batchFilePath]);

                pythonProcess.stdout.on('data', (data) => {
                    console.log(`stdout: ${data.toString()}`);
                });

                pythonProcess.stderr.on('data', (data) => {
                    console.error(`stderr: ${data.toString()}`);
                });

                pythonProcess.on('close', (code) => {
                    console.log(`Python process exited with code ${code}`);
                    if (code === 0) {
                        resolve();
                    } else {
                        reject(new Error(`Python script failed with exit code ${code}`));
                    }
                });
            });
        };

        await executePythonScript();

        const loginStatusPath = path.join(__dirname, '..', '1SIHFACE', 'face-attendance-system', 'login_status.txt');
        const readLoginStatus = () => {
            return new Promise((resolve, reject) => {
                fs.readFile(loginStatusPath, 'utf8', (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(data);
                });
            });
        };

        let loginStatus;
        try {
            loginStatus = await readLoginStatus();
            console.log('Current login status:', loginStatus);
        } catch (error) {
            console.error('Error reading login status:', error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }

        if (loginStatus === `Logged in as ${email}`) {
            return res.status(200).json({
                success: true,
                message: 'User login successfully',
                token: token
            });
        } else {
            console.error("Login Error: Invalid status");
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const SignUp = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password (at least 8 characters)" });
        }
        const newUser = new userModel({
            name,
            email,
            password
        });
        const user = await newUser.save();
        const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '12h' });
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });
        return res.status(200).json({
            success: true,
            message: 'User signup successful',
            token: token
        });
    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { loginUser, SignUp };
