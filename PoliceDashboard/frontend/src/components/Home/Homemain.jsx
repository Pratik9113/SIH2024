import React from 'react';
import HomePhoto from './HomePhoto';
import HomeAbout from './HomeAbout';
import HomeServices from './HomeServices';
import HomeFooter from './HomeFooter';
import HomeInfoPolice from './HomeInfoPolice';

const Homemain = () => {
    return (
        <div className="space-y-5 bg-gray-100">
            <HomePhoto />
            <hr />
            <HomeAbout />
            <HomeInfoPolice />

            <HomeServices />
            <hr />
            <HomeFooter />

        </div>
    );
};

export default Homemain;
