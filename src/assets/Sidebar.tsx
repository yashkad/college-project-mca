import React, { useState } from 'react';
import { HomeIcon, UserGroupIcon, GlobeAltIcon, CalendarIcon } from '@heroicons/react/20/solid';
import { PlayCircleIcon, LanguageIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
    active: string;
}
const Sidebar = ({ active }: SidebarProps) => {
    const [activeTab, setActiveTab] = useState(active);
    const navigater = useNavigate();

    const handleClick = (tab: string, loc: string) => {
        setActiveTab(tab);
        navigater(loc)
    };

    return (
        <div className="flex flex-col w-16 h-screen bg-gray-900 text-gray-100">
            <nav className="flex flex-col flex-grow">
                <a href="#" className={`flex items-center px-4 py-2 hover:bg-gray-800 ${activeTab === 'Run' ? 'bg-gray-800' : ''}`} onClick={() => handleClick('Run', '/ide')}>
                    <PlayCircleIcon className="w-6 h-6 mr-2" />

                </a>
                <a href="#" className={`flex items-center px-4 py-2 hover:bg-gray-800 ${activeTab === 'Translate' ? 'bg-gray-800' : ''}`} onClick={() => handleClick('Translate', '/editor')}>
                    <LanguageIcon className="w-6 h-6 mr-2" />
                </a>

            </nav>
            {/* <div className="flex items-center justify-center h-14">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50">
                    Create
                </button>
            </div> */}
        </div>
    );
};

export default Sidebar;
