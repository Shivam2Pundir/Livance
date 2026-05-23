import React, { useState, useEffect } from "react";
import { Check, ClipboardCheck, ArrowRight, ShieldCheck, Clock, Phone, Mail, Award, Calendar, RefreshCcw, UserCheck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import InteractiveCalculator from "../components/InteractiveCalculator";

interface BookConsultationViewProps {
  prefilledPlan: string;
  onNavigate: (view: string) => void;
}

export default function BookConsultationView({ prefilledPlan, onNavigate }: BookConsultationViewProps) {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [receiptCode, setReceiptCode] = useState("");

  // Update selected plan if prefilledPlan prop changes
  useEffect(() => {
    if (prefilledPlan) {
      setSelectedPlan(prefilledPlan);
    } else {
      setSelectedPlan("General Compliance Consultation");
    }
  }, [prefilledPlan]);

  const handleCalculatorQuotaReady = (planDetails: string) => {
    setSelectedPlan(planDetails);
    // Smooth scroll down to the actual form
    document.getElementById("consultation-form-block")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formPhone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      // Generate standard legal ledger code
      const randomID = Math.floor(100000 + Math.random() * 900000);
      setReceiptCode(`LIV-GST-${randomID}-IN`);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="space-y-20 pb-20 max-w-7xl mx-auto px-6 pt-10">
      
      {/* Page Header */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-1.5 bg-[#FFF1EC] text-[#D92D20] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#D25C38]/10">
          <Calendar size={14} />
          <span>Active Booking Session Open</span>
        </span>
        <h1 className="text-4xl lg:text-6xl font-semibold tracking-tight text-[#1A1514] leading-[1.10] font-display">
          Book immediate compliance <span className="text-[#D92D20] font-light italic">consultation</span> workspace.
        </h1>
        <p className="text-base text-[#5C4D49] max-w-2xl mx-auto leading-relaxed">
          Configure physical components or compliant virtual offices. Submit details to receive official lease drafts and NOC files under 2 hours.
        </p>
      </section>

      {/* Part 1: Interactive cost Customizer directly in view */}
      <section className="space-y-8">
        <div className="text-center font-sans">
          <span className="text-xs uppercase bg-[#FAF8F5] text-[#D92D20] font-bold px-3 py-1.5 rounded-full border border-[#EAE3DF]">
            ⚙️ Step 1: Customize workspace parameters
          </span>
          <h2 className="text-3xl font-semibold text-[#1A1514] mt-4 font-display">Workspace Quota Architecture</h2>
          <p className="text-xs text-[#5C4D49] max-w-md mx-auto mt-1">
            Build your ideal combination of desks, suites, and regional legal assistance, then hit "Apply" to prefill the compliance ledger below.
          </p>
        </div>

        <InteractiveCalculator onQuoteRequested={handleCalculatorQuotaReady} />
      </section>

      {/* Part 2: Dynamic Booking / Receipt Form Block */}
      <section id="consultation-form-block" className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <span className="text-xs uppercase bg-[#FAF8F5] text-[#D92D20] font-bold px-3 py-1.5 rounded-full border border-[#EAE3DF]">
            ✍️ Step 2: Establish legal registration
          </span>
          <h2 className="text-3xl font-semibold text-[#1A1514] mt-3 font-display">Submit Onboarding Specification</h2>
        </div>

        <div className="bg-white border border-[#EAE3DF] rounded-[32px] overflow-hidden shadow-sm p-8 lg:p-12 relative">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="booking-form"
                onSubmit={handleFormSubmit}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D49] mb-2 font-semibold">
                      Full Onboarding Officer Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Advait Nair"
                      className="w-full bg-[#FAF8F5] border border-[#EAE3DF] rounded-2xl px-5 py-4 text-sm text-[#1A1514] outline-none focus:border-[#D92D20] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D49] mb-2 font-semibold">
                      Official Corporate Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="advait@yourbrand.in"
                      className="w-full bg-[#FAF8F5] border border-[#EAE3DF] rounded-2xl px-5 py-4 text-sm text-[#1A1514] outline-none focus:border-[#D92D20] transition"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D49] mb-2 font-semibold">
                      Primary Contact Hotline
                    </label>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-[#FAF8F5] border border-[#EAE3DF] rounded-2xl px-5 py-4 text-sm text-[#1A1514] outline-none focus:border-[#D92D20] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D49] mb-2 font-semibold">
                      Active Setup / Workspace Class
                    </label>
                    <input
                      type="text"
                      required
                      value={selectedPlan}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                      placeholder="Selection summary"
                      className="w-full bg-white border border-[#EAE3DF] rounded-2xl px-5 py-3 text-sm text-[#D92D20] font-semibold outline-none focus:border-[#D92D20] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D49] mb-2 font-semibold">
                    State Compliance Instruction notes
                  </label>
                  <textarea
                    rows={4}
                    value={additionalInstructions}
                    onChange={(e) => setAdditionalInstructions(e.target.value)}
                    placeholder="Provide specific notes regarding state-level GST targets, priority mail forwarding addresses, or additional workspace requirements..."
                    className="w-full bg-[#FAF8F5] border border-[#EAE3DF] rounded-2xl px-5 py-4 text-sm text-[#1A1514] outline-none focus:border-[#D92D20] transition resize-none"
                  />
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-[#FAF8F5]">
                  <div className="flex items-center gap-2 text-xs text-[#5C4D49]">
                    <ShieldCheck size={18} className="text-emerald-600 shrink-0" />
                    <span className="font-medium">Strict adherence to MCA registry and security guidelines.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#D92D20] hover:bg-[#B42318] disabled:bg-[#FAF8F5] text-white disabled:text-[#5C4D49] font-semibold py-4 px-8 rounded-2xl transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer w-full md:w-auto text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCcw size={16} className="animate-spin" />
                        <span>Reserving Compliance Slot...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm Compliance Registration</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              /* High-fidelity On Screen Corporate Receipt Ledger */
              <motion.div
                key="booking-success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8 font-sans"
              >
                <div className="text-center space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <UserCheck size={26} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#1A1514] font-display">Onboarding Ledger Generated</h3>
                    <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider mt-1">Verify tracking receipt below</p>
                  </div>
                </div>

                {/* Styled Receipt Ledger Box */}
                <div className="border border-[#EAE3DF] rounded-2xl bg-[#FAF8F5] overflow-hidden shadow-xs">
                  {/* Ledger Header */}
                  <div className="bg-[#1A1514] text-[#FFB199] px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest font-extrabold text-[#D8CFCB]">State Compliance Ledger</span>
                      <h4 className="text-sm font-bold text-white tracking-wider font-mono">{receiptCode}</h4>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-bold uppercase font-mono">
                      Queue Allocated
                    </span>
                  </div>

                  {/* Ledger Body */}
                  <div className="p-6 space-y-5 text-xs text-[#1A1514] divide-y divide-[#EAE3DF]/50">
                    
                    {/* Client info */}
                    <div className="grid sm:grid-cols-2 gap-4 pb-4">
                      <div>
                        <span className="text-[10px] font-bold text-[#5C4D49] uppercase block mb-0.5">Primary Registrant</span>
                        <span className="font-semibold text-[#1A1514]">{formName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#5C4D49] uppercase block mb-0.5">Registration Contact</span>
                        <span className="font-semibold text-neutral-800">{formEmail} | {formPhone}</span>
                      </div>
                    </div>

                    {/* Pre-filed Plan information */}
                    <div className="pt-4 pb-4">
                      <span className="text-[10px] font-bold text-[#5C4D49] uppercase block mb-1">Assigned Workspace Class</span>
                      <div className="bg-white border border-[#EAE3DF] rounded-xl p-3.5 font-semibold text-[#D92D20]">
                        {selectedPlan}
                      </div>
                    </div>

                    {/* Onboarding Compliance Officer details */}
                    <div className="pt-4 grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-[#5C4D49] uppercase block">Assigned Compliance Officer</span>
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          <span className="font-bold text-[#1A1514]">Advait Nair</span>
                        </div>
                        <span className="text-[10px] text-[#5C4D49] block">Regional Gurgaon Legal Director</span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-[#5C4D49] uppercase block">Operations Helpdesk</span>
                        <div className="font-semibold text-[#1A1514]">1800-419-LIVANCE (Ext 104)</div>
                        <span className="text-[10px] text-[#5C4D49] block">Toll-Free IST Corporate Line</span>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 leading-relaxed max-w-2xl mx-auto flex gap-2.5">
                  <Clock size={18} className="shrink-0 mt-0.5" />
                  <span>
                    <b>Onboarding Action Notice:</b> Officer <b>Advait Nair</b> has initiated a state compliance lookup matching your email domain. Please check your inbox at <b>{formEmail}</b> for a formal draft contract within 30 minutes.
                  </span>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormName("");
                      setFormEmail("");
                      setFormPhone("");
                      setAdditionalInstructions("");
                    }}
                    className="text-xs font-bold uppercase tracking-wider text-[#D92D20] hover:text-[#B42318] border-b border-dashed border-[#D92D20] transition inline-block cursor-pointer font-semibold"
                  >
                    Establish another compliance ledger layout &gt;
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Trusted Partner details */}
      <section className="bg-[#FAF8F5] border border-[#EAE3DF] rounded-[32px] p-8 max-w-4xl mx-auto text-center space-y-4">
        <Award className="mx-auto text-[#D25C38]" size={36} />
        <h4 className="text-lg font-bold font-display text-[#1A1514]">Govt-Audit Certified Registration Partner</h4>
        <p className="text-xs text-[#5C4D49] max-w-xl mx-auto leading-relaxed font-medium">
          Livance operates as a registered commercial landlord holding valid direct titles under the Ministry of Corporate Affairs database directory. All legal agreements satisfy MCA, GSTIN, and central bank parameters.
        </p>
      </section>

    </div>
  );
}
