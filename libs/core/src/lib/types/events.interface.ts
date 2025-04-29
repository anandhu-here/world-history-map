// libs/core/src/lib/types/timeline.ts

/**
 * Represents a geographic coordinate point on the map
 */
export interface Coordinates {
  longitude: number;
  latitude: number;
}

/**
 * Represents a single historical event in a timeline
 */
export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string; // ISO format (YYYY-MM-DD)
  location: {
    coordinates: [number, number]; // [longitude, latitude]
    name: string;
    country?: string;
  };
  media?: {
    type: 'image' | 'video' | 'audio';
    url: string;
    caption?: string;
    credit?: string;
  }[];
  importance: 'minor' | 'moderate' | 'major' | 'critical';
  duration?: number; // How long to display this event in the animation (in ms)
  links?: {
    text: string;
    url: string;
  }[];
  tags?: string[];
}

/**
 * Represents a complete timeline with metadata
 */
export interface Timeline {
  id: string;
  title: string;
  description: string;
  period: {
    startDate: string; // ISO format
    endDate: string; // ISO format
  };
  events: TimelineEvent[];
  defaultZoom?: number;
  defaultCenter?: [number, number]; // [longitude, latitude]
  tags?: string[];
}

/**
 * Animation control state
 */
export interface AnimationState {
  isPlaying: boolean;
  currentEventIndex: number;
  speed: number; // Playback speed multiplier
  isPaused: boolean;
}

/**
 * Story popup state
 */
export interface StoryPopupState {
  isVisible: boolean;
  event: TimelineEvent | null;
  position: {
    x: number;
    y: number;
  } | null;
}

/**
 * Map view state
 */
export interface MapViewState {
  center: [number, number]; // [longitude, latitude]
  zoom: number;
}

/**
 * Props for the story popup component
 */
export interface StoryPopupProps {
  event: TimelineEvent;
  position: {
    x: number;
    y: number;
  } | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Props for the timeline controls component
 */
export interface TimelineControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  currentSpeed: number;
  progress: number; // 0 to 100
  currentEventIndex: number;
  totalEvents: number;
}

/**
 * Props for the map component
 */
export interface WorldMapProps {
  events: TimelineEvent[];
  activeEventIndex: number;
  onEventClick: (event: TimelineEvent, domEvent: any) => void;
  view: MapViewState;
  onViewChange: (view: MapViewState) => void;
}
