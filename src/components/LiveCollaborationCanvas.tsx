import React, { useState, useRef } from 'react';
import { 
  Project, 
  FeedbackPin, 
  FeedbackCategory, 
  FeedbackStatus,
  FeedbackComment
} from '../types';
import { 
  MessageSquare, 
  Pin, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Send, 
  User, 
  Sparkles, 
  Eye, 
  Check, 
  SlidersHorizontal,
  Layers,
  AlertTriangle,
  RotateCcw,
  Zap,
  Globe2,
  ExternalLink
} from 'lucide-react';

interface LiveCollaborationCanvasProps {
  projects: Project[];
  selectedProjectId: string;
  onSelectProject: (projectId: string) => void;
  feedbackPins: FeedbackPin[];
  onAddPin: (pin: FeedbackPin) => void;
  onUpdatePinStatus: (pinId: string, status: FeedbackStatus) => void;
  onAddCommentToPin: (pinId: string, comment: FeedbackComment) => void;
  onRequestQuote: () => void;
}

export const LiveCollaborationCanvas: React.FC<LiveCollaborationCanvasProps> = ({
  projects,
  selectedProjectId,
  onSelectProject,
  feedbackPins,
  onAddPin,
  onUpdatePinStatus,
  onAddCommentToPin,
  onRequestQuote,
}) => {
  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];
  const projectPins = feedbackPins.filter((p) => p.projectId === currentProject.id);

  const [activePinId, setActivePinId] = useState<string | null>(projectPins[0]?.id || null);
  const [isPlacingPin, setIsPlacingPin] = useState<boolean>(false);
  const [newPinCoord, setNewPinCoord] = useState<{ x: number; y: number } | null>(null);
  
  // New pin form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<FeedbackCategory>('design');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newCommentText, setNewCommentText] = useState('');
  const [newAuthorRole, setNewAuthorRole] = useState<'client' | 'agency'>('client');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Thread reply text
  const [replyText, setReplyText] = useState('');

  // Canvas element reference
  const canvasRef = useRef<HTMLDivElement>(null);

  // Active pin object
  const activePin = projectPins.find((p) => p.id === activePinId);

  // Handle canvas click to place pin
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPlacingPin || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setNewPinCoord({
      x: Math.min(Math.max(x, 4), 96),
      y: Math.min(Math.max(y, 4), 96),
    });
  };

  const handleCreatePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPinCoord || !newTitle.trim() || !newCommentText.trim()) return;

    const createdPin: FeedbackPin = {
      id: `pin-${Date.now()}`,
      projectId: currentProject.id,
      xPercent: Math.round(newPinCoord.x),
      yPercent: Math.round(newPinCoord.y),
      title: newTitle.trim(),
      category: newCategory,
      priority: newPriority,
      status: 'open',
      authorName: newAuthorRole === 'client' ? 'Client Stakeholder' : 'Meridian Lead Designer',
      authorRole: newAuthorRole,
      createdAt: 'Just now',
      comments: [
        {
          id: `c-${Date.now()}`,
          authorName: newAuthorRole === 'client' ? 'Client Stakeholder' : 'Meridian Lead Designer',
          authorRole: newAuthorRole === 'client' ? 'client' : 'designer',
          authorAvatar: newAuthorRole === 'client' 
            ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
            : currentProject.assignedTeam[0]?.avatar || '',
          timestamp: 'Just now',
          content: newCommentText.trim(),
        },
      ],
    };

    onAddPin(createdPin);
    setActivePinId(createdPin.id);
    setNewPinCoord(null);
    setIsPlacingPin(false);
    setNewTitle('');
    setNewCommentText('');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePinId || !replyText.trim()) return;

    const comment: FeedbackComment = {
      id: `c-${Date.now()}`,
      authorName: 'Elena Rostova (Meridian Design Lead)',
      authorRole: 'designer',
      authorAvatar: currentProject.assignedTeam[0]?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      timestamp: 'Just now',
      content: replyText.trim(),
    };

    onAddCommentToPin(activePinId, comment);
    setReplyText('');
  };

  // Simulate real-time client feedback addition
  const handleSimulateIncomingFeedback = () => {
    const randomX = Math.floor(Math.random() * 60) + 20;
    const randomY = Math.floor(Math.random() * 50) + 20;
    const sampleFeedbacks = [
      {
        title: 'Refine micro-copy for European privacy consent modal',
        category: 'copy' as FeedbackCategory,
        content: 'Our Zurich legal team confirmed that the cookie banner needs a one-click "Essential Only" button beside "Accept All".',
        author: 'Dr. Henriette Von Berg (Zurich Hub)',
      },
      {
        title: 'Verify real-time streaming graph latency on Safari',
        category: 'functionality' as FeedbackCategory,
        content: 'Data telemetry looks smooth on Chrome! Please confirm web worker fallback on Safari 17.4.',
        author: 'Alexander Sterling (London Hub)',
      },
      {
        title: 'Contrast check on secondary metadata labels',
        category: 'design' as FeedbackCategory,
        content: 'Can we darken the secondary gray text to #475569 for high-contrast sunlight readability?',
        author: 'Taro Morimoto (Tokyo Hub)',
      },
    ];

    const randomPick = sampleFeedbacks[Math.floor(Math.random() * sampleFeedbacks.length)];
    const simulatedPin: FeedbackPin = {
      id: `pin-sim-${Date.now()}`,
      projectId: currentProject.id,
      xPercent: randomX,
      yPercent: randomY,
      title: randomPick.title,
      category: randomPick.category,
      priority: 'high',
      status: 'open',
      authorName: randomPick.author,
      authorRole: 'client',
      createdAt: 'Just now (Live)',
      comments: [
        {
          id: `c-sim-${Date.now()}`,
          authorName: randomPick.author,
          authorRole: 'client',
          authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          timestamp: 'Just now',
          content: randomPick.content,
        },
      ],
    };

    onAddPin(simulatedPin);
    setActivePinId(simulatedPin.id);
  };

  const filteredPins = projectPins.filter((p) => {
    const matchesCat = filterCategory === 'all' ? true : p.category === filterCategory;
    const matchesStatus = filterStatus === 'all' ? true : p.status === filterStatus;
    return matchesCat && matchesStatus;
  });

  const categoryBadges: Record<FeedbackCategory, { label: string; color: string; bg: string }> = {
    design: { label: 'Design & UX', color: 'text-purple-700 border-purple-200', bg: 'bg-purple-50' },
    copy: { label: 'Copy & Content', color: 'text-amber-700 border-amber-200', bg: 'bg-amber-50' },
    functionality: { label: 'Tech & Code', color: 'text-emerald-700 border-emerald-200', bg: 'bg-emerald-50' },
    scope_question: { label: 'Scope & SLA', color: 'text-blue-700 border-blue-200', bg: 'bg-blue-50' },
  };

  return (
    <div id="live-collaboration-workspace" className="space-y-6">
      {/* Top Controls: Project Switcher & Actions */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Left: Project Selector */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
              Live Deliverable Review Canvas
            </div>
            <div className="flex items-center gap-2">
              <select
                id="select-project-canvas"
                value={selectedProjectId}
                onChange={(e) => onSelectProject(e.target.value)}
                className="font-heading font-bold text-slate-900 text-sm sm:text-base bg-transparent border-0 focus:ring-0 cursor-pointer p-0 pr-6 hover:text-indigo-600 transition-colors"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.clientName} — {p.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Center: Live Presence Indicators */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-800">4 Active Collaborators:</span>
          <div className="flex -space-x-1.5">
            {currentProject.assignedTeam.map((m) => (
              <img
                key={m.id}
                src={m.avatar}
                alt={m.name}
                title={`${m.name} (${m.role} • ${m.location})`}
                className="w-6 h-6 rounded-full ring-2 ring-white object-cover"
              />
            ))}
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
              You
            </span>
          </div>
        </div>

        {/* Right: Tools & Simulate live feedback */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            id="btn-toggle-pin-mode"
            onClick={() => {
              setIsPlacingPin(!isPlacingPin);
              setNewPinCoord(null);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              isPlacingPin
                ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-300 animate-pulse'
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
            }`}
          >
            <Pin className="w-3.5 h-3.5" />
            <span>{isPlacingPin ? 'Click Canvas to Place Pin' : 'Drop Feedback Pin'}</span>
          </button>

          <button
            id="btn-simulate-live-feedback"
            onClick={handleSimulateIncomingFeedback}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            title="Simulate incoming real-time client feedback comment"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Simulate Client Comment</span>
          </button>
        </div>
      </div>

      {/* Main Review Workspace: Canvas on Left/Center, Thread Panel on Right */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Deliverable Mockup Canvas */}
        <div className="xl:col-span-8 space-y-3">
          {/* Canvas Toolbar */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                <Eye className="w-3.5 h-3.5 text-indigo-500" />
                Deliverable: {currentProject.deliverables[0]?.title || 'Staging Interface'}
              </span>
              <span className="text-slate-400">({currentProject.deliverables[0]?.version})</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-slate-500">
                Click any numbered pin to inspect thread
              </span>
            </div>
          </div>

          {/* Interactive Screen Container */}
          <div
            ref={canvasRef}
            onClick={handleCanvasClick}
            className={`relative rounded-xl border border-slate-300 bg-slate-900 shadow-md overflow-hidden transition-all ${
              isPlacingPin ? 'cursor-crosshair ring-2 ring-amber-400' : 'cursor-default'
            }`}
            style={{ minHeight: '520px' }}
          >
            {/* Visual Staging Header */}
            <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="ml-2 font-mono text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                  https://staging.{currentProject.clientName.toLowerCase().replace(/\s+/g, '')}.internal/v2.4
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  ● Staging v2.4 Live
                </span>
              </div>
            </div>

            {/* Realistic Deliverable Content View (The Website/App Preview) */}
            <div className="p-6 sm:p-8 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100 select-none space-y-6">
              {/* Preview Navigation */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                    {currentProject.clientLogoText}
                  </div>
                  <span className="font-heading font-bold text-sm text-white">
                    {currentProject.clientName}
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-xs text-slate-400">
                  <span>Solutions</span>
                  <span>Research Data</span>
                  <span>API Platform</span>
                  <span>Compliance</span>
                </div>
                <div className="px-3 py-1 rounded bg-indigo-600 text-white text-xs font-semibold">
                  Access Portal
                </div>
              </div>

              {/* Preview Hero */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center py-4">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 text-[11px]">
                    <Sparkles className="w-3 h-3" />
                    Next-Gen Biomedical Intelligence
                  </div>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white leading-tight">
                    Accelerating Discovery Through Global Edge Data Pipelines
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Unifying clinical trials, molecular biomarkers, and compliant genomic registries with sub-second retrieval across 38 research institutions.
                  </p>
                  <div className="flex gap-2 pt-1">
                    <div className="px-3 py-1.5 rounded bg-indigo-600 text-white text-xs font-bold">
                      Explore Trial Protocols
                    </div>
                    <div className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                      View Biomarker Docs
                    </div>
                  </div>
                </div>

                {/* Simulated Telemetry / Interactive Canvas Graphic */}
                <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-semibold">Real-time Molecular Telemetry</span>
                    <span className="text-emerald-400 text-[11px]">99.98% Fidelity</span>
                  </div>
                  {/* Visual wave/graph */}
                  <div className="h-28 rounded-lg bg-slate-900/90 border border-slate-800 p-2 relative flex items-end justify-between gap-1 overflow-hidden">
                    {[40, 65, 30, 85, 95, 75, 55, 90, 60, 70, 85, 45, 95, 80].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-indigo-600 to-teal-400 rounded-t-xs transition-all duration-300"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-400 pt-1">
                    <div>
                      <span className="text-slate-500 block">Latency</span>
                      <strong className="text-slate-200">14ms</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Nodes Active</span>
                      <strong className="text-slate-200">128 Global</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">WCAG Contrast</span>
                      <strong className="text-emerald-400">8.4:1 Pass</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Feature Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/60 text-xs">
                  <span className="text-indigo-400 font-semibold block mb-1">01. Protocol Registry</span>
                  <p className="text-[11px] text-slate-400">Automated synchronization with FDA & EMA submission formats.</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/60 text-xs">
                  <span className="text-teal-400 font-semibold block mb-1">02. WebGL 3D Viewer</span>
                  <p className="text-[11px] text-slate-400">Draco-compressed molecular structures rendered at 60 FPS.</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/60 text-xs">
                  <span className="text-purple-400 font-semibold block mb-1">03. Audit Logging</span>
                  <p className="text-[11px] text-slate-400">End-to-end cryptographic verification of all research queries.</p>
                </div>
              </div>
            </div>

            {/* Placed Feedback Pins on Canvas */}
            {projectPins.map((pin, index) => {
              const isResolved = pin.status === 'resolved';
              const isSelected = pin.id === activePinId;

              return (
                <button
                  key={pin.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePinId(pin.id);
                  }}
                  style={{ left: `${pin.xPercent}%`, top: `${pin.yPercent}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer focus:outline-none transition-transform ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                  title={`${pin.title} (${pin.status})`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-lg ring-2 ring-white transition-all ${
                      isResolved
                        ? 'bg-emerald-500 text-white'
                        : isSelected
                        ? 'bg-amber-400 text-slate-900 ring-amber-200'
                        : pin.category === 'design'
                        ? 'bg-purple-600 text-white'
                        : pin.category === 'copy'
                        ? 'bg-amber-600 text-white'
                        : 'bg-indigo-600 text-white'
                    }`}
                  >
                    {isResolved ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>

                  {/* Tooltip on hover */}
                  <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-lg bg-slate-950 text-white text-[11px] shadow-xl border border-slate-800 pointer-events-none z-40">
                    <div className="font-semibold text-amber-300 line-clamp-1">{pin.title}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      By {pin.authorName} • {pin.comments.length} comments
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Active New Pin Creation Popover */}
            {newPinCoord && (
              <div
                style={{ left: `${newPinCoord.x}%`, top: `${newPinCoord.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-40 w-72 bg-white rounded-xl shadow-2xl border border-slate-300 p-4 text-slate-900 text-xs space-y-3 animate-in fade-in zoom-in-95"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold flex items-center gap-1 text-slate-900">
                    <Pin className="w-3.5 h-3.5 text-indigo-600" />
                    New Feedback Pin
                  </span>
                  <button
                    onClick={() => setNewPinCoord(null)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleCreatePinSubmit} className="space-y-2.5">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-0.5">
                      Issue / Revision Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Clarify CTA button label..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-medium text-slate-600 mb-0.5">
                        Category
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as FeedbackCategory)}
                        className="w-full px-2 py-1 rounded border border-slate-200 text-xs"
                      >
                        <option value="design">Design & UX</option>
                        <option value="copy">Copy & Content</option>
                        <option value="functionality">Technical / Code</option>
                        <option value="scope_question">Scope & SLA</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-medium text-slate-600 mb-0.5">
                        Priority
                      </label>
                      <select
                        value={newPriority}
                        onChange={(e) => setNewPriority(e.target.value as 'low' | 'medium' | 'high')}
                        className="w-full px-2 py-1 rounded border border-slate-200 text-xs"
                      >
                        <option value="high">High / Urgent</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low Polish</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-0.5">
                      Feedback Description
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Specify your revision request clearly for the remote pod..."
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-md border border-slate-200 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-600">Coordinate: {Math.round(newPinCoord.x)}%, {Math.round(newPinCoord.y)}%</span>
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
                    >
                      Post Pin
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Feedback Thread & Status Panel */}
        <div className="xl:col-span-4 space-y-4">
          {/* Pins Filter & Quick Switcher */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                Feedback Items ({filteredPins.length})
              </h3>
              <div className="text-xs text-slate-700">
                {projectPins.filter((p) => p.status === 'resolved').length}/{projectPins.length} Resolved
              </div>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer ${
                  filterStatus === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('open')}
                className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer ${
                  filterStatus === 'open' ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Open ({projectPins.filter((p) => p.status === 'open').length})
              </button>
              <button
                onClick={() => setFilterStatus('resolved')}
                className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer ${
                  filterStatus === 'resolved' ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Resolved ({projectPins.filter((p) => p.status === 'resolved').length})
              </button>
            </div>

            {/* Mini list of pins for quick click */}
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {filteredPins.map((pin, i) => (
                <button
                  key={pin.id}
                  onClick={() => setActivePinId(pin.id)}
                  className={`w-full text-left p-2 rounded-lg border text-xs flex items-center justify-between transition-colors ${
                    pin.id === activePinId
                      ? 'bg-indigo-50/80 border-indigo-300 text-slate-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
                      pin.status === 'resolved' ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white'
                    }`}>
                      {i + 1}
                    </span>
                    <span className="truncate font-medium">{pin.title}</span>
                  </div>
                  <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded shrink-0 ${
                    pin.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {pin.status}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Pin Detailed Thread View */}
          {activePin ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
              {/* Pin Header & Category */}
              <div className="space-y-2 border-b border-slate-100 pb-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${categoryBadges[activePin.category].bg} ${categoryBadges[activePin.category].color}`}>
                    {categoryBadges[activePin.category].label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400">Status:</span>
                    <select
                      value={activePin.status}
                      onChange={(e) => onUpdatePinStatus(activePin.id, e.target.value as FeedbackStatus)}
                      className="text-xs font-bold px-2 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800 cursor-pointer"
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved ✓</option>
                    </select>
                  </div>
                </div>

                <h4 className="font-heading font-bold text-sm text-slate-900">
                  {activePin.title}
                </h4>

                <div className="text-[11px] text-slate-500 flex items-center gap-2">
                  <span>Author: <strong>{activePin.authorName}</strong></span>
                  <span>•</span>
                  <span>{activePin.createdAt}</span>
                </div>
              </div>

              {/* Thread Messages */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {activePin.comments.map((comment) => {
                  const isAgency = comment.authorRole === 'designer' || comment.authorRole === 'engineer' || comment.authorRole === 'agency_lead';

                  return (
                    <div
                      key={comment.id}
                      className={`p-3 rounded-lg text-xs space-y-1.5 ${
                        isAgency ? 'bg-indigo-50/70 border border-indigo-100' : 'bg-slate-50 border border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={comment.authorAvatar}
                            alt={comment.authorName}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span className="font-bold text-slate-900">{comment.authorName}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">{comment.timestamp}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed pl-7">
                        {comment.content}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="pt-2 border-t border-slate-100 space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Type reply as Meridian Lead Designer..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center cursor-pointer shadow-2xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Synced in real-time to client Slack/Figma</span>
                  {activePin.status !== 'resolved' && (
                    <button
                      type="button"
                      onClick={() => onUpdatePinStatus(activePin.id, 'resolved')}
                      className="text-emerald-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3 h-3" /> Mark as Resolved
                    </button>
                  )}
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400 text-xs">
              Select or place a feedback pin on the canvas to inspect discussion.
            </div>
          )}

          {/* Quick Inquiry Push */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white space-y-2 shadow-sm border border-indigo-800">
            <div className="text-xs font-bold flex items-center gap-1.5 text-indigo-300">
              <Sparkles className="w-3.5 h-3.5" />
              Impressed by the live workflow?
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Every client gets dedicated canvas channels, zero-lag feedback loops, and 24/7 delivery pods.
            </p>
            <button
              onClick={onRequestQuote}
              className="w-full py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs transition-colors cursor-pointer text-center"
            >
              Get Custom Quote for Your Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
