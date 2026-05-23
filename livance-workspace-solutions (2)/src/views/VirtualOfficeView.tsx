import React, { useState } from "react";
import { Check, ArrowRight, ShieldCheck, HelpCircle, CheckCircle2, ChevronDown, ChevronRight, FileText, ClipboardCheck, Mail, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface VirtualOfficeViewProps {
  onNavigate: (view: string, prefill?: string) => void;
  onEnquire: (planName: string) => void;
}

export default function VirtualOfficeView({ onNavigate, onEnquire }: VirtualOfficeViewProps) {
  const [starterGST, setStarterGST] = useState(false);
  const [bizLounge, setBizLounge] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // List of required documents for Gurgaon GST onboarding
  const onboardingDocs = [
    { title: "Incorporation Certificate (COI) / Partnership Deed", required: "Mandatory for registration", desc: "Proof of business representation issued under MCA." },
    { title: "Director/Partner PAN Card & Aadhar Card", required: "Mandatory", desc: "Identities verification documents for active stakeholders." },
    { title: "DLF CyberCity Electricity Bill NOC", required: "Provided by Livance", desc: "We provide the officially notarized No-Objection Certificate instantly." },
    { title: "Signed Landlord Agreement Deck", required: "Provided by Livance", desc: "Formal commercial lease contract needed for GST portal upload." }
  ];

  const virtualPlans = [
    {
      title: "New Company Registration",
      level: "Incorporation Suite",
      standardYearly: "₹22,000",
      discountedYearly: "₹15,000",
      monthlyEquivalent: "₹1,250",
      billing: "/month",
      features: [
        "New Registration for New Company Registration Address & Incorporation Proofs",
        "GST Registration for New GST Registration & APOB included",
        "Mailing Address for Mail & Courier Handling included",
        "Address use on Business Cards, Letter Heads, etc. allowed",
        "MCA and ROC compliant corporate filing registry NOCs",
        "Corporate banking desk current account verification support"
      ],
      description: "Comprehensive registry & address setup for starting a new private limited MCA-registered entity."
    },
    {
      title: "GST Registration",
      level: "Highly Popular",
      standardYearly: "₹18,000",
      discountedYearly: "₹12,000",
      monthlyEquivalent: "₹1,000",
      billing: "/month",
      features: [
        "GST Registration for New GST Setup & APOB (Additional Place of Business)",
        "Mailing Address for Mail & Courier Handling included",
        "Address use on Business Cards, Letter Heads, etc. allowed",
        "Assured 100% Legal GST Portal NOC & Landlord Deed",
        "On-site brand name board hosting for official state inspector visits",
        "Dedicated lobby representation and verification audit assistance"
      ],
      description: "Optimized bundle meeting all requirements for new GST registrations or APOB in Haryana."
    },
    {
      title: "Mailing Address",
      level: "Essential Plan",
      standardYearly: "₹15,000",
      discountedYearly: "₹10,000",
      monthlyEquivalent: "₹833",
      billing: "/month",
      features: [
        "Mailing Address for Mail & Courier Handling",
        "Professional Address on Business Cards & Letterheads",
        "Immediate Photo Scans & email alerts of envelopes on delivery",
        "Centralized Gurgaon Frontline Desk courier logging",
        "Compliance-approved mail forwarding & routing"
      ],
      description: "Ideal for remote entities needing professional mail handling and business address presence."
    }
  ];

  const faqs = [
    {
      question: "Is a virtual office completely legal for GST registration in India?",
      answer: "Yes, 100%. Under Section 2(85) of the CGST Act, any business can declare a virtual office as their Principal Place of Business, provided they have a compliant lease agreement, landlord No-Objection Certificate (NOC), and utility proof. Livance provides all these documents fully audited and verified under 2 hours."
    },
    {
      question: "How do registration officers audit virtual office addresses?",
      answer: "GST inspectors periodically perform physical or virtual geolocational verifications. Livance operates an official reception lounge with real corporate staff in our Gurgaon office. We host your brand's physical name board and keep all physical record logs safe on-site, fully satisfying all government verification requirements."
    },
    {
      question: "How does the mail forwarding and parcel receipt service work?",
      answer: "All courier packets, official tax notices, and corporate bank parcels arrive at our central reception. Our front-desk team registers the package, sends an immediate notification with photo scans of the envelope, and holds or securely forwards it to your active residential address based on your plan guidelines."
    },
    {
      question: "Can I open an Indian business bank account using this address?",
      answer: "Absolutely. All nationalized and private banks (such as HDFC, ICICI, Kotak, SBI, HSBC) accept the rental agreement and NOC documents provided by Livance to process corporate current accounts and issue banking assets."
    }
  ];

  const handlePlanSubmit = (plan: typeof virtualPlans[0]) => {
    onEnquire(`${plan.title} Virtual Address Plan (Billed Annually at ${plan.discountedYearly} + taxes & fees)`);
  };

  return (
    <div className="space-y-24 pb-20 max-w-7xl mx-auto px-6 pt-10">
      
      {/* Visual Header / Explainer banner */}
      <section className="text-center space-y-6 max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-1 bg-[#FFF1EC] text-[#D92D20] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-[#D25C38]/10">
          <ShieldCheck size={14} />
          <span>GST & MCA Approved Solutions</span>
        </span>
        <h1 className="text-4xl lg:text-6xl font-semibold tracking-tight text-[#1A1514] leading-[1.1] font-display">
          Premium corporate address <span className="text-[#D92D20] font-light italic">without</span> massive rental overheads.
        </h1>
        <p className="text-base text-[#5C4D49] max-w-2xl mx-auto leading-relaxed">
          Establish formal legal compliance in Gurgaon. Instantly secure physical rental deeds, NOC documents, and a professional mail receptionist system to pass state audits.
        </p>
      </section>

      {/* Plan Selection Cards Grid with Live Calculations */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-[#1A1514] font-display">Select Virtual Address Plan</h2>
          <p className="text-xs text-[#5C4D49] mt-1">Both plans can be customized live to match exact operating needs.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Plan 1: New Company Registration (Recommended) */}
          <div className="bg-white border-2 border-[#D92D20] rounded-[32px] p-8 shadow-md flex flex-col justify-between relative group">
            <div className="absolute top-4 right-4 bg-[#D92D20] text-white text-[9px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full flex items-center gap-1">
              <Sparkles size={10} />
              <span>Recommended</span>
            </div>

            <div>
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D92D20]">{virtualPlans[0].level}</span>
                <h3 className="text-2xl font-semibold text-[#1A1514] mt-1">{virtualPlans[0].title}</h3>
                <p className="text-xs text-[#5C4D49] mt-1.5 leading-relaxed min-h-[32px]">{virtualPlans[0].description}</p>
              </div>

              <div className="my-6 border-y border-[#EAE3DF]/50 py-4 flex flex-col justify-center">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#D92D20] font-display">
                    {virtualPlans[0].monthlyEquivalent}
                  </span>
                  <span className="text-xs font-medium text-[#5C4D49]">{virtualPlans[0].billing}</span>
                </div>
                
                <div className="mt-2.5 text-xs text-[#5C4D49] flex flex-col gap-0.5 font-sans">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-[#1A1514]">Standard Rate:</span>
                    <span className="line-through text-neutral-400 font-medium">{virtualPlans[0].standardYearly}/yr</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#D92D20] font-bold">
                    <span>Discounted Rate:</span>
                    <span>{virtualPlans[0].discountedYearly}/yr + fees</span>
                  </div>
                </div>
              </div>

              <div className="text-xs font-bold text-[#5C4D49] uppercase tracking-wider mb-4">Included Features:</div>
              <ul className="space-y-3 px-0.5 text-sm mb-8 text-[#1A1514]">
                {virtualPlans[0].features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check size={16} className="text-[#D92D20] shrink-0 mt-0.5" />
                    <span className="text-xs leading-normal font-medium">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => handlePlanSubmit(virtualPlans[0])}
              className="w-full bg-[#D92D20] hover:bg-[#B42318] text-white font-semibold py-3.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md text-sm"
            >
              <span>Lock In {virtualPlans[0].title}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Plan 2: GST Registration */}
          <div className="bg-white border border-[#EAE3DF] rounded-[32px] p-8 shadow-sm flex flex-col justify-between hover:border-[#D92D20]/40 transition duration-300 relative group">
            <div>
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D92D20]">{virtualPlans[1].level}</span>
                <h3 className="text-2xl font-semibold text-[#1A1514] mt-1">{virtualPlans[1].title}</h3>
                <p className="text-xs text-[#5C4D49] mt-1.5 leading-relaxed min-h-[32px]">{virtualPlans[1].description}</p>
              </div>

              <div className="my-6 border-y border-[#EAE3DF]/50 py-4 flex flex-col justify-center">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#D92D20] font-display">
                    {virtualPlans[1].monthlyEquivalent}
                  </span>
                  <span className="text-xs font-medium text-[#5C4D49]">{virtualPlans[1].billing}</span>
                </div>
                
                <div className="mt-2.5 text-xs text-[#5C4D49] flex flex-col gap-0.5 font-sans">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-[#1A1514]">Standard Rate:</span>
                    <span className="line-through text-neutral-400 font-medium">{virtualPlans[1].standardYearly}/yr</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#D92D20] font-bold">
                    <span>Discounted Rate:</span>
                    <span>{virtualPlans[1].discountedYearly}/yr + fees</span>
                  </div>
                </div>
              </div>

              <div className="text-xs font-bold text-[#5C4D49] uppercase tracking-wider mb-4">Included Features:</div>
              <ul className="space-y-3 px-0.5 text-sm mb-8 text-[#1A1514]">
                {virtualPlans[1].features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check size={16} className="text-[#D92D20] shrink-0 mt-0.5" />
                    <span className="text-xs leading-normal font-medium">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => handlePlanSubmit(virtualPlans[1])}
              className="w-full bg-[#1A1514] hover:bg-[#D92D20] text-white font-semibold py-3.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm text-sm"
            >
              <span>Lock In {virtualPlans[1].title}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Plan 3: Mailing Address */}
          <div className="bg-white border border-[#EAE3DF] rounded-[32px] p-8 shadow-sm flex flex-col justify-between hover:border-[#D92D20]/40 transition duration-300 relative group">
            <div>
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D92D20]">{virtualPlans[2].level}</span>
                <h3 className="text-2xl font-semibold text-[#1A1514] mt-1">{virtualPlans[2].title}</h3>
                <p className="text-xs text-[#5C4D49] mt-1.5 leading-relaxed min-h-[32px]">{virtualPlans[2].description}</p>
              </div>

              <div className="my-6 border-y border-[#EAE3DF]/50 py-4 flex flex-col justify-center">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#D92D20] font-display">
                    {virtualPlans[2].monthlyEquivalent}
                  </span>
                  <span className="text-xs font-medium text-[#5C4D49]">{virtualPlans[2].billing}</span>
                </div>
                
                <div className="mt-2.5 text-xs text-[#5C4D49] flex flex-col gap-0.5 font-sans">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-[#1A1514]">Standard Rate:</span>
                    <span className="line-through text-neutral-400 font-medium">{virtualPlans[2].standardYearly}/yr</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#D92D20] font-bold">
                    <span>Discounted Rate:</span>
                    <span>{virtualPlans[2].discountedYearly}/yr + fees</span>
                  </div>
                </div>
              </div>

              <div className="text-xs font-bold text-[#5C4D49] uppercase tracking-wider mb-4">Included Features:</div>
              <ul className="space-y-3 px-0.5 text-sm mb-8 text-[#1A1514]">
                {virtualPlans[2].features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check size={16} className="text-[#D92D20] shrink-0 mt-0.5" />
                    <span className="text-xs leading-normal font-medium">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={() => handlePlanSubmit(virtualPlans[2])}
              className="w-full bg-[#1A1514] hover:bg-[#D92D20] text-white font-semibold py-3.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm text-sm"
            >
              <span>Lock In {virtualPlans[2].title}</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </section>

      {/* Onboarding Compliance/Document Inspector Board (Interactive Tool) */}
      <section className="bg-white border border-[#EAE3DF] rounded-[32px] p-6 lg:p-10 shadow-sm max-w-5xl mx-auto space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#FFF1EC] text-[#D92D20] rounded-2xl">
            <ClipboardCheck size={26} />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-[#1A1514] font-display">Onboarding Compliance Inspector</h3>
            <p className="text-xs text-[#5C4D49]">Review documents required to establish active registration in Gurgaon.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {onboardingDocs.map((doc, idx) => (
            <div key={idx} className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#EAE3DF] space-y-2 hover:bg-white transition duration-200">
              <div className="flex justify-between items-start gap-3">
                <div className="flex items-center gap-2.5">
                  <FileText size={18} className="text-[#D92D20] shrink-0" />
                  <h4 className="text-sm font-bold text-[#1A1514] leading-tight">{doc.title}</h4>
                </div>
                <span className="text-[10px] bg-white text-[#5C4D49] border border-[#EAE3DF] px-2.5 py-0.5 rounded-full font-bold whitespace-nowrap">
                  {doc.required}
                </span>
              </div>
              <p className="text-xs text-[#5C4D49] leading-relaxed pl-7">{doc.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#FFF1EC] p-4 rounded-2xl border border-[#D25C38]/10 text-center text-xs text-[#D92D20] font-semibold">
          🛡️ Compliance Guarantee: Livance provides guaranteed digital files for direct download under 24 hours of onboarding initiation.
        </div>
      </section>

      {/* India GST/MCA Compliance FAQs */}
      <section className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="p-2 inline-flex bg-[#FAF8F5] text-[#D92D20] rounded-full border border-[#EAE3DF]">
            <HelpCircle size={20} />
          </div>
          <h3 className="text-3xl font-semibold text-[#1A1514] font-display">Compliance & Operational FAQs</h3>
          <p className="text-xs text-[#5C4D49]">Essential guidance regarding regulatory setups for business founders.</p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-white border border-[#EAE3DF] rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-[#FAF8F5]/50 transition cursor-pointer"
                >
                  <span className="text-sm font-bold text-[#1A1514] pr-4">{faq.question}</span>
                  <ChevronDown size={18} className={`text-[#5C4D49] shrink-0 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-xs text-[#5C4D49] leading-relaxed border-t border-[#FAF8F5] pt-3.5">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
