// src/app/components/story-pop/story-popup.tsx
// Fixed to ensure vertical centering while staying next to location markers

import React, { useEffect, useRef, useState } from 'react';
import { StoryPopupProps, TimelineEvent } from '@world-history/core';

/**
 * A component to display story popups on the map for historical events
 * Fixed to prevent clipping and ensure proper positioning near markers
 */
const StoryPopup: React.FC<StoryPopupProps> = ({
    event,
    position,
    onClose,
    onNext,
    onPrev,
    hasNext,
    hasPrev
}) => {
    const popupRef = useRef<HTMLDivElement>(null);
    const [isAnimatingIn, setIsAnimatingIn] = useState(true);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        // Reset animation state when event changes
        setIsAnimatingIn(true);
        setIsAnimatingOut(false);
        setIsImageLoaded(false);

        // Animation timing
        const timer = setTimeout(() => {
            setIsAnimatingIn(false);
        }, 500);

        // Add escape key listener
        const handleEscape = (e: KeyboardEvent): void => {
            if (e.key === 'Escape') handleClose(e);
        };

        // Add arrow key navigation
        const handleArrowKeys = (e: KeyboardEvent): void => {
            if (e.key === 'ArrowRight' && hasNext && !isAnimatingOut) {
                handleNext(e as unknown as React.MouseEvent);
            } else if (e.key === 'ArrowLeft' && hasPrev && !isAnimatingOut) {
                handlePrev(e as unknown as React.MouseEvent);
            }
        };

        window.addEventListener('keydown', handleEscape);
        window.addEventListener('keydown', handleArrowKeys);

        // Update dimensions after render with a slight delay to ensure accurate measurement
        const dimensionTimer = setTimeout(() => {
            if (popupRef.current) {
                setDimensions({
                    width: popupRef.current.offsetWidth,
                    height: popupRef.current.offsetHeight
                });
            }
        }, 100);

        return () => {
            window.removeEventListener('keydown', handleEscape);
            window.removeEventListener('keydown', handleArrowKeys);
            clearTimeout(timer);
            clearTimeout(dimensionTimer);
        };
    }, [event, hasNext, hasPrev, isAnimatingOut]);

    // Format date helper function
    const formatEventDate = (dateStr: string): string => {
        const date = new Date(dateStr);

        // Manual date formatting for historical accuracy
        const months: string[] = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const month: string = months[date.getMonth()];
        const day: number = date.getDate();
        const year: number = date.getFullYear();

        // Add ordinal suffix to day
        const ordinal = (n: number): string => {
            const s = ['th', 'st', 'nd', 'rd'];
            const v = n % 100;
            return n + (s[(v - 20) % 10] || s[v] || s[0]);
        };

        return `${month} ${ordinal(day)}, ${year}`;
    };

    // Calculate position styling based on screen position with vertical centering
    const getPositionStyle = (): React.CSSProperties => {
        if (!position) return {};

        // Constants for positioning
        const popupWidth = dimensions.width || 550;
        const popupHeight = dimensions.height || 400;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const horizontalMargin = 20; // Margin from window edge
        const verticalMargin = 40;   // Margin from window edge

        // Determine horizontal positioning strategy
        let horizontalPosition: { left?: string, right?: string, transform?: string } = {};

        // Position popup to the right of marker if there's enough room
        if (position.x + popupWidth + horizontalMargin <= windowWidth) {
            // Position to the right of the marker with a small offset
            horizontalPosition = { left: `${position.x + 20}px` };
        }
        // Position popup to the left of marker if there's enough room
        else if (position.x - popupWidth - horizontalMargin >= 0) {
            // Position to the left of the marker with a small offset
            horizontalPosition = { right: `${windowWidth - position.x + 20}px` };
        }
        // Center horizontally if no room on either side
        else {
            horizontalPosition = {
                left: '50%',
                transform: 'translateX(-50%)'
            };
        }

        // Vertical positioning - center in viewport with constraints
        let verticalPosition: { top?: string, transform?: string } = {};

        // Calculate the centered position, constrained to not go beyond margins
        const idealVerticalCenter = windowHeight / 2 - popupHeight / 2;
        const minTop = verticalMargin;
        const maxTop = windowHeight - popupHeight - verticalMargin;

        // Clamp the position between min and max
        const clampedTop = Math.max(minTop, Math.min(idealVerticalCenter, maxTop));

        verticalPosition = { top: `${clampedTop}px` };

        // Combine transform properties if needed
        let transform = '';
        if (horizontalPosition.transform) {
            transform = horizontalPosition.transform;
        }

        return {
            ...horizontalPosition,
            ...verticalPosition,
            maxWidth: '550px',
            maxHeight: `${windowHeight - (verticalMargin * 2)}px`,
            width: 'calc(100% - 40px)',
            opacity: isAnimatingIn ? 0 : isAnimatingOut ? 0 : 1,
            transform: isAnimatingIn
                ? `${transform} translateY(20px)`
                : isAnimatingOut
                    ? `${transform} translateY(20px)`
                    : transform || 'none',
            overflow: 'auto'
        };
    };

    // Get class based on importance
    const getImportanceClass = (importance: TimelineEvent['importance']): string => {
        switch (importance) {
            case 'critical':
                return 'bg-red-500 text-white';
            case 'major':
                return 'bg-amber-500 text-amber-900';
            case 'moderate':
                return 'bg-blue-500 text-white';
            case 'minor':
                return 'bg-emerald-500 text-emerald-900';
            default:
                return 'bg-slate-500 text-white';
        }
    };

    const handleClose = (e: React.MouseEvent | KeyboardEvent): void => {
        e.stopPropagation();
        setIsAnimatingOut(true);
        setTimeout(() => {
            onClose();
        }, 200);
    };

    const handleNext = (e: React.MouseEvent): void => {
        e.stopPropagation();
        if (hasNext && !isAnimatingOut) {
            setIsAnimatingOut(true);
            setTimeout(() => {
                onNext();
            }, 200);
        }
    };

    const handlePrev = (e: React.MouseEvent): void => {
        e.stopPropagation();
        if (hasPrev && !isAnimatingOut) {
            setIsAnimatingOut(true);
            setTimeout(() => {
                onPrev();
            }, 200);
        }
    };

    // Only show loading state if image is present but not loaded
    const showLoading = event.media &&
        event.media.length > 0 &&
        event.media[0].type === 'image' &&
        !isImageLoaded;

    return (
        <div
            ref={popupRef}
            className={`fixed z-30 shadow-2xl rounded-xl overflow-hidden transition-all duration-300 ease-in-out border border-slate-700 backdrop-blur-lg`}
            style={getPositionStyle()}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="relative">
                {/* Loading indicator */}
                {/* {showLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900 bg-opacity-50 z-10">
                        <div className="w-10 h-10 border-4 border-slate-600 border-t-amber-500 rounded-full animate-spin"></div>
                    </div>
                )} */}

                {/* Media section */}
                {event.media && event.media.length > 0 && event.media[0].type === 'image' && (
                    <div className="relative h-56 md:h-64 w-full overflow-hidden">
                        <img
                            src={event.media[0].url}
                            alt={event.media[0].caption || event.title}
                            className={`w-full h-full object-cover transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setIsImageLoaded(true)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
                    </div>
                )}

                {/* Close button */}
                <button
                    className="absolute top-3 right-3 z-20 p-1.5 bg-slate-800 bg-opacity-60 hover:bg-slate-700 rounded-full text-slate-300 hover:text-white transition-colors duration-200 backdrop-blur-sm"
                    onClick={handleClose}
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>

                {/* Title overlay for images */}
                {event.media && event.media.length > 0 && event.media[0].type === 'image' && (
                    <div className="absolute bottom-0 left-0 right-0 px-6 py-4 z-10">
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center space-x-3">
                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getImportanceClass(event.importance)}`}>
                                    {event.importance.charAt(0).toUpperCase() + event.importance.slice(1)}
                                </span>
                                <span className="text-slate-400 text-sm font-medium">
                                    {formatEventDate(event.date)}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">{event.title}</h2>
                            <p className="text-slate-300 text-sm">
                                {event.location.name}, {event.location.country}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Content section */}
            <div className={`px-6 py-5 ${(!event.media || event.media.length === 0 || event.media[0].type !== 'image') ? 'pt-5' : ''}`}>
                {/* Title for non-image cards */}
                {(!event.media || event.media.length === 0 || event.media[0].type !== 'image') && (
                    <div className="mb-4">
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center space-x-3">
                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getImportanceClass(event.importance)}`}>
                                    {event.importance.charAt(0).toUpperCase() + event.importance.slice(1)}
                                </span>
                                <span className="text-slate-400 text-sm font-medium">
                                    {formatEventDate(event.date)}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">{event.title}</h2>
                            <p className="text-slate-300 text-sm">
                                {event.location.name}, {event.location.country}
                            </p>
                        </div>
                    </div>
                )}

                {/* Description */}
                <div className="prose prose-sm prose-invert prose-slate max-w-none">
                    <p className="text-slate-300 whitespace-pre-line leading-relaxed">
                        {event.description}
                    </p>

                    {/* Image credit if available */}
                    {event.media && event.media.length > 0 && event.media[0].type === 'image' && event.media[0].credit && (
                        <p className="text-xs text-slate-500 mt-3 italic">
                            Image: {event.media[0].credit}
                        </p>
                    )}
                </div>

                {/* External links */}
                {event.links && event.links.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-slate-700">
                        <p className="text-sm font-medium text-slate-300 mb-3">Learn More:</p>
                        <div className="flex flex-wrap gap-2">
                            {event.links.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-full text-xs font-medium transition-colors duration-200"
                                >
                                    {link.text}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Navigation buttons */}
                <div className="mt-5 pt-4 border-t border-slate-700 flex justify-between items-center">
                    <button
                        className={`px-4 py-2 rounded-lg flex items-center space-x-1.5 transition-colors duration-200 text-sm ${hasPrev
                            ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                            : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                            }`}
                        onClick={handlePrev}
                        disabled={!hasPrev || isAnimatingOut}
                        aria-label="Previous event"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Previous</span>
                    </button>


                    <button
                        className={`px-4 py-2 rounded-lg flex items-center space-x-1.5 transition-colors duration-200 text-sm ${hasNext
                            ? 'bg-amber-500 text-amber-900 hover:bg-amber-400'
                            : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                            }`}
                        onClick={handleNext}
                        disabled={!hasNext || isAnimatingOut}
                        aria-label="Next event"
                    >
                        <span>Next</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StoryPopup;