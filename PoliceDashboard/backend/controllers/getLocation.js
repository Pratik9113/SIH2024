// import mongoose from "mongoose";
// import Face from "../models/faceModel.js";

// export const getLatestLocation = async (req, res) => {
//     try {
//         const latestLocations = await Face.aggregate([
//             { $unwind: "$attendance" }, 
//             { $sort: { "attendance.date": -1 } },
//             {
//                 $group: {
//                     _id: "$email_id", 
//                     latestLocation: { $first: "$attendance.location" }, 
//                     latestDate: { $first: "$attendance.date" }, 
//                     email: { $first: "$email_id" } 
//                 }
//             },
//             {
//                 $project: {
//                     _id: 0,
                    
//                     email: 1,
//                     latitude: "$latestLocation.latitude",
//                     longitude: "$latestLocation.longitude",
//                     date: "$latestDate" 
//                 }
//             }
//         ]);
//         res.json(latestLocations);
//     } catch (error) {
//         console.error('Error fetching latest locations:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };


import mongoose from "mongoose";
import Face from "../models/faceModel.js";

export const getLatestLocation = async (req, res) => {
    try {
        const latestLocations = await Face.aggregate([
            { $unwind: "$attendance" }, 
            { $sort: { "attendance.date": -1 } },
            {
                $group: {
                    _id: "$email_id",  
                    latestLocation: { $first: "$attendance.location" }, 
                    latestDate: { $first: "$attendance.date" }, 
                    email : { $addToSet: "$email_id" }  
                }
            },
            {
                $project: {
                    _id: 0,  
                    email: 1, 
                    latitude: "$latestLocation.latitude",  
                    longitude: "$latestLocation.longitude", 
                    date: "$latestDate"
                }
            }
        ]);
        res.json(latestLocations);
    } catch (error) {
        console.error('Error fetching latest locations:', error);
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
};

