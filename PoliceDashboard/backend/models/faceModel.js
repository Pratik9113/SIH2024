// import mongoose from 'mongoose';

// const faceSchema = new mongoose.Schema({
//     userId: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//     },
//     attendance: [{
//         date: {
//             type: Date,
//             default: Date.now,
//         },
//         status: {
//             type: String,
//             enum: ['present', 'absent'],
//             default: 'present',
//         }
//     }]
// },{timestamps:true});

// const Face = mongoose.model('Face', faceSchema);

// export default Face;



import mongoose from 'mongoose';

const faceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    attendance: [{
        date: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ['present', 'absent'],
            default: 'present',
        },
        location: {
            latitude: {
                type: Number,
                required: false,
            },
            longitude: {
                type: Number,
                required: false,
            }
        }
    }]
},{timestamps:true});

const Face = mongoose.model('prisonerfacerecognition', faceSchema);

export default Face;
