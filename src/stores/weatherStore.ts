import { create } from 'zustand';
import { 
  WeatherAnomaly, 
  Alert, 
  StormTrackPoint 
} from '../types/weather';
import { 
  MOCK_ANOMALIES, 
  MOCK_ALERTS, 
  MOCK_STORM_TRACK 
} from '../data/mockWeatherData';

export type AppPage = 
  | 'dashboard'
  | 'intelligence'
  | 'forecasts'
  | 'anomalies'
  | 'tracking'
  | 'downscaling'
  | 'impact'
  | 'alerts'
  | 'pipeline'
  | 'historical'
  | 'monitoring'
  | 'data-sources'
  | 'settings';

export interface MapLayersState {
  // Weather
  rainfall: boolean;
  temperature: boolean;
  wind: boolean;
  pressure: boolean;
  // AI Intelligence
  anomaly: boolean;
  efi: boolean;
  ensembleProb: boolean;
  stormTrack: boolean;
  downscaled5km: boolean;
  // Impact
  population: boolean;
  crops: boolean;
  rivers: boolean;
  infrastructure: boolean;
  // Opacities
  opacities: Record<string, number>;
}

export type AppView = 'landing' | 'login' | 'app';

export interface UserProfile {
  name: string;
  role: 'Admin' | 'Senior Forecaster' | 'Disaster Response (NDMA)' | 'Public Observer';
  email: string;
  organization: string;
  badgeId?: string;
  clearanceLevel?: string;
  token?: string;
}

interface WeatherStoreState {
  // Auth & Navigation
  appView: AppView;
  setAppView: (view: AppView) => void;
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  currentPage: AppPage;
  setCurrentPage: (page: AppPage) => void;

  selectedAnomalyId: string;
  setSelectedAnomalyId: (id: string) => void;
  getSelectedAnomaly: () => WeatherAnomaly;

  selectedTrackPoint: StormTrackPoint;
  setSelectedTrackPoint: (point: StormTrackPoint) => void;

  selectedRegion: string;
  setSelectedRegion: (region: string) => void;

  forecastWindow: string;
  setForecastWindow: (window: string) => void;

  currentRunName: string;

  // Map state
  mapLayers: MapLayersState;
  toggleMapLayer: (layerKey: keyof Omit<MapLayersState, 'opacities'>) => void;
  setLayerOpacity: (layerKey: string, opacity: number) => void;

  // Drawers & Modals
  isEventDrawerOpen: boolean;
  setEventDrawerOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  isApprovalModalOpen: boolean;
  setApprovalModalOpen: (open: boolean) => void;
  selectedAlertForReview: Alert | null;
  setSelectedAlertForReview: (alert: Alert | null) => void;

  // Alerts Management
  alerts: Alert[];
  approveAlert: (alertId: string, notes?: string) => void;
  rejectAlert: (alertId: string, reason?: string) => void;
  requestReviewAlert: (alertId: string) => void;
  dispatchAlert: (alertId: string, channels: Alert['channels']) => void;

  // Demo Mode for SIH
  isDemoMode: boolean;
  demoStep: number;
  isDemoAutoPlaying: boolean;
  setDemoMode: (enabled: boolean) => void;
  setDemoStep: (step: number) => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  toggleDemoAutoPlay: () => void;

  // Sound & notification
  soundEnabled: boolean;
  toggleSound: () => void;
}

const ADMIN_CREDENTIALS = [
  { 
    email: 'admin@mausamdrishti.gov.in', 
    password: 'admin123', 
    name: 'Dr. S. K. Roy', 
    role: 'Admin' as const, 
    organization: 'IMD Headquarters, New Delhi',
    badgeId: 'GOV-IMD-HQ-881',
    clearanceLevel: 'LEVEL_4_FULL'
  },
  { 
    email: 'forecaster@imd.gov.in', 
    password: 'forecast123', 
    name: 'Dr. M. Mohapatra', 
    role: 'Senior Forecaster' as const, 
    organization: 'NCMRWF, Ministry of Earth Sciences',
    badgeId: 'GOV-NCMR-FC-409',
    clearanceLevel: 'LEVEL_3_FORECASTER'
  },
  { 
    email: 'ndma@nic.in', 
    password: 'ndma123', 
    name: 'Col. Rajesh Verma', 
    role: 'Disaster Response (NDMA)' as const, 
    organization: 'National Disaster Management Authority',
    badgeId: 'GOV-NDMA-OPS-112',
    clearanceLevel: 'LEVEL_2_DISASTER'
  },
  { 
    email: 'demo@sih.gov.in', 
    password: 'demo', 
    name: 'SIH Evaluator / Observer', 
    role: 'Public Observer' as const, 
    organization: 'Smart India Hackathon 2026',
    badgeId: 'SIH-OBS-2026',
    clearanceLevel: 'LEVEL_1_VIEW'
  },
];

