// import React from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const FaceRecognition = () => {
//     const handleButtonClick = async () => {
//         try {
//             const response = await axios.post('http://localhost:4000/api/face/capture', {}, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 withCredentials: true,
//             });

//             if (response.data.success) {
//                 toast.success('Attendance marked successfully!');
//             } else {
//                 toast.error('Failed to mark attendance.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             toast.error('An error occurred while marking attendance.');
//         }
//     };

//     return (
//         <div>
//             <button onClick={handleButtonClick}>Capture Face</button>
//         </div>
//     );
// };

// export default FaceRecognition;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const FaceRecognition = () => {
//     const [loading, setLoading] = useState(false);

//     const handleButtonClick = async () => {
//         setLoading(true);

//         try {
//             const response = await axios.post('http://localhost:4000/api/face/capture', {}, {
//                 withCredentials: true,
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (response.data.success) {
//                 toast.success('Attendance marked successfully!');
//             } else {
//                 toast.error('Failed to mark attendance.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             toast.error('An error occurred while marking attendance.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <button
//                 onClick={handleButtonClick}
//                 disabled={loading}
//                 style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
//             >
//                 {loading ? 'Processing...' : 'Capture Face'}
//             </button>
//         </div>
//     );
// };

// export default FaceRecognition;



import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const FaceRecognition = () => {
    const [loading, setLoading] = useState(false);

    const handleButtonClick = async () => {
        setLoading(true);

        // Step 1: Capture the user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    try {
                        // Step 2: Send the location data along with the POST request
                        const response = await axios.post(
                            'http://localhost:4000/api/face/capture',
                            { latitude, longitude },
                            {
                                withCredentials: true,
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            }
                        );

                        if (response.data.success) {
                            toast.success('Attendance marked successfully!');
                        } else {
                            toast.error('Failed to mark attendance.');
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        toast.error('An error occurred while marking attendance.');
                    } finally {
                        setLoading(false);
                    }
                },
                (error) => {
                    console.error('Error getting location:', error);
                    toast.error('Failed to retrieve location.');
                    setLoading(false);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        } else {
            toast.error('Geolocation is not supported by your browser.');
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                onClick={handleButtonClick}
                disabled={loading}
                style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
            >
                {loading ? 'Processing...' : 'Capture Face'}
            </button>
        </div>
    );
};

export default FaceRecognition;
