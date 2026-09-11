import React, { useState } from 'react';
import { 
  Project, 
  ProjectStatus 
} from '../types';
import { 
  CheckCircle2, 
  Clock, 
  Layers, 
  ExternalLink, 
  MessageSquare, 
  ArrowRight, 
  Filter, 
  Search, 
  TrendingUp, 
  AlertCircle, 
  Calendar, 
  DollarSign, 
  Globe, 
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Code2
} from 'lucide-react';

interface ProjectDashboardProps {
  projects: Project[];
  onSelectProjectForReview: (projectId: string) => void;
  onRequestQuote: () => void;
}

export const ProjectDashboard: React.FC<ProjectDashboardProps> = ({
  projects,
  onSelectProjectForReview,
  onRequestQuote,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [detailProject, setDetailProject] = useState<Project | null>(null);

  // Status pills configuration
  const statusLabels: Record<ProjectStatus, { label: string; color: string; dot: string }> = {
    planning: { label: 'Sprint Planning', color: 'bg-slate-100 text-slate-700 border-slate-300', dot: 'bg-slate-400' },
    in_progress: { label: 'Active Sprint', color: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
    client_review: { label: 'Client Feedback Needed', color: 'bg-amber-50 text-amber-800 border-amber-300', dot: 'bg-amber-500' },
    qa_testing: { label: 'Staging & QA', color: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-500' },
    shipped: { label: 'Production Shipped', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  };

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = selectedFilter === 'all' ? true : p.status === selectedFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.clientCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.industry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalOpenFeedback = projects.reduce((acc, p) => acc + p.feedbackCount.open, 0);

  return (
    <div id="project-dashboard-section" className="space-y-8">
      {/* Top Banner & Motivation */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden border border-slate-800">
        <div className="absolute right-0 top-0 bottom-0 w-96 opacity-10 pointer-events-none flex items-center justify-center">
          <Globe className="w-80 h-80 text-white" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Transparent Worldwide Delivery
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight text-white">
            Client Project Dashboard & Live Operations
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Track active multi-timezone sprints, staging environments, real-time client feedback items, and release milestones. Every project is backed by our distributed follow-the-sun engineering SLA.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onRequestQuote}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <span>Have a Project in Mind? Get Custom Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 pl-2">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Guaranteed 4-hour response across all worldwide timezones
            </div>
          </div>
        </div>

        {/* Quick KPI stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-700/60 text-xs">
          <div>
            <div className="text-slate-400 font-medium">Active Worldwide Projects</div>
            <div className="text-xl font-bold font-heading text-white mt-1">4 High-Impact</div>
            <div className="text-emerald-400 text-[11px] mt-0.5">100% on delivery schedule</div>
          </div>
          <div>
            <div className="text-slate-400 font-medium">Real-Time Open Feedback</div>
            <div className="text-xl font-bold font-heading text-amber-300 mt-1">{totalOpenFeedback} Action Items</div>
            <div className="text-slate-400 text-[11px] mt-0.5">Tracked on Live Canvas</div>
          </div>
          <div>
            <div className="text-slate-400 font-medium">Engineering Velocity</div>
            <div className="text-xl font-bold font-heading text-white mt-1">98.8%</div>
            <div className="text-slate-400 text-[11px] mt-0.5">Milestone SLA adherence</div>
          </div>
          <div>
            <div className="text-slate-400 font-medium">Global Timezone Coverage</div>
            <div className="text-xl font-bold font-heading text-indigo-300 mt-1">24 Hours / Day</div>
            <div className="text-slate-400 text-[11px] mt-0.5">SF, London, Zurich, Tokyo</div>
          </div>
        </div>
      </div>

      {/* Control Toolbar: Search & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by project, client, or country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs text-slate-600 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Status:
          </span>
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'client_review', label: 'Feedback Needed' },
            { id: 'in_progress', label: 'In Progress' },
            { id: 'qa_testing', label: 'QA & Staging' },
            { id: 'planning', label: 'Planning' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => {
          const statusCfg = statusLabels[project.status];
          const nextPendingMilestone = project.milestones.find((m) => !m.completed);

          return (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 space-y-5">
                {/* Header: Client info & Status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center font-heading font-bold text-indigo-700 text-sm shrink-0">
                      {project.clientLogoText}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 text-sm">
                          {project.clientName}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                          {project.clientCountry}
                        </span>
                      </div>
                      <h2 className="font-heading font-bold text-base text-slate-900 mt-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {project.title}
                      </h2>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border shrink-0 ${statusCfg.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                    {statusCfg.label}
                  </span>
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {project.summary}
                </p>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">Sprint Completion</span>
                    <span className="font-bold text-slate-900">{project.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${project.progressPercent}%` }}
                    />
                  </div>
                  {nextPendingMilestone && (
                    <div className="flex items-center justify-between text-[11px] text-slate-700 pt-0.5">
                      <span className="truncate">Upcoming: {nextPendingMilestone.title}</span>
                      <span className="shrink-0 font-mono text-slate-700">Target: {nextPendingMilestone.dueDate}</span>
                    </div>
                  )}
                </div>

                {/* Meta details: Team & Feedback */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  {/* Distributed Team */}
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2 overflow-hidden">
                      {project.assignedTeam.map((member) => (
                        <img
                          key={member.id}
                          src={member.avatar}
                          alt={member.name}
                          title={`${member.name} (${member.role} • ${member.location})`}
                          className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-700">
                      {project.assignedTeam.length} remote specialists
                    </span>
                  </div>

                  {/* Feedback Status */}
                  <div className="flex items-center gap-2">
                    {project.feedbackCount.open > 0 ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <MessageSquare className="w-3 h-3 text-amber-600" />
                        {project.feedbackCount.open} Open Feedback Items
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        All Feedback Resolved
                      </span>
                    )}
                  </div>
                </div>

                {/* Tech Stack tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.stackTags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.stackTags.length > 4 && (
                    <span className="px-1.5 py-0.5 text-slate-700 text-[11px]">
                      +{project.stackTags.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between gap-3">
                <button
                  onClick={() => setDetailProject(project)}
                  className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                >
                  View Details & Milestones
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onSelectProjectForReview(project.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 shadow-2xs transition-colors cursor-pointer"
                >
                  <span>Open Live Review Canvas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200 text-slate-500">
          <p className="text-sm font-medium">No projects found matching your search filter.</p>
          <button
            onClick={() => {
              setSelectedFilter('all');
              setSearchQuery('');
            }}
            className="mt-3 text-xs text-indigo-600 font-semibold hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Project Details Modal */}
      {detailProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-semibold text-indigo-600 tracking-wide uppercase">
                  {detailProject.clientName} • {detailProject.clientCountry}
                </span>
                <h2 className="text-xl font-heading font-bold text-slate-900 mt-1">
                  {detailProject.title}
                </h2>
                <p className="text-xs text-slate-600 mt-1">{detailProject.summary}</p>
              </div>
              <button
                onClick={() => setDetailProject(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Milestones Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Sprint Milestones & SLA Timeline
              </h4>
              <div className="space-y-2">
                {detailProject.milestones.map((m) => (
                  <div
                    key={m.id}
                    className={`flex items-center justify-between p-3 rounded-lg border text-xs ${
                      m.completed
                        ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {m.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                      <span className={m.completed ? 'line-through text-slate-500' : 'font-semibold'}>
                        {m.title}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-medium text-slate-500 shrink-0">
                      {m.completed ? 'Delivered & Accepted' : `Target: ${m.dueDate}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables & Preview Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Staging Environments & Deliverables
              </h4>
              <div className="space-y-2">
                {detailProject.deliverables.map((del) => (
                  <div
                    key={del.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">{del.title}</div>
                      <div className="text-[11px] text-slate-500">
                        {del.version} • Updated {del.lastUpdated}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setDetailProject(null);
                          onSelectProjectForReview(detailProject.id);
                        }}
                        className="px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-100 text-[11px]"
                      >
                        Inspect on Canvas
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Pod Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Assigned Follow-the-Sun Team Pod
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {detailProject.assignedTeam.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-200 bg-slate-50"
                  >
                    <img
                      src={m.avatar}
                      alt={m.name}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-300"
                    />
                    <div className="text-xs">
                      <div className="font-semibold text-slate-900">{m.name}</div>
                      <div className="text-slate-500 text-[11px]">{m.role}</div>
                      <div className="text-indigo-600 text-[10px] font-mono">
                        {m.location} ({m.timezone.split('/')[1]})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Budget allocated: <strong className="text-slate-800">{detailProject.budgetFormatted}</strong> ({detailProject.spentFormatted} used)
              </div>
              <button
                onClick={() => {
                  setDetailProject(null);
                  onSelectProjectForReview(detailProject.id);
                }}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
              >
                Go to Review Canvas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
