export type HazardType = 
  | 'Heavy Rainfall'
  | 'Tropical Cyclone'
  | 'Cloudburst'
  | 'Severe Heatwave'
  | 'Gale Wind'
  | 'Urban Flash Flood';

export type SeverityLevel = 'normal' | 'watch' | 'warning' | 'extreme' | 'catastrophic';

export interface WeatherAnomaly {
  id: string;
  name: string;
  hazard: HazardType;
  region: string;
  state: string;
  district: string;
  coordinates: [number, number]; // [lng, lat]
  severity: SeverityLevel;
  efi: number; // Extreme Forecast Index 0.0 - 1.0 (e.g. 0.86)
  sot: number; // Shift of Tails (e.g. +1.4)
  probability: number; // 0 - 100%
  forecastLeadTimeDays: number; // e.g. +4 or +6 days
  forecastLeadWindow: string; // e.g. "72–96 hours" or "Oct 2, 14:00 - 22:00 IST"
  ensembleAgreement: {
    matchingRuns: number;
    totalRuns: number; // typically 23
    percentage: number;
  };
  peakIntensity: {
    metric: string; // e.g. "284 mm/24h" or "145 km/h"
    historical99thPercentile: string; // e.g. "120 mm/24h"
    ratioToThreshold: number; // e.g. 2.36x
  };
  trend: 'intensifying' | 'steady' | 'weakening';
  hotspotAreaKm2: number;
  physicsPassed: boolean;
  status: 'active' | 'evaluating' | 'alert_pending' | 'alert_approved' | 'alert_dispatched';
  description: string;
}

export interface EnsembleMember {
  id: number;
  name: string; // e.g. "M-01 (Perturbation 1)"
  value: number; // e.g. rainfall in mm
  isExtreme: boolean;
  modelWeight: number;
  divergenceScore: number;
  trajectoryVariationKm: number;
}

export interface ForecastEnsemble {
  modelName: string; // "NEPS-G (NCMRWF Ensemble Prediction System - Global)"
  baseTime: string; // "2026-09-27 12:00 UTC"
  totalMembers: number; // 23
  extremeCount: number; // 19
  agreementPercentage: number; // 83%
  members: EnsembleMember[];
  percentiles: {
    p10: number;
    p25: number;
    p50: number;
    p75: number;
    p90: number;
    p99: number;
  };
  ensembleMean: number;
  controlForecast: number;
}

export interface StormTrackPoint {
  day: string; // "D+0", "D+1", ..., "D+7"
  dateFormatted: string; // "Sep 28", "Sep 29", ...
  coordinates: [number, number]; // [lng, lat]
  intensityKmH: number;
  centralPressureHpa: number;
  rainfall24hMm: number;
  uncertaintyRadiusKm: number; // for cone of uncertainty
  probability: number;
  affectedPopulation: number;
  status: 'Depression' | 'Deep Depression' | 'Cyclonic Storm' | 'Severe Cyclonic Storm' | 'Very Severe Cyclonic Storm';
}

export interface StormTrack {
  id: string;
  name: string; // "Severe Cyclonic Circulation ARB-02"
  basin: 'Arabian Sea' | 'Bay of Bengal' | 'Peninsular India';
  currentPosition: [number, number];
  points: StormTrackPoint[];
  landfallEstimate: {
    location: string;
    window: string;
    confidence: 'High' | 'Medium' | 'Low';
  };
}

export interface GridCell {
  x: number;
  y: number;
  intensity: number; // 0 - 100 normalized
  rainfallMm: number;
  isPeak: boolean;
}

export interface DownscaledForecast {
  hotspotId: string;
  locationName: string;
  coarseResolutionKm: number; // 12
  downscaledResolutionKm: number; // 5
  coarseGrid: GridCell[];
  downscaledGrid: GridCell[];
  coarsePeakMm: number; // e.g. 195 mm (smoothed out)
  downscaledPeakMm: number; // e.g. 294 mm (peak-preserved!)
  peakPreservationGain: string; // "+51% localized peak capture"
  computationSavedPercent: number; // 88% selective downscaling efficiency
  diffusionModelName: string; // "Mausam-Diffusion-5km v2.4 (Conditional Latent Diffusion)"
}

