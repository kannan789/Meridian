import React, { useState } from 'react';
import { Project, TeamMember } from '../types';
import { 
  Send, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Bot, 
  Hash, 
  Users, 
  Globe2, 
  Pin,
  Paperclip,
  Smile,
  ArrowRight
} from 'lucide-react';

interface CommsMessage {
  id: string;
  channel: string;
  senderName: string;
  senderRole: string;
  senderAvatar: string;
  senderLocation: string;
  isClient: boolean;
  content: string;
  timestamp: string;
  reactions?: { emoji: string; count: number }[];
}

interface TeamCommsHubProps {
  projects: Project[];
  onRequestQuote: () => void;
}

export const TeamCommsHub: React.FC<TeamCommsHubProps> = ({ projects, onRequestQuote }) => {
  const [activeChannel, setActiveChannel] = useState<string>('aetheria-clinical');
  const [newMessageText, setNewMessageText] = useState<string>('');

  const [messages, setMessages] = useState<CommsMessage[]>([
    {
      id: 'm-1',
      channel: 'aetheria-clinical',
      senderName: 'Dr. Martin Weber',
      senderRole: 'Chief Medical Officer (Client)',
      senderAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
      senderLocation: 'Basel, Switzerland (UTC+2)',
      isClient: true,
      content: 'Good morning team! We just reviewed Staging Release 0.9.4 with our European clinical advisory board. The molecular visualizer response is remarkably fast.',
      timestamp: 'Today, 08:30 CEST',
      reactions: [{ emoji: '🚀', count: 4 }, { emoji: '🙌', count: 3 }],
    },
    {
      id: 'm-2',
      channel: 'aetheria-clinical',
      senderName: 'Elena Rostova',
      senderRole: 'Principal Design Lead (Meridian)',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      senderLocation: 'London Hub (UTC+1)',
      isClient: false,
      content: 'Wonderful to hear Martin! We also resolved Pin #2 on the live canvas regarding WCAG AAA color contrast for the data telemetry charts.',
      timestamp: 'Today, 08:42 BST',
      reactions: [{ emoji: '✨', count: 2 }],
    },
    {
      id: 'm-3',
      channel: 'aetheria-clinical',
      senderName: 'Marcus Chen',
      senderRole: 'Head of Engineering (Meridian)',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      senderLocation: 'San Francisco Hub (UTC-7)',
      isClient: false,
      content: 'Our US pod just pushed the Edge cache invalidation rule to AWS Europe West. End-to-end latency for genomic dataset queries is now hovering under 18ms.',
      timestamp: 'Today, 09:05 BST',
      reactions: [{ emoji: '⚡', count: 5 }],
    },
    {
      id: 'm-4',
      channel: 'finova-treasury',
      senderName: 'Alexander Sterling',
      senderRole: 'Managing Director (Client)',
      senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      senderLocation: 'London, UK (UTC+1)',
      isClient: true,
      content: 'Are we still on track for the WebSocket FX latency benchmark review with our compliance officers this Thursday?',
      timestamp: 'Yesterday, 16:15 BST',
      reactions: [{ emoji: '👍', count: 2 }],
    },
    {
      id: 'm-5',
      channel: 'finova-treasury',
      senderName: 'Aisha Al-Mansoor',
      senderRole: 'Senior Product Strategist (Meridian)',
      senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      senderLocation: 'Singapore Hub (UTC+8)',
      isClient: false,
      content: 'Confirmed Alexander! The Singapore team just finalized the load-test harness running 50,000 simulated ticks/second. We will present the telemetry at 14:00 BST.',
      timestamp: 'Today, 06:10 SGT',
      reactions: [{ emoji: '🎯', count: 3 }],
    },
  ]);

  const currentChannelMessages = messages.filter((m) => m.channel === activeChannel);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const userMessage: CommsMessage = {
      id: `msg-${Date.now()}`,
      channel: activeChannel,
      senderName: 'You (Client Stakeholder)',
      senderRole: 'Client Representative',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      senderLocation: 'Current Timezone',
      isClient: true,
      content: newMessageText.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessageText('');

    // Simulate instant automated agency team sync response
    setTimeout(() => {
      const agencyReply: CommsMessage = {
        id: `msg-reply-${Date.now()}`,
        channel: activeChannel,
        senderName: 'Meridian Client Bot & Dispatch',
        senderRole: 'Automated SLA Dispatch',
        senderAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        senderLocation: 'Follow-The-Sun Dispatch',
        isClient: false,
        content: `Acknowledged! Your inquiry was dispatched to the active London and Zurich engineering leads. Guaranteed response within 15 minutes.`,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, agencyReply]);
    }, 1200);
  };

  return (
    <div id="team-comms-hub" className="space-y-6">
      {/* Intro Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-heading font-bold text-lg text-slate-900">
              Live Team Communication & Client Feedback Stream
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              ● Connected to Enterprise Slack & Live Canvas
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Real-time multi-timezone collaboration between worldwide clients and Meridian's distributed design and engineering pods.
          </p>
        </div>

        <button
          onClick={onRequestQuote}
          className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <span>Start a Dedicated Channel</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Comms Interface */}
      <div className="grid grid-cols-1 md:grid-cols-12 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden min-h-[550px]">
        {/* Left: Channels & Hubs */}
        <div className="md:col-span-4 lg:col-span-3 border-r border-slate-200 bg-slate-50/50 p-4 space-y-5">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-2 px-2">
              Active Client Channels
            </div>
            <div className="space-y-1">
              {[
                { id: 'aetheria-clinical', name: 'aetheria-clinical', client: 'Aetheria BioLabs', unread: 0 },
                { id: 'finova-treasury', name: 'finova-treasury', client: 'Finova Capital', unread: 1 },
                { id: 'kura-health-ai', name: 'kura-health-ai', client: 'Kura Health', unread: 0 },
                { id: 'kinetix-robotics', name: 'kinetix-3d-hardware', client: 'Kinetix Robotics', unread: 0 },
              ].map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChannel(ch.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                    activeChannel === ch.id
                      ? 'bg-indigo-600 text-white font-bold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/60'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <Hash className="w-3.5 h-3.5 opacity-70 shrink-0" />
                    <span className="truncate">{ch.name}</span>
                  </div>
                  {ch.unread > 0 && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-2 px-2">
              Follow-The-Sun Status
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">London & Zurich</span>
                  <span className="text-[10px] text-emerald-600 font-bold">In Standup</span>
                </div>
                <p className="text-[11px] text-slate-500">Design token sprint & accessibility audit</p>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">San Francisco</span>
                  <span className="text-[10px] text-indigo-600 font-bold">Online</span>
                </div>
                <p className="text-[11px] text-slate-500">Next.js 15 Edge optimization</p>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">Tokyo & Singapore</span>
                  <span className="text-[10px] text-slate-500">Evening QA Handover</span>
                </div>
                <p className="text-[11px] text-slate-500">WebGL shader performance tests passed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Messages Stream */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-between p-4 sm:p-6 bg-white">
          {/* Channel Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-indigo-600" />
              <span className="font-heading font-bold text-sm text-slate-900">
                #{activeChannel}
              </span>
              <span className="text-xs text-slate-600">
                (Dedicated Client Stakeholder & Core Pod Channel)
              </span>
            </div>
            <div className="text-xs text-slate-600 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              <span>SLA: &lt;15 min response time</span>
            </div>
          </div>

          {/* Messages list */}
          <div className="py-4 space-y-4 overflow-y-auto max-h-[420px] pr-2">
            {currentChannelMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3.5 rounded-xl border text-xs space-y-1.5 transition-all ${
                  msg.isClient
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-indigo-50/60 border-indigo-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900">{msg.senderName}</span>
                        {msg.isClient ? (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 font-semibold">
                            Client
                          </span>
                        ) : (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-200 text-indigo-800 font-semibold">
                            Agency Pod
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-600">{msg.senderRole} • {msg.senderLocation}</div>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-600 font-mono">{msg.timestamp}</span>
                </div>

                <p className="text-slate-800 leading-relaxed pl-9 text-xs sm:text-sm">
                  {msg.content}
                </p>

                {msg.reactions && (
                  <div className="flex gap-1.5 pl-9 pt-1">
                    {msg.reactions.map((r, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-xs flex items-center gap-1 shadow-2xs"
                      >
                        {r.emoji} {r.count}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* New Message Input */}
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-100 space-y-2">
            <div className="relative">
              <input
                type="text"
                required
                placeholder={`Send a message to #${activeChannel}... (Try: "Can you provide an update on the staging link?")`}
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-slate-50 focus:bg-white"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-600 px-1">
              <span>Press enter to send live message • Dispatches instantly to team pods</span>
              <button
                type="button"
                onClick={onRequestQuote}
                className="text-indigo-600 font-bold hover:underline"
              >
                Need a dedicated agency team? Request a custom quote &rarr;
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
