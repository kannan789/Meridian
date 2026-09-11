import React, { useState, useEffect } from 'react';
import { Clock, Globe2, Radio, Users } from 'lucide-react';
import { GLOBAL_HUBS } from '../data/agencyData';

export const GlobalTimezonesBar: React.FC = () => {
  const [currentUtc, setCurrentUtc] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentUtc(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format local time for given UTC offset
  const formatTime = (offsetHours: number) => {
    const d = new Date(currentUtc.getTime() + offsetHours * 3600 * 1000);
    const hours = d.getUTCHours().toString().padStart(2, '0');
    const minutes = d.getUTCMinutes().toString().padStart(2, '0');
    const seconds = d.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const isWorkingHours = (offsetHours: number) => {
    const d = new Date(currentUtc.getTime() + offsetHours * 3600 * 1000);
    const hour = d.getUTCHours();
    return hour >= 9 && hour < 19;
  };

  return (
    <div id="global-timezones-ticker" className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800 px-4 py-2 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Follow the sun badge */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-white tracking-wide flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-indigo-400" />
            24/7 Follow-The-Sun Operations
          </span>
          <span className="hidden sm:inline-block text-slate-500">|</span>
          <span className="hidden sm:inline-block text-slate-400">Continuous global engineering & client sync</span>
        </div>

        {/* Right: Hub clocks */}
        <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {GLOBAL_HUBS.map((hub) => {
            const active = isWorkingHours(hub.utcOffset);
            return (
              <div
                key={hub.city}
                className="flex items-center gap-1.5 shrink-0 px-2 py-0.5 rounded bg-slate-800/70 border border-slate-700/60"
                title={`${hub.city}, ${hub.country} (${hub.focalDiscipline})`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                <span className="font-medium text-slate-200">{hub.city}</span>
                <span className="font-mono text-slate-400 font-normal">
                  {formatTime(hub.utcOffset)}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {hub.utcOffset >= 0 ? `+${hub.utcOffset}` : hub.utcOffset}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
