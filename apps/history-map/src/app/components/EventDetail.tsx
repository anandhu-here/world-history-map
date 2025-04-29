import React, { useEffect } from 'react';

const EventDetail = ({ event, onClose }: {
    event: {
        id: string;
        title: string;
        description: string;
        date: string;
        media?: string[];
        importance: 'major' | 'moderate' | 'minor';
        links?: Array<{ text: string; url: string }>;
    };
    onClose: () => void;
}) => {
    // Handle ESC key to close the modal
    useEffect(() => {
        const handleEscape = (e: any) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleEscape);

        // Prevent background scrolling
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    // Format date helper
    const formatEventDate = (dateStr: any) => {
        const date = new Date(dateStr);
        // For events with just a year, display only the year
        if (dateStr.endsWith('-01-01')) {
            return date.getFullYear().toString();
        }

        // Manual date formatting
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        return `${month} ${day}, ${year}`;
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
                // Close when clicking the backdrop
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label="Close"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-2">
                        <span className="text-sm text-gray-500">
                            {formatEventDate(event.date)}
                        </span>
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${event.importance === 'major'
                            ? 'bg-red-100 text-red-800'
                            : event.importance === 'moderate'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                            {event.importance}
                        </span>
                    </div>

                    {event.media && event.media.length > 0 && (
                        <div className="mt-4">
                            <img
                                src={event.media[0]}
                                alt={event.title}
                                className="w-full h-64 object-cover rounded"
                            />
                        </div>
                    )}

                    <div className="mt-4">
                        <p className="text-gray-600 whitespace-pre-line">{event.description}</p>
                    </div>

                    {event.links && event.links.length > 0 && (
                        <div className="mt-6">
                            <h3 className="font-semibold text-gray-700">Learn More:</h3>
                            <ul className="mt-2 space-y-1">
                                {event.links.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            {link.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventDetail;