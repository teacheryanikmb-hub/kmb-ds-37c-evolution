import React, { useRef, useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { Download, Upload, AlertTriangle, RefreshCw, X, CheckCircle, AlertOctagon, Info } from 'lucide-react';

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({ isOpen, onClose }) => {
  const { state, exportProgressJSON, importProgressJSON, resetProgress } = useProgress();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importProgressJSON(content);
        setImportStatus(result);
        if (result.success) {
          setTimeout(() => {
            onClose();
            setImportStatus(null);
          }, 1800);
        }
      }
    };
    reader.readAsText(file);
    // Reset file input value so same file can be re-selected if desired
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700 shadow-2xl p-6 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-2 flex items-center space-x-2">
          <span>Progress Management & Backup</span>
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Topic 3.7C Evolution of Robots & Autonomous Technologies
        </p>

        {/* Browser storage limitation advisory */}
        <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed flex items-start space-x-3">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-amber-300 mb-1">Local Browser Storage Notice</div>
            <p>
              Your learning progress is saved directly in this browser on this device. If you switch devices, change web browsers, or clear browser browsing data, your progress will not carry over automatically.
            </p>
            <p className="mt-1.5 font-medium text-amber-200">
              💡 <strong>Best Practice:</strong> Download a progress backup file at the end of each study session. You can restore it on any computer instantly.
            </p>
          </div>
        </div>

        {importStatus && (
          <div
            className={`mb-5 p-3 rounded-xl border text-xs flex items-center space-x-2.5 ${
              importStatus.success
                ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300'
                : 'bg-rose-950/50 border-rose-500/50 text-rose-300'
            }`}
          >
            {importStatus.success ? (
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
            )}
            <span>{importStatus.message}</span>
          </div>
        )}

        <div className="space-y-4">
          {/* Export Button */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-white">Download Progress Backup</div>
              <div className="text-xs text-slate-400 mt-0.5">
                Save an encrypted JSON snapshot (<code>DS_3.7C_Progress_{state.profile?.name || 'Student'}.json</code>)
              </div>
            </div>
            <button
              onClick={exportProgressJSON}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-md shadow-blue-600/30 shrink-0 ml-3"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>

          {/* Import Button */}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-white">Import Saved Progress</div>
              <div className="text-xs text-slate-400 mt-0.5">
                Restore your previous session. (Only verified 3.7C backup files accepted)
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-md shadow-cyan-600/30 shrink-0 ml-3"
            >
              <Upload className="w-4 h-4" />
              <span>Import</span>
            </button>
          </div>

          {/* Reset Section */}
          <div className="pt-2">
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="w-full py-2.5 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 rounded-xl transition flex items-center justify-center space-x-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Learning Progress...</span>
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs space-y-3">
                <div className="flex items-center space-x-2 text-rose-300 font-semibold">
                  <AlertOctagon className="w-4 h-4 shrink-0" />
                  <span>Are you sure you want to reset everything?</span>
                </div>
                <p className="text-rose-200/80 leading-relaxed">
                  This will permanently clear your quiz attempts, written Paper 1 & 2 answers, game scores, and certificate status. This action cannot be undone.
                </p>
                <div className="flex items-center space-x-3 pt-1">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold"
                  >
                    Yes, Reset Everything
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
