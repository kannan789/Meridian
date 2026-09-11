import React, { useState, useMemo } from 'react';
import { QuoteInquiry } from '../types';
import { 
  Sparkles, 
  Calculator, 
  CheckCircle2, 
  Clock, 
  Users, 
  DollarSign, 
  ArrowRight, 
  Check, 
  X, 
  Copy, 
  Calendar,
  Globe2,
  ShieldCheck,
  Send
} from 'lucide-react';

interface QuoteCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitInquiry: (inquiry: QuoteInquiry) => void;
}

export const QuoteCalculatorModal: React.FC<QuoteCalculatorModalProps> = ({
  isOpen,
  onClose,
  onSubmitInquiry,
}) => {
  // Wizard state
  const [projectType, setProjectType] = useState<'webapp' | 'marketing' | 'design_system' | 'three_d' | 'ecommerce'>('webapp');
  const [timelineSpeed, setTimelineSpeed] = useState<'fast' | 'standard' | 'enterprise'>('standard');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['headless_cms', 'web_vitals']);
  
  // Contact details
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [preferredTimezone, setPreferredTimezone] = useState('EST (UTC-5)');
  const [projectDescription, setProjectDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<QuoteInquiry | null>(null);
  const [copied, setCopied] = useState(false);

  // Dynamic estimate calculation
  const estimate = useMemo(() => {
    let basePrice = 45000;
    let weeks = 8;
    let team = '1 Design Lead (London), 2 Full-Stack Engineers (SF/Singapore)';

    if (projectType === 'webapp') {
      basePrice = 65000;
      weeks = 10;
      team = '1 Principal Designer (London), 2 Senior Full-Stack Engineers (SF), 1 QA Lead (Zurich)';
    } else if (projectType === 'marketing') {
      basePrice = 42000;
      weeks = 6;
      team = '1 Creative Director (London), 1 Senior Frontend Engineer (SF), 1 Content/CMS Dev (Singapore)';
    } else if (projectType === 'design_system') {
      basePrice = 54000;
      weeks = 8;
      team = '1 Design System Architect (Zurich), 2 Senior Component Engineers (London/SF)';
    } else if (projectType === 'three_d') {
      basePrice = 78000;
      weeks = 11;
      team = '1 3D/WebGL Specialist (Tokyo), 1 Design Director (London), 2 Web Engineers (SF)';
    } else if (projectType === 'ecommerce') {
      basePrice = 58000;
      weeks = 8;
      team = '1 E-Commerce Architect (Singapore), 1 UI/UX Designer (London), 2 Full-Stack Engineers (SF)';
    }

    if (timelineSpeed === 'fast') {
      basePrice *= 1.25; // 25% rush for expedited pod allocation
      weeks = Math.max(Math.round(weeks * 0.65), 4);
    } else if (timelineSpeed === 'enterprise') {
      basePrice *= 1.45; // Extensive multi-stakeholder governance & compliance
      weeks = Math.round(weeks * 1.5);
    }

    // Addons cost
    let addonTotal = 0;
    if (selectedAddons.includes('interactive_3d')) addonTotal += 14000;
    if (selectedAddons.includes('multi_language')) addonTotal += 9500;
    if (selectedAddons.includes('soc2_compliance')) addonTotal += 12000;
    if (selectedAddons.includes('headless_cms')) addonTotal += 7500;
    if (selectedAddons.includes('web_vitals')) addonTotal += 6000;
    if (selectedAddons.includes('follow_sun_247')) addonTotal += 15000;

    const totalMin = Math.round(basePrice + addonTotal);
    const totalMax = Math.round(totalMin * 1.28);

    return {
      minFormatted: `$${totalMin.toLocaleString()}`,
      maxFormatted: `$${totalMax.toLocaleString()}`,
      weeks: `${weeks} Weeks`,
      recommendedTeam: team,
    };
  }, [projectType, timelineSpeed, selectedAddons]);

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((a) => a !== addonId) : [...prev, addonId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !companyName || !email) return;

    const inquiry: QuoteInquiry = {
      id: `MD-INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleDateString(),
      clientName,
      companyName,
      email,
      projectType,
      timeline: `${timelineSpeed} (${estimate.weeks})`,
      estimatedBudget: `${estimate.minFormatted} - ${estimate.maxFormatted}`,
      selectedAddons,
      description: projectDescription,
      preferredTimezone,
    };

    onSubmitInquiry(inquiry);
    setSubmittedInquiry(inquiry);
    setIsSubmitted(true);
  };

  const handleCopySummary = () => {
    if (!submittedInquiry) return;
    const summaryText = `MERIDIAN PROJECT INQUIRY SUMMARY
Reference ID: ${submittedInquiry.id}
Client: ${submittedInquiry.clientName} (${submittedInquiry.companyName})
Email: ${submittedInquiry.email}
Project Type: ${submittedInquiry.projectType}
Estimated Budget: ${submittedInquiry.estimatedBudget}
Estimated Timeline: ${submittedInquiry.timeline}
Preferred Timezone: ${submittedInquiry.preferredTimezone}
Overview: ${submittedInquiry.description || 'Custom Scope'}`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-semibold">
              <Sparkles className="w-3 h-3" />
              Instant Scope Estimator & Priority Booking
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold tracking-tight text-white">
              Configure Your Custom Quote & Project Inquiry
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Tailor your project requirements to calculate estimated investment, delivery turnaround, and distributed team pod allocation.
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Project Archetype */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  1. Select Primary Project Scope
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { id: 'webapp', title: 'Web Application / SaaS', desc: 'Complex portals, dashboards, real-time data & RBAC' },
                    { id: 'marketing', title: 'Flagship Marketing Site', desc: 'Award-winning aesthetics, high conversion, sub-second speed' },
                    { id: 'design_system', title: 'Design System & Rebrand', desc: 'Multi-brand Figma tokens, React component libraries' },
                    { id: 'three_d', title: 'Interactive 3D / WebGL', desc: 'Hardware visualizers, 3D product configurators, shaders' },
                    { id: 'ecommerce', title: 'Headless E-Commerce', desc: 'Shopify Plus / Medusa, global multi-currency checkouts' },
                  ].map((type) => (
                    <div
                      key={type.id}
                      onClick={() => setProjectType(type.id as any)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                        projectType === type.id
                          ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20 text-slate-900 shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="font-bold text-xs flex items-center justify-between">
                        <span>{type.title}</span>
                        {projectType === type.id && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-normal">{type.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Timeline Speed */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  2. Delivery Velocity & Turnaround
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'fast', label: 'Fast-Track Sprint (4-6 wks)', desc: 'Dedicated 24/7 pod, expedited kickoff' },
                    { id: 'standard', label: 'Standard Delivery (8-10 wks)', desc: 'Balanced sprint cycles with thorough QA' },
                    { id: 'enterprise', label: 'Enterprise Phased (12-16 wks)', desc: 'Multi-stakeholder reviews & compliance audits' },
                  ].map((spd) => (
                    <div
                      key={spd.id}
                      onClick={() => setTimelineSpeed(spd.id as any)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        timelineSpeed === spd.id
                          ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20 text-slate-900'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="font-bold text-xs flex items-center justify-between">
                        <span>{spd.label}</span>
                        {timelineSpeed === spd.id && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{spd.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: Technical Capabilities & Add-ons */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  3. Technical Requirements & Add-on Services
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'interactive_3d', label: 'Custom 3D / WebGL Animations', price: '+$14,000' },
                    { id: 'multi_language', label: 'Global Multi-Language Localization (i18n)', price: '+$9,500' },
                    { id: 'soc2_compliance', label: 'Enterprise Security (SOC2 / HIPAA / WCAG AAA)', price: '+$12,000' },
                    { id: 'headless_cms', label: 'Headless CMS Integration (Sanity / Strapi)', price: '+$7,500' },
                    { id: 'web_vitals', label: '100/100 Core Web Vitals SLA Guarantee', price: '+$6,000' },
                    { id: 'follow_sun_247', label: '24/7 Follow-The-Sun Critical SLA Support', price: '+$15,000' },
                  ].map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-2.5 rounded-lg border text-xs flex items-center justify-between cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-indigo-50/50 border-indigo-300 text-slate-900 font-semibold'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'
                          }`}>
                            {isChecked && <Check className="w-3 h-3" />}
                          </div>
                          <span>{addon.label}</span>
                        </div>
                        <span className="text-[11px] font-mono text-indigo-700 font-bold">{addon.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Calculation Summary Card */}
              <div className="bg-slate-900 rounded-2xl p-5 sm:p-6 text-white space-y-4 border border-slate-800 shadow-md">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-indigo-400" />
                    <span className="font-heading font-bold text-sm text-white">Estimated Project Scope</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                    Fixed-Price Milestone Model
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Estimated Investment Range</span>
                    <div className="text-2xl font-heading font-extrabold text-white mt-0.5 text-indigo-300">
                      {estimate.minFormatted} – {estimate.maxFormatted}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Estimated Turnaround</span>
                    <div className="text-2xl font-heading font-extrabold text-white mt-0.5">
                      {estimate.weeks}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-xs">
                  <span className="text-slate-400 block text-[11px] mb-1">Recommended Distributed Team Pod:</span>
                  <div className="text-slate-200 font-medium">{estimate.recommendedTeam}</div>
                </div>
              </div>

              {/* Step 4: Contact & Project Brief */}
              <div className="space-y-4 pt-2 border-t border-slate-200">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  4. Your Details & Kickoff Window
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. BioLabs Global or Finova Capital"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Sync Timezone
                    </label>
                    <select
                      value={preferredTimezone}
                      onChange={(e) => setPreferredTimezone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="PST (UTC-8 / UTC-7)">Americas West • San Francisco (PST)</option>
                      <option value="EST (UTC-5 / UTC-4)">Americas East • New York (EST)</option>
                      <option value="GMT/BST (UTC+0 / UTC+1)">Europe West • London (GMT)</option>
                      <option value="CET/CEST (UTC+1 / UTC+2)">Europe Central • Zurich (CET)</option>
                      <option value="SGT (UTC+8)">Asia Pacific • Singapore (SGT)</option>
                      <option value="JST (UTC+9)">Asia East • Tokyo (JST)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Project Goals & Vision (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about the key problems you are solving, target audience, or current platform blockers..."
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Strict NDA guaranteed. No spam. 4-hour response time.</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry & Request Proposal</span>
                </button>
              </div>
            </form>
          ) : (
            /* Success confirmation screen */
            <div className="py-6 space-y-6 text-center max-w-xl mx-auto animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-heading font-bold text-slate-900">
                  Inquiry Received & Logged!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Thank you, <strong>{submittedInquiry?.clientName}</strong>. Our Principal Engineering Architect in the <strong>{submittedInquiry?.preferredTimezone}</strong> region will review your scope and follow up with a tailored preliminary proposal within 4 hours.
                </p>
              </div>

              {/* Inquiry Summary Box */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-left space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-mono text-[11px] text-slate-500">
                    Ref ID: <strong className="text-indigo-700">{submittedInquiry?.id}</strong>
                  </span>
                  <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Priority Queue Active
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Organization</span>
                    <strong>{submittedInquiry?.companyName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Estimated Investment</span>
                    <strong className="text-indigo-600">{submittedInquiry?.estimatedBudget}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Timeline</span>
                    <strong>{submittedInquiry?.timeline}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Work Email</span>
                    <strong>{submittedInquiry?.email}</strong>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleCopySummary}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary Brief'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Return to Agency App
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
