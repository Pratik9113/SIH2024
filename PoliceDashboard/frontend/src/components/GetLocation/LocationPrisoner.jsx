import React, { useEffect, useState } from 'react';

const LocationPrisoner = ({ latitude, longitude, onClose }) => {
    // const [address, setAddress] = useState('');
    // const [error, setError] = useState('');

    // useEffect(() => {
    //     const fetchAddress = async () => {
    //         try {
    //             const response = await fetch(
    //                 `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`
    //             );
    //             const data = await response.json();
    //             if (data.results && data.results.length > 0) {
    //                 setAddress(data.results[0].formatted);
    //             } else {
    //                 setError('No address found for the provided coordinates.');
    //             }
    //         } catch (err) {
    //             setError('Failed to fetch address.');
    //         }
    //     };

    //     fetchAddress();
    // }, [latitude, longitude]);

    return (
        <div className="location-prisoner-modal">
            <h3>Prisoner Location Details</h3>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>

            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default LocationPrisoner;
