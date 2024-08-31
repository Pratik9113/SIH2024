import React from 'react';
import { NavLink } from 'react-router-dom';

const PoliceSidebar = () => {
    return (
        <div style={{ backgroundColor: '#03346E' }} className="w-64 h-full text-white">
            <div className="p-4 text-2xl font-bold">
                Police Dashboard
            </div>
            <ul className="mt-6">
                <li className="p-4 hover:bg-gray-200 hover:text-blue-900 cursor-pointer rounded transition-colors duration-300">
                    <NavLink
                        to="/dashboard/notifications"
                        className="block"
                        activeClassName="bg-gray-200 text-blue-900"
                    >
                        Notifications
                    </NavLink>
                </li>
                <li className="p-4 hover:bg-gray-200 hover:text-blue-900 cursor-pointer rounded transition-colors duration-300">
                    <NavLink
                        to="/dashboard/latest-locations"
                        className="block"
                        activeClassName="bg-gray-200 text-blue-900"
                    >
                        Location
                    </NavLink>
                </li>
                <li className="p-4 hover:bg-gray-200 hover:text-blue-900 cursor-pointer rounded transition-colors duration-300">
                    <NavLink
                        to="/dashboard/capture"
                        className="block"
                        activeClassName="bg-gray-200 text-blue-900"
                    >
                        Face Recognition
                    </NavLink>
                </li>
                <li className="p-4 hover:bg-gray-200 hover:text-blue-900 cursor-pointer rounded transition-colors duration-300">
                    <NavLink
                        to="/dashboard/case-detail"
                        className="block"
                        activeClassName="bg-gray-200 text-blue-900"
                    >
                        Case Details
                    </NavLink>
                </li>
                <li className="p-4 hover:bg-gray-200 hover:text-blue-900 cursor-pointer rounded transition-colors duration-300">
                    <NavLink
                        to="/dashboard/fir"
                        className="block"
                        activeClassName="bg-gray-200 text-blue-900"
                    >
                        Upload Fir
                    </NavLink>
                </li>
                <li className="p-4 hover:bg-gray-200 hover:text-blue-900 cursor-pointer rounded transition-colors duration-300">
                    <NavLink
                        to="/dashboard/chatbot"
                        className="block"
                        activeClassName="bg-gray-200 text-blue-900"
                    >
                        Chatbot
                    </NavLink>
                </li>
                <li className="p-4 hover:bg-gray-200 hover:text-blue-900 cursor-pointer rounded transition-colors duration-300">
                    Logout
                </li>
            </ul>
        </div>
    );
};

export default PoliceSidebar;
