import React, { useEffect, useState } from 'react';
import './GetLocation.css';
import GetLocationTemplates from './GetLocationTemplates';
import GetLocationSearchBar from './GetLocationSearchBar';

const GetLocation = () => {
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
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
                } else if (filter == 'not-registered-today') {
                    const locationDate = locationTime.toDateString();
                    const todayDate = currentTime.toDateString();
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

    return (
        <div className="location-container">
            <GetLocationSearchBar onSearch={handleSearch} />
            <h2 className='location-heading'>Latest Location</h2>
            <div className="location-list">
                {filteredLocations.map(location => (
                    <GetLocationTemplates
                        key={location.userId}
                        location={location}
                        onConfirm={handleConfirm}
                    />
                ))}
            </div>
        </div>
    );
};

export default GetLocation;
