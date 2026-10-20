import { useEffect, useState } from "react";

/** Font Awesome 6 Solid paths (CC BY 4.0), inlined so the island ships no icon font. */
const ICONS = {
  motorcycle: {
    viewBox: "0 0 640 512",
    d: "M280 32c-13.3 0-24 10.7-24 24s10.7 24 24 24h57.7l16.4 30.3L256 192l-45.3-45.3c-12-12-28.3-18.7-45.3-18.7H64c-17.7 0-32 14.3-32 32v32h96c88.4 0 160 71.6 160 160c0 11-1.1 21.7-3.2 32h70.4c-2.1-10.3-3.2-21-3.2-32c0-52.2 25-98.6 63.7-127.8l15.4 28.6C402.4 276.3 384 312 384 352c0 70.7 57.3 128 128 128s128-57.3 128-128s-57.3-128-128-128c-13.5 0-26.5 2.1-38.7 6l-55.1-102H480c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32h-20.4c-7.5 0-14.7 2.6-20.5 7.4l-47.4 39.5l-14-26c-7-12.9-20.5-21-35.2-21zm182.7 279.2l28.2 52.2c6.3 11.7 20.9 16 32.5 9.7s16-20.9 9.7-32.5l-28.2-52.2c2.3-.3 4.7-.4 7.1-.4c35.3 0 64 28.7 64 64s-28.7 64-64 64s-64-28.7-64-64c0-15.5 5.5-29.7 14.7-40.8M187.3 376c-9.5 23.5-32.5 40-59.3 40c-35.3 0-64-28.7-64-64s28.7-64 64-64c26.9 0 49.9 16.5 59.3 40h66.4c-11.2-59.2-63.2-104-125.7-104C57.3 224 0 281.3 0 352s57.3 128 128 128c62.5 0 114.5-44.8 125.8-104h-66.4zm-59.3 8a32 32 0 1 0 0-64a32 32 0 1 0 0 64",
  },
  house: {
    viewBox: "0 0 576 512",
    d: "M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1v16.2c0 22.1-17.9 40-40 40h-16c-1.1 0-2.2 0-3.3-.1c-1.4.1-2.8.1-4.2.1L416 512h-24c-22.1 0-40-17.9-40-40v-88c0-17.7-14.3-32-32-32h-64c-17.7 0-32 14.3-32 32v88c0 22.1-17.9 40-40 40h-55.9c-1.5 0-3-.1-4.5-.2c-1.2.1-2.4.2-3.6.2h-16c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9.1-2.8v-69.7h-32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7l255.4 224.5c8 7 12 15 11 24",
  },
  check: {
    viewBox: "0 0 512 512",
    d: "M256 512a256 256 0 1 0 0-512a256 256 0 1 0 0 512m113-303L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z",
  },
} as const;

const Svg = ({ name, className }: { name: keyof typeof ICONS; className?: string }) => (
  <svg viewBox={ICONS[name].viewBox} className={className} aria-hidden="true" focusable="false" style={{ width: "1em", height: "1em" }}>
    <path fill="currentColor" d={ICONS[name].d} />
  </svg>
);

const START_PROGRESS = 60;
const DESTINATION_PROGRESS = 92; // where the home marker sits on the map
const INITIAL_MINUTES = 5;

/** Simulated live-delivery card from the homepage "Suivez votre commande" block. */
export default function DeliveryTracker() {
  const [progress, setProgress] = useState(START_PROGRESS);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 0.15, DESTINATION_PROGRESS);
        if (next >= DESTINATION_PROGRESS) clearInterval(timer);
        return next;
      });
    }, 400);
    return () => clearInterval(timer);
  }, []);

  const totalDist = DESTINATION_PROGRESS - START_PROGRESS;
  const timeLeft = Math.max(0, Math.ceil(((DESTINATION_PROGRESS - progress) / totalDist) * INITIAL_MINUTES));
  const arrived = timeLeft === 0;
  const barPercentage = ((progress - START_PROGRESS) / totalDist) * 100;

  return (
    <>
      {/* Map mockup */}
      <div className="relative w-full h-48 bg-slate-800 rounded-md overflow-hidden border border-slate-700 mb-8 group/map" aria-hidden="true">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#475569_1px,_transparent_1px)] bg-[length:24px_24px]"></div>
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path d="M50,150 Q150,50 300,100 T500,80" fill="none" stroke="rgba(234, 88, 12, 0.2)" strokeWidth="4" strokeDasharray="8 4" />
        </svg>

        <div className="absolute top-1/2 -translate-y-1/2 z-0" style={{ left: `${DESTINATION_PROGRESS}%` }}>
          <div className="w-10 h-10 bg-slate-700 rounded-md border-2 border-slate-500 flex items-center justify-center shadow-lg transition-colors duration-500">
            <Svg name="house" className={`text-[12px] transition-colors duration-500 ${arrived ? "text-green-500" : "text-white"}`} />
          </div>
        </div>

        <div className="absolute transition-all duration-[400ms] ease-linear z-10" style={{ left: `${progress}%`, top: "40%" }}>
          <div className="relative">
            <div className="absolute inset-0 bg-orange-600 rounded-full animate-ping opacity-25"></div>
            <div className="relative w-8 h-8 bg-orange-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              <Svg name="motorcycle" className="text-white text-[10px]" />
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-slate-700">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Suivi GPS en direct</p>
        </div>
      </div>

      {/* ETA card */}
      <div className="mt-auto bg-slate-800/50 p-6 rounded-md border border-slate-700 relative overflow-hidden transition-all duration-500">
        <div className="flex items-center gap-6 mb-6">
          <div
            className={`w-16 h-16 rounded-md flex items-center justify-center shadow-2xl transition-all duration-500 ${
              arrived ? "bg-green-600 shadow-green-600/30" : "bg-orange-600 shadow-orange-600/30"
            }`}
          >
            <Svg name={arrived ? "check" : "motorcycle"} className="text-white text-2xl" />
          </div>
          <div className="flex-1">
            <p
              className={`text-[12px] uppercase font-black tracking-[0.2em] mb-1 transition-colors duration-500 ${
                arrived ? "text-green-500" : "text-orange-500"
              }`}
            >
              {arrived ? "Votre livreur est là" : "Estimation Arrivée"}
            </p>
            <div className="flex items-end gap-2">
              <p className="text-4xl font-black text-white leading-none tracking-tighter">{timeLeft}</p>
              <span className={`text-sm font-black mb-1 transition-colors duration-500 ${arrived ? "text-green-600" : "text-orange-600"}`}>
                MINUTES RESTANTES
              </span>
            </div>
          </div>
        </div>

        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden relative shadow-inner">
          <div
            className={`h-full transition-all duration-[400ms] ease-linear relative ${
              arrived ? "bg-green-600 shadow-[0_0_20px_rgba(34,197,94,0.6)]" : "bg-orange-600 shadow-[0_0_20px_rgba(234,88,12,0.6)]"
            }`}
            style={{ width: `${barPercentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Restaurant</p>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Votre Porte</p>
        </div>
      </div>
    </>
  );
}
