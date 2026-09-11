import React from 'react';
import { Monitor, MessageSquare, Compass, ArrowUpRight, Sparkles, PhoneCall } from 'lucide-react';

interface HeaderProps {
  activeTab: 'overview' | 'projects' | 'collaboration' | 'comms';
  setActiveTab: (tab: 'overview' | 'projects' | 'collaboration' | 'comms') => void;
  openQuoteModal: () => void;
  openDiscoveryModal: () => void;
  openFeedbackCount: number;
  activeProjectsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  openQuoteModal,
  openDiscoveryModal,
  openFeedbackCount,
  activeProjectsCount,
}) => {
  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('overview')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl overflow-hidden shadow-xs ring-1 ring-slate-900/10 group-hover:scale-105 transition-transform shrink-0 flex items-center justify-center bg-slate-900">
                <img 
                  src={`${import.meta.env.BASE_URL}favicon.svg`} 
                  alt="Meridian Project Logo" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-bold text-lg tracking-tight text-slate-900">
                    MERIDIAN
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Global Web Agency
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 hidden sm:block">
                  Remote Engineering & Digital Products
                </p>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80">
            <button
              id="nav-overview"
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Agency Overview
            </button>

            <button
              id="nav-projects"
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'projects'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              Project Dashboard
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">
                {activeProjectsCount}
              </span>
            </button>

            <button
              id="nav-collaboration"
              onClick={() => setActiveTab('collaboration')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'collaboration'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
              Live Canvas & Feedback
              {openFeedbackCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  {openFeedbackCount} open
                </span>
              )}
            </button>

            <button
              id="nav-comms"
              onClick={() => setActiveTab('comms')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'comms'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Team & Client Comms
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              id="btn-book-call"
              onClick={openDiscoveryModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-slate-500" />
              Intro Call
            </button>

            <button
              id="btn-request-quote-header"
              onClick={openQuoteModal}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-xs shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
              <span>Get Custom Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-between border-t border-slate-100 py-2 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap font-medium ${
              activeTab === 'overview' ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap font-medium ${
              activeTab === 'projects' ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            Projects ({activeProjectsCount})
          </button>
          <button
            onClick={() => setActiveTab('collaboration')}
            className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap font-medium ${
              activeTab === 'collaboration' ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            Live Feedback ({openFeedbackCount})
          </button>
          <button
            onClick={() => setActiveTab('comms')}
            className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap font-medium ${
              activeTab === 'comms' ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            Comms
          </button>
        </div>
      </div>
    </header>
  );
};
