import React, { useState } from 'react';
import { useWeatherStore } from '../../stores/weatherStore';
import { 
  CloudRain, 
  Shield, 
  Layers, 
  Compass, 
  Users, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  Activity, 
  BarChart3, 
  ShieldCheck, 
  BellRing, 
  Sparkles, 
  Wind, 
  Flame, 
  Droplets, 
  Snowflake, 
  SunMedium, 
  Lock, 
  FileCheck, 
  Server, 
  Radio, 
  AlertTriangle 
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setAppView } = useWeatherStore();
  const [selectedCondition, setSelectedCondition] = useState<string>('cyclone');

  const capabilities = [
    {
      title: '23-Run Ensemble Intelligence',
      badge: 'Statistical Consensus',
      description: 'Evaluates 23 perturbed NCMRWF ensemble members instead of fragile single deterministic forecasts. Eliminates false alarms through robust probabilistic spread analysis.',
      image: '/images/hero_weather.jpg',
      icon: CloudRain,
      tag: 'NCMRWF NEPS-G',
      color: 'border-blue-500/30 bg-blue-50/40 text-blue-700'
    },
    {
      title: 'AI Storm Trajectory Tracking',
      badge: 'Kinematic Pathing',
      description: 'Dynamic graph neural tracking predicts cyclonic landfall with a 7-day cone of uncertainty, monitoring pressure gradients, sea surface temperatures, and steering winds.',
      image: '/images/cyclone_radar.jpg',
      icon: Compass,
      tag: 'Arabian Sea & BoB',
      color: 'border-indigo-500/30 bg-indigo-50/40 text-indigo-700'
    },
    {
      title: 'Selective 5 km Downscaling',
      badge: 'Hyperlocal Resolution',
      description: 'Advanced super-resolution models selectively enhance coarse ~12 km forecast grids down to 5 km over active hazard zones, revealing localized convective flash-flood centers.',
      image: '/images/thunderstorm_radar.jpg',
      icon: Layers,
      tag: 'High-Density Grid',
      color: 'border-cyan-500/30 bg-cyan-50/40 text-cyan-700'
    },
    {
      title: 'Physics Consistency Verification',
      badge: 'Zero Hallucinations',
      description: 'Thermodynamic sanity checks and Clausius-Clapeyron moisture flux limits rigorously validate model inferences against the fundamental laws of atmospheric physics.',
      image: '/images/command_center.jpg',
      icon: ShieldCheck,
      tag: 'Physics Enforced',
      color: 'border-emerald-500/30 bg-emerald-50/40 text-emerald-700'
    },
    {
      title: 'Human-in-the-Loop Authorization',
      badge: 'Duty Meteorologist Desk',
      description: 'AI assists and detects, but only authorized duty forecasters can grant cryptographic approval before life-critical sirens are dispatched to disaster authorities.',
      image: '/images/command_center.jpg',
      icon: Users,
      tag: 'Role-Based Clearance',
      color: 'border-amber-500/30 bg-amber-50/40 text-amber-700'
    },
    {
      title: 'Multilingual Public Siren Dispatch',
      badge: 'National Reach',
      description: 'Automated synthesis of approved warnings into 22 scheduled Indian languages via Bhashini neural voice, CAP v1.2 XML feeds, SMS cell broadcasts, and VHF sirens.',
      image: '/images/hero_weather.jpg',
      icon: Globe,
      tag: 'CAP v1.2 & Bhashini',
      color: 'border-rose-500/30 bg-rose-50/40 text-rose-700'
    },
  ];

  const weatherConditions = [
    {
      id: 'cyclone',
      title: 'Cyclones & Coastal Depressions',
      icon: Wind,
      status: 'Active Warning',
      severity: 'Red Alert',
      severityBg: 'bg-red-500 text-white',
      badgeColor: 'border-red-200 bg-red-50 text-red-700',
      activeSystem: 'Very Severe Cyclonic Storm (Arabian Sea Ingress)',
      maxMetric: '140 km/h Gusts • 978 hPa',
      affectedStates: ['Gujarat (Dwarka, Porbandar, Kutch)', 'North Maharashtra Coast'],
      districtsCount: 14,
      image: '/images/cyclone_radar.jpg',
      advisory: 'Gale force winds and dangerous sea conditions. Complete suspension of fishing operations and coastal evacuation in low-lying tracts.',
      telemetry: [
        { label: 'Central Pressure', val: '978 hPa' },
        { label: 'Current Wind Speed', val: '125 km/h' },
        { label: 'Storm Surge Expected', val: '3.8 meters' },
        { label: 'Ensemble Consensus', val: '91.3% (21/23 Runs)' }
      ]
    },
    {
      id: 'thunderstorm',
      title: 'Severe Thunderstorms & Lightning',
      icon: Zap,
      status: 'Elevated Convection',
      severity: 'Orange Advisory',
      severityBg: 'bg-amber-500 text-white',
      badgeColor: 'border-amber-200 bg-amber-50 text-amber-700',
      activeSystem: 'Squall Line & Severe Mesoscale Convective System',
      maxMetric: '78 km/h Squall • 55 dBZ Reflectivity',
      affectedStates: ['West Bengal (Kolkata, Howrah)', 'Odisha (Coastal)', 'Jharkhand'],
      districtsCount: 9,
      image: '/images/thunderstorm_radar.jpg',
      advisory: 'Frequent cloud-to-ground lightning strokes and intense rain bursts causing localized urban waterlogging and flight delays.',
      telemetry: [
        { label: 'Radar Reflectivity', val: '58 dBZ' },
        { label: 'CAPE Energy', val: '3,450 J/kg' },
        { label: 'Lightning Stroke Rate', val: '50+ /km²/hr' },
        { label: 'Lead Time', val: '48 Hours' }
      ]
    },
    {
      id: 'rainfall',
      title: 'Heavy Rainfall & Flash Floods',
      icon: Droplets,
      status: 'Flood Stage Watch',
      severity: 'Orange Advisory',
      severityBg: 'bg-amber-500 text-white',
      badgeColor: 'border-amber-200 bg-amber-50 text-amber-700',
      activeSystem: 'Active Monsoon Trough & River Basin Convergence',
      maxMetric: '248 mm / 24h Peak',
      affectedStates: ['Assam (Brahmaputra Valley)', 'Meghalaya', 'North Bengal'],
      districtsCount: 11,
      image: '/images/hero_weather.jpg',
      advisory: 'Brahmaputra and tributaries approaching high flood mark. Inundation of riparian agricultural lowlands and highway corridors.',
      telemetry: [
        { label: '24h Accumulation', val: '248.4 mm' },
        { label: 'River Danger Level', val: '+0.85m Above Warning' },
        { label: 'Soil Saturation', val: '94%' },
        { label: 'Population Affected', val: '1.4 Million' }
      ]
    },
    {
      id: 'heatwave',
      title: 'Extreme Heatwave & Thermal Stress',
      icon: SunMedium,
      status: 'Monitoring',
      severity: 'Yellow Watch',
      severityBg: 'bg-yellow-500 text-slate-900',
      badgeColor: 'border-yellow-200 bg-yellow-50 text-yellow-800',
      activeSystem: 'Dry Continental Westerly Inflow & Subsidence Ridge',
      maxMetric: '42.8°C (Heat Index 46.2°C)',
      affectedStates: ['West Rajasthan', 'North Gujarat', 'Vidarbha'],
      districtsCount: 8,
      image: '/images/hero_weather.jpg',
      advisory: 'Moderate health risk for vulnerable individuals. Public health advisories issued for daytime hydration and agricultural shift adjustments.',
      telemetry: [
        { label: 'Peak Surface Temp', val: '42.8°C' },
        { label: 'Wet Bulb Temp', val: '28.1°C' },
        { label: 'Relative Humidity', val: '28%' },
        { label: 'Heat Index Warning', val: 'Level 2' }
      ]
    },
    {
      id: 'coldwave',
      title: 'Western Disturbances & Orographic Snow',
      icon: Snowflake,
      status: 'Normal Surveillance',
      severity: 'Green Normal',
      severityBg: 'bg-emerald-500 text-white',
      badgeColor: 'border-emerald-200 bg-emerald-50 text-emerald-800',
      activeSystem: 'Mid-Latitude Upper Tropospheric Trough',
      maxMetric: '16.4°C Ridge • Light Precipitation',
      affectedStates: ['Himachal Pradesh', 'Jammu & Kashmir', 'Uttarakhand'],
      districtsCount: 5,
      image: '/images/hero_weather.jpg',
      advisory: 'Routine surveillance along high mountain passes. Road transport authorities alerted for potential morning black ice.',
      telemetry: [
        { label: 'Ridge Temp', val: '16.4°C' },
        { label: 'Surface Pressure', val: '785.4 hPa' },
        { label: 'Snowfall Elevation', val: '>3,200m' },
        { label: 'Wind Vector', val: 'NW 24 km/h' }
      ]
    }
  ];

  const currentConditionData = weatherConditions.find(c => c.id === selectedCondition) || weatherConditions[0];

  const stats = [
    { value: '23', label: 'Ensemble Realizations', sub: 'NCMRWF numerical cycles' },
    { value: '5 km', label: 'Hyperlocal Grid', sub: 'Physics-bounded downscaling' },
    { value: '6+ Days', label: 'Actionable Lead Time', sub: 'Advance disaster readiness' },
    { value: '22', label: 'Indian Languages', sub: 'Automated Bhashini alerts' },
  ];

  const partners = [
    'India Meteorological Department (IMD)',
    'National Centre for Medium Range Weather Forecasting (NCMRWF)',
    'National Disaster Management Authority (NDMA)',
    'Central Water Commission (CWC)',
    'Ministry of Earth Sciences, Government of India',
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-800">
      {/* ── Top Government Banner ── */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-wide">Government of India</span>
            <span className="opacity-40">|</span>
            <span className="opacity-90">Ministry of Earth Sciences</span>
            <span className="hidden md:inline opacity-40">|</span>
            <span className="hidden md:inline text-blue-200">National Weather Intelligence Network</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="px-2 py-0.5 rounded bg-blue-700/60 font-mono">NIC-CERT COMPLIANT</span>
            <span className="opacity-40">|</span>
            <button onClick={() => setAppView('login')} className="text-blue-200 hover:text-white font-medium transition-colors">
              Forecaster Portal
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Navigation Header ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/images/govt_emblem.jpg" 
              alt="Government Emblem" 
              className="h-10 w-10 rounded-full object-cover border-2 border-blue-200 shadow-sm"
            />
            <div>
              <div className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                MausamDrishti <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded text-xs font-bold border border-blue-200">AI</span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                Extreme Weather Intelligence & Early Warning
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
            <a href="#tracking" className="hover:text-blue-600 transition-colors">Condition Tracking</a>
            <a href="#capabilities" className="hover:text-blue-600 transition-colors">Capabilities</a>
            <a href="#governance" className="hover:text-blue-600 transition-colors">Governance & Security</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAppView('login')}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-200 transition-all hover:shadow-lg hover:shadow-blue-300 flex items-center gap-1.5"
            >
              <span>Login to Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/hero_weather.jpg" 
            alt="Monsoon clouds over India" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/92 via-blue-900/85 to-blue-800/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-32 sm:pt-28 sm:pb-40">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Smart India Hackathon 2026</span>
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-emerald-200 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Operational Backend Active</span>
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              AI-Powered Extreme
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-200 to-cyan-200">
                Weather Intelligence
              </span>
              & Early Warning Platform
            </h1>

            <p className="mt-6 text-base sm:text-lg text-blue-100/90 max-w-2xl leading-relaxed">
              MausamDrishti AI analyzes 23 ensemble forecast runs from NCMRWF, detects extreme weather anomalies, 
              downscales hazard corridors to 5 km resolution, verifies thermodynamics against physical laws, 
              and empowers frontline meteorologists to authorize verified multilingual public alerts.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setAppView('login')}
                className="px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-sm shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all flex items-center gap-2"
              >
                <span>Access Operational Console</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a 
                href="#tracking"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-sm border border-white/20 transition-all flex items-center gap-2"
              >
                <span>Live Weather Tracking</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="relative z-10 -mt-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-slate-200 p-5 text-center shadow-lg shadow-slate-200/50 hover:shadow-xl transition-shadow"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 font-mono tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-slate-800 mt-1">{stat.label}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WEATHER CONDITION-WISE TRACKING SECTION (NEW REQUIREMENT) ── */}
      <section id="tracking" className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>Real-Time Multi-Hazard Surveillance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Weather Condition-Wise Tracking Across India
            </h2>
            <p className="text-slate-600 mt-3 text-sm leading-relaxed">
              Continuous operational monitoring categorized by specific meteorological hazard classes. 
              Select a weather condition to inspect live Doppler telemetry, impacted districts, and active emergency warnings.
            </p>
          </div>

          {/* Condition Category Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {weatherConditions.map((cond) => {
              const Icon = cond.icon;
              const isSelected = selectedCondition === cond.id;
              return (
                <button
                  key={cond.id}
                  onClick={() => setSelectedCondition(cond.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                  <span>{cond.title}</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${cond.severityBg}`}>
                    {cond.severity.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Condition Detail Spotlight Card */}
          <div className="mt-8 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Radar Display Column */}
            <div className="lg:col-span-5 relative bg-slate-950 min-h-[320px] lg:min-h-full overflow-hidden flex flex-col justify-between p-6">
              <img 
                src={currentConditionData.image} 
                alt={currentConditionData.title}
                className="absolute inset-0 w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Top Status */}
              <div className="relative z-10 flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide ${currentConditionData.severityBg}`}>
                  {currentConditionData.severity}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-mono border border-slate-700">
                  INSAT-3DR & DOPPLER
                </span>
              </div>

              {/* Bottom Image Info */}
              <div className="relative z-10 text-white">
                <div className="text-xs text-blue-300 font-mono uppercase tracking-wider">Live System Profile</div>
                <div className="text-xl font-bold mt-1 text-white">{currentConditionData.activeSystem}</div>
                <div className="text-xs text-slate-300 mt-1 font-mono font-bold">
                  Peak Intensity: {currentConditionData.maxMetric}
                </div>
              </div>
            </div>

            {/* Telemetry and Action Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{currentConditionData.title}</h3>
                    <div className="text-xs text-slate-500 mt-0.5">Automated Multi-Agency Observation Grid</div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${currentConditionData.badgeColor}`}>
                    Status: {currentConditionData.status}
                  </span>
                </div>

                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  {currentConditionData.advisory}
                </p>

                {/* Telemetry Grid */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {currentConditionData.telemetry.map(t => (
                    <div key={t.label} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[11px] text-slate-500">{t.label}</div>
                      <div className="text-sm font-bold text-slate-800 mt-1 font-mono">{t.val}</div>
                    </div>
                  ))}
                </div>

                {/* Affected States & Districts */}
                <div className="mt-6 p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-900 mb-2">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span>Geographic Zones Under Direct Threat:</span>
                    </span>
                    <span className="text-blue-600">{currentConditionData.districtsCount} Vulnerable Districts</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentConditionData.affectedStates.map(state => (
                      <span key={state} className="px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-xs font-semibold text-slate-700">
                        {state}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Updated every 15 mins via IMD Doppler & NCMRWF models
                </span>
                <button
                  onClick={() => setAppView('login')}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>Track in Live Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE CAPABILITIES WITH IMAGES ── */}
      <section id="capabilities" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Core Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Operational Weather Intelligence Architecture
            </h2>
            <p className="text-slate-500 mt-3 text-sm leading-relaxed">
              Every capability is backed by rigorous meteorological science, high-resolution imagery, and human validation.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Card Image Header */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold flex items-center gap-1">
                        <Icon className="w-3 h-3 text-sky-400" />
                        <span>{feature.tag}</span>
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-xs font-bold text-white tracking-wide">{feature.badge}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="mt-2.5 text-sm text-slate-500 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                      <span>Operational Feature</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── OPERATIONAL GOVERNANCE & SECURITY (REPLACED PIPELINE TO PREVENT SECURITY LEAKS) ── */}
      <section id="governance" className="py-20 sm:py-28 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-3 border border-blue-400/30">
              <Shield className="w-3.5 h-3.5" />
              <span>National Security & Compliance Standard</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Operational Governance & Certified Standards
            </h2>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              MausamDrishti AI adheres strictly to national emergency communication protocols and air-gapped security guidelines, ensuring no unauthorized public alerts or exposure of critical model infrastructure.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Lock,
                title: 'Air-Gapped AI Model Security',
                desc: 'All neural weights, downscaling diffusion models, and ensemble ingestion run in isolated government sovereign cloud enclaves. Zero public API access to internal compute clusters.'
              },
              {
                icon: ShieldCheck,
                title: 'Role-Based Forecaster Clearance (RBAC)',
                desc: 'Strict multi-tier access: Level 4 Admin, Level 3 Senior Duty Meteorologist, Level 2 NDMA Emergency Coordinator, Level 1 Public Observer. Siren triggers require PKI verification.'
              },
              {
                icon: FileCheck,
                title: 'CAP v1.2 & WMO Compliance',
                desc: 'Adheres to World Meteorological Organization guidelines and NDMA Common Alerting Protocol v1.2 for immediate interoperability with state and district disaster command centers.'
              },
              {
                icon: Server,
                title: 'Immutable Audit Logging',
                desc: 'Every forecast modification, alert sign-off, downscale initiation, and siren broadcast is cryptographically logged with forecaster ID, IP address, and timestamp.'
              },
              {
                icon: Activity,
                title: 'Thermodynamic Physics Bounding',
                desc: 'AI outputs are continuously constrained by physical conservation laws (Clausius-Clapeyron, kinematic divergence). Inconsistent hallucinated weather states are automatically flagged and rejected.'
              },
              {
                icon: Radio,
                title: 'Fail-Safe Dissemination Gateway',
                desc: 'Triple-redundant siren pathways via cellular cell-broadcast, NIC SMS gateway, and automated VHF broadcast sirens ensure alerts reach frontline citizens even during power grid failures.'
              }
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-blue-500/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Operational Collaboration & Mandate
            </span>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {partners.map((name) => (
              <span key={name} className="text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-20 sm:py-28 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Protecting Lives Through Intelligent Early Warning
          </h2>
          <p className="mt-4 text-blue-100 text-base leading-relaxed max-w-2xl mx-auto">
            Access the MausamDrishti AI operational console to explore real-time ensemble intelligence, 
            interactive Leaflet hazard maps, storm trajectories, and approve multilingual emergency broadcasts.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setAppView('login')}
              className="px-7 py-3 rounded-xl bg-white text-blue-700 font-bold text-sm shadow-xl hover:bg-blue-50 transition-all flex items-center gap-2"
            >
              <span>Login to Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a 
              href="#tracking"
              className="px-7 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/25 transition-all"
            >
              View Active Hazards
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="contact" className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-2.5">
                <img 
                  src="/images/govt_emblem.jpg" 
                  alt="Emblem" 
                  className="h-9 w-9 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <div className="text-sm font-bold text-white">MausamDrishti AI</div>
                  <div className="text-[10px] text-slate-500">Extreme Weather Intelligence</div>
                </div>
              </div>
              <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                An AI-powered operational weather intelligence and early warning platform 
                for India's meteorological and disaster management authorities.
              </p>
              <div className="mt-4 text-[10px] text-slate-600">
                © 2026 MausamDrishti AI • Ministry of Earth Sciences, Government of India
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Quick Navigation</h4>
              <div className="space-y-2 text-xs">
                <a href="#about" className="block hover:text-white transition-colors">About Platform</a>
                <a href="#tracking" className="block hover:text-white transition-colors">Weather Condition Tracking</a>
                <a href="#capabilities" className="block hover:text-white transition-colors">Core Capabilities</a>
                <a href="#governance" className="block hover:text-white transition-colors">Governance & Security</a>
                <button onClick={() => setAppView('login')} className="block hover:text-white transition-colors text-left">
                  Operational Console Login
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Meteorological Operations Center</h4>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>NCMRWF, A-50, Sector-62, Noida, UP 201307</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>+91-120-2403900 (Operations Desk)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>operations@mausamdrishti.gov.in</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
