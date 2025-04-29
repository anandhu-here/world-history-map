import React from 'react';

const Header = ({ searchTerm, onSearch }: {
    searchTerm: string;
    onSearch: (term: string) => void;
}) => {
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
                    <span className="text-blue-600">World</span> History Atlas
                </h1>

                <div className="w-full md:w-64">
                    <input
                        type="text"
                        placeholder="Search regions or events..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        value={searchTerm}
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;