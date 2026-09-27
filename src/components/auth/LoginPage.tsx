import React, { useState } from 'react';
import { useWeatherStore } from '../../stores/weatherStore';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  AlertCircle,
  ChevronRight,
  Fingerprint,
  CloudRain,
  Zap,
  CheckCircle2,
  Info,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { setAppView, login } = useWeatherStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid credentials. Please verify your government email and security passcode.');
      }
    } catch {
      setError('Connection to security gateway timed out. Please retry.');
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogins = [
    { label: 'Admin (L4)', email: 'admin@mausamdrishti.gov.in', password: 'admin123', role: 'Full Authority' },
    { label: 'Forecaster (L3)', email: 'forecaster@imd.gov.in', password: 'forecast123', role: 'Duty Meteorologist' },
    { label: 'NDMA Ops (L2)', email: 'ndma@nic.in', password: 'ndma123', role: 'Disaster Siren Desk' },
    { label: 'SIH Demo (L1)', email: 'demo@sih.gov.in', password: 'demo', role: 'Observer Mode' },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 selection:bg-blue-100 selection:text-blue-800">
      {/* ── Left Panel: Visual Branding ── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/hero_weather.jpg"
          alt="Monsoon clouds"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-indigo-900/80" />

        {/* Content */}
        <div className="relative flex flex-col justify-between p-10 xl:p-14 z-10 w-full">
          {/* Back Button */}
          <button
            onClick={() => setAppView('landing')}
            className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portal</span>
          </button>

          {/* Center Content */}
          <div className="max-w-lg">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/images/govt_emblem.jpg"
                alt="Emblem"
                className="h-14 w-14 rounded-full object-cover border-2 border-white/30 shadow-lg"
              />
              <div>
                <div className="text-xl font-bold text-white">MausamDrishti AI</div>
                <div className="text-xs text-blue-200">Extreme Weather Intelligence Platform</div>
              </div>
            </div>

            <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight tracking-tight">
              Operational Command
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-cyan-200">
                Console Access
              </span>
            </h2>

            <p className="mt-4 text-blue-100/70 text-sm leading-relaxed max-w-md">
              Access real-time ensemble intelligence, 5 km risk heatmaps, storm trajectory tracking, 
              and multilingual alert dispatch systems. Authorized personnel only.
            </p>

            <div className="mt-8 space-y-3">
              {[
                { icon: CloudRain, text: '23 ensemble runs • Real-time anomaly scoring' },
                { icon: Shield, text: 'Physics-verified • Zero hallucination guarantee' },
                { icon: Zap, text: 'Human-in-the-loop • Forecaster approval workflow' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center gap-2.5 text-blue-100/60 text-xs">
                    <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-sky-300" />
                    </div>
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Credits */}
          <div className="text-[10px] text-blue-200/40 mt-6">
            © 2026 Ministry of Earth Sciences, Government of India
          </div>
        </div>
      </div>

      {/* ── Right Panel: Login Form ── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between mb-8">
            <button
              onClick={() => setAppView('landing')}
              className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-2">
              <img
                src="/images/govt_emblem.jpg"
                alt="Emblem"
                className="h-8 w-8 rounded-full object-cover border border-blue-200"
              />
              <span className="text-sm font-bold text-slate-800">MausamDrishti AI</span>
            </div>
          </div>

          {/* Form Header */}
          <div className="text-center lg:text-left mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-bold mb-4">
              <Fingerprint className="w-3.5 h-3.5" />
              <span>Secure Government Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Sign In
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Enter your authorized credentials to access the operational console.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Error Banner */}
            {error && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span className="text-xs leading-relaxed">{error}</span>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-xs font-bold text-slate-700 mb-1.5">
                Government Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mausamdrishti.gov.in"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 
                    placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 
                    placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold 
                shadow-md shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Sign In to Console</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quick Access</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Quick Login Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {quickLogins.map((ql) => (
              <button
                key={ql.label}
                onClick={() => {
                  setEmail(ql.email);
                  setPassword(ql.password);
                }}
                className="p-3 rounded-xl border border-slate-200 bg-white text-center hover:border-blue-300 
                  hover:bg-blue-50 transition-all group"
              >
                <div className="text-xs font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                  {ql.label}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">{ql.role}</div>
              </button>
            ))}
          </div>

          {/* Info Banner */}
          <div className="mt-6 flex items-start gap-2.5 p-3 rounded-xl bg-sky-50 border border-sky-200">
            <Info className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
            <div className="text-[11px] text-sky-700 leading-relaxed">
              <span className="font-bold">Demo Mode:</span> Click any Quick Access button above to auto-fill credentials, 
              then press Sign In. Use "SIH Demo" for a read-only exploration of the platform.
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-[10px] text-slate-400">
            Secured by Government PKI Infrastructure • NIC Data Centre
          </div>
        </div>
      </div>
    </div>
  );
};
