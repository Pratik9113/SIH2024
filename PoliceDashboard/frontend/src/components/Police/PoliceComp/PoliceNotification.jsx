


import React, { useState, useEffect } from 'react';
import { FaBell, FaExclamationTriangle, FaCheckCircle, FaGavel, FaCalendarCheck } from 'react-icons/fa'; // Import additional icons

const PoliceNotification = () => {


    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [nonRegisteredUsers, setNonRegisteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/location/latest-locations`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLocations(data);
                setFilteredLocations(data);

                // Calculate non-registered users based on some logic
                const nonRegistered = data.filter(location => {
                    // Add your logic here to filter non-registered users
                    const currentTime = new Date();
                    const locationTime = new Date(location.date);
                    const todayDate = currentTime.toDateString();
                    const locationDate = locationTime.toDateString();

                    return locationDate !== todayDate;
                });

                setNonRegisteredUsers(nonRegistered);

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);


    const handleSearch = (searchTerm, filter) => {
        let results = locations;

        if (filter) {
            const currentTime = new Date();
            const todayDate = currentTime.toDateString();
            results = results.filter(location => {
                const locationTime = new Date(location.date);
                const locationDate = locationTime.toDateString();

                if (filter === 'after-12pm') {
                    return locationTime.getHours() < 12 && locationDate === todayDate;
                } else if (filter === 'after-9pm') {
                    return locationTime.getHours() > 13 && locationTime.getHours() < 21 && locationDate === todayDate;
                } else if (filter === 'not-registered-today') {
                    return locationDate !== todayDate;
                }
                return true;
            });
        }

        if (searchTerm) {
            results = results.filter(location =>
                location.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                location.latitude.toString().includes(searchTerm) ||
                location.longitude.toString().includes(searchTerm)
            );
        }

        setFilteredLocations(results);
    };

    const handleConfirm = (userId) => {
        console.log(`Location confirmed for user: ${userId}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    const notifications = [
        {
            id: 1,
            message: "You have a new case assigned.",
            icon: <FaGavel className="text-blue-500" />, // Gavel icon for new case assignment
        },
        {
            id: 2,
            message: "Hearing scheduled for Case 002: Jane Smith vs City.",
            icon: <FaCalendarCheck className="text-blue-500" />, // Calendar check icon for hearing schedule
        },
        {
            id: 3,
            message: "Document review pending for Case 003: Alice Brown vs State.",
            icon: <FaExclamationTriangle className="text-yellow-500" />, // Warning icon for pending review
        },
        {
            id: 4,
            message: "Bail decision required for Case 004: Bob White vs State.",
            icon: <FaGavel className="text-red-500" />, // Gavel icon for bail decision
        },
        {
            id: 5,
            message: "Case 005: Carol Black vs City has been closed.",
            icon: <FaCheckCircle className="text-green-500" />, // Check circle icon for closed case
        },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Notifications</h2>
            <ul>
                {nonRegisteredUsers.length === 0 ? (
                    <p>All users have registered today.</p>
                ) : (
                    nonRegisteredUsers.map((user, index) => (
                        <li key={index} className="p-4 bg-white shadow mb-2 flex items-center">
                            <FaExclamationTriangle className="text-yellow-500 mr-4" />
                            <p>{`User with email ${user.email} has not registered today.`}</p>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default PoliceNotification;
