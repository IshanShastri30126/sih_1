import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  Clock, 
  Users, 
  Lock,
  Send
} from 'lucide-react';
import { useWeatherStore } from '../../stores/weatherStore';
import { StatusBadge } from '../common/StatusBadge';
import confetti from 'canvas-confetti';

export const AlertApprovalModal: React.FC = () => {
  const { 
    isApprovalModalOpen, 
    setApprovalModalOpen, 
    selectedAlertForReview, 
    approveAlert, 
    rejectAlert, 
    requestReviewAlert,
    setCurrentPage
  } = useWeatherStore();

  const [notes, setNotes] = useState('');
  const [isConfirmingApprove, setIsConfirmingApprove] = useState(false);

  if (!isApprovalModalOpen || !selectedAlertForReview) return null;

  const alert = selectedAlertForReview;

  const handleApprove = () => {
    approveAlert(alert.id, notes);
    setIsConfirmingApprove(false);
    setApprovalModalOpen(false);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#10b981', '#38bdf8']
      });
    } catch (e) {
      // ignore in tests
    }

    setCurrentPage('alerts');
  };

  const handleReject = () => {
    rejectAlert(alert.id, notes || 'Rejected by duty forecaster');
    setApprovalModalOpen(false);
    setCurrentPage('alerts');
  };

  const handleRequestReview = () => {
    requestReviewAlert(alert.id);
    setApprovalModalOpen(false);
    setCurrentPage('alerts');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">
                Human-in-the-Loop Verification
              </div>
              <h3 className="text-sm font-bold text-white">
                Forecaster Alert Review & Release Authorization
              </h3>
            </div>
          </div>
          <button
            onClick={() => setApprovalModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Trust Callout */}
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3.5 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-white block">Operational Mandate:</span>
              AI detected this event. A human meteorologist remains in strict legal command. 
              Review the atmospheric physics and ensemble evidence below before authorizing public alert dissemination.
            </div>
          </div>

          {/* Key Evidence Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase">Hazard</span>
              <div className="text-sm font-bold text-white mt-0.5">{alert.hazard}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase">Location</span>
              <div className="text-sm font-bold text-cyan-400 mt-0.5 truncate">{alert.district}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase">AI Probability</span>
              <div className="text-sm font-bold text-rose-400 mt-0.5">{alert.probability}% Risk</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase">Lead Time</span>
              <div className="text-sm font-bold text-purple-400 mt-0.5">{alert.leadTime}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase">Ensemble Agreement</span>
              <div className="text-sm font-bold text-white mt-0.5">{alert.ensembleRatio}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase">Physics Status</span>
              <div className="text-sm font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{alert.physicsStatus}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase">Impact Tier</span>
              <div className="text-sm font-bold text-rose-400 mt-0.5">{alert.impactTier}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase">Status</span>
              <div className="text-sm font-bold text-amber-400 mt-0.5">{alert.status}</div>
            </div>
          </div>

          {/* Alert Preview Text */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2 text-xs">
            <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">
              Proposed Warning Body (English Master)
            </span>
            <p className="text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
              {alert.translations.en?.body || 'Severe rainfall deluge expected in South Gujarat lowlands.'}
            </p>
            <p className="text-emerald-400 font-mono text-[11px]">
              Recommended Action: {alert.translations.en?.recommendedAction}
            </p>
          </div>

          {/* Forecaster Decision Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Forecaster Operational Remarks / Justification (Mandatory for Audit Trail):
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Verified moisture flux consistency and CWC river gauge trends. Approved for emergency broadcast to Valsad DDMA."
              rows={2}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Confirmation Step if clicked approve */}
          {isConfirmingApprove && (
            <div className="p-3.5 rounded-xl border border-rose-500 bg-rose-950/40 space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                <AlertTriangle className="w-4 h-4" />
                <span>Confirm Public Siren & CAP Release Authorization</span>
              </div>
              <p className="text-xs text-slate-300">
                By clicking Confirm, you digitally sign this warning as Lead Duty Meteorologist. 
                Dispatches will be routed to NDMA, State Disaster Management, and Bhashini multilingual TTS engines.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleApprove}
                  className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                >
                  Yes, Authorize & Dispatch
                </button>
                <button
                  onClick={() => setIsConfirmingApprove(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        {!isConfirmingApprove && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleReject}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-rose-500/30 bg-rose-950/20 hover:bg-rose-900/40 text-rose-300 text-xs font-semibold transition-colors"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Warning</span>
              </button>

              <button
                onClick={handleRequestReview}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Request Review</span>
              </button>
            </div>

            <button
              onClick={() => setIsConfirmingApprove(true)}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/30 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>APPROVE ALERT</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
