import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../context/StoreContext';

const PrisonerFaceRecognition = () => {
    const [loading, setLoading] = useState(false);
    const { token } = useContext(StoreContext);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, [token]);




    const handleFaceRecognition = async () => {
        const email_id = localStorage.getItem("email_id");
        const storedToken = localStorage.getItem("token");
        console.log('Retrieved Email:', email_id);
        console.log('Retrieved Token:', storedToken);

        if (!email_id || !storedToken) {
            toast.error('Authentication data not found. Please log in again.');
            return;
        }

        setLoading(true);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    try {
                        const response = await axios.post(
                            'http://localhost:3000/face/face-recognition',
                            { email_id, latitude, longitude },
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${storedToken}`,
                                },
                            }
                        );

                        console.log('API Response:', response.data);
                        if (response.data.status) {
                            toast.success('Attendance marked successfully!');
                        } else {
                            toast.error('Failed to mark attendance.');
                        }
                    } catch (error) {
                        console.error('Error in face recognition request:', error);
                        if (error.response && error.response.status === 401) {
                            toast.error('Unauthorized. Please log in again.');
                        } else {
                            toast.error('An error occurred while marking attendance.');
                        }
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
                onClick={handleFaceRecognition}
                disabled={loading}
                style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
            >
                {loading ? 'Processing...' : 'Capture Face'}
            </button>
        </div>
    );
};

export default PrisonerFaceRecognition;