export interface PhysicsCheckItem {
  id: string;
  name: string;
  description: string;
  status: 'passed' | 'review_required' | 'warning';
  measuredValue: string;
  physicalLimit: string;
  toleranceDelta: string;
}

export interface PhysicsValidation {
  status: 'PASSED' | 'REVIEW REQUIRED';
  confidenceScore: number; // 96.4%
  checks: PhysicsCheckItem[];
  thermodynamicBalance: {
    moistureConvergenceKgM2S: number;
    clausiusClapeyronBound: string;
    vorticityConsistency: 'Consistent' | 'Marginal';
    massConservationResidual: string;
  };
  validationTimestamp: string;
}

export interface ImpactAssessment {
  affectedZoneName: string;
  population: {
    totalEstimated: number;
    highRiskLowlands: number;
    elderlyAndChildren: number;
    shelterCapacityRequired: number;
  };
  agriculture: {
    totalHectaresExposed: number;
    standingCrops: { name: string; stage: string; susceptibility: 'Critical' | 'Moderate' | 'Low' }[];
    estimatedCropLossIndex: string;
  };
  rivers: {
    basin: string;
    gaugesExceedingDangerMark: number;
    criticalRivers: { name: string; currentLevelM: number; dangerLevelM: number; trend: string }[];
  };
  infrastructure: {
    highwaysFloodedKm: number;
    substationsAtRisk: number;
    primaryHealthCentersInZone: number;
    railLinesVulnerable: string;
  };
  riskWindow: {
    start: string;
    peak: string;
    end: string;
  };
  aiRecommendations: string[];
}

export interface AlertLanguageTranslation {
  language: string;
  languageCode: string;
  nativeTitle: string;
  title: string;
  headline: string;
  body: string;
  recommendedAction: string;
  voiceAudioEstimatedDurationSec: number;
}

export interface Alert {
  id: string;
  anomalyId: string;
  title: string;
  hazard: HazardType;
  location: string;
  state: string;
  district: string;
  severity: SeverityLevel;
  probability: number;
  leadTime: string;
  ensembleRatio: string;
  physicsStatus: 'PASSED' | 'REVIEW REQUIRED';
  impactTier: 'Critical' | 'High' | 'Moderate';
  status: 'Pending Review' | 'Approved' | 'Dispatched' | 'Rejected';
  createdAt: string;
  approvedBy?: string;
  approvalTimestamp?: string;
  channels: ('SMS' | 'Voice Call' | 'Web' | 'API' | 'Dashboard' | 'CAP-India')[];
  translations: Record<string, AlertLanguageTranslation>;
  notes?: string;
}

export interface HistoricalEvent {
  id: string;
  name: string;
  year: number;
  type: HazardType;
  region: string;
  description: string;
  forecastVsObserved: {
    forecastRainfallMm: number;
    observedRainfallMm: number;
    rainfallErrorPercent: number;
    peakPreservationRate: number; // e.g. 94.2%
    spatialErrorKm: number; // e.g. 8.4 km
    forecastLeadTimeDays: number;
    ensembleAgreementPct: number;
  };
  lessonsLearned: string;
}

export interface ModelMetric {
  id: string;
  name: string;
  role: string;
  version: string;
  status: 'Healthy' | 'Degraded' | 'Calibrating';
  inferenceLatencyMs: number;
  gpuUtilizationPct: number;
  dataFreshnessSec: number;
  driftIndex: number;
  physicsFailureRatePct: number;
  monthlyInferences: number;
  architecture: string;
}

export interface DataSource {
  id: string;
  name: string;
  fullName: string;
  institution: string;
  type: 'Numerical Ensemble' | 'Deterministic NWP' | 'Reanalysis' | 'Observation Gauges' | 'Satellite Radiometer';
  resolution: string;
  coverage: string;
  updateFrequency: string;
  lastUpdate: string;
  status: 'Optimal' | 'Syncing' | 'Degraded';
  dataLatency: string;
}

export interface PipelineStage {
  id: number;
  code: string;
  name: string;
  model: string;
  status: 'Completed' | 'Processing' | 'Pending' | 'Optimal';
  latencyMs: number;
  dataVolume: string;
  outputArtifact: string;
  description: string;
}
