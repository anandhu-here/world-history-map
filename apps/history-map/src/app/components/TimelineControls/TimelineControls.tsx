// src/app/components/TimelineControls/TimelineControls.tsx
import React from 'react';
import { TimelineControlsProps } from '@world-history/core';

/**
 * Controls for playback of the timeline animation
 */
const TimelineControls: React.FC<TimelineControlsProps> = ({
    isPlaying,
    onPlay,
    onPause,
    onReset,
    onSpeedChange,
    currentSpeed,
    progress,
    currentEventIndex,
    totalEvents
}) => {
    // List of available playback speeds
    const speeds: number[] = [0.5, 1, 1.5, 2];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-opacity-90 backdrop-filter backdrop-blur-sm shadow-lg z-20">
            <div className="max-w-screen-xl mx-auto px-4 py-2">
                {/* Progress bar */}
                <div className="h-1 w-full bg-gray-200 rounded-full mb-2">
                    <div
                        className="h-1 bg-blue-600 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {/* Play/Pause button */}
                        <button
                            className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                            onClick={isPlaying ? onPause : onPlay}
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                            {isPlaying ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>

                        {/* Reset button */}
                        <button
                            className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition-colors"
                            onClick={onReset}
                            aria-label="Reset"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </svg>
                        </button>

                        {/* Playback speed selector */}
                        <div className="ml-4">
                            <span className="text-xs text-gray-500">Speed:</span>
                            <div className="flex space-x-1 mt-1">
                                {speeds.map((speed) => (
                                    <button
                                        key={speed}
                                        className={`px-2 py-0.5 text-xs rounded ${currentSpeed === speed
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        onClick={() => onSpeedChange(speed)}
                                    >
                                        {speed}x
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Progress counter */}
                    <div className="text-sm text-gray-600">
                        Event {currentEventIndex + 1} of {totalEvents}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimelineControls;