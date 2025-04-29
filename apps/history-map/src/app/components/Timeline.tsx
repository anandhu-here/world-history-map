import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const Timeline = ({ events, onEventSelect }:
    {
        events: Array<{
            id: string;
            title: string;
            description: string;
            date: string;
            media?: string[];
            importance: 'major' | 'moderate' | 'minor';
        }>;
        onEventSelect: (event: any) => void;
    }
) => {
    const [sortedEvents, setSortedEvents] = useState([]);

    useEffect(() => {
        if (events && events.length > 0) {
            // Sort events by date
            const sorted = [...events].sort(
                (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );
            setSortedEvents(sorted as any);
        } else {
            setSortedEvents([]);
        }
    }, [events]);

    // Helper function to format dates
    const formatEventDate = (dateStr: any) => {
        const date = new Date(dateStr);
        // For events with just a year, display only the year
        if (dateStr.endsWith('-01-01')) {
            return date.getFullYear().toString();
        }
        return format(date, 'MMMM d, yyyy');
    };

    if (sortedEvents.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Select a region to view its historical timeline</p>
            </div>
        );
    }

    return (
        <div className="relative py-8">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 h-full w-1 bg-blue-200 transform -translate-x-1/2"></div>

            {/* Timeline events */}
            <div className="space-y-12">
                {sortedEvents.map((event: any, index) => (
                    <div
                        key={event.id}
                        className={`relative flex items-center ${index % 2 === 0 ? 'flex-row md:flex-row-reverse' : 'flex-row'
                            }`}
                    >
                        {/* Date bubble */}
                        <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-blue-500 rounded-full transform -translate-x-1/2 flex items-center justify-center z-10">
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>

                        {/* Content */}
                        <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'ml-10 md:ml-0 md:mr-8' : 'ml-10 md:ml-8'}`}>
                            <div
                                className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => onEventSelect(event)}
                            >
                                <div className="mb-2">
                                    <span className="text-sm text-gray-500">
                                        {formatEventDate(event.date)}
                                    </span>
                                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${event.importance === 'major'
                                        ? 'bg-red-100 text-red-800'
                                        : event.importance === 'moderate'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {event.importance}
                                    </span>
                                </div>

                                <h3 className="font-bold text-lg text-gray-800">{event.title}</h3>

                                <p className="text-gray-600 mt-2 line-clamp-2">
                                    {event.description}
                                </p>

                                {event.media && event.media.length > 0 && (
                                    <div className="mt-3">
                                        <img
                                            src={event.media[0]}
                                            alt={event.title}
                                            className="w-full h-32 object-cover rounded"
                                        />
                                    </div>
                                )}

                                <div className="mt-3 text-blue-600 text-sm">
                                    Click to view details
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;