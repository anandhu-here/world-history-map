// src/app/components/WorldMap/WorldMap.tsx
import React, { useState, useRef, memo } from 'react';
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    ZoomableGroup
} from 'react-simple-maps';
import { WorldMapProps, TimelineEvent } from '@world-history/core';

// GeoJSON for the world map (circa 1914 if possible)
const geoUrl: string = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

/**
 * An interactive world map component that displays historical events
 */
const WorldMap: React.FC<WorldMapProps> = ({
    events,
    activeEventIndex,
    onEventClick,
    view,
    onViewChange
}) => {
    // State for marker hover effects
    const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    // Current active event
    const activeEvent: TimelineEvent | null = activeEventIndex >= 0 && activeEventIndex < events.length
        ? events[activeEventIndex]
        : null;

    // Handle zoom/pan changes
    const handleMoveEnd = (position: { coordinates: [number, number]; zoom: number }): void => {
        onViewChange({
            center: position.coordinates,
            zoom: position.zoom
        });
    };

    // Classes and styles based on event state
    const getMarkerStyles = (event: TimelineEvent): {
        size: number;
        pulseEffect: boolean;
        className: string;
    } => {
        const isActive = activeEvent && activeEvent.id === event.id;
        const isHovered = hoveredEventId === event.id;

        return {
            size: isActive ? 16 : isHovered ? 14 : 12,
            pulseEffect: isActive as any,
            className: `marker-${event.importance} ${isActive ? 'marker-active' : ''} cursor-pointer transition-all duration-300`
        };
    };

    // Get pin color based on event importance
    const getMarkerColor = (importance: TimelineEvent['importance']): string => {
        switch (importance) {
            case 'critical':
                return '#EF4444'; // red-500
            case 'major':
                return '#F59E0B'; // amber-500
            case 'moderate':
                return '#3B82F6'; // blue-500
            case 'minor':
                return '#10B981'; // emerald-500
            default:
                return '#6B7280'; // gray-500
        }
    };

    // Get marker animation delay
    const getAnimationDelay = (index: number): string => {
        return `${(index % 5) * 0.1}s`;
    };

    return (
        <div ref={mapRef} className="h-full w-full overflow-hidden">
            {/* Map background with vintage aesthetic */}
            <div className="absolute inset-0 bg-slate-800 opacity-50"></div>
            <div className="absolute inset-0 bg-[url('/img/vintage-paper.jpg')] mix-blend-overlay opacity-10"></div>

            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 147,
                }}
                style={{ width: "100%", height: "100%" }}
                className="transition-all duration-700"
            >
                <ZoomableGroup
                    zoom={view.zoom}
                    center={view.center}
                    onMoveEnd={handleMoveEnd}
                    maxZoom={12}
                    className="transition-all duration-300 ease-out"
                >
                    {/* Base Map with vintage style */}
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#1E293B" // slate-800
                                    stroke="#334155" // slate-700
                                    strokeWidth={0.5}
                                    style={{
                                        default: { outline: "none" },
                                        hover: { outline: "none", fill: "#334155" }, // slate-700
                                        pressed: { outline: "none" },
                                    }}
                                    className="transition-all duration-200"
                                />
                            ))
                        }
                    </Geographies>

                    {/* Map grid lines for vintage look */}
                    <g className="opacity-10">
                        {/* Latitude lines */}
                        {Array.from({ length: 18 }, (_, i) => i * 10 - 90).map((lat) => (
                            <path
                                key={`lat-${lat}`}
                                d={`M-180 ${lat} L180 ${lat}`}
                                stroke="#94A3B8" // slate-400
                                strokeWidth={0.3}
                                fill="none"
                            />
                        ))}

                        {/* Longitude lines */}
                        {Array.from({ length: 36 }, (_, i) => i * 10 - 180).map((lng) => (
                            <path
                                key={`lng-${lng}`}
                                d={`M${lng} -90 L${lng} 90`}
                                stroke="#94A3B8" // slate-400
                                strokeWidth={0.3}
                                fill="none"
                            />
                        ))}
                    </g>

                    {/* Event Markers */}
                    {events.map((event, index) => {
                        const { size, pulseEffect, className } = getMarkerStyles(event);
                        const markerColor = getMarkerColor(event.importance);
                        const animDelay = getAnimationDelay(index);

                        return (
                            <React.Fragment key={event.id}>
                                {/* Pulse effect for active marker */}
                                {pulseEffect && (
                                    <>
                                        <Marker coordinates={event.location.coordinates}>
                                            <circle
                                                r={size * 2}
                                                fill={markerColor}
                                                opacity={0.2}
                                                className="animate-ping-slow"
                                            />
                                        </Marker>
                                        <Marker coordinates={event.location.coordinates}>
                                            <circle
                                                r={size * 3}
                                                fill={markerColor}
                                                opacity={0.1}
                                                className="animate-ping-slow"
                                                style={{ animationDelay: "0.5s" }}
                                            />
                                        </Marker>
                                    </>
                                )}

                                {/* Main marker */}
                                <Marker
                                    coordinates={event.location.coordinates}
                                    onClick={(e: React.MouseEvent) => onEventClick(event, e)}
                                    onMouseEnter={() => setHoveredEventId(event.id)}
                                    onMouseLeave={() => setHoveredEventId(null)}
                                >
                                    <g
                                        transform={`translate(-${size / 2}, -${size})`}
                                        className={className}
                                        style={{ animationDelay: animDelay }}
                                    >
                                        {/* Main pin shape with enhanced design */}
                                        <path
                                            d={`M${size / 2},0 C${size * 0.2},0 0,${size * 0.3} 0,${size * 0.7} C0,${size * 1.1} ${size / 2},${size} ${size / 2},${size} C${size / 2},${size} ${size},${size * 1.1} ${size},${size * 0.7} C${size},${size * 0.3} ${size * 0.8},0 ${size / 2},0`}
                                            fill={markerColor}
                                            stroke="#F8FAFC" // slate-50
                                            strokeWidth={1.5}
                                            className="drop-shadow-md"
                                        />

                                        {/* Inner circle */}
                                        <circle
                                            cx={size / 2}
                                            cy={size / 3}
                                            r={size / 4}
                                            fill="#F8FAFC" // slate-50
                                            opacity={0.9}
                                            className="filter drop-shadow-sm"
                                        />
                                    </g>

                                    {/* Tooltip on hover */}
                                    {hoveredEventId === event.id && (
                                        <foreignObject
                                            x={-100}
                                            y={-size - 40}
                                            width={200}
                                            height={40}
                                            style={{ overflow: 'visible' }}
                                        >
                                            <div className="bg-slate-800 text-slate-100 px-3 py-1.5 rounded-lg shadow-lg text-xs font-medium text-center animate-fade-in pointer-events-none border border-slate-700">
                                                {event.title}
                                            </div>
                                        </foreignObject>
                                    )}
                                </Marker>
                            </React.Fragment>
                        );
                    })}
                </ZoomableGroup>
            </ComposableMap>

            {/* Map controls overlay */}
            <div className="absolute bottom-24 right-6 z-10 flex flex-col space-y-2">
                <button
                    className="w-10 h-10 bg-slate-800 bg-opacity-70 backdrop-blur-sm rounded-lg text-white flex items-center justify-center hover:bg-slate-700 transition-colors shadow-lg border border-slate-700"
                    onClick={() => onViewChange({ ...view, zoom: Math.min(view.zoom + 1, 12) })}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
                <button
                    className="w-10 h-10 bg-slate-800 bg-opacity-70 backdrop-blur-sm rounded-lg text-white flex items-center justify-center hover:bg-slate-700 transition-colors shadow-lg border border-slate-700"
                    onClick={() => onViewChange({ ...view, zoom: Math.max(view.zoom - 1, 1) })}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                    </svg>
                </button>
                <button
                    className="w-10 h-10 bg-slate-800 bg-opacity-70 backdrop-blur-sm rounded-lg text-white flex items-center justify-center hover:bg-slate-700 transition-colors shadow-lg border border-slate-700"
                    onClick={() => onViewChange({ center: [0, 0], zoom: 2 })}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

// Memoize component to prevent unnecessary re-renders
export default memo(WorldMap);