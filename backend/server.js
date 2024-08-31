// import express from "express";
// import db from "./db.js";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import multer from "multer";
// import cors from 'cors';
// import axios from "axios";
// //import userRoutes from "./routes/user-routes";
// import prisonerRoutes from "./routes/under-trail-prisoner-routes.js";
// import judgeRoutes from "./routes/judge-routes.js";
// import lawyerRoutes from "./routes/lawyer-routes.js";
// import faceRecognitionRoutes from "./routes/faceRecognition-routes.js";

// import cookieParser from 'cookie-parser';

// dotenv.config();
// const app = express();

// app.use(cors({
//   origin: 'http://localhost:5173', 
//   credentials: true
// }));

// app.use(bodyParser.json()); // req.body
// app.use(cookieParser());

// const PORT = process.env.PORT || 3000;

// // Use the routers
// //app.use("/user", userRoutes);
// app.use("/judge", judgeRoutes);
// app.use("/lawyer", lawyerRoutes);
// app.use("/prisoner", prisonerRoutes);
// app.use("/face", faceRecognitionRoutes)



// // /* endpoint to calculate surety amount */ 
// // app.post("/judge/calculate-surety" , async (req,res) => {
// //   const {Offense_Type,Severity_Level,Criminal_Record,Monthly_Income,Assets,Liabilities,Socio_Economic_Status,Previous_Bail_Decisions} = req.body;

// //   const inputData = {
// //     Offense_Type : Offense_Type,
// //     Severity_Level :Severity_Level,
// //     Criminal_Record : Criminal_Record,
// //     Monthly_Income : Monthly_Income,
// //     Assets : Assets,
// //     Liabilities:Liabilities,
// //     Socio_Economic_Status:Socio_Economic_Status,
// //     Previous_Bail_Decisions:Previous_Bail_Decisions
// //   };


// //   try {
// //     const response = await axios.post("http://localhost:5000/predict-surety", inputData);
// //     const suretyAmount = response.data.suretyAmount;
// //     res.json({ suretyAmount });
// //   } catch (error) {
// //     console.error("Error calculating surety amount:", error);
// //     res.status(500).json({ message: "Failed to calculate the surety amount. Please try again." });
// //   }



// // })


// // Ensure that the endpoint function is marked as async if it uses await
// app.post("/judge/calculate-surety", async (req, res) => {
//   const {
//     Offense_Type,
//     Severity_Level,
//     Criminal_Record,
//     Monthly_Income,
//     Assets,
//     Liabilities,
//     Socio_Economic_Status,
//     Previous_Bail_Decisions,
//   } = req.body;

//   const inputData = {
//     Offense_Type,
//     Severity_Level,
//     Criminal_Record,
//     Monthly_Income,
//     Assets,
//     Liabilities,
//     Socio_Economic_Status,
//     Previous_Bail_Decisions,
//   };

//   try {
//     // Attempt to call the Flask server for surety calculation
//     const response = await axios.post(
//       "http://localhost:5000/predict-surety",
//       inputData
//     );
//     const suretyAmount = response.data.suretyAmount;

//     // Check if response data is correct
//     if (!suretyAmount) {
//       throw new Error("Surety amount is missing in the response");
//     }

//     res.json({ suretyAmount });
//   } catch (error) {
//     // Log full error details for debugging
//     console.error("Error calculating surety amount:", error.message, error.stack);
    
//     // Provide a detailed error message back to the frontend
//     res.status(500).json({
//       message: "Failed to calculate the surety amount. Check server logs for details.",
//     });
//   }
// });


// app.listen(PORT, () => {
//   console.log("listening on port 3000");
// });




import express from "express";
import db from "./db.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from 'cors';
import multer from "multer";
import axios from "axios";
import cookieParser from 'cookie-parser';


//import userRoutes from "./routes/user-routes";
import prisonerRoutes from "./routes/under-trail-prisoner-routes.js";
import judgeRoutes from "./routes/judge-routes.js";
import lawyerRoutes from "./routes/lawyer-routes.js";
import faceRecognitionRoutes from "./routes/faceRecognition-routes.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(bodyParser.json()); // To parse JSON bodies
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use("/judge", judgeRoutes);
app.use("/lawyer", lawyerRoutes);
app.use("/prisoner", prisonerRoutes);
app.use("/face", faceRecognitionRoutes)

// Endpoint to calculate surety amount
app.post("/judge/calculate-surety", async (req, res) => {
  const {
    Offense_Type,
    Severity_Level,
    Criminal_Record,
    Monthly_Income,
    Assets,
    Liabilities,
    Socio_Economic_Status,
    Previous_Bail_Decisions,
  } = req.body;

  const inputData = {
    Offense_Type,
    Severity_Level,
    Criminal_Record,
    Monthly_Income,
    Assets,
    Liabilities,
    Socio_Economic_Status,
    Previous_Bail_Decisions,
  };

  // Log the data being sent to Flask server
  console.log("Sending data to Flask:", inputData);

  try {
    const response = await axios.post(
      "http://localhost:5000/predict-surety",
      inputData
    );
    const suretyAmount = response.data.suretyAmount;

    // Ensure that response data is correct
    if (suretyAmount === undefined || suretyAmount === null) {
      throw new Error("Surety amount is missing in the response");
    }

    res.json({ suretyAmount });
  } catch (error) {
    console.error("Error calculating surety amount:", error.message, error.stack);
    res.status(500).json({
      message: "Failed to calculate the surety amount. Check server logs for details.",
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});



// import express from "express";
// import db from "./db.js";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import cors from 'cors';
// import axios from "axios";
// import cookieParser from 'cookie-parser';
// import { spawn } from 'child_process';
// import path from 'path';
// const __dirname = path.resolve();
// import multer from "multer";

// //import userRoutes from "./routes/user-routes";
// import prisonerRoutes from "./routes/under-trail-prisoner-routes.js";
// import judgeRoutes from "./routes/judge-routes.js";
// import lawyerRoutes from "./routes/lawyer-routes.js";
// import faceRecognitionRoutes from "./routes/faceRecognition-routes.js";


// dotenv.config();

// const app = express();

// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));
// app.use(bodyParser.json());
// app.use(cookieParser());

// const PORT = process.env.PORT || 3000;

// const batchFilePath = path.join(__dirname, 'mlModels', 'runPythonFlaskScript.bat');

// // Function to start the Flask server
// function startFlaskServer() {
//   return new Promise((resolve, reject) => {
//     const flaskProcess = spawn('cmd.exe', ['/c', batchFilePath], { cwd: path.join(__dirname, 'mlModels') });

//     flaskProcess.stdout.on('data', (data) => {
//       console.log(`Flask server stdout: ${data.toString()}`);
//     });

//     flaskProcess.stderr.on('data', (data) => {
//       console.error(`Flask server stderr: ${data.toString()}`);
//     });

//     flaskProcess.on('close', (code) => {
//       if (code === 0) {
//         resolve(); 
//       } else {
//         reject(new Error(`Flask server failed with exit code ${code}`));
//       }
//     });
//   });
// }

// // Start the Flask server
// startFlaskServer()
//   .then(() => {
//     console.log('Flask server started successfully');
//   })
//   .catch((error) => {
//     console.error(`Failed to start Flask server: ${error.message}`);
//   });

// // Endpoint to calculate surety amount
// app.post("/judge/calculate-surety", async (req, res) => {
//   const {
//     Offense_Type,
//     Severity_Level,
//     Criminal_Record,
//     Monthly_Income,
//     Assets,
//     Liabilities,
//     Socio_Economic_Status,
//     Previous_Bail_Decisions,
//   } = req.body;

//   const inputData = {
//     Offense_Type,
//     Severity_Level,
//     Criminal_Record,
//     Monthly_Income,
//     Assets,
//     Liabilities,
//     Socio_Economic_Status,
//     Previous_Bail_Decisions,
//   };

//   // Log the data being sent to Flask server
//   console.log("Sending data to Flask:", inputData);

//   try {
//     const response = await axios.post(
//       "http://localhost:5000/predict-surety",
//       inputData
//     );
//     const suretyAmount = response.data.suretyAmount;

//     // Ensure that response data is correct
//     if (suretyAmount === undefined || suretyAmount === null) {
//       throw new Error("Surety amount is missing in the response");
//     }

//     res.json({ suretyAmount });
//   } catch (error) {
//     console.error("Error calculating surety amount:", error.message, error.stack);
//     res.status(500).json({
//       message: "Failed to calculate the surety amount. Check server logs for details.",
//     });
//   }
// });

// // Use the routers
// //app.use("/user", userRoutes);
// app.use("/judge", judgeRoutes);
// app.use("/lawyer", lawyerRoutes);
// app.use("/prisoner", prisonerRoutes);
// app.use("/face", faceRecognitionRoutes)

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });































// import express from "express";
// import bodyParser from "body-parser";
// import dotenv from "dotenv";
// import cors from 'cors';
// import axios from "axios";
// import cookieParser from 'cookie-parser';
// import { spawn } from 'child_process';
// import path from 'path';
// const __dirname = path.resolve();

// import prisonerRoutes from "./routes/under-trail-prisoner-routes.js";
// import judgeRoutes from "./routes/judge-routes.js";
// import lawyerRoutes from "./routes/lawyer-routes.js";
// import faceRecognitionRoutes from "./routes/faceRecognition-routes.js";

// dotenv.config();

// const app = express();

// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));
// app.use(bodyParser.json());
// app.use(cookieParser());

// const PORT = process.env.PORT || 3000;

// const batchFilePath = path.join(__dirname, '..', 'mlModels', 'runPythonFlaskScript.bat');
// console.log('Batch file path:', batchFilePath);

// // Function to start the Flask server
// const startFlaskServer = () => {
//   return new Promise((resolve, reject) => {
//     // Adjust cmd.exe path if necessary
//     const flaskProcess = spawn('cmd.exe', ['/c', batchFilePath]);

//     flaskProcess.stdout.on('data', (data) => {
//       console.log(`Flask server stdout: ${data.toString()}`);
//     });

//     flaskProcess.stderr.on('data', (data) => {
//       console.error(`Flask server stderr: ${data.toString()}`);
//     });

//     flaskProcess.on('close', (code) => {
//       if (code === 0) {
//         resolve(); 
//       } else {
//         reject(new Error(`Flask server failed with exit code ${code}`));
//       }
//     });
//   });
// }

// // Start the Flask server
// await startFlaskServer()

// // Endpoint to calculate surety amount
// app.post("/judge/calculate-surety", async (req, res) => {
//   const {
//     Offense_Type,
//     Severity_Level,
//     Criminal_Record,
//     Monthly_Income,
//     Assets,
//     Liabilities,
//     Socio_Economic_Status,
//     Previous_Bail_Decisions,
//   } = req.body;

//   const inputData = {
//     Offense_Type,
//     Severity_Level,
//     Criminal_Record,
//     Monthly_Income,
//     Assets,
//     Liabilities,
//     Socio_Economic_Status,
//     Previous_Bail_Decisions,
//   };

//   // Log the data being sent to Flask server
//   console.log("Sending data to Flask:", inputData);

//   try {
//     const response = await axios.post(
//       "http://localhost:5000/predict-surety",
//       inputData
//     );
//     const suretyAmount = response.data.suretyAmount;

//     // Ensure that response data is correct
//     if (suretyAmount === undefined || suretyAmount === null) {
//       throw new Error("Surety amount is missing in the response");
//     }

//     res.json({ suretyAmount });
//   } catch (error) {
//     console.error("Error calculating surety amount:", error.message, error.stack);
//     res.status(500).json({
//       message: "Failed to calculate the surety amount. Check server logs for details.",
//     });
//   }
// });

// // Use the routers
// app.use("/judge", judgeRoutes);
// app.use("/lawyer", lawyerRoutes);
// app.use("/prisoner", prisonerRoutes);
// app.use("/face", faceRecognitionRoutes);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });
