'use client';
import React, { useState, useEffect } from 'react';

export default function SovereignDashboard() {
  const [mounted, setMounted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const runMeeting = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const result = await res.json();
      setData(result);
    } catch (e) {
      console.error("Board connection failed", e);
    }
    setLoading(false);
  };

  if (!mounted) {
    return <div className="min-h-screen bg-slate-950" />;
  }

  return (
    <div className="h-screen flex flex-col bg-[#020617] text-slate-100 overflow-hidden font-sans">
      {showOverlay && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-50 flex items-center justify-center p-6 text-center">
          <div className="max-w-2xl bg-slate-900 border border-sky-500/30 p-12 rounded-[3rem]">
            <h2 className="text-4xl font-black italic mb-4 uppercase">I'm Stepping In.</h2>
            <p className="text-slate-400 mb-10">We are pivoting your strategy to a $39/mo Founder Tier launch.</p>
            <button 
              onClick={() => setShowOverlay(false)}
              className="w-full bg-sky-500 text-slate-950 font-black py-6 rounded-2xl uppercase tracking-widest"
            >
              Enter the War Room
            </button>
          </div>
        </div>
      )}

      <header className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-slate-950">
        <div className="text-2xl font-black italic">LAUNCH<span className="text-sky-500">AI</span></div>
      </header>

      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 bg-slate-900/50 border border-white/10 p-10 rounded-[2rem] min-h-[400px]">
            <div className="text-slate-300 text-xl italic whitespace-pre-wrap">
              {loading ? "Architecting..." : (data?.architect || "Upload mission parameters.")}
            </div>
          </div>
          <div className="lg:col-span-4 space-y-6">
            {data?.board && data.board.map((member: any, i: number) => (
              <div key={i} className="bg-white/[0.03] border border-white/5 p-8 rounded-[2rem]">
                <h4 className="text-sky-400 font-bold uppercase mb-2">{member.name}</h4>
                <p className="text-slate-400 text-sm">{member.text}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="p-10 bg-slate-950 border-t border-white/5 fixed bottom-0 left-0 right-0">
        <div className="max-w-4xl mx-auto relative flex gap-4">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-slate-900 border border-white/10 rounded-2xl px-6 py-4 text-white"
            placeholder="Describe the mission..."
          />
          <button 
            onClick={runMeeting}
            className="bg-sky-500 text-slate-950 font-black px-10 py-4 rounded-2xl uppercase"
          >
            Execute
          </button>
        </div>
      </footer>
    </div>
  );
}
