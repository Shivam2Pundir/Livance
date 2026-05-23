import React, { useState } from "react";
import { Check, ArrowRight, Calculator } from "lucide-react";
import { motion } from "motion/react";

interface InteractiveCalculatorProps {
  onQuoteRequested: (planDetails: string) => void;
}

export default function InteractiveCalculator({ onQuoteRequested }: InteractiveCalculatorProps) {
  const [selectedCity, setSelectedCity] = useState("Bangalore");
  const [seatType, setSeatType] = useState("dedicated");
  const [seatsCount, setSeatsCount] = useState(3);
  const [addons, setAddons] = useState<string[]>(["wifi", "mail"]);

  const cityRates: Record<string, number> = {
    "Bangalore": 1.0,
    "Mumbai": 1.3,
    "Delhi NCR": 0.9,
    "Hyderabad": 0.95,
    "Pune": 0.85,
    "Chennai": 0.8,
  };

  const baseRates: Record<string, { name: string; price: number; desc: string }> = {
    hot: { name: "Flexi Desk", price: 4500, desc: "Access high-end shared workspaces" },
    dedicated: { name: "Dedicated Desk", price: 8000, desc: "Personal desk with ergonomic layout" },
    cabin: { name: "Private Cabin", price: 15000, desc: "Encased professional cabins for focus" },
  };

  const addonList = [
    { id: "wifi", name: "Premium Secure IP Network", rate: 499, desc: "Guaranteed dedicated bandwidth" },
    { id: "mail", name: "GST Address & Mail Handling", rate: 999, desc: "Legally compliant operational address" },
    { id: "rooms", name: "Meeting Room Credits (10 hrs/mo)", rate: 1499, desc: "Collaborate in custom premium spaces" },
    { id: "reception", name: "Receptionist & Call Answering", rate: 799, desc: "Human lobby assistance for clients" },
  ];

  const toggleAddon = (id: string) => {
    if (addons.includes(id)) {
      setAddons(addons.filter((a) => a !== id));
    } else {
      setAddons([...addons, id]);
    }
  };

  // Calculate prices
  const baseRate = baseRates[seatType].price;
  const cityMultiplier = cityRates[selectedCity];
  const calculatedSeatPrice = Math.round(baseRate * cityMultiplier);
  const totalSeatsPrice = calculatedSeatPrice * seatsCount;
  
  const addonsTotal = addons.reduce((sum, current) => {
    const item = addonList.find((a) => a.id === current);
    return sum + (item ? item.rate : 0);
  }, 0);

  const subtotal = totalSeatsPrice + addonsTotal;
  const gst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gst;

  const handleApply = () => {
    const details = `${seatsCount}x ${baseRates[seatType].name} in ${selectedCity} with additions: ${addons
      .map((id) => addonList.find((a) => a.id === id)?.name)
      .join(", ")}. Total Est: ₹${grandTotal.toLocaleString("en-IN")}/mo.`;
    onQuoteRequested(details);
  };

  return (
    <div className="bg-[#FAF8F5] border border-[#EAE3DF] rounded-[32px] p-8 lg:p-10 shadow-sm max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* Left Side: Parameters */}
        <div className="flex-1 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-[#D92D20] mb-2">
              <Calculator size={16} />
              <span>Real-time Workspace Planner</span>
            </div>
            <h3 className="text-2xl font-semibold tracking-tight text-[#1A1514]">
              Build your customized workspace
            </h3>
            <p className="text-sm text-[#5C4D49] mt-1">
              Adjust configurations to find matches fitting your organization size and budget.
            </p>
          </div>

          {/* 1. City Select */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D49] mb-2">
              1. Business Hub Location
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(cityRates).map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setSelectedCity(city)}
                  className={`py-3 px-2 text-xs font-semibold rounded-xl border transition text-center ${
                    selectedCity === city
                      ? "bg-[#D92D20] border-[#D92D20] text-white"
                      : "bg-white border-[#EAE3DF] text-[#1A1514] hover:bg-[#FAF8F5]"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Seat / Desk Type */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D49] mb-2">
              2. Class of Workspace
            </label>
            <div className="grid md:grid-cols-3 gap-3">
              {Object.entries(baseRates).map(([type, option]) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSeatType(type)}
                  className={`p-4 text-left rounded-2xl border transition-all ${
                    seatType === type
                      ? "bg-white border-[#D92D20] shadow-md ring-2 ring-[#D92D20]/10"
                      : "bg-white/50 border-[#EAE3DF] hover:bg-white"
                  }`}
                >
                  <div className="font-semibold text-sm text-[#1A1514]">{option.name}</div>
                  <div className="text-xs text-[#5C4D49] mt-1 line-clamp-1">{option.desc}</div>
                  <div className="text-xs font-bold text-[#D92D20] mt-3">
                    Est. ₹{Math.round(option.price * cityMultiplier).toLocaleString("en-IN")}/mo
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Seat Count Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#5C4D49]">
                3. Individual Desks / Seats needed
              </label>
              <span className="font-mono text-sm bg-white border border-[#EAE3DF] px-3 py-1 rounded-full text-[#1A1514] font-semibold">
                {seatsCount} {seatsCount === 1 ? "Seat" : "Seats"}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={seatsCount}
              onChange={(e) => setSeatsCount(parseInt(e.target.value))}
              className="w-full h-2 bg-[#EAE3DF] rounded-lg appearance-none cursor-pointer accent-[#D92D20]"
            />
            <div className="flex justify-between text-[10px] text-[#5C4D49] mt-1 font-mono">
              <span>1 Seat (Solo)</span>
              <span>10 Seats (Teams)</span>
              <span>20 Seats (Enterprise)</span>
            </div>
          </div>

          {/* 4. Addons Checkboxes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D49] mb-3">
              4. Operational Add-ons
            </label>
            <div className="grid md:grid-cols-2 gap-3">
              {addonList.map((addon) => {
                const isSelected = addons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex items-start gap-3 p-3 text-left rounded-xl border transition-all ${
                      isSelected
                        ? "bg-white border-[#D92D20]/60 ring-1 ring-[#D92D20]/10"
                        : "bg-white/50 border-[#EAE3DF]"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                        isSelected ? "border-[#D92D20] bg-[#D92D20] text-white" : "border-[#EAE3DF] bg-white"
                      }`}
                    >
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#1A1514]">{addon.name}</div>
                      <div className="text-[10px] text-[#5C4D49] mt-0.5">{addon.desc}</div>
                      <div className="text-[10px] font-bold text-[#D92D20] mt-1">
                        +₹{addon.rate.toLocaleString("en-IN")}/mo
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Total Card */}
        <div className="bg-white border border-[#EAE3DF] rounded-[24px] p-6 lg:p-8 w-full lg:w-96 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#D92D20]/5 rounded-bl-full pointer-events-none" />
          
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#5C4D49] mb-4">
              Estimated Monthly Cost
            </div>

            <div className="space-y-4">
              {/* Detailed Breakdown list */}
              <div className="flex justify-between text-xs py-1.5 border-b border-[#FAF8F5]">
                <span className="text-[#5C4D49] font-medium">
                  {seatsCount}x {baseRates[seatType].name}
                </span>
                <span className="text-[#1A1514] font-semibold">
                  ₹{totalSeatsPrice.toLocaleString("en-IN")}
                </span>
              </div>

              {addons.length > 0 && (
                <div className="flex justify-between text-xs py-1.5 border-b border-[#FAF8F5]">
                  <span className="text-[#5C4D49] font-medium">
                    Add-ons Config ({addons.length})
                  </span>
                  <span className="text-[#1A1514] font-semibold">
                    +₹{addonsTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-xs py-1.5 border-b border-[#FAF8F5]">
                <span className="text-[#5C4D49] font-medium">GST Compliant Tax (18%)</span>
                <span className="text-[#1A1514] font-semibold">
                  +₹{gst.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#EAE3DF]">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-sm font-semibold text-[#1A1514]">Total Cost</span>
              <div className="text-right">
                <span className="text-3xl font-light text-[#D92D20] tracking-tight">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] text-[#5C4D49] block font-medium">/ month</span>
              </div>
            </div>

            <p className="text-[10px] text-[#5C4D49] leading-relaxed mb-6">
              Prices are estimated index rates for professional setup and standard mail routing. 18% GST fully claimable under state credits.
            </p>

            <button
              onClick={handleApply}
              className="w-full flex items-center justify-center gap-2 bg-[#D92D20] hover:bg-[#B42318] text-white py-4 rounded-xl font-medium transition shadow-md group"
            >
              <span>Apply for this package</span>
              <ArrowRight size={16} className="transform transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
