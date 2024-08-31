import React, { useState } from 'react';
import Sidebar from './PoliceComp/PoliceSidebar';
import { Route, Routes } from 'react-router-dom';

import PoliceNotification from './PoliceComp/PoliceNotification';
import GetLocation from '../GetLocation/GetLocation';
import ProfileBox from './PoliceComp/ProfileBox';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import PoliceSidebar from './PoliceComp/PoliceSidebar';

const PoliceMain = () => {
    const [showProfile, setShowProfile] = useState(false);

    const handleProfileClick = () => {
        setShowProfile(!showProfile);
    };

    const handleCloseProfile = () => {
        setShowProfile(false);
    };
    return (
        <>
            <div className="flex h-screen">
                <PoliceSidebar onProfileClick={handleProfileClick} /> {/* Sidebar */}
                <div className="flex-1 p-6 relative">
                    <ProfileBox
                        showProfile={showProfile}
                        onCloseProfile={handleCloseProfile}
                    />
                    <div className="mt-5"> {/* Margin added to move content below ProfileBox */}
                        <Routes>
                            <Route path='/notifications' element={<PoliceNotification />} />
                            <Route path='/latest-locations' element={<GetLocation />} />
                            <Route path='/capture' element={<FaceRecognition />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PoliceMain
