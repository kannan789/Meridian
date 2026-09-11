import React, { useState, useEffect } from 'react';
import { 
  Project, 
  FeedbackPin, 
  FeedbackStatus, 
  FeedbackComment, 
  QuoteInquiry 
} from './types';
import { 
  INITIAL_PROJECTS, 
  INITIAL_FEEDBACK_PINS, 
  GLOBAL_HUBS 
} from './data/agencyData';
import { GlobalTimezonesBar } from './components/GlobalTimezonesBar';
import { Header } from './components/Header';
import { AgencyOperations } from './components/AgencyOperations';
import { ProjectDashboard } from './components/ProjectDashboard';
import { LiveCollaborationCanvas } from './components/LiveCollaborationCanvas';
import { TeamCommsHub } from './components/TeamCommsHub';
import { QuoteCalculatorModal } from './components/QuoteCalculatorModal';
import { DiscoveryCallModal } from './components/DiscoveryCallModal';
import { 
  Globe2, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  PhoneCall, 
  ArrowUpRight 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'collaboration' | 'comms'>('overview');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('proj-aetheria');
  
  // Projects state with local storage fallback
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('meridian_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_PROJECTS;
  });

  // Feedback pins with local storage fallback
  const [feedbackPins, setFeedbackPins] = useState<FeedbackPin[]>(() => {
    const saved = localStorage.getItem('meridian_feedback_pins');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_FEEDBACK_PINS;
  });

  // User inquiries
  const [inquiries, setInquiries] = useState<QuoteInquiry[]>(() => {
    const saved = localStorage.getItem('meridian_inquiries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isDiscoveryModalOpen, setIsDiscoveryModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('meridian_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('meridian_feedback_pins', JSON.stringify(feedbackPins));
  }, [feedbackPins]);

  useEffect(() => {
    localStorage.setItem('meridian_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Show transient toast
  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((current) => (current === msg ? null : current));
    }, 3500);
  };

  // Handlers for feedback
  const handleAddPin = (newPin: FeedbackPin) => {
    setFeedbackPins((prev) => [newPin, ...prev]);

    // Update project feedback count
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === newPin.projectId) {
          return {
            ...proj,
            feedbackCount: {
              ...proj.feedbackCount,
              total: proj.feedbackCount.total + 1,
              open: proj.feedbackCount.open + 1,
            },
          };
        }
        return proj;
      })
    );

    showToast(`Feedback Pin placed: "${newPin.title}"`);
  };

  const handleUpdatePinStatus = (pinId: string, newStatus: FeedbackStatus) => {
    setFeedbackPins((prev) =>
      prev.map((pin) => {
        if (pin.id === pinId) {
          return { ...pin, status: newStatus };
        }
        return pin;
      })
    );

    // Update project stats
    const targetPin = feedbackPins.find((p) => p.id === pinId);
    if (targetPin) {
      const projId = targetPin.projectId;
      setTimeout(() => {
        setProjects((prev) =>
          prev.map((proj) => {
            if (proj.id === projId) {
              const updatedPinsForProj = feedbackPins.map((p) =>
                p.id === pinId ? { ...p, status: newStatus } : p
              );
              const projPins = updatedPinsForProj.filter((p) => p.projectId === projId);
              return {
                ...proj,
                feedbackCount: {
                  total: projPins.length,
                  open: projPins.filter((p) => p.status !== 'resolved').length,
                  resolved: projPins.filter((p) => p.status === 'resolved').length,
                },
              };
            }
            return proj;
          })
        );
      }, 50);
    }

    showToast(`Feedback Pin status changed to ${newStatus}`);
  };

  const handleAddCommentToPin = (pinId: string, comment: FeedbackComment) => {
    setFeedbackPins((prev) =>
      prev.map((pin) => {
        if (pin.id === pinId) {
          return {
            ...pin,
            comments: [...pin.comments, comment],
          };
        }
        return pin;
      })
    );
    showToast(`Reply posted on "${feedbackPins.find((p) => p.id === pinId)?.title}"`);
  };

  const handleSubmitInquiry = (inquiry: QuoteInquiry) => {
    setInquiries((prev) => [inquiry, ...prev]);
    showToast(`Inquiry #${inquiry.id} successfully dispatched to regional architects!`);
  };

  const handleSelectProjectForReview = (projId: string) => {
    setSelectedProjectId(projId);
    setActiveTab('collaboration');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openFeedbackCount = feedbackPins.filter((p) => p.status === 'open').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* 1. Global Timezones Ticker Bar */}
      <GlobalTimezonesBar />

      {/* 2. Primary Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openQuoteModal={() => setIsQuoteModalOpen(true)}
        openDiscoveryModal={() => setIsDiscoveryModalOpen(true)}
        openFeedbackCount={openFeedbackCount}
        activeProjectsCount={projects.length}
      />

      {/* 3. Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{notification}</span>
        </div>
      )}

      {/* 4. Active Inquiries Banner (if user already submitted an inquiry) */}
      {inquiries.length > 0 && activeTab === 'overview' && (
        <div className="bg-indigo-50 border-b border-indigo-200 py-2.5 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-indigo-900">
              <span className="font-bold">Active Inquiry Logged:</span>
              <span>Ref {inquiries[0].id} for {inquiries[0].companyName}</span>
              <span className="text-indigo-600 font-mono">({inquiries[0].estimatedBudget})</span>
            </div>
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 underline cursor-pointer"
            >
              View Scope Details &rarr;
            </button>
          </div>
        </div>
      )}

      {/* 5. Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <AgencyOperations
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
            onOpenLiveCanvas={() => setActiveTab('collaboration')}
            onViewProjects={() => setActiveTab('projects')}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectDashboard
            projects={projects}
            onSelectProjectForReview={handleSelectProjectForReview}
            onRequestQuote={() => setIsQuoteModalOpen(true)}
          />
        )}

        {activeTab === 'collaboration' && (
          <LiveCollaborationCanvas
            projects={projects}
            selectedProjectId={selectedProjectId}
            onSelectProject={setSelectedProjectId}
            feedbackPins={feedbackPins}
            onAddPin={handleAddPin}
            onUpdatePinStatus={handleUpdatePinStatus}
            onAddCommentToPin={handleAddCommentToPin}
            onRequestQuote={() => setIsQuoteModalOpen(true)}
          />
        )}

        {activeTab === 'comms' && (
          <TeamCommsHub
            projects={projects}
            onRequestQuote={() => setIsQuoteModalOpen(true)}
          />
        )}
      </main>

      {/* 6. Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-slate-950 ring-1 ring-slate-700">
                  <img 
                    src="/favicon.svg" 
                    alt="Meridian Project Logo" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-heading font-bold text-base text-white tracking-tight">MERIDIAN</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Global remote digital web agency. Continuous 24/7 engineering, real-time client feedback canvases, and high-impact web software for worldwide enterprises.
              </p>
              <div className="pt-1 flex items-center gap-2 text-emerald-400 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Follow-the-Sun Operations Active
              </div>
            </div>

            <div>
              <div className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
                Global Remote Hubs
              </div>
              <ul className="space-y-1.5 text-xs">
                {GLOBAL_HUBS.map((hub) => (
                  <li key={hub.city} className="flex items-center justify-between text-slate-300">
                    <span>{hub.city}, {hub.country}</span>
                    <span className="text-[10px] font-mono text-slate-500">{hub.timezoneName}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
                Live Agency Systems
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="hover:text-white transition-colors"
                  >
                    Active Project Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('collaboration')}
                    className="hover:text-white transition-colors"
                  >
                    Live Canvas & Pin-point Feedback
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('comms')}
                    className="hover:text-white transition-colors"
                  >
                    Team & Client Comms Hub
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
                  >
                    Interactive Scope Calculator
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-bold text-white uppercase tracking-wider text-[11px]">
                Start an Engagement
              </div>
              <p className="text-xs text-slate-400">
                Have an ambitious web application or digital platform project? Speak directly with our regional leads.
              </p>
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Request Custom Quote</span>
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © {new Date().getFullYear()} Meridian Digital Agency Inc. All rights reserved. SOC2 & GDPR Compliant.
            </div>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Client Security SLA</span>
              <span>•</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Quote Calculator & Project Inquiry Modal */}
      <QuoteCalculatorModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        onSubmitInquiry={handleSubmitInquiry}
      />

      {/* Fast Discovery Call Modal */}
      <DiscoveryCallModal
        isOpen={isDiscoveryModalOpen}
        onClose={() => setIsDiscoveryModalOpen(false)}
      />
    </div>
  );
}
