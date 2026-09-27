import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { useWeatherStore } from '../../stores/weatherStore';
import { RiskOverview } from '../dashboard/RiskOverview';
import { WeatherMap } from '../maps/WeatherMap';
import { MapLayerControl } from '../maps/MapLayerControl';
import { MapLegend } from '../maps/MapLegend';
import { EnsembleRuns } from '../forecast/EnsembleRuns';
import { AnomalyDetectionView } from '../anomaly/AnomalyDetectionView';
import { StormTrackingView } from '../tracking/StormTrackingView';
import { ResolutionComparison } from '../downscaling/ResolutionComparison';
import { ImpactAnalysisView } from '../impact/ImpactAnalysisView';
import { AlertCenterView } from '../alerts/AlertCenterView';
import { PipelineView } from '../pipeline/PipelineView';
import { HistoricalView } from '../historical/HistoricalView';
import { ModelMonitoringView } from '../monitoring/ModelMonitoringView';
import { DataSourcesView } from '../datasources/DataSourcesView';
import { SettingsView } from '../settings/SettingsView';
import { CommandPalette } from '../common/CommandPalette';
import { EventDetailDrawer } from '../common/EventDetailDrawer';
import { AlertApprovalModal } from '../alerts/AlertApprovalModal';
import { DemoTourController } from '../common/DemoTourController';
import { LandingPage } from '../auth/LandingPage';
import { LoginPage } from '../auth/LoginPage';

export const AppShell: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { currentPage, appView, theme } = useWeatherStore();

  // ── Auth Routing ──
  if (appView === 'landing') return <LandingPage />;
  if (appView === 'login') return <LoginPage />;

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <RiskOverview />;
      case 'intelligence':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Live Geospatial Intelligence</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">High-resolution radar, storm trajectories, and downscaled 5km risk zones</p>
              </div>
            </div>
            <div className="relative">
              <WeatherMap />
              <MapLayerControl />
              <MapLegend />
            </div>
          </div>
        );
      case 'forecasts':
        return <EnsembleRuns />;
      case 'anomalies':
        return <AnomalyDetectionView />;
      case 'tracking':
        return <StormTrackingView />;
      case 'downscaling':
        return <ResolutionComparison />;
      case 'impact':
        return <ImpactAnalysisView />;
      case 'alerts':
        return <AlertCenterView />;
      case 'pipeline':
        return <PipelineView />;
      case 'historical':
        return <HistoricalView />;
      case 'monitoring':
        return <ModelMonitoringView />;
      case 'data-sources':
        return <DataSourcesView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <RiskOverview />;
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className={`flex h-screen w-full overflow-hidden font-sans ${isDark ? 'bg-[#060913] text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      {/* Desktop / Collapsible Sidebar */}
      <div className="hidden lg:block shrink-0">
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        />
      </div>

      {/* Mobile Drawer Sidebar */}
      {isMobileSidebarOpen && (
        <div 
          className={`fixed inset-0 z-50 flex lg:hidden ${isDark ? 'bg-slate-950/80' : 'bg-slate-900/40'} backdrop-blur-md`}
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div 
            className={`w-64 h-full shadow-2xl ${isDark ? 'bg-slate-950' : 'bg-white'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar 
              isCollapsed={false} 
              onToggleCollapse={() => setIsMobileSidebarOpen(false)} 
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar 
          onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} 
          isSidebarCollapsed={isSidebarCollapsed}
        />

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="mx-auto max-w-7xl pb-24">
            {renderCurrentPage()}
          </div>
        </main>
      </div>

      {/* Modals, Drawers & Overlays */}
      <CommandPalette />
      <EventDetailDrawer />
      <AlertApprovalModal />
      <DemoTourController />
    </div>
  );
};