export const useWeatherStore = create<WeatherStoreState>((set, get) => ({
  // Auth & Navigation
  appView: 'landing',
  setAppView: (view) => set({ appView: view }),
  isAuthenticated: false,
  user: null,
  login: async (email, password) => {
    // Attempt backend authentication
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json();
        set({
          isAuthenticated: true,
          user: {
            name: data.user.name,
            role: data.user.role,
            email: data.user.email,
            organization: data.user.organization,
            badgeId: data.user.badgeId,
            clearanceLevel: data.user.clearanceLevel,
            token: data.token
          },
          appView: 'app',
        });
        return true;
      }
    } catch {
      // Fallback to local verified credentials
    }

    // Local credential fallback
    const found = ADMIN_CREDENTIALS.find(c => c.email.toLowerCase() === email.toLowerCase() && c.password === password);
    if (found) {
      set({
        isAuthenticated: true,
        user: { 
          name: found.name, 
          role: found.role, 
          email: found.email, 
          organization: found.organization,
          badgeId: found.badgeId,
          clearanceLevel: found.clearanceLevel
        },
        appView: 'app',
      });
      return true;
    }
    return false;
  },
  logout: () => {
    set({ isAuthenticated: false, user: null, appView: 'landing', currentPage: 'dashboard' });
  },

  // Theme
  theme: 'light',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

  currentPage: 'dashboard',
  setCurrentPage: (page) => set({ currentPage: page }),

  selectedAnomalyId: 'anom-guj-01',
  setSelectedAnomalyId: (id) => {
    set({ selectedAnomalyId: id, isEventDrawerOpen: true });
  },
  getSelectedAnomaly: () => {
    const { selectedAnomalyId } = get();
    return MOCK_ANOMALIES.find(a => a.id === selectedAnomalyId) || MOCK_ANOMALIES[0];
  },

  selectedTrackPoint: MOCK_STORM_TRACK.points[4], // D+4
  setSelectedTrackPoint: (point) => set({ selectedTrackPoint: point }),

  selectedRegion: 'All India',
  setSelectedRegion: (region) => set({ selectedRegion: region }),

  forecastWindow: 'Next 10 Days',
  setForecastWindow: (window) => set({ forecastWindow: window }),

  currentRunName: 'NEPS-G • 23 Ensemble Runs',

  mapLayers: {
    rainfall: true,
    temperature: false,
    wind: true,
    pressure: false,
    anomaly: true,
    efi: true,
    ensembleProb: true,
    stormTrack: true,
    downscaled5km: true,
    population: true,
    crops: true,
    rivers: true,
    infrastructure: false,
    opacities: {
      rainfall: 0.75,
      temperature: 0.6,
      wind: 0.8,
      pressure: 0.5,
      anomaly: 0.85,
      efi: 0.8,
      ensembleProb: 0.7,
      stormTrack: 0.9,
      downscaled5km: 0.9,
      population: 0.65,
      crops: 0.6,
      rivers: 0.85,
      infrastructure: 0.7,
    },
  },

  toggleMapLayer: (layerKey) => {
    set((state) => ({
      mapLayers: {
        ...state.mapLayers,
        [layerKey]: !state.mapLayers[layerKey],
      },
    }));
  },

  setLayerOpacity: (layerKey, opacity) => {
    set((state) => ({
      mapLayers: {
        ...state.mapLayers,
        opacities: {
          ...state.mapLayers.opacities,
          [layerKey]: opacity,
        },
      },
    }));
  },

  isEventDrawerOpen: false,
  setEventDrawerOpen: (open) => set({ isEventDrawerOpen: open }),

  isCommandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),

  isApprovalModalOpen: false,
  setApprovalModalOpen: (open) => set({ isApprovalModalOpen: open }),

  selectedAlertForReview: MOCK_ALERTS[0],
  setSelectedAlertForReview: (alert) => set({ selectedAlertForReview: alert, isApprovalModalOpen: true }),

  alerts: MOCK_ALERTS,

  approveAlert: (alertId, notes) => {
    set((state) => ({
      alerts: state.alerts.map(a => 
        a.id === alertId 
          ? { 
              ...a, 
              status: 'Approved', 
              approvedBy: 'Duty Meteorologist (ID: IMD-EXEC-409)', 
              approvalTimestamp: new Date().toISOString(),
              notes: notes || a.notes,
            } 
          : a
      ),
    }));
  },

  rejectAlert: (alertId, reason) => {
    set((state) => ({
      alerts: state.alerts.map(a => 
        a.id === alertId 
          ? { 
              ...a, 
              status: 'Rejected', 
              notes: reason || 'Rejected during meteorologist review',
            } 
          : a
      ),
    }));
  },

  requestReviewAlert: (alertId) => {
    set((state) => ({
      alerts: state.alerts.map(a => 
        a.id === alertId 
          ? { 
              ...a, 
              status: 'Pending Review', 
              notes: 'Re-evaluation requested with higher resolution ensemble run',
            } 
          : a
      ),
    }));
  },

  dispatchAlert: (alertId, channels) => {
    set((state) => ({
      alerts: state.alerts.map(a => 
        a.id === alertId 
          ? { 
              ...a, 
              status: 'Dispatched', 
              channels,
            } 
          : a
      ),
    }));
  },

  isDemoMode: false,
  demoStep: 0,
  isDemoAutoPlaying: false,
  setDemoMode: (enabled) => set({ isDemoMode: enabled, demoStep: 0, isDemoAutoPlaying: false }),
  setDemoStep: (step) => set({ demoStep: step }),
  nextDemoStep: () => {
    const { demoStep } = get();
    if (demoStep < 9) {
      set({ demoStep: demoStep + 1 });
    } else {
      set({ demoStep: 0 });
    }
  },
  prevDemoStep: () => {
    const { demoStep } = get();
    if (demoStep > 0) {
      set({ demoStep: demoStep - 1 });
    }
  },
  toggleDemoAutoPlay: () => {
    set((state) => ({ isDemoAutoPlaying: !state.isDemoAutoPlaying }));
  },

  soundEnabled: true,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
}));
