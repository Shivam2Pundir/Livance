import React, { useState, useEffect } from "react";
import { X, CheckCircle, Calendar, ShieldCheck, Mail, Phone, MapPin, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledPlan?: string;
}

export default function BookingModal({ isOpen, onClose, prefilledPlan }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Bangalore",
    plan: "Business Virtual (₹2499/mo)",
    needs: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Sync prefilled package if passed
  useEffect(() => {
    if (prefilledPlan) {
      setFormData((prev) => ({ ...prev, plan: prefilledPlan }));
    }
  }, [prefilledPlan]);

  const steps = [
    "Secure registration session established...",
    "Validating city hub workspace availability index...",
    "Assigning dedicated relationship manager key...",
    "Generating secure registration lookup token...",
  ];

  useEffect(() => {
    if (isSubmitting && currentStep < steps.length) {
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, steps[currentStep]]);
        setCurrentStep((prev) => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else if (isSubmitting && currentStep === steps.length) {
      const timer = setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isSubmitting, currentStep]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please enter both your name and email.");
      return;
    }
    setIsSubmitting(true);
    setLogs(["Initiating booking portal handshake..."]);
    setCurrentStep(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Backdrop overlay */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-[#1A1514]/40 backdrop-blur-xs transition-opacity"
          aria-hidden="true"
        />

        {/* Center alignment element */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-[#FAF8F5] rounded-[32px] text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full border border-[#EAE3DF]">
          
          {/* Header */}
          <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-[#EAE3DF]">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#D92D20] animate-pulse" />
              <h3 className="text-lg font-semibold text-[#1A1514] font-display">
                Livance Workspace Consultation
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#5C4D49] hover:bg-[#FAF8F5] transition"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {!isSubmitting && !isSubmitted ? (
                // Form View
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="text-center pb-2">
                    <p className="text-sm text-[#5C4D49]">
                      Establish a luxury corporate presence in India's leading economic zones. Complete your quick reservation parameter summary.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D49] mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#5C4D49]">
                        <Sparkles size={14} />
                      </span>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Advait Nair"
                        className="w-full bg-white border border-[#EAE3DF] rounded-xl pl-9 pr-4 py-3 text-sm text-[#1A1514] outline-none focus:border-[#D92D20] transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D49] mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#5C4D49]">
                          <Mail size={14} />
                        </span>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="advait@company.in"
                          className="w-full bg-white border border-[#EAE3DF] rounded-xl pl-9 pr-4 py-3 text-sm text-[#1A1514] outline-none focus:border-[#D92D20] transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D49] mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#5C4D49]">
                          <Phone size={14} />
                        </span>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full bg-white border border-[#EAE3DF] rounded-xl pl-9 pr-4 py-3 text-sm text-[#1A1514] outline-none focus:border-[#D92D20] transition"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D49] mb-1">
                        Preferred Location Hub
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#5C4D49]">
                          <MapPin size={14} />
                        </span>
                        <select
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-white border border-[#EAE3DF] rounded-xl pl-9 pr-4 py-3 text-sm text-[#1A1514] outline-none focus:border-[#D92D20] transition appearance-none"
                        >
                          <option value="Bangalore">Bangalore Hub</option>
                          <option value="Mumbai">Mumbai Hub</option>
                          <option value="Delhi NCR">Delhi NCR Hub</option>
                          <option value="Hyderabad">Hyderabad Hub</option>
                          <option value="Pune">Pune Hub</option>
                          <option value="Chennai">Chennai Hub</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D49] mb-1">
                        Workspace Configuration
                      </label>
                      <input
                        type="text"
                        value={formData.plan}
                        onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                        placeholder="Configuration package name"
                        className="w-full bg-white border border-[#EAE3DF] rounded-xl px-4 py-3 text-sm text-[#1A1514] outline-none focus:border-[#D92D20] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5C4D49] mb-1">
                      Custom Office / Compliance Needs
                    </label>
                    <textarea
                      rows={3}
                      value={formData.needs}
                      onChange={(e) => setFormData({ ...formData, needs: e.target.value })}
                      placeholder="GST documentation questions, dedicated IT setup, special routing, secretarial services..."
                      className="w-full bg-white border border-[#EAE3DF] rounded-xl px-4 py-3 text-sm text-[#1A1514] outline-none focus:border-[#D92D20] transition resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#D92D20] hover:bg-[#B42318] text-white py-4 rounded-xl font-medium transition shadow-md flex items-center justify-center gap-2"
                    >
                      <Calendar size={16} />
                      <span>Request Live Setup Call</span>
                    </button>
                  </div>
                </motion.form>
              ) : isSubmitting ? (
                // Processing view
                <motion.div
                  key="submitting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-10 space-y-6"
                >
                  <Loader2 size={40} className="text-[#D92D20] animate-spin" />
                  <div className="text-center">
                    <h4 className="font-semibold text-[#1A1514] text-lg">Processing Workspace Payload</h4>
                    <p className="text-xs text-[#5C4D49] mt-1">Please keep this channel open for verification...</p>
                  </div>

                  {/* Pseudo terminal log output */}
                  <div className="w-full bg-[#1A1514] rounded-2xl p-4 font-mono text-[11px] text-[#FFB199] space-y-1.5 h-36 overflow-y-auto shadow-inner text-left">
                    {logs.map((log, index) => (
                      <div key={index} className="flex gap-2">
                        <span className="text-[#D92D20] font-bold">&gt;&gt;</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                // Success Receipt View
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-6"
                >
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <CheckCircle size={32} />
                  </div>

                  <div>
                    <h4 className="text-2xl font-semibold text-[#1A1514] tracking-tight">
                      Consultation Booked!
                    </h4>
                    <p className="text-sm text-[#5C4D49] mt-2 max-w-sm mx-auto">
                      Congratulations <b>{formData.name}</b>, your premium workspace allocation thread has been generated successfully.
                    </p>
                  </div>

                  {/* Summary Slip */}
                  <div className="bg-white border border-[#EAE3DF] rounded-2xl p-5 text-left text-xs space-y-2.5 max-w-md mx-auto shadow-sm">
                    <div className="flex justify-between border-b border-[#FAF8F5] pb-2 text-[10px] font-bold text-[#5C4D49]">
                      <span>TOKEN REFERENCE CODE</span>
                      <span className="font-mono text-[#D92D20]">
                        LV-{Math.floor(100000 + Math.random() * 900000)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5C4D49]">Representative Hub:</span>
                      <span className="font-semibold text-[#1A1514]">{formData.city} Regional</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5C4D49]">Service Selected:</span>
                      <span className="font-semibold text-[#1A1514]">{formData.plan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5C4D49]">Assigned Officer:</span>
                      <span className="font-semibold text-[#D92D20]">Priya Sharma (Corporate Expert)</span>
                    </div>
                    <div className="flex justify-between border-t border-[#FAF8F5] pt-2">
                      <span className="text-[#5C4D49]">Target Response Window:</span>
                      <span className="font-medium text-emerald-600">Within 35 minutes</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#5C4D49] bg-[#FAF8F5] border border-[#EAE3DF] py-2 px-4 rounded-xl max-w-xs mx-auto">
                    <ShieldCheck size={14} className="text-[#D92D20]" />
                    <span>GST documentation guide dispatched</span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={onClose}
                      className="bg-[#1A1514] hover:bg-[#2b2221] text-white px-6 py-3 rounded-xl text-sm font-medium transition"
                    >
                      Return to Website
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
