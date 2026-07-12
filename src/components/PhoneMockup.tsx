import React, { useState } from "react";

export const PhoneMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "brands" | "summary">("chat");

  return (
    <div className="absolute -bottom-4 -right-6 w-[170px] h-[330px] bg-slate-950 border-[5px] border-slate-800 rounded-[2.5rem] shadow-2xl flex flex-col z-20 hidden md:flex hover:scale-[1.05] transition-all duration-300 overflow-hidden">
      {/* Speaker Notch */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-slate-950 rounded-full z-30 flex items-center justify-center">
        <div className="w-1 h-1 rounded-full bg-slate-900" />
      </div>

      {/* Phone Screen display */}
      <div className="flex-1 bg-white dark:bg-slate-950 relative overflow-hidden flex flex-col pt-7 font-sans text-slate-800 dark:text-slate-300 select-none">
        
        {/* Popown App Window Header */}
        <div className="h-6 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-2">
          <div className="flex items-center gap-0.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          </div>
          <span className="text-[7px] text-slate-600 dark:text-slate-300 font-bold truncate max-w-[95px] pr-1">
            Popown - YouTube Companion
          </span>
        </div>

        {/* Connection status bar */}
        <div className="bg-blue-50/80 dark:bg-blue-950/40 border-b border-blue-100 dark:border-blue-900/20 px-2 py-0.5 flex items-center gap-1 shrink-0">
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[6.5px] font-medium text-blue-700 dark:text-blue-300 truncate">
            Connected: Membongkar Rahasia KFC...
          </span>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shrink-0">
          {[
            { id: "chat", label: "Chat" },
            { id: "brands", label: "Brands" },
            { id: "summary", label: "Rangkuman" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-1 text-[8px] font-bold text-center border-b-2 transition-all ${
                  isActive
                    ? "border-blue-600 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-450"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Inner content display area (scrollable) */}
        <div className="flex-1 overflow-y-auto p-2.5 flex flex-col space-y-2.5 bg-white dark:bg-slate-950 scrollbar-none">
          {/* CASE 1: Chat Tab */}
          {activeTab === "chat" && (
            <div className="flex-1 flex flex-col justify-between h-full min-h-0">
              <div className="space-y-2 min-h-0 overflow-y-auto">
                {/* Bot Intro */}
                <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-850 rounded-lg p-2 text-center">
                  <p className="text-[7.5px] leading-relaxed text-slate-600 dark:text-slate-400">
                    Hai! Saya siap menjawab pertanyaan tentang video KFC ini.
                  </p>
                </div>

                {/* User Question */}
                <div className="bg-blue-600 text-white rounded-lg p-2 self-end ml-4 text-left shadow-sm">
                  <p className="text-[7.5px] leading-relaxed">
                    Kapan mereka membahas rahasia resep bumbu?
                  </p>
                </div>

                {/* Bot Answer */}
                <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-left space-y-1.5 shadow-sm">
                  <p className="text-[7.5px] leading-relaxed text-slate-700 dark:text-slate-350">
                    Rahasia resep 11 bumbu dibahas pada menit <strong className="font-bold text-slate-900 dark:text-white">05:24</strong> ketika presenter mengunjungi laboratorium pusat.
                  </p>
                  <div className="flex">
                    <span className="inline-flex items-center gap-1 px-1 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-[6.5px] font-bold text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors">
                      ⏱️ Jump to 05:24
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="pt-2 flex items-center gap-1 border-t border-slate-100 dark:border-slate-900 mt-2 shrink-0">
                <input
                  type="text"
                  disabled
                  placeholder="Tanya sesuatu..."
                  className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full py-1 px-2.5 text-[7px] placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transform rotate-45 -translate-x-[0.5px]">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* CASE 2: Brands Tab */}
          {activeTab === "brands" && (
            <div className="space-y-2 text-left">
              <div className="text-[7.5px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                BRAND TERDETEKSI (3)
              </div>
              
              {[
                { emoji: "🍗", name: "KFC", count: 12, time: "01:05" },
                { emoji: "🍔", name: "McDonald's", count: 7, time: "08:12" },
                { emoji: "🔥", name: "Burger King", count: 3, time: "15:44" },
              ].map((brand, i) => (
                <div key={i} className="p-1.5 rounded-lg bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[11px] shrink-0">{brand.emoji}</span>
                    <div className="min-w-0">
                      <h4 className="text-[8px] font-bold text-slate-800 dark:text-slate-200 truncate">{brand.name}</h4>
                      <p className="text-[6.5px] text-slate-400 dark:text-slate-505">
                        Disebutkan {brand.count}x · Pertama di {brand.time}
                      </p>
                    </div>
                  </div>
                  <span className="text-[7px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-1 py-0.5 rounded border border-blue-100 dark:border-blue-900/30 shrink-0">
                    {brand.time}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* CASE 3: Rangkuman Tab */}
          {activeTab === "summary" && (
            <div className="space-y-2 text-left text-[7px] leading-relaxed">
              <h3 className="font-bold text-[7.5px] text-blue-600 dark:text-blue-400 leading-tight">
                Executive Summary – "Kalori Terbesar": Menyelami Menu Paling Tidak Sehat di Lima Restoran Cepat Saji
              </h3>
              <p className="text-[6px] text-slate-400 dark:text-slate-500 italic">
                Oleh [Penulis] – 3 Juli 2026
              </p>

              {/* Summary Table */}
              <div className="rounded border border-slate-200 dark:border-slate-800 overflow-hidden mt-1 bg-white dark:bg-slate-950">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-blue-50/50 dark:bg-blue-950/30 text-[6px] font-bold text-blue-700 dark:text-blue-300 border-b border-slate-200 dark:border-slate-800">
                      <th className="p-1 w-[28%] border-r border-slate-200 dark:border-slate-800">Aspek</th>
                      <th className="p-1">Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="p-1 font-semibold border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">Goal</td>
                      <td className="p-1 text-[6.5px]">Mengidentifikasi menu dengan <strong className="font-semibold text-slate-950 dark:text-white">total kalori tertinggi</strong>.</td>
                    </tr>
                    <tr>
                      <td className="p-1 font-semibold border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">Aturan</td>
                      <td className="p-1 text-[6.5px]">Tidak menolak satupun bahan (mayones, saus)...</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Bullet list */}
              <div className="space-y-1 mt-2">
                <h4 className="font-bold text-slate-700 dark:text-slate-300 text-[7px]">2. Temuan Utama</h4>
                <ul className="list-disc list-inside space-y-0.5 text-slate-550 dark:text-slate-400 pl-0.5 text-[6.5px]">
                  <li><strong className="font-bold text-slate-800 dark:text-slate-200">KFC:</strong> Ayam gule ~450 kcal.</li>
                  <li><strong className="font-bold text-slate-800 dark:text-slate-200">McD:</strong> Double Beef ~820 kcal.</li>
                  <li><strong className="font-bold text-slate-800 dark:text-slate-200">Starbucks:</strong> Frappe ~610 kcal.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
