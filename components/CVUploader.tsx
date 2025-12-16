import React, { useState, useCallback } from 'react';
import { Upload, FileText, Loader2, AlertCircle } from 'lucide-react';
import { parseCV } from '../services/geminiService';
import { CVData } from '../types';

interface CVUploaderProps {
  onDataParsed: (data: CVData) => void;
}

const CVUploader: React.FC<CVUploaderProps> = ({ onDataParsed }) => {
  const [apiKey, setApiKey] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    if (!apiKey) {
      setError("Please enter a valid Gemini API Key first.");
      return;
    }
    
    setError(null);
    setLoading(true);

    try {
      const data = await parseCV(file, apiKey);
      onDataParsed(data);
    } catch (err: any) {
      setError(err.message || "Failed to parse CV");
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey]);

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-display font-bold text-textMain mb-2">AutoFolio</h1>
          <p className="text-textMuted">Turn your CV into a professional portfolio instantly.</p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-8 shadow-2xl">
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-textMuted mb-2">Google Gemini API Key</label>
            <input 
              type="password" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-textMain focus:outline-none focus:border-accent transition-colors"
            />
             <p className="text-xs text-textMuted mt-2">
              Required to process your document. Key is not stored. 
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-accent hover:underline ml-1">Get key here</a>.
            </p>
          </div>

          <div 
            className={`
              relative border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer
              ${isDragOver ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50 hover:bg-surfaceHighlight/50'}
              ${loading ? 'opacity-50 pointer-events-none' : ''}
            `}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={onDrop}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input 
              id="file-upload" 
              type="file" 
              className="hidden" 
              accept=".pdf,application/pdf,image/*" 
              onChange={onFileInput}
            />
            
            {loading ? (
              <div className="animate-pulse flex flex-col items-center">
                <Loader2 className="animate-spin text-accent mb-4" size={48} />
                <p className="text-textMain font-medium">Analyzing your brilliance...</p>
                <p className="text-sm text-textMuted mt-1">This uses Gemini 2.5 Flash to read your CV.</p>
              </div>
            ) : (
              <>
                <div className="p-4 bg-surfaceHighlight rounded-full mb-4">
                  <Upload className="text-accent" size={32} />
                </div>
                <h3 className="text-lg font-medium text-textMain mb-1">Upload your CV</h3>
                <p className="text-sm text-textMuted mb-4">Drag and drop or click to browse (PDF only)</p>
                <div className="flex gap-2 text-xs text-textMuted uppercase tracking-wider">
                  <span className="flex items-center gap-1"><FileText size={12}/> PDF</span>
                  <span className="flex items-center gap-1"><FileText size={12}/> Image</span>
                </div>
              </>
            )}
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg flex items-start gap-3 text-red-400 text-sm">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVUploader;