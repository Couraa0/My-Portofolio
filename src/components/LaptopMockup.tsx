import React, { useState } from "react";
import { Code2, Layers, BarChart3, Terminal, CheckCircle2, Activity } from "lucide-react";

export const LaptopMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"code" | "roadmap" | "metrics">("code");

  return (
    <div className="flex flex-col items-center w-full">
      {/* Tab Selector Toolbar */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-md mb-4 relative z-20 w-fit">
        {[
          { id: "code", label: "developer.tsx", icon: <Code2 size={13} /> },
          { id: "roadmap", label: "roadmap.pm", icon: <Layers size={13} /> },
          { id: "metrics", label: "analytics.svg", icon: <BarChart3 size={13} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${activeTab === tab.id
                ? "bg-primary text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
              }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Laptop Frame Container */}
      <div className="relative w-full aspect-[16/10] px-3">
        {/* ── LAPTOP FRAME (CSS) ── */}
        <div className="relative w-full h-full rounded-t-2xl border-[6px] border-slate-800 bg-slate-950 shadow-2xl flex flex-col z-10 transition-all duration-300">
          {/* Laptop Web Camera Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-slate-800 rounded-b-md z-30 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-700" />
          </div>

          {/* Glass Screen Reflection Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-60 z-20 pointer-events-none rounded-t-[10px]" />

          {/* Laptop Screen Content Display Area */}
          <div className="flex-1 bg-slate-50 dark:bg-slate-900 overflow-hidden relative flex flex-col rounded-t-[10px] border-b border-slate-200 dark:border-slate-950">
            {/* Screen Tabs Bar */}
            <div className="h-7 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-900 flex items-center justify-between px-3 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-550 font-mono flex items-center gap-1">
                <Terminal size={10} />
                <span>bash • localhost:8080</span>
              </div>
            </div>

            {/* Active Screen View */}
            <div className="flex-1 w-full overflow-y-auto p-4 font-mono text-[10px] sm:text-xs text-slate-700 dark:text-slate-300">
              {/* CASE 1: DEVELOPER CODE WINDOW */}
              {activeTab === "code" && (
                <div className="space-y-2 select-text text-left">
                  <div className="text-slate-400 dark:text-slate-500">// Rakha's Developer Profile</div>
                  <div>
                    <span className="text-blue-600 dark:text-blue-400">import </span>
                    <span className="text-slate-900 dark:text-white">{"{ "}Developer{" }"} </span>
                    <span className="text-blue-600 dark:text-blue-400">from </span>
                    <span className="text-emerald-600 dark:text-emerald-400">"rakha-syamputra"</span>
                    <span className="text-slate-400">;</span>
                  </div>

                  <div className="mt-2">
                    <span className="text-blue-600 dark:text-blue-400">const </span>
                    <span className="text-amber-600 dark:text-yellow-400">RakhaProfile </span>
                    <span className="text-slate-650 dark:text-slate-400">= </span>
                    <span className="text-slate-900 dark:text-white">{"{"}</span>
                  </div>

                  <div className="pl-4">
                    <span className="text-sky-650 dark:text-sky-400">name: </span>
                    <span className="text-emerald-600 dark:text-emerald-400">"Muhammad Rakha Syamputra"</span>
                    <span className="text-slate-400">,</span>
                  </div>

                  <div className="pl-4">
                    <span className="text-sky-650 dark:text-sky-400">gpa: </span>
                    <span className="text-purple-600 dark:text-purple-400">3.97</span>
                    <span className="text-slate-400">,</span>
                  </div>

                  <div className="pl-4">
                    <span className="text-sky-650 dark:text-sky-400">skills: </span>
                    <span className="text-slate-900 dark:text-white">{"["}</span>
                    <span className="text-emerald-600 dark:text-emerald-400">"React"</span>
                    <span className="text-slate-400">, </span>
                    <span className="text-emerald-600 dark:text-emerald-400">"TypeScript"</span>
                    <span className="text-slate-400">, </span>
                    <span className="text-emerald-600 dark:text-emerald-400">"Laravel"</span>
                    <span className="text-slate-900 dark:text-white">{"]"}</span>
                    <span className="text-slate-400">,</span>
                  </div>

                  <div className="pl-4">
                    <span className="text-sky-650 dark:text-sky-400">status: </span>
                    <span className="text-emerald-600 dark:text-emerald-400">"Open to Code & Build"</span>
                  </div>

                  <div>
                    <span className="text-slate-900 dark:text-white">{"}"}</span>
                    <span className="text-slate-400">;</span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400">
                    <div className="text-blue-600 dark:text-blue-400 font-bold">$ npm run build</div>
                    <div className="text-emerald-600 dark:text-green-400">✓ 20+ Projects compiled successfully.</div>
                    <div className="text-slate-400 dark:text-slate-500">Listening on port 8080...</div>
                  </div>
                </div>
              )}

              {/* CASE 2: KANBAN ROADMAP */}
              {activeTab === "roadmap" && (
                <div className="space-y-4 font-sans h-full text-left">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">📋 Scrum Sprint - Q2 Board</span>
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[9px] font-bold">Sprint Active</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {/* TO DO column */}
                    <div className="space-y-2">
                      <div className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Backlog</div>
                      <div className="p-2 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                        <p className="text-[10px] font-bold text-slate-800 dark:text-slate-300 leading-tight">Build Smart City App</p>
                        <span className="text-[8px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1 py-0.5 rounded mt-1.5 inline-block">Plan</span>
                      </div>
                      <div className="p-2 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                        <p className="text-[10px] font-bold text-slate-800 dark:text-slate-300 leading-tight">Build PopOwn</p>
                        <span className="text-[8px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1 py-0.5 rounded mt-1.5 inline-block">Plan</span>
                      </div>
                      <div className="p-2 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                        <p className="text-[10px] font-bold text-slate-800 dark:text-slate-300 leading-tight">Build Telukambulu Website</p>
                        <span className="text-[8px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1 py-0.5 rounded mt-1.5 inline-block">Plan</span>
                      </div>
                    </div>

                    {/* IN PROGRESS column */}
                    <div className="space-y-2">
                      <div className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        Progress
                      </div>
                      <div className="p-2 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-blue-900/30 hover:border-slate-300 dark:hover:border-blue-700/50 transition-colors shadow-[0_0_8px_rgba(59,130,246,0.02)] dark:shadow-[0_0_8px_rgba(59,130,246,0.05)]">
                        <p className="text-[10px] font-bold text-slate-800 dark:text-slate-200 leading-tight">Build E Commerce Website</p>
                        <span className="text-[8px] bg-blue-500/10 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-1 py-0.5 rounded mt-1.5 inline-block">Development</span>
                      </div>
                      <div className="p-2 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-blue-900/30 hover:border-slate-300 dark:hover:border-blue-700/50 transition-colors shadow-[0_0_8px_rgba(59,130,246,0.02)] dark:shadow-[0_0_8px_rgba(59,130,246,0.05)]">
                        <p className="text-[10px] font-bold text-slate-800 dark:text-slate-200 leading-tight">Build Satu Tani App</p>
                        <span className="text-[8px] bg-blue-500/10 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-1 py-0.5 rounded mt-1.5 inline-block">Development</span>
                      </div>
                      <div className="p-2 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-blue-900/30 hover:border-slate-300 dark:hover:border-blue-700/50 transition-colors shadow-[0_0_8px_rgba(59,130,246,0.02)] dark:shadow-[0_0_8px_rgba(59,130,246,0.05)]">
                        <p className="text-[10px] font-bold text-slate-800 dark:text-slate-200 leading-tight">Build Educational AI Stock</p>
                        <span className="text-[8px] bg-blue-500/10 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-1 py-0.5 rounded mt-1.5 inline-block">Development</span>
                      </div>
                    </div>

                    {/* COMPLETED column */}
                    <div className="space-y-2">
                      <div className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 size={10} className="text-emerald-600 dark:text-emerald-400" />
                        Done
                      </div>
                      <div className="p-2 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-emerald-950 hover:border-slate-300 dark:hover:border-emerald-900 transition-colors space-y-1.5">
                        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-300 leading-tight line-through">Smart Village App</p>
                        <span className="text-[8px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 px-1 py-0.5 rounded inline-block">PM Lead</span>
                      </div>
                      <div className="p-2 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-emerald-950 hover:border-slate-300 dark:hover:border-emerald-900 transition-colors space-y-1.5">
                        <p className="text-[10px] font-bold text-slate-500 dark:text-slate-300 leading-tight line-through">Tixchain.id Launch</p>
                        <span className="text-[8px] bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 px-1 py-0.5 rounded inline-block">Co-Founder</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CASE 3: ANALYTICS METRICS */}
              {activeTab === "metrics" && (
                <div className="space-y-3 font-sans h-full text-left">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">📊 Product Growth Metrics</span>
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">
                      <Activity size={10} /> Live Stats
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase font-medium">Cumulative GPA</span>
                        <p className="text-sm font-black text-slate-800 dark:text-slate-200 mt-0.5">3.97 / 4.00</p>
                      </div>
                      <div className="w-7 h-7 rounded-full border border-blue-500/20 flex items-center justify-center bg-blue-500/5 text-blue-600 dark:text-blue-400">
                        <span className="text-[9px] font-bold">99%</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-slate-500 uppercase font-medium">Deployments</span>
                        <p className="text-sm font-black text-slate-800 dark:text-slate-200 mt-0.5">20+ Apps</p>
                      </div>
                      <span className="text-[8px] font-bold text-emerald-600 dark:text-emerald-505 bg-emerald-500/10 px-1 py-0.5 rounded">+18% MoM</span>
                    </div>
                  </div>

                  {/* SVG Chart */}
                  <div className="p-2 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 relative h-24 flex flex-col justify-end">
                    <div className="absolute top-2 left-2 text-[8px] font-mono text-slate-400 dark:text-slate-600">PROJECT COMPLETION TREND</div>
                    <svg className="w-full h-16 overflow-visible" viewBox="0 0 100 30">
                      <defs>
                        <linearGradient id="gradient-chart" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <line x1="0" y1="10" x2="100" y2="10" stroke="currentColor" className="text-slate-100 dark:text-slate-900" strokeWidth="0.5" />
                      <line x1="0" y1="20" x2="100" y2="20" stroke="currentColor" className="text-slate-100 dark:text-slate-900" strokeWidth="0.5" />

                      <path d="M 0 30 L 0 25 L 20 22 L 40 16 L 60 12 L 80 5 L 100 2 L 100 30 Z" fill="url(#gradient-chart)" />
                      <path d="M 0 25 L 20 22 L 40 16 L 60 12 L 80 5 L 100 2" fill="none" stroke="#2563eb" strokeWidth="1" strokeLinecap="round" />

                      <circle cx="20" cy="22" r="1.2" fill="#60a5fa" />
                      <circle cx="40" cy="16" r="1.2" fill="#60a5fa" />
                      <circle cx="60" cy="12" r="1.2" fill="#60a5fa" />
                      <circle cx="80" cy="5" r="1.2" fill="#60a5fa" />
                      <circle cx="100" cy="2" r="1.5" fill="#3b82f6" className="animate-pulse" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Laptop Keyboard Base */}
        <div className="w-[106%] -ml-[3%] h-[12px] bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-xl border-t border-slate-600 shadow-xl relative z-10 flex justify-center">
          <div className="w-20 h-2 bg-slate-900 rounded-t-sm" />
        </div>
      </div>
    </div>
  );
};
