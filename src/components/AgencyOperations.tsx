import React from 'react';
import { 
  Globe2, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  Code2, 
  Layers, 
  CheckCircle2, 
  Star,
  Users,
  Award,
  Terminal,
  Cpu,
  MonitorSmartphone
} from 'lucide-react';
import { AGENCY_STATS, CLIENT_TESTIMONIALS, GLOBAL_HUBS } from '../data/agencyData';

interface AgencyOperationsProps {
  onOpenQuoteModal: () => void;
  onOpenLiveCanvas: () => void;
  onViewProjects: () => void;
}

export const AgencyOperations: React.FC<AgencyOperationsProps> = ({
  onOpenQuoteModal,
  onOpenLiveCanvas,
  onViewProjects,
}) => {
  return (
    <div id="agency-operations-overview" className="space-y-16">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto space-y-6 pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold shadow-2xs">
          <Globe2 className="w-3.5 h-3.5" />
          <span>Remote Operations Across 5 Global Hubs • Worldwide Client Delivery</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 tracking-tight leading-[1.15]">
          Architecting High-Performance Web Platforms for the World's Ambitious Brands
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Meridian is a premier remote web agency. With distributed engineering and design hubs in San Francisco, London, Zurich, Singapore, and Tokyo, we deliver continuous 24/7 sprints with zero timezone friction.
        </p>

        {/* Primary Action Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onOpenQuoteModal}
            className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-indigo-200" />
            <span>Calculate Project Scope & Custom Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenLiveCanvas}
            className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Test Drive Live Collaboration Canvas</span>
          </button>
        </div>

        {/* Assurance pills */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-600">
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Guaranteed 4-Hour Response SLA
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Fixed-Price Milestones & No Scope Creep
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Real-time Client Staging & Feedback
          </span>
        </div>
      </div>

      {/* High-Impact Proof Stats Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {AGENCY_STATS.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2 hover:border-indigo-200 transition-colors"
          >
            <div className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
              {stat.value}
            </div>
            <div className="font-semibold text-slate-800 text-sm">{stat.label}</div>
            <p className="text-xs text-slate-500 leading-normal">{stat.detail}</p>
          </div>
        ))}
      </div>

      {/* The Follow-the-Sun Operational Model (Differentiator) */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" />
            Why Remote Operations Outperform Local Agencies
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
            The Follow-The-Sun Operating Engine: Continuous 24-Hour Velocity
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            While traditional agencies sleep, our global relay is always moving your project forward. When our European clients finish their workday, our San Francisco and Asian pods pick up revisions without missing a beat.
          </p>
        </div>

        {/* Global relay progression */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 relative z-10">
          <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Phase 1 • 08:00 - 16:00 CET</span>
              <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-300 text-[10px] font-mono">London & Zurich</span>
            </div>
            <h3 className="font-heading font-bold text-base text-white">Client Sync & UI/UX Architecture</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Design token specifications, client design reviews on the live canvas, executive alignment, and accessibility audits.
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Phase 2 • 14:00 - 22:00 PST</span>
              <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-300 text-[10px] font-mono">San Francisco</span>
            </div>
            <h3 className="font-heading font-bold text-base text-white">Edge Engineering & System Logic</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              High-throughput backend development, Next.js 15 App Router optimizations, database caching, and cloud deployments.
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Phase 3 • 09:00 - 18:00 JST/SGT</span>
              <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-300 text-[10px] font-mono">Tokyo & Singapore</span>
            </div>
            <h3 className="font-heading font-bold text-base text-white">Interactive 3D, Motion & QA</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              WebGL shader tuning, automated cross-browser testing, mobile load-stress validation, and staging release deployments.
            </p>
          </div>
        </div>

        {/* Global Hubs ticker preview */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <span>Active Hubs: London • Zurich • San Francisco • Singapore • Tokyo</span>
          <button
            onClick={onViewProjects}
            className="text-indigo-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>See live projects currently in production</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Core Capabilities */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900">
            What We Build for Global Enterprises & Fast-Scaling Brands
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Engineered for high conversion, sub-second latency, and frictionless international localization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4 hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Custom Web Applications & Portals
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complex SaaS platforms, client portals, telemetry dashboards, and high-frequency financial or healthcare web software built with React 19, Next.js 15, and TypeScript.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Enterprise RBAC & Auth0 / Clerk
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Sub-second API and Edge streaming
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Real-time WebSockets & D3 visualization
              </li>
            </ul>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4 hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Flagship Brand Websites & Design Systems
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Award-winning marketing platforms that command market leadership, elevate brand authority, and convert visitors into multi-million dollar contracts.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Figma token sync to React codebases
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> 100/100 Google Core Web Vitals score
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Headless Sanity, Strapi, or Contentful
              </li>
            </ul>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4 hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg text-slate-900">
              Interactive 3D & WebGL Experiences
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Memorable product configurators, hardware models, and interactive shaders that captivate users while maintaining lightweight mobile performance.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Three.js / React Three Fiber / Shaders
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> DRACO compressed 3D assets (&lt;1MB)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> 60 FPS mobile rendering guaranteed
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Verified Global Client Testimonials */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1 text-amber-500 justify-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h2 className="text-2xl font-heading font-bold text-slate-900">
            Trusted by CTOs, CMOs, & Product Leaders Worldwide
          </h2>
          <p className="text-xs text-slate-500">
            Direct feedback from client stakeholders who collaborate with us across timezones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CLIENT_TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="pt-4 border-t border-slate-100">
                <div className="font-bold text-slate-900 text-xs">{t.author}</div>
                <div className="text-[11px] text-slate-500">{t.role}, {t.company}</div>
                <div className="text-[10px] text-indigo-600 font-medium mt-0.5">{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Models & Pricing Transparency */}
      <div className="bg-slate-100/70 rounded-2xl p-8 border border-slate-200 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-heading font-bold text-slate-900">
            Transparent Engagement Tiers
          </h2>
          <p className="text-xs text-slate-600">
            No surprise billing. Every engagement is backed by fixed milestone commitments, weekly staging demos, and direct access to senior specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tier 1 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Fast-Track MVP</span>
              <h3 className="text-2xl font-heading font-bold text-slate-900 mt-1">$38,000 - $65,000</h3>
              <p className="text-xs text-slate-500 mt-1">4 to 6 Weeks Turnaround</p>
            </div>
            <p className="text-xs text-slate-600">
              Ideal for venture-backed startups needing a production-grade web application, investor portal, or high-converting platform launched rapidly.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-3 border-t border-slate-100">
              <li className="flex items-center gap-2">✓ 1 Design Lead + 2 Senior Engineers</li>
              <li className="flex items-center gap-2">✓ Full Next.js/React architecture</li>
              <li className="flex items-center gap-2">✓ Live Staging & Feedback Canvas</li>
              <li className="flex items-center gap-2">✓ 30-Day Post-Launch SLA</li>
            </ul>
            <button
              onClick={onOpenQuoteModal}
              className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors cursor-pointer"
            >
              Configure Fast-Track Quote
            </button>
          </div>

          {/* Tier 2 (Highlighted) */}
          <div className="bg-white p-6 rounded-xl border-2 border-indigo-600 shadow-md space-y-4 relative">
            <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-wide">
              Most Popular
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Flagship Platform</span>
              <h3 className="text-2xl font-heading font-bold text-slate-900 mt-1">$75,000 - $160,000</h3>
              <p className="text-xs text-slate-500 mt-1">8 to 12 Weeks Turnaround</p>
            </div>
            <p className="text-xs text-slate-600">
              Comprehensive web platform re-architecture, enterprise design system, headless CMS, and interactive 3D visualizations.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-3 border-t border-slate-100">
              <li className="flex items-center gap-2 font-semibold">✓ Full 24/7 Follow-the-Sun Pod</li>
              <li className="flex items-center gap-2">✓ Custom WebGL / 3D Experiences</li>
              <li className="flex items-center gap-2">✓ Multi-Region Global Edge CDN</li>
              <li className="flex items-center gap-2">✓ WCAG AAA & Enterprise Security</li>
              <li className="flex items-center gap-2">✓ Dedicated Client Slack & PM</li>
            </ul>
            <button
              onClick={onOpenQuoteModal}
              className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
            >
              Configure Custom Quote
            </button>
          </div>

          {/* Tier 3 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Dedicated Pod Retainer</span>
              <h3 className="text-2xl font-heading font-bold text-slate-900 mt-1">$18,500 / month</h3>
              <p className="text-xs text-slate-500 mt-1">Quarterly Rolling Commitment</p>
            </div>
            <p className="text-xs text-slate-600">
              Continuous sprint velocity for enterprise engineering teams looking to augment their in-house capabilities with world-class frontend talent.
            </p>
            <ul className="text-xs text-slate-700 space-y-2 pt-3 border-t border-slate-100">
              <li className="flex items-center gap-2">✓ Guaranteed Senior Pod allocation</li>
              <li className="flex items-center gap-2">✓ Bi-weekly sprint releases</li>
              <li className="flex items-center gap-2">✓ Direct Slack & Figma integration</li>
              <li className="flex items-center gap-2">✓ 4-hour emergency SLA</li>
            </ul>
            <button
              onClick={onOpenQuoteModal}
              className="w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors cursor-pointer"
            >
              Inquire About Retainer
            </button>
          </div>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
            Ready to Accelerate Your Digital Platform?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            Use our interactive scope calculator for an instant estimate, or submit an inquiry to speak directly with our Principal Architects in your timezone.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            onClick={onOpenQuoteModal}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer text-center"
          >
            Get Custom Quote & Timeline
          </button>
        </div>
      </div>
    </div>
  );
};
