'use client';
import { useState, useEffect } from 'react';

export default function SovereignDashboard() {
  const [mounted, setMounted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => { setMounted(true); }, []);

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

  if (!mounted) return <div className="min-h-screen bg-[#020617]" />;

  return (
    <div className="h-screen flex flex-col bg-[#020617] text-slate-100 overflow-hidden selection:bg-sky-500/30">
      
      {/* 1. THE MENTOR INTERVENTION (The Hook) */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-50 flex items-center justify-center p-6">
          <div className="max-w-2xl bg-slate-900/40 border border-sky-500/30 p-12 rounded-[3rem] shadow-[0_0_100px_rgba(56,189,248,0.1)] text-center animate-in fade-in zoom-in duration-700">
            <div className="w-20 h-20 bg-sky-500/20 rounded-full flex items-center justify-center border border-sky-500/50 mx-auto mb-8 text-4xl animate-pulse">🧠</div>
            <h2 className="text-5xl font-black italic tracking-tighter mb-4 text-white">I'M STEPPING IN.</h2>
            <p className="text-sky-400 font-mono text-[10px] tracking-[0.4em] uppercase mb-10">Sovereign Protocol Initialized</p>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              Founder, we are flagging your current trajectory for <span className="text-red-400 font-bold italic underline decoration-red-500/40">low-leverage effort.</span> 
              The Architect is ready to pivot you to <span className="text-white font-bold">$39/mo recurring revenue</span>. 
            </p>
            <button 
              onClick={() => setShowOverlay(false)}
              className="group relative w-full bg-sky-500 hover:bg-white text-slate-950 font-black py-6 rounded-2xl transition-all shadow-[0_20px_50px_rgba(56,189,248,0.2)] active:scale-95 text-xs uppercase tracking-[0.2em]"
            >
              Enter the War Room
            </button>
          </div>
        </div>
      )}

      {/* 2. HEADER */}
      <header className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-slate-950/40 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div className="text-2xl font-black tracking-tighter italic group cursor-default">
            LAUNCH<span className="text-sky-500 transition-colors">AI</span>
          </div>
          <div className="hidden md:block h-6 w-px bg-white/10" />
          <div className="hidden md:block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Sovereign Architect v1.4</div>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-right">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Project Status</p>
            <p className="text-emerald-400 font-black text-sm italic">PHASE: VALIDATION</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center font-black text-slate-950 shadow-lg shadow-sky-500/20 ring-1 ring-white/20">
            JS
          </div>
        </div>
      </header>

      {/* 3. COMMAND CENTER */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-10 pb-40">
        
        {/* STATS STRIP */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Revenue Target', val: '$39.00', color: 'text-emerald-400' },
            { label: 'Pivot Score', val: '88%', color: 'text-sky-400' },
            { label: 'Days to Launch', val: '30', color: 'text-white' }
          ].map((stat, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] backdrop-blur-sm group hover:border-sky-500/20 transition-all">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
              <p className={`text-4xl font-black italic ${stat.color}`}>{stat.val}</p>
            </div>
          ))}
        </div>

        {/* AGENT BOARD */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* THE ARCHITECT OUTPUT */}
          <div className="lg:col-span-8 bg-slate-900/20 border border-white/10 p-10 rounded-[3rem] relative overflow-hidden group min-h-[500px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-30" />
            <h3 className="text-sky-500 font-black text-[10px] uppercase tracking-[0.4em] mb-10 flex items-center gap-4 italic">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              Directives from the Architect
            </h3>
            
            <div className="text-slate-300 text-xl leading-relaxed font-serif italic">
              {loading ? (
                <div className="space-y-6 animate-pulse">
                  <div className="h-4 bg-white/5 rounded w-3/4" />
                  <div className="h-4 bg-white/5 rounded w-1/2" />
                  <div className="h-4 bg-white/5 rounded w-2/3" />
                </div>
              ) : (
                <div className="whitespace-pre-wrap">
                  {data?.architect || "Founder, upload your mission parameters. The Board is standing by to pivot your strategy."}
                </div>
              )}
            </div>
          </div>

          {/* THE BOARD MEMBERS (Sidebar) */}
          <div className="lg:col-span-4 space-y-6">
            {data?.board ? data.board.map((member: any, i: number) => (
              <div key={i} className="bg-white/[0.03] border border-white/5 p-8 rounded-[2rem] hover:border-sky-500/40 transition-all">
                <h4 className="text-[10px] font-black text-sky-400 uppercase tracking-widest mb-4 italic">{member.name} Analysis</h4>
                <p className="text-slate-400 text-sm leading-relaxed italic">{member.text}</p>
              </div>
            )) : (
              <div className="space-y-6 opacity-30">
                <div className="bg-white/5 h-32 rounded-[2rem] border border-dashed border-white/20 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest">Mentor Offline</div>
                <div className="bg-white/5 h-32 rounded-[2rem] border border-dashed border-white/20 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest">Coach Offline</div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 4. CONTROL BAR */}
      <footer className="p-10 bg-slate-950/80 border-t border-white/5 backdrop-blur-2xl fixed bottom-0 left-0 right-0">
        <div className="max-w-4xl mx-auto relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && runMeeting()}
            placeholder="Type your current idea here..." 
            className="
