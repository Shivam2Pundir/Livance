import React, { useState } from "react";
import { MapPin, Phone, Mail, CheckCircle2, Building, ShieldCheck, ArrowUpRight, Sparkles, Clock, Calendar, MailOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface InteractiveLocationsProps {
  onHubSelected: (city: string) => void;
}

export default function InteractiveLocations({ onHubSelected }: InteractiveLocationsProps) {
  const [activeCityName, setActiveCityName] = useState("Gurgaon");
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  // Gurgaon details (the only active physical office)
  const gurgaonOffice = {
    name: "Gurgaon",
    location: "Livance - Cyber City",
    address: "ENKAY TOWER Phase V, Udyog Vihar, Sector 19, Gurugram, Haryana 122016 1st floor above HDFC Bank, Cyber City, Gurgaon",
    phone: "+91 124 5940 1000",
    email: "gurgaon@livance.in",
    image: "/src/assets/images/gurgaon_open_workspace_1779398526846.png",
    amenities: [
      "Immediate GST Registration Proofs",
      "Executive Boardrooms & Lounge Access",
      "Herman Miller Ergonomic Layouts",
      "Biometric High-Level Security Entry",
      "Redundant 10Gbps Multi-ISP Fiber Networks",
      "In-House Mail Sorting & Forwarding Desk",
      "Professional On-Site Receptionist",
      "Dedicated Client Advisory Center"
    ],
    hotspots: "1st floor above HDFC Bank in Cyber City district.",
    priceHeader: "Premium Spaces from ₹5,500/mo"
  };

  const comingSoonHubs = [
    {
      name: "Bangalore",
      quarter: "Coming Soon",
      zone: "Koramangala & Indiranagar",
      desc: "Establishing luxury workspace address spaces in South India's booming capital.",
      perk: "Pre-launch priority price-lock discounts available."
    },
    {
      name: "Mumbai",
      quarter: "Coming Soon",
      zone: "Bandra Kurla Complex (BKC)",
      desc: "Financial sector compliance addressing paired with waterfront boardrooms.",
      perk: "Premium legal liaison services included."
    },
    {
      name: "Noida",
      quarter: "Coming Soon",
      zone: "Sector 62 IT Corridor",
      desc: "High density compliance addresses for next-gen digital native brands.",
      perk: "Free multi-state registration expansion."
    }
  ];

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    setWaitlistSuccess(true);
    setTimeout(() => {
      setWaitlistSuccess(false);
      setWaitlistEmail("");
    }, 4000);
  };

  const isGurgaonActive = activeCityName === "Gurgaon";
  const activeComingSoon = comingSoonHubs.find((h) => h.name === activeCityName);

  return (
    <div className="bg-white border border-[#EAE3DF] rounded-[32px] overflow-hidden p-6 lg:p-10 shadow-sm max-w-7xl mx-auto">
      
      {/* City Tabs Selector */}
      <div className="flex flex-wrap gap-2.5 border-b border-[#FAF8F5] pb-6 mb-8 justify-center lg:justify-start">
        {/* Gurgaon Active */}
        <button
          onClick={() => setActiveCityName("Gurgaon")}
          className={`px-6 py-3.5 rounded-2xl text-sm font-semibold transition flex items-center gap-2 ${
            activeCityName === "Gurgaon"
              ? "bg-[#D92D20] text-white shadow-sm"
              : "bg-[#FAF8F5] text-[#5C4D49] border border-[#EAE3DF] hover:bg-white"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Gurgaon (Live Office)</span>
        </button>

        {/* Coming Soon Hubs */}
        {comingSoonHubs.map((city) => (
          <button
            key={city.name}
            onClick={() => setActiveCityName(city.name)}
            className={`px-5 py-3.5 rounded-2xl text-sm font-semibold transition flex items-center gap-2 ${
              activeCityName === city.name
                ? "bg-[#1A1514] text-white shadow-sm"
                : "bg-[#FAF8F5] text-[#5C4D49] border border-[#EAE3DF] hover:bg-white"
            }`}
          >
            <Clock size={14} className="text-[#D25C38]" />
            <span>{city.name}</span>
            <span className="text-[10px] bg-[#FFF1EC] text-[#D25C38] px-2 py-0.5 rounded-full font-bold">
              {city.quarter}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {isGurgaonActive ? (
          /* Gurgaon Active presentation */
          <motion.div
            key="Gurgaon"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="grid lg:grid-cols-12 gap-8 items-center"
          >
            {/* Details panel */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] font-bold text-[#D92D20] bg-[#FFF1EC] px-3.5 py-1.5 rounded-full border border-[#D25C38]/20">
                  <Sparkles size={11} className="text-[#D92D20]" />
                  <span>📍 {gurgaonOffice.location}</span>
                </span>
                <h3 className="text-3xl font-semibold tracking-tight text-[#1A1514] mt-4 font-display">
                  Livance Flagship Hub, Gurgaon
                </h3>
                <p className="text-sm text-[#5C4D49] mt-1.5">
                  Our premier, operational base of compliance and high-performance coworking.
                </p>
              </div>

              {/* Physical details block */}
              <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-[#EAE3DF] space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#D92D20] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#1A1514] leading-relaxed font-medium">
                    {gurgaonOffice.address}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-2 text-xs text-[#5C4D49] pt-2 border-t border-[#EAE3DF]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#D92D20]">Hotline:</span>
                    <span className="font-medium text-[#1A1514]">{gurgaonOffice.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#D92D20]">Enquiries:</span>
                    <span className="font-medium text-[#111]">{gurgaonOffice.email}</span>
                  </div>
                </div>
              </div>

              {/* Gurgaon Specific Amenities */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#5C4D49] mb-3">
                  Included Premium Facilities & Features:
                </div>
                <div className="grid md:grid-cols-2 gap-3.5">
                  {gurgaonOffice.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-sm text-[#1A1514]">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                      <span className="font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic highlights footer */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#5C4D49] bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EAE3DF] justify-between">
                <div>
                  <span className="font-semibold text-[#1A1514]">Proximity: </span>
                  <span>{gurgaonOffice.hotspots}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                  <ShieldCheck size={14} />
                  <span>Physical Desk Space Open</span>
                </div>
              </div>

              {/* Explicit call to action */}
              <div className="flex items-center justify-between pt-2 border-t border-[#FAF8F5]">
                <div>
                  <span className="text-[10px] text-[#5C4D49] uppercase font-bold block">Exclusive pricing lock</span>
                  <span className="text-lg font-bold text-[#1A1514]">
                    {gurgaonOffice.priceHeader}
                  </span>
                </div>

                <button
                  onClick={() => onHubSelected("Gurgaon Corporate Workspace Setup")}
                  className="inline-flex items-center gap-2 bg-[#D92D20] hover:bg-[#B42318] text-white px-6 py-3.5 rounded-2xl text-sm font-semibold transition shadow-md group cursor-pointer"
                >
                  <span>Book Gurgaon Suite</span>
                  <ArrowUpRight size={16} className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>

            </div>

            {/* Gurgaon Image & Map split block */}
            <div className="lg:col-span-5 flex flex-col gap-5 self-stretch justify-between">
              
              {/* Office Image */}
              <div className="relative w-full h-[190px] rounded-3xl overflow-hidden shadow-xs border border-[#EAE3DF]">
                <img
                  src={gurgaonOffice.image}
                  alt="Gurgaon corporate luxury space"
                  className="w-full h-full object-cover transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1514]/75 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#FFB199]">
                    LIVANCE - CYBER CITY
                  </p>
                  <p className="text-xs font-light font-display">
                    Premium business atmosphere above HDFC Bank
                  </p>
                </div>
              </div>

              {/* Interactive Travel Map Block (Small to Medium Block as requested) */}
              <a
                href="https://www.google.com/maps?cid=17107107702211071680&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=IN&source=embed"
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="block bg-[#FAF8F5] border border-[#EAE3DF] hover:border-[#D92D20]/60 rounded-3xl p-5 shadow-sm transition duration-300 relative group cursor-pointer overflow-hidden flex-1 min-h-[190px] flex flex-col justify-between"
              >
                {/* Visual grid background pattern simulating a map */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#1A1514 1px, transparent 1px), linear-gradient(to right, #1A1514 1px, transparent 1px), linear-gradient(to bottom, #1A1514 1px, transparent 1px)", backgroundSize: "20px 20px, 40px 40px, 40px 40px" }} />
                
                {/* Simulated route line on map visual */}
                <svg className="absolute inset-0 w-full h-full stroke-[#D92D20]/20 stroke-[2] fill-none pointer-events-none">
                  <path d="M 20 150 Q 80 110, 140 80 T 220 40" strokeDasharray="5,4" />
                </svg>

                <div className="relative z-10 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] bg-[#FFF1EC] text-[#D92D20] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#D25C38]/10 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-[#D92D20] animate-ping" />
                      <span>Live GPS Link</span>
                    </span>
                    <span className="text-[9px] text-[#5C4D49] font-mono">Sec 19, Gurugram</span>
                  </div>

                  <h4 className="text-xs font-bold text-[#1A1514] font-display flex items-center gap-1 group-hover:text-[#D92D20] transition duration-200">
                    <span>Enkay Tower Cyber City Map</span>
                    <ArrowUpRight size={12} className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#D92D20]" />
                  </h4>
                  
                  <p className="text-[10px] text-[#5C4D49] leading-normal font-sans">
                    1st Floor above HDFC Bank. Click to open live directions in Google Maps to visit or send courier details instantly.
                  </p>
                </div>

                {/* Map pin representation */}
                <div className="relative flex items-center justify-center my-1.5 gap-2 bg-white border border-[#EAE3DF] rounded-xl py-2 px-3 shadow-xs">
                  <div className="relative shrink-0">
                    <div className="absolute -inset-0.5 rounded-full bg-[#D92D20]/25 animate-ping" />
                    <div className="h-6 w-6 bg-[#D92D20]/10 border border-[#D92D20]/30 rounded-full flex items-center justify-center text-[#D92D20]">
                      <MapPin size={12} className="fill-[#D92D20]/20" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold text-[#1A1514] truncate">Livance - Cyber City</div>
                    <div className="text-[8px] text-[#5C4D49] truncate font-medium">Enkay Tower, Phase V, Sector 19</div>
                  </div>
                </div>

                <div className="text-center text-[9px] font-bold text-[#D92D20] uppercase tracking-wider pt-0.5 relative z-10">
                  Click to Navigate & Travel &gt;
                </div>
              </a>

            </div>
          </motion.div>
        ) : (
          /* Coming Soon Hub presentation card with waitlist trigger */
          <motion.div
            key={activeCityName}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.18 }}
            className="bg-[#FAF8F5] border border-[#EAE3DF] rounded-3xl p-8 lg:p-12 text-center max-w-4xl mx-auto space-y-8 relative overflow-hidden"
          >
            {/* Background design pattern */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#D25C38]/5 rounded-bl-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-44 h-44 bg-[#D92D20]/5 rounded-tr-full pointer-events-none" />

            <div className="max-w-xl mx-auto space-y-4 relative">
              <div className="inline-flex items-center gap-1.5 bg-[#FFF1EC] text-[#D25C38] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase border border-[#D25C38]/10">
                <Clock size={12} />
                <span>{activeComingSoon?.quarter}</span>
              </div>

              <h3 className="text-3xl font-semibold tracking-tight text-[#1A1514] font-display">
                Livance is coming to {activeComingSoon?.name}
              </h3>
              <p className="text-sm text-[#5C4D49] leading-relaxed">
                {activeComingSoon?.desc} Our virtual addresses and compliant dedicated spaces are undergoing formal legal audits for state-level launch.
              </p>

              <div className="bg-white rounded-2xl p-4 border border-[#EAE3DF] text-xs max-w-md mx-auto font-medium text-[#1A1514]">
                🚀 Exclusive early-bird launch perk: <span className="text-[#D92D20] font-bold">{activeComingSoon?.perk}</span>
              </div>
            </div>

            {/* In-tab Waitlist submission form act as Call To Action */}
            <div className="max-w-md mx-auto bg-white border border-[#EAE3DF] rounded-2xl p-6 relative">
              <AnimatePresence mode="wait">
                {!waitlistSuccess ? (
                  <motion.form
                    key="waitlist-form"
                    onSubmit={handleJoinWaitlist}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-left text-[10px] font-bold uppercase tracking-wider text-[#5C4D49] mb-1.5">
                        Get Priority Launch Alerts for {activeComingSoon?.name}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          required
                          value={waitlistEmail}
                          onChange={(e) => setWaitlistEmail(e.target.value)}
                          placeholder="yourname@brand.in"
                          className="flex-1 bg-[#FAF8F5] border border-[#EAE3DF] rounded-xl px-4 py-3 text-sm focus:border-[#D92D20] outline-none transition"
                        />
                        <button
                          type="submit"
                          className="bg-[#1A1514] hover:bg-[#D92D20] text-white px-5 rounded-xl font-semibold text-xs transition cursor-pointer"
                        >
                          Join Waitlist
                        </button>
                      </div>
                    </div>
                    <p className="text-[10px] text-left text-[#5C4D49] leading-relaxed">
                      * waitlist profiles are automatically allocated priority reservation tokens when compliance slots open.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="waitlist-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4 space-y-2"
                  >
                    <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-1.5">
                      <MailOpen size={18} />
                    </div>
                    <h4 className="text-sm font-bold text-[#1A1514]">Successfully Registered!</h4>
                    <p className="text-xs text-[#5C4D49]">
                      We've reserved an early key parameter invitation slot for <b>{waitlistEmail}</b> for the {activeComingSoon?.name} launch.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onHubSelected(`Pre-registration for ${activeCityName} Hub`)}
                className="text-xs font-bold uppercase tracking-wider text-[#D92D20] hover:text-[#B42318] border-b-2 border-dashed border-[#D92D20] transition cursor-pointer"
              >
                Connect with corporate planner for regional updates &gt;
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
