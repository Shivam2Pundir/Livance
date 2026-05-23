import React from "react";
import { CheckCircle2, ShieldCheck, ArrowRight, Table, Info, Activity, Clock, Coffee, ShieldAlert, Cpu } from "lucide-react";

interface DedicatedSeatsViewProps {
  onNavigate: (view: string, prefill?: string) => void;
  onEnquire: (planName: string) => void;
}

export default function DedicatedSeatsView({ onNavigate, onEnquire }: DedicatedSeatsViewProps) {
  
  const seatCategories = [
    {
      title: "Private Cabin Suite",
      badge: "Premium Class",
      price: "₹18,000",
      billing: "/cabin/mo",
      description: "Sound-insulated glass partitions with independent biometric lock access, integrated presentation displays, and customizable executive layout boards.",
      image: "/src/assets/images/gurgaon_meeting_room_1779398546797.png",
      capacityInfo: "Configurable for 2 to 12 executives. Ideal for law firms, finance, and technical directs.",
      perks: [
        "Private lockable double pedestal filing units",
        "Dedicated corporate telephone receptionist line",
        "Free unlimited executive courtroom hours",
        "Premium company name boards at cabin entrance",
        "Exclusive independent HVAC climate thermostat controls"
      ],
      availabilityCount: 12,
      totalCapacity: 20
    },
    {
      title: "Dedicated Desk Space",
      badge: "Professional Class",
      price: "₹8,000",
      billing: "/desk/mo",
      description: "Your assigned corporate single desk configuration. Walk in daily to find your workstation layout exactly as you left it—monitors, accessories, and locks ready.",
      image: "/src/assets/images/gurgaon_dedicated_desks_1779398569488.png",
      capacityInfo: "1 assigned ergonomic workstation. Perfect for regular independent engineers and remote consultants.",
      perks: [
        "Herman Miller high-back ergonomic lumbar chair",
        "Under-desk master biometric slide drawer locker",
        "Immediate proximity to dedicated physical networking lines",
        "Secure IT setup with redundant fiber routing",
        "Professional front desk mail address inclusion"
      ],
      availabilityCount: 45,
      totalCapacity: 150
    },
    {
      title: "Flexi / Hot Seat Commons",
      badge: "Standard Class",
      price: "₹5,500",
      billing: "/desk/mo",
      description: "Unrestricted hot desking in our shared DLF CyberCity lounge library. High-design common table setups with multiple charging terminals and premium breakout zones.",
      image: "/src/assets/images/gurgaon_open_workspace_1779398526846.png",
      capacityInfo: "Flexible common area seating. Suited for mobile freelancers and modern business travellers.",
      perks: [
        "24/7 common desk lobby access limits",
        "High-density commercial charging socket grids",
        "Direct access to common cafeteria, bar and pantry lanes",
        "Dual-redundant 10Gbps Wi-Fi connectivity",
        "Free participation in all regional networking activities"
      ],
      availabilityCount: 22,
      totalCapacity: 60
    }
  ];

  const coreSpecs = [
    { title: "Dual Multi-ISP 10Gbps Links", icon: <Cpu className="text-[#D92D20]" size={18} />, desc: "High density fiber lines from Airtel & Jio to secure zero-interruption connections." },
    { title: "Certified HVAC Zone Filtration", icon: <Activity className="text-[#D92D20]" size={18} />, desc: "Central climate filtering grids providing crisp, safe air quality on every desk." },
    { title: "24/7 Security & Video Patrolling", icon: <ShieldCheck className="text-[#D92D20]" size={18} />, desc: "Continuous on-site professional monitors with automated biometric logs." },
    { title: "Artisan Coffee Commons", icon: <Coffee className="text-[#D92D20]" size={18} />, desc: "Barista-managed lounge offering fresh brews, gourmet snack setups, and break zones." }
  ];

  return (
    <div className="space-y-24 pb-20 max-w-7xl mx-auto px-6 pt-10">
      
      {/* Visual Header / Explainer banner */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-1.5 bg-[#FFF1EC] text-[#D92D20] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#D25C38]/10">
          <Activity size={14} className="text-[#D92D20]" />
          <span>Gurgaon Operational Campus Live</span>
        </span>
        <h1 className="text-4xl lg:text-6xl font-semibold tracking-tight text-[#1A1514] leading-[1.10] font-display">
          Physical workspaces designed for <span className="text-[#D92D20] font-light italic">elite</span> commercial execution.
        </h1>
        <p className="text-base text-[#5C4D49] max-w-2xl mx-auto leading-relaxed">
          Walk into DLF CyberCity, Gurgaon. Our custom private cabins and dedicated single desks feature premium Herman Miller seating, extreme fiber redundancy, and 24/7 member accessibility.
        </p>
      </section>

      {/* Real-time Inventory Metrics Log */}
      <section className="bg-white border border-[#EAE3DF] rounded-[32px] p-6 lg:p-8 shadow-sm max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#FAF8F5] pb-4 mb-4 gap-3">
          <div className="flex items-center gap-2.5">
            <Table size={20} className="text-[#D92D20]" />
            <h3 className="text-lg font-bold text-[#1A1514]">Gurgaon DLF CyberCity Center Status</h3>
          </div>
          <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-bold flex items-center gap-1.5 uppercase tracking-wide">
            <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
            Live System Connection OK
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {seatCategories.map((cat, idx) => {
            const pct = Math.round((cat.availabilityCount / cat.totalCapacity) * 100);
            return (
              <div key={idx} className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#EAE3DF] space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#5C4D49] font-bold">{cat.title} Seats</span>
                <div className="text-2xl font-bold text-[#1A1514] font-display">
                  {cat.availabilityCount} / {cat.totalCapacity} <span className="text-xs text-[#5C4D49] font-sans font-light">Open</span>
                </div>
                <div className="w-full bg-[#EAE3DF] h-1.5 rounded-full overflow-hidden mt-2">
                  <div className="bg-[#D92D20] h-full rounded-full transition" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-[9px] text-[#5C4D49] font-semibold uppercase tracking-wider">{pct}% Inventory holds</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Seating Categories Grid */}
      <section className="grid lg:grid-cols-3 gap-8">
        {seatCategories.map((seat, index) => (
          <div 
            key={index}
            className="bg-white border border-[#EAE3DF] rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Product Photo frame */}
              <div className="relative h-64 w-full overflow-hidden border-b border-[#EAE3DF]">
                <img
                  src={seat.image}
                  alt={seat.title}
                  className="h-full w-full object-cover transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs text-[#1A1514] text-[10px] uppercase tracking-widest font-extrabold px-3 py-1.5 rounded-xl border border-[#EAE3DF] shadow-xs">
                  {seat.badge}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-8 space-y-5">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#D92D20] font-bold">Gurgaon DLF CyberCity Hub</span>
                  <h3 className="text-2xl font-bold tracking-tight text-[#1A1514] mt-0.5 font-display">{seat.title}</h3>
                  <p className="text-xs text-[#5C4D49] mt-2 leading-relaxed">{seat.description}</p>
                </div>

                <div className="flex gap-2 bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EAE3DF] text-xs text-[#1A1514]">
                  <Info size={16} className="text-[#D92D20] shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-semibold">{seat.capacityInfo}</span>
                </div>

                {/* Perks parameters */}
                <div className="space-y-3.5 pt-2">
                  <div className="text-xs uppercase font-extrabold tracking-wider text-[#5C4D49]">Cabin Amenities Included:</div>
                  <ul className="space-y-3 text-xs text-[#1A1514]">
                    {seat.perks.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D92D20] shrink-0 mt-1.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Direct Enquiry pricing footer */}
            <div className="p-6 border-t border-[#EAE3DF]/60 bg-[#FAF9F6] rounded-b-[40px]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#5C4D49] uppercase font-bold tracking-wider">Starting from</span>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-2xl font-extrabold text-[#D92D20] font-display">{seat.price}</span>
                    <span className="text-xs text-[#5C4D49] font-medium">{seat.billing}</span>
                  </div>
                </div>

                <button 
                  onClick={() => onEnquire(`${seat.title} Selection - Gurgaon Campus`)}
                  className="w-full bg-[#D92D20] hover:bg-[#B42318] text-white text-xs font-extrabold uppercase tracking-widest py-3.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-2 shadow-xs hover:shadow-md active:scale-[0.98]"
                >
                  <span>
                    {seat.title.includes("Cabin") 
                      ? "Enquire Cabin Slot" 
                      : seat.title.includes("Dedicated") 
                        ? "Enquire Desk Slot" 
                        : "Enquire Flexi Slot"}
                  </span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Structural specifications panel */}
      <section className="bg-[#1A1514] text-white rounded-[40px] p-8 lg:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-44 h-44 bg-[#D25C38]/10 rounded-bl-full pointer-events-none" />
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[#FFB199] text-xs font-bold uppercase tracking-wider">Structural Super Specs</span>
            <h3 className="text-3xl font-semibold font-display tracking-tight text-[#FFB199]">Hardware configurations built for digital performance.</h3>
            <p className="text-xs text-[#D8CFCB] leading-relaxed">
              We design our physical workspace elements to maximize structural output. Leave the connectivity, ventilation, and technical security systems entirely to our legal operations team.
            </p>
          </div>

          <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
            {coreSpecs.map((spec, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2 hover:bg-white/10 transition">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[#D25C38]/20 text-[#FFF] rounded-xl">{spec.icon}</div>
                  <h4 className="text-sm font-bold text-white tracking-tight">{spec.title}</h4>
                </div>
                <p className="text-xs text-[#D8CFCB] leading-relaxed pl-10">{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
