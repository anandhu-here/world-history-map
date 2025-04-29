// src/app/app.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import TimelineControls from './components/TimelineControls/TimelineControls';
import {
  AnimationState,
  StoryPopupState,
  MapViewState,
  TimelineEvent,
  Timeline
} from '@world-history/core';
import worldWarITimeline from './data/ww1';
import WorldMap from './components/WorldMap';
import StoryPopup from './components/story-pop/story-popup';

/**
 * Main application component for the World War I Timeline
 */
const App: React.FC = () => {
  // Timeline data
  const [timeline, setTimeline] = useState<Timeline>(worldWarITimeline);

  // Animation state
  const [animation, setAnimation] = useState<AnimationState>({
    isPlaying: false,
    currentEventIndex: -1,
    speed: 1,
    isPaused: false
  });

  // Story popup state
  const [storyPopup, setStoryPopup] = useState<StoryPopupState>({
    isVisible: false,
    event: null,
    position: null
  });

  // Map view state
  const [mapView, setMapView] = useState<MapViewState>({
    center: timeline.defaultCenter || [0, 0],
    zoom: timeline.defaultZoom || 2
  });

  // Show introduction screen
  const [showIntro, setShowIntro] = useState<boolean>(true);

  // Animation timer reference
  const animationTimerRef = useRef<number | null>(null);

  // Calculate progress percentage
  const progress: number = timeline.events.length > 0
    ? ((animation.currentEventIndex + 1) / timeline.events.length) * 100
    : 0;

  /**
   * Handler for starting the timeline playback
   */
  const handlePlay = useCallback((): void => {
    setAnimation(prev => ({
      ...prev,
      isPlaying: true,
      isPaused: false,
      // Start from the beginning if we reached the end
      currentEventIndex: prev.currentEventIndex >= timeline.events.length - 1
        ? 0
        : prev.currentEventIndex === -1
          ? 0
          : prev.currentEventIndex
    }));

    // Hide intro screen when playing
    setShowIntro(false);
  }, [timeline.events.length]);

  /**
   * Handler for pausing the timeline playback
   */
  const handlePause = useCallback((): void => {
    setAnimation(prev => ({
      ...prev,
      isPlaying: false,
      isPaused: true
    }));
  }, []);

  /**
   * Handler for resetting the timeline to beginning
   */
  const handleReset = useCallback((): void => {
    setAnimation({
      isPlaying: false,
      currentEventIndex: -1,
      speed: 1,
      isPaused: false
    });

    setStoryPopup({
      isVisible: false,
      event: null,
      position: null
    });

    setMapView({
      center: timeline.defaultCenter || [0, 0],
      zoom: timeline.defaultZoom || 2
    });
  }, [timeline.defaultCenter, timeline.defaultZoom]);

  /**
   * Handler for changing playback speed
   */
  const handleSpeedChange = useCallback((speed: number): void => {
    setAnimation(prev => ({
      ...prev,
      speed
    }));
  }, []);

  /**
   * Handler for clicking on map event marker
   */
  const handleEventClick = useCallback((event: TimelineEvent, domEvent: React.MouseEvent): void => {
    // Find the index of the clicked event
    const eventIndex = timeline.events.findIndex(e => e.id === event.id);

    if (eventIndex !== -1) {
      // Update the current event index
      setAnimation(prev => ({
        ...prev,
        currentEventIndex: eventIndex,
        isPlaying: false
      }));

      // Show the story popup
      setStoryPopup({
        isVisible: true,
        event: event,
        position: {
          x: domEvent.clientX,
          y: domEvent.clientY
        }
      });

      // Center map on event location
      setMapView({
        center: event.location.coordinates,
        zoom: 4 // Zoom in to see the location better
      });
    }
  }, [timeline.events]);

  /**
   * Handler for closing the story popup
   */
  const handleClosePopup = useCallback((): void => {
    setStoryPopup(prev => ({
      ...prev,
      isVisible: false
    }));
  }, []);

  /**
   * Handler for navigating to next event
   */
  const handleNextEvent = useCallback((): void => {
    if (animation.currentEventIndex < timeline.events.length - 1) {
      const nextIndex = animation.currentEventIndex + 1;
      const nextEvent = timeline.events[nextIndex];

      // Update animation state
      setAnimation(prev => ({
        ...prev,
        currentEventIndex: nextIndex
      }));

      // Update story popup
      setStoryPopup(prev => ({
        ...prev,
        event: nextEvent
      }));

      // Center map on new event location
      setMapView({
        center: nextEvent.location.coordinates,
        zoom: 4
      });
    }
  }, [animation.currentEventIndex, timeline.events]);

  /**
   * Handler for navigating to previous event
   */
  const handlePrevEvent = useCallback((): void => {
    if (animation.currentEventIndex > 0) {
      const prevIndex = animation.currentEventIndex - 1;
      const prevEvent = timeline.events[prevIndex];

      // Update animation state
      setAnimation(prev => ({
        ...prev,
        currentEventIndex: prevIndex
      }));

      // Update story popup
      setStoryPopup(prev => ({
        ...prev,
        event: prevEvent
      }));

      // Center map on new event location
      setMapView({
        center: prevEvent.location.coordinates,
        zoom: 4
      });
    }
  }, [animation.currentEventIndex, timeline.events]);

  /**
   * Handler for map view changes
   */
  const handleViewChange = useCallback((view: MapViewState): void => {
    setMapView(view);
  }, []);

  /**
   * Animation effect - advances through events automatically when playing
   */
  useEffect(() => {
    // Clear any existing timer
    if (animationTimerRef.current !== null) {
      window.clearTimeout(animationTimerRef.current);
      animationTimerRef.current = null;
    }

    // Only set timer if animation is playing
    if (animation.isPlaying) {
      // Get current event for duration calculation
      const currentEvent = animation.currentEventIndex >= 0 && animation.currentEventIndex < timeline.events.length
        ? timeline.events[animation.currentEventIndex]
        : null;

      // Default duration if not specified in event
      const defaultDuration = 5000; // 5 seconds

      // Calculate actual duration based on speed
      const duration = currentEvent && currentEvent.duration
        ? currentEvent.duration / animation.speed
        : defaultDuration / animation.speed;

      // Show current event popup
      if (currentEvent) {
        // Center map on event location
        setMapView({
          center: currentEvent.location.coordinates,
          zoom: 4
        });

        // Show the story popup for current event
        // We use a calculated position since we don't have a DOM event
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        setStoryPopup({
          isVisible: true,
          event: currentEvent,
          position: {
            x: viewportWidth / 2,
            y: viewportHeight / 2
          }
        });
      }

      // Advance to next event after duration
      animationTimerRef.current = window.setTimeout(() => {
        if (animation.currentEventIndex < timeline.events.length - 1) {
          // Move to next event
          setAnimation(prev => ({
            ...prev,
            currentEventIndex: prev.currentEventIndex + 1
          }));
        } else {
          // End of timeline reached
          setAnimation(prev => ({
            ...prev,
            isPlaying: false,
            currentEventIndex: timeline.events.length - 1
          }));
        }
      }, duration);
    }

    // Cleanup function
    return () => {
      if (animationTimerRef.current !== null) {
        window.clearTimeout(animationTimerRef.current);
      }
    };
  }, [
    animation.isPlaying,
    animation.currentEventIndex,
    animation.speed,
    timeline.events
  ]);

  // Current event for UI rendering
  const currentEvent = animation.currentEventIndex >= 0 && animation.currentEventIndex < timeline.events.length
    ? timeline.events[animation.currentEventIndex]
    : null;

  return (
    <div className="w-screen h-screen overflow-hidden relative font-sans bg-slate-900 text-slate-100">
      {/* Main map component */}
      <div className="absolute inset-0 bg-slate-800">
        <WorldMap
          events={timeline.events}
          activeEventIndex={animation.currentEventIndex}
          onEventClick={handleEventClick}
          view={mapView}
          onViewChange={handleViewChange}
        />
      </div>

      {/* Story popup */}
      {storyPopup.isVisible && storyPopup.event && (
        <StoryPopup
          event={storyPopup.event}
          position={storyPopup.position}
          onClose={handleClosePopup}
          onNext={handleNextEvent}
          onPrev={handlePrevEvent}
          hasNext={animation.currentEventIndex < timeline.events.length - 1}
          hasPrev={animation.currentEventIndex > 0}
        />
      )}

      {/* Timeline controls */}
      <TimelineControls
        isPlaying={animation.isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        onReset={handleReset}
        onSpeedChange={handleSpeedChange}
        currentSpeed={animation.speed}
        progress={progress}
        currentEventIndex={animation.currentEventIndex}
        totalEvents={timeline.events.length}
      />

      {/* Introduction screen */}
      {showIntro && (
        <div className="absolute inset-0 bg-slate-900 bg-opacity-90 flex items-center justify-center z-30">
          <div className="px-6 py-8 bg-slate-800 backdrop-filter backdrop-blur-md rounded-xl max-w-3xl mx-4 shadow-2xl border border-slate-700">
            <div className="flex flex-col items-center text-center">
              <span className="inline-block px-4 py-1 bg-amber-500 text-amber-900 rounded-full text-sm font-medium mb-6">
                Interactive Experience
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                World War I <span className="text-amber-500">Timeline</span>
              </h1>
              <div className="w-24 h-1 bg-amber-500 rounded mb-6"></div>
              <p className="text-xl text-slate-300 max-w-lg mx-auto mb-10 leading-relaxed">
                Explore the pivotal events that shaped the First World War through an immersive
                interactive map experience. Navigate through history and discover the stories
                that changed our world.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                <button
                  className="w-full sm:w-auto px-8 py-4 bg-amber-500 text-slate-900 rounded-lg hover:bg-amber-400 transition-all duration-300 font-medium shadow-lg"
                  onClick={handlePlay}
                >
                  <span className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Start Narration
                  </span>
                </button>
                <button
                  className="w-full sm:w-auto px-8 py-4 bg-transparent text-slate-200 border border-slate-600 rounded-lg hover:bg-slate-700 transition-all duration-300 font-medium"
                  onClick={() => setShowIntro(false)}
                >
                  Explore Manually
                </button>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-700">
              <p className="text-sm text-slate-400 text-center">
                Navigate using arrow keys or click on map markers to explore events.
                Press ESC to close popups. Timeline controls are at the bottom of the screen.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Title overlay */}
      <div className="absolute top-6 left-6 z-10">
        <div className="flex items-center space-x-3">
          <div className="w-1.5 h-8 bg-amber-500 rounded-full"></div>
          <h2 className="text-xl font-bold text-white">
            {timeline.title}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default App;