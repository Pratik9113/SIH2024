import React from 'react';

const HomeAbout = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start bg-gray-100 p-6 rounded-lg shadow-lg space-y-6 lg:space-y-0 lg:space-x-6">
            <div className="flex justify-center w-full lg:w-1/3">
                <img
                    src="https://mumbaipolice.gov.in/images/Cpdesk/1.png"
                    alt="Shri. Vivek Phansalkar, I.P.S., Commissioner of Police, Greater Mumbai."
                    title="Shri. Vivek Phansalkar, I.P.S., Commissioner of Police, Greater Mumbai."
                    className="w-64 h-64 object-cover rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl" // Added hover effect classes
                />
            </div>
            <div className="text-center lg:text-left lg:w-2/3">
                <h3 className="text-3xl font-bold text-gray-800 mb-4" title="From CP's Desk">From CP's Desk</h3>
                <hr className="border-gray-300 mb-4" />
                <p className="text-lg text-gray-700 leading-relaxed">
                    Mumbai Police shall ensure the Rule of Law, enforce the law of the land impartially and firmly without fear or favour, and strive to create a fear-free environment that is conducive to growth and development.
                    Mumbai Police will remain committed to maintaining public order, preventing and detecting crime, maintaining and promoting communal harmony, ensuring a smooth flow of traffic, and taking strong action against terrorism, organized crime, anti-social/illicit activities/elements.
                </p>
                <p className="mt-4 font-semibold text-gray-800">
                    Shri. Vivek Phansalkar, I.P.S., Commissioner of Police, Greater Mumbai.
                </p>
            </div>
        </div>
    );
};

export default HomeAbout;
