import React, { useState } from 'react';
import { PhoneCall, Calendar, Clock, CheckCircle2, Globe2, X, Send } from 'lucide-react';

interface DiscoveryCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiscoveryCallModal: React.FC<DiscoveryCallModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [timezone, setTimezone] = useState('Europe/London');
  const [date, setDate] = useState('Tomorrow, 14:00');
  const [booked, setBooked] = useState(false);

  if (!isOpen) return null;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {!booked ? (
          <form onSubmit={handleBook} className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900">
                  Book 20-Min Architecture Discovery
                </h3>
                <p className="text-xs text-slate-500">
                  Speak with a Principal Architect in your timezone.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="America/Los_Angeles">San Francisco / Pacific (PST)</option>
                  <option value="America/New_York">New York / Eastern (EST)</option>
                  <option value="Europe/London">London / Western Europe (GMT/BST)</option>
                  <option value="Europe/Zurich">Zurich / Central Europe (CET/CEST)</option>
                  <option value="Asia/Singapore">Singapore / Hong Kong (SGT)</option>
                  <option value="Asia/Tokyo">Tokyo / Japan (JST)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Preferred Slot</label>
                <select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="Tomorrow, 10:00 AM">Tomorrow, 10:00 AM (Local)</option>
                  <option value="Tomorrow, 14:00 PM">Tomorrow, 02:00 PM (Local)</option>
                  <option value="In 2 Days, 11:30 AM">In 2 Days, 11:30 AM (Local)</option>
                  <option value="In 2 Days, 16:00 PM">In 2 Days, 04:00 PM (Local)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer mt-2"
            >
              Confirm 20-Min Discovery Slot
            </button>
          </form>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-lg text-slate-900">
              Calendar Invite Dispatched!
            </h4>
            <p className="text-xs text-slate-600">
              We have sent a Google Meet / Zoom invitation to <strong>{email}</strong> for <strong>{date}</strong> ({timezone}).
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-slate-900 text-white font-bold text-xs"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
