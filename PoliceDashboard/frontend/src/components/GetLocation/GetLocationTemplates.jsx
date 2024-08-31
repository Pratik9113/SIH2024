// // import React, { useState } from 'react';
// // import './GetLocationTemplates.css';
// // import LocationPrisoner from './LocationPrisoner';

// // const GetLocationTemplates = ({ location, onConfirm }) => {
// //     const [showLocation, setShowLocation] = useState(false);
// //     const handleLocationOpen = () => {
// //         setShowLocation(true);
// //     };

// //     const handleLocationClose = () => {
// //         setShowLocation(false);
// //     };
// //     return (
// //         <>
// //             <div className="location-block">
// //                 <div className="location-info">
// //                     <div className="location-information">
// //                         <div className="location-img">
// //                             <img src="https://img.etimg.com/thumb/width-1200,height-900,imgsize-31746,resizemode-75,msid-19144757/industry/services/consultancy-/-audit/is-your-location-cheating-you.jpg" alt="location" />
// //                         </div>
// //                         <div className="location-personal-info">
// //                             <h3>Email: {location.email}</h3>
// //                             <p>Latitude: {location.latitude}</p>
// //                             <p>Longitude: {location.longitude}</p>
// //                             <p><b>Address</b>: Mumbai, Colaba</p>
// //                         </div>
// //                     </div>
// //                     <div className="location-booking">
// //                         <p>Date: {new Date(location.date).toLocaleString()}</p>
// //                         <p>Phone No: 7999505967</p>
// //                         <button onClick={() => { handleLocationOpen }}>Last Location</button>
// //                     </div>
// //                 </div>
// //                 {showLocation && (
// //                     <LocationPrisoner
// //                         latitude={location.latitude}
// //                         longitude={location.longitude}
// //                         onClose={handleLocationClose} />
// //                 )}
// //             </div>
// //         </>
// //     );
// // };

// // export default GetLocationTemplates;


// import React, { useState } from 'react';
// import './GetLocationTemplates.css';
// import LocationPrisoner from './LocationPrisoner';

// const GetLocationTemplates = ({ location, onConfirm }) => {
//     const [showLocation, setShowLocation] = useState(false);

//     const handleLocationOpen = () => {
//         setShowLocation(true);
//     };

//     const handleLocationClose = () => {
//         setShowLocation(false);
//     };

//     return (
//         <>
//             <div className="location-block">
//                 <div className="location-info">
//                     <div className="location-information">
//                         <div className="location-img">
//                             <img src="https://img.etimg.com/thumb/width-1200,height-900,imgsize-31746,resizemode-75,msid-19144757/industry/services/consultancy-/-audit/is-your-location-cheating-you.jpg" alt="location" />
//                         </div>
//                         <div className="location-personal-info">
//                             <h3>Email: {location.email}</h3>
//                             <p>Latitude: {location.latitude}</p>
//                             <p>Longitude: {location.longitude}</p>
//                             <p><b>Address</b>: Mumbai, Colaba</p>
//                         </div>
//                     </div>
//                     <div className="location-booking">
//                         <p>Date: {new Date(location.date).toLocaleString()}</p>
//                         <p>Phone No: 7999505967</p>
//                         <button onClick={handleLocationOpen}>Last Location</button>
//                     </div>
//                 </div>
//                 {showLocation && (
//                     <LocationPrisoner
//                         latitude={location.latitude}
//                         longitude={location.longitude}
//                         onClose={handleLocationClose}
//                     />
//                 )}
//             </div>
//         </>
//     );
// };

// export default GetLocationTemplates;



import React, { useState } from 'react';
import './GetLocationTemplates.css';
import LocationPrisoner from './LocationPrisoner';
import MapDisplay from './MapDisplay';
import { assets } from '../../assets/assets';

const GetLocationTemplates = ({ location, onConfirm }) => {
    const [showLocation, setShowLocation] = useState(false);

    const handleLocationOpen = () => {
        setShowLocation(true);
    };

    const handleLocationClose = () => {
        setShowLocation(false);
    };

    return (
        <>
            <div className="location-block">
                <div className="location-info">
                    <div className="location-information">
                        <div className="location-img">
                            <img className='w-25 h-25'
                                src={assets.PrisonerLogo}
                                alt="location"
                            />
                        </div>
                        <div className="location-personal-info">
                            <h3>Email: {location.email}</h3>
                            <p>Latitude: {location.latitude}</p>
                            <p>Longitude: {location.longitude}</p>

                        </div>
                    </div>
                    <div className="location-booking">
                        <p>Date: {new Date(location.date).toLocaleString()}</p>
                        <p>Phone No: 7999505967</p>
                        <button onClick={handleLocationOpen}>Last Location</button>
                    </div>
                </div>
                {showLocation && (
                    <>
                        <LocationPrisoner
                            latitude={location.latitude}
                            longitude={location.longitude}
                            onClose={handleLocationClose}
                        />
                        <MapDisplay
                            latitude={location.latitude}
                            longitude={location.longitude}
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default GetLocationTemplates;
