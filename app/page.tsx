'use client';
import { useState, useEffect } from 'react';

// Define the interface for the Board Members
interface BoardMember {
  name: string;
  text: string;
}

interface ArchitectData {
  architect: string;
  board: BoardMember[];
}

export default function SovereignDashboard() {
  const [mounted, setMounted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ArchitectData | null>(null);

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
    <div className="h-screen flex flex-col bg-[#020617] text-slate-100 overflow-hidden">
      
      {showOverlay && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-50 flex items-center justify-center p-6 text-center">
          <div className="max-w-2xl bg-slate-900/40 border border-sky-500/30 p-12 rounded-[3rem] shadow-[0_0_100px_rgba(56,189,248,0.1)]">
            <div className="w-20 h-20 bg-sky-500/20 rounded-full flex items-center justify-center border border-sky-500/50 mx-auto mb-8 text-4xl">🧠</div>
            <h2 className="text-5xl font-black italic tracking-tighter mb-4 text-white uppercase">I'm Stepping In.</h2>
            <p className="text-slate-400 text-lg mb-10">We are pivoting your strategy to a <b>$39/mo Founder Tier</b> launch.</p>
            <button 
              onClick={() => setShowOverlay(false)}
              className="w-full bg-sky-500 text-slate-950 font-black py-6 rounded-2xl uppercase tracking-widest"
            >
              Enter the War Room
            </button>
          </div>
        </div>
      )}

      <header className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-slate-950/40">
        <div className="text-2xl font-black tracking-tighter italic">LAUNCH<span className="text-sky-500">AI</span></div>
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Sovereign Architect v1.4</div>
      </header>

      <main className="flex-1 overflow-y-auto p-8 lg:p-12 pb-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 bg-slate-900/20 border border-white/10 p-10 rounded-[3rem] min-h-[400px]">
            <h3 className="text-sky-500 font-black text-[10px] uppercase tracking-[0.4em] mb-6 italic">Directives</h3>
            <div className="text-slate-300 text-xl leading-relaxed italic whitespace-pre-wrap">
              {loading ? "Architecting roadmap..." : (data?.architect || "Founder, upload your mission parameters.")}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            {data?.board ? data.board.map((member, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/5 p-8 rounded-[2rem]">
                <h4 className="text-[10px] font-black text-sky-400 uppercase mb-2 italic">{member.name}</h4>
                <p className="text-slate-400 text-sm italic">{member.text}</p>
              </div>
            )) : (
              <div className="opacity-20 text-[10px] uppercase tracking-widest text-center mt-20">The Board is Standing By</div>
            )}
          </div>
        </div>
      </main>

      <footer className="p-10 bg-slate-950 border-t border-white/5 fixed bottom-0 left-0 right-0">
        <div className="max-w-4xl mx-auto relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && runMeeting()}
            placeholder="Type your current idea here..." 
            className="w-full bg-slate-900/50 border border-white/10 rounded-[2rem] px-10 py-6 text-white"
          />
          <button 
            onClick={runMeeting}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-sky-500 text-slate-950 font-black px-8 py-3 rounded-xl text-[10px] uppercase"
          >
            {loading ? "..." : "EXECUTE"}
          </button>
        </div>
      </footer>
    </div>
  );
}
