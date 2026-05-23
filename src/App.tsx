import React, { useState, useEffect } from "react";
import { Check, Mail, Phone, MapPin, Building2, ShieldCheck, Circle as HelpCircle, Star, Sparkles, MessageSquare, ArrowRight, User, Briefcase, CircleCheck as CheckCircle, HeartHandshake, Clock, ArrowUpRight, TrendingUp, Award, Menu, X, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import LivanceWordmark from "./components/LivanceWordmark";
import BookingModal from "./components/BookingModal";

// Modular Views Imports
import HomeView from "./views/HomeView";
import VirtualOfficeView from "./views/VirtualOfficeView";
import DedicatedSeatsView from "./views/DedicatedSeatsView";
import BookConsultationView from "./views/BookConsultationView";
import PaymentGatewayView from "./views/PaymentGatewayView";

type ActivePageType = "home" | "virtual" | "dedicated" | "consultation" | "payment";

export default function LivanceWebsite() {
  const [activePage, setActivePage] = useState<ActivePageType>("home");
  const [selectedPlanForConsultation, setSelectedPlanForConsultation] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState<{
    title: string;
    level: string;
    standardYearly: string;
    discountedYearly: string;
    monthlyEquivalent: string;
    billing: string;
  } | null>(null);

  // Auto scroll to top on any page view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activePage]);

  const handleNavigate = (page: string, prefillDetails?: string) => {
    if (prefillDetails) {
      setSelectedPlanForConsultation(prefillDetails);
    }
    setActivePage(page as ActivePageType);
    setMobileMenuOpen(false);
  };

  const handleConsultationHeaderClick = () => {
    setSelectedPlanForConsultation("General Core Corporate Consult");
    setActivePage("consultation");
    setMobileMenuOpen(false);
  };

  const handleDirectEnquire = (planName: string) => {
    // Check if it corresponds to virtual office plan
    let matchedPlan = null;
    if (planName.includes("New Company") || planName.includes("Incorporation")) {
      matchedPlan = {
        title: "New Company Registration",
        level: "Incorporation Suite",
        standardYearly: "₹22,000",
        discountedYearly: "₹15,000",
        monthlyEquivalent: "₹1,250",
        billing: "/month"
      };
    } else if (planName.includes("GST")) {
      matchedPlan = {
        title: "GST Registration",
        level: "Highly Popular",
        standardYearly: "₹18,000",
        discountedYearly: "₹12,000",
        monthlyEquivalent: "₹1,000",
        billing: "/month"
      };
    } else if (planName.includes("Mailing") || planName.includes("Address")) {
      matchedPlan = {
        title: "Mailing Address",
        level: "Essential Plan",
        standardYearly: "₹15,000",
        discountedYearly: "₹10,000",
        monthlyEquivalent: "₹833",
        billing: "/month"
      };
    }

    if (matchedPlan) {
      setSelectedPaymentPlan(matchedPlan);
      setActivePage("payment");
    } else {
      // Fill the consultation selected parameters and direct redirect
      setSelectedPlanForConsultation(planName);
      setActivePage("consultation");
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-[#1A1514] min-h-screen font-sans selection:bg-[#D92D20]/15 selection:text-[#D92D20] flex flex-col justify-between">
      
      <div>
        {/* State-Level Compliance Top Banner */}
        <div className="bg-[#1A1514] text-white text-xs py-2 px-4 flex items-center justify-between overflow-hidden border-b border-[#EAE3DF]/10">
          <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-2.5 font-medium tracking-tight text-[#D8CFCB]">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/25 text-emerald-400 font-bold px-2 py-0.5 rounded text-[10px] uppercase border border-emerald-500/10 tracking-widest">
                Operational Guarantee
              </span>
              <span>Fully compliant under state Ministry of Corporate Affairs parameters</span>
            </div>
            
            <div className="flex items-center gap-4 text-[11px]">
              <span>📞 1800-419-LIVANCE</span>
              <span className="hidden md:inline text-neutral-600">•</span>
              <span className="text-emerald-400 font-semibold">Immediate Gurgaon Onboarding</span>
            </div>
          </div>
        </div>

        {/* Sticky Primary Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#EAE3DF]">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            
            {/* Clickable Wordmark Logo */}
            <div className="flex items-center gap-2.5">
              <button 
                onClick={() => handleNavigate("home")} 
                className="hover:opacity-90 transition active:scale-98 text-left cursor-pointer"
              >
                <LivanceWordmark size="md" asLink={false} />
              </button>
              
              <span className="hidden sm:inline bg-[#FAF8F5] text-[10px] text-[#5C4D49] font-mono border border-[#EAE3DF] px-2.5 py-0.5 rounded-full font-bold">
                Gurgaon Base
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex gap-8 text-sm font-semibold text-[#5C4D49]">
              
              {/* Home */}
              <button 
                onClick={() => handleNavigate("home")} 
                className={`transition duration-150 py-1.5 relative cursor-pointer ${
                  activePage === "home" ? "text-[#D92D20]" : "text-[#5C4D49] hover:text-[#D92D20]"
                }`}
              >
                <span>Home</span>
                {activePage === "home" && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#D92D20] rounded-full" />
                )}
              </button>

              {/* Virtual Office page Link */}
              <button 
                onClick={() => handleNavigate("virtual")} 
                className={`transition duration-150 py-1.5 relative cursor-pointer ${
                  activePage === "virtual" ? "text-[#D92D20]" : "text-[#5C4D49] hover:text-[#D92D20]"
                }`}
              >
                <span>Virtual Office</span>
                {activePage === "virtual" && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#D92D20] rounded-full" />
                )}
              </button>

              {/* Dedicated Seats page Link */}
              <button 
                onClick={() => handleNavigate("dedicated")} 
                className={`transition duration-150 py-1.5 relative cursor-pointer ${
                  activePage === "dedicated" ? "text-[#D92D20]" : "text-[#5C4D49] hover:text-[#D92D20]"
                }`}
              >
                <span>Dedicated Seats</span>
                {activePage === "dedicated" && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#D92D20] rounded-full" />
                )}
              </button>

              {/* Consultation / Quote Customizer Link */}
              <button 
                onClick={() => handleNavigate("consultation")} 
                className={`transition duration-150 py-1.5 relative cursor-pointer ${
                  activePage === "consultation" ? "text-[#D92D20]" : "text-[#5C4D49] hover:text-[#D92D20]"
                }`}
              >
                <span>Workspace Planner</span>
                {activePage === "consultation" && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#D92D20] rounded-full" />
                )}
              </button>

            </nav>

            {/* Desktop Action Trigger */}
            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={handleConsultationHeaderClick}
                className="bg-[#D92D20] hover:bg-[#B42318] active:scale-95 text-white px-5 py-3 rounded-2xl transition font-semibold text-sm shadow-sm hover:shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Clock size={15} />
                <span>Book Consultation</span>
              </button>
            </div>

            {/* Mobile Hamburger menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1A1514] hover:bg-[#FAF8F5] rounded-xl transition cursor-pointer"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>

          {/* Mobile Navigation Dropdown Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="md:hidden bg-white border-b border-[#EAE3DF] px-6 py-5 space-y-4 absolute left-0 right-0 top-full shadow-lg"
              >
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleNavigate("home")}
                    className={`text-left py-3 px-4 rounded-xl text-sm font-semibold transition ${
                      activePage === "home" ? "bg-[#FFF1EC] text-[#D92D20]" : "text-[#5C4D49] hover:bg-[#FAF8F5]"
                    }`}
                  >
                    Home Overview
                  </button>
                  <button
                    onClick={() => handleNavigate("virtual")}
                    className={`text-left py-3 px-4 rounded-xl text-sm font-semibold transition ${
                      activePage === "virtual" ? "bg-[#FFF1EC] text-[#D92D20]" : "text-[#5C4D49] hover:bg-[#FAF8F5]"
                    }`}
                  >
                    Virtual Office Solutions
                  </button>
                  <button
                    onClick={() => handleNavigate("dedicated")}
                    className={`text-left py-3 px-4 rounded-xl text-sm font-semibold transition ${
                      activePage === "dedicated" ? "bg-[#FFF1EC] text-[#D92D20]" : "text-[#5C4D49] hover:bg-[#FAF8F5]"
                    }`}
                  >
                    Dedicated Physical Cabins & Desks
                  </button>
                  <button
                    onClick={() => handleNavigate("consultation")}
                    className={`text-left py-3 px-4 rounded-xl text-sm font-semibold transition ${
                      activePage === "consultation" ? "bg-[#FFF1EC] text-[#D92D20]" : "text-[#5C4D49] hover:bg-[#FAF8F5]"
                    }`}
                  >
                    Interactive Estimator & Planner
                  </button>
                </div>

                <div className="pt-4 border-t border-[#FAF8F5]">
                  <button
                    onClick={handleConsultationHeaderClick}
                    className="w-full bg-[#D92D20] text-white text-center py-3.5 rounded-xl font-bold text-sm cursor-pointer shadow-sm hover:bg-[#B42318]"
                  >
                    Book Onboarding Session
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* View Router with Fluid Transitions */}
        <main className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.18 }}
            >
              {activePage === "home" && (
                <HomeView onNavigate={handleNavigate} />
              )}
              {activePage === "virtual" && (
                <VirtualOfficeView onNavigate={handleNavigate} onEnquire={handleDirectEnquire} />
              )}
              {activePage === "dedicated" && (
                <DedicatedSeatsView onNavigate={handleNavigate} onEnquire={handleDirectEnquire} />
              )}
              {activePage === "consultation" && (
                <BookConsultationView prefilledPlan={selectedPlanForConsultation} onNavigate={handleNavigate} />
              )}
              {activePage === "payment" && selectedPaymentPlan && (
                <PaymentGatewayView 
                  plan={selectedPaymentPlan} 
                  onCancel={() => setActivePage("virtual")} 
                  onPaymentSuccess={(details) => {
                    // Pre-fill the booking/consultation view with a confirmed paid transaction!
                    setSelectedPlanForConsultation(`PAID ORDER CONFIRMED: ${details.planTitle} Plan (${details.amountPaid} under Tracking Ref: ${details.transactionId})`);
                    setActivePage("consultation");
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Corporate Premium Footer with navigation index */}
      <footer className="bg-[#1A1514] text-white pt-20 pb-12 border-t border-[#EAE3DF]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#EAE3DF]/10">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-5">
              <div className="flex items-center gap-2">
                <LivanceWordmark size="lg" asLink={false} variant="dark" />
                <span className="bg-[#D25C38]/20 text-[#FFB199] border border-[#D25C38]/30 text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded">
                  Corporation
                </span>
              </div>
              
              <p className="text-sm text-[#D8CFCB] max-w-sm leading-relaxed font-light">
                Gurgaon's legal business addressing specialist. Provisioning standard rental deeds, landlord NOC registries, physical workstations, and mail receiver lines.
              </p>

              <div className="text-[10px] text-[#5C4D49] font-mono">
                LIVANCE CORP DIRECTORY • IN892V
              </div>
            </div>

            {/* Quick Directory links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] font-extrabold text-[#FFB199]">
                Workspace Services
              </h4>
              <ul className="space-y-3 text-xs text-[#D8CFCB]">
                <li><button onClick={() => handleNavigate("virtual")} className="hover:text-white transition cursor-pointer text-left">GST Address Compliance</button></li>
                <li><button onClick={() => handleNavigate("dedicated")} className="hover:text-white transition cursor-pointer text-left font-sans">Dedicated cabins & Suites</button></li>
                <li><button onClick={() => handleNavigate("dedicated")} className="hover:text-white transition cursor-pointer text-left font-sans animate-none">Ergonomic workstations</button></li>
                <li><button onClick={() => handleNavigate("virtual")} className="hover:text-white transition cursor-pointer text-left text-neutral-300">Courier Receipt scanning</button></li>
                <li><button onClick={() => handleNavigate("consultation")} className="hover:text-white transition cursor-pointer text-left text-neutral-300 font-sans">Workspace Cost Estimator</button></li>
              </ul>
            </div>

            {/* Support and certification labels */}
            <div className="md:col-span-4 space-y-4 text-sm text-[#D8CFCB]">
              <h4 className="text-xs uppercase tracking-[0.2em] font-extrabold text-[#FFB199]">
                Gurgaon Onboarding Helpdesk
              </h4>
              
              <div className="space-y-3.5 text-xs">
                <div className="flex items-center gap-2.5">
                  <Mail size={14} className="text-[#FFB199] shrink-0" />
                  <span className="font-semibold text-white">gurgaon@livance.in</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={14} className="text-[#FFB199] shrink-0" />
                  <span>+91 124 5940 1000</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin size={14} className="text-[#FFB199] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">ENKAY TOWER Phase V, Udyog Vihar, Sector 19, Gurugram, Haryana 122016 (1st floor above HDFC Bank), Cyber City, Gurgaon</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAE3DF]/10 flex items-center gap-2 text-[10px] text-[#D8CFCB]/60 font-semibold uppercase tracking-wider">
                <HeartHandshake size={14} className="text-[#FFB199]" />
                <span>Govt-Registered Landlord Partner</span>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Legal declarations */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D8CFCB]/50 font-medium">
            <p>© 2026 Livance Corporate Spaces India Pvt Ltd. All rights reserved under Central Ministry registry.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#FFB199] transition font-sans">Privacy Ledger</a>
              <a href="#" className="hover:text-[#FFB199] transition">Terms & sovereign policies</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Auxiliary Global Consultation Slideover Popup Modal */}
      <BookingModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        prefilledPlan={selectedPlanForConsultation}
      />

    </div>
  );
}
