import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { KMBClass } from '../types';
import { UserCheck, Sparkles, BookOpen, Clock, ShieldCheck } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  canDismiss?: boolean;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, canDismiss = true }) => {
  const { state, setProfile } = useProgress();
  const [name, setName] = useState(state.profile?.name || '');
  const [studentClass, setStudentClass] = useState<KMBClass>(
    state.profile?.studentClass === 'S25A' || state.profile?.studentClass === 'S25B' || state.profile?.studentClass === 'S25F'
      ? state.profile.studentClass
      : 'S25A'
  );
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name as you wish it to appear on your IB Certificate.');
      return;
    }

    setProfile({
      name: name.trim(),
      studentClass,
      startedAt: state.profile?.startedAt || new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    });

    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-blue-500/30 shadow-2xl p-6 md:p-8 text-slate-100">
        {/* Academic Header Badge */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-400/40 flex items-center justify-center text-blue-400 font-bold text-xl">
            IB
          </div>
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-blue-400">
              Kolej MARA Banting • Digital Society (SL)
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Student Study Profile</h2>
          </div>
        </div>

        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          Welcome to the <strong>150-minute Mini Study Hub for Topic 3.7C (Evolution of Robots and Autonomous Technologies)</strong>.
          Your progress is auto-saved locally so you can complete the 3 recommended 50-minute sessions at your own pace.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Student Full Name (for Certificate)
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="e.g. Nur Aina binti Zulkifli"
              className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              CLASS
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {(['S25A', 'S25B', 'S25F'] as KMBClass[]).map((cls) => (
                <button
                  type="button"
                  key={cls}
                  onClick={() => setStudentClass(cls)}
                  className={`py-2.5 px-3 rounded-xl text-sm font-bold transition border ${
                    studentClass === cls
                      ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/50 p-2.5 rounded-lg">
              {error}
            </p>
          )}

          <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-3.5 space-y-2 text-xs text-slate-400">
            <div className="flex items-center space-x-2 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Multi-Session Browser Auto-Save Active</span>
            </div>
            <p className="leading-relaxed">
              You do <strong>not</strong> need to finish all 150 minutes today. Close your browser whenever needed; your written answers, quiz progress, and scores will be waiting when you return.
            </p>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            {canDismiss && state.profile && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white transition"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm font-bold shadow-lg shadow-blue-500/25 transition flex items-center space-x-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>{state.profile ? 'Update Profile' : 'Start 150-Min Learning Journey'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
