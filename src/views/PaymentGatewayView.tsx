import React, { useState, useEffect } from "react";
import { CreditCard, Building, ShieldCheck, CircleCheck as CheckCircle2, RefreshCw, Smartphone, CircleAlert as AlertCircle, FileText, ArrowLeft, ArrowRight, Lock, Sparkles, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PaymentPlan {
  title: string;
  level: string;
  standardYearly: string;
  discountedYearly: string;
  monthlyEquivalent: string;
  billing: string;
}

interface PaymentGatewayViewProps {
  plan: PaymentPlan;
  onCancel: () => void;
  onPaymentSuccess: (details: {
    transactionId: string;
    amountPaid: string;
    planTitle: string;
  }) => void;
}

export default function PaymentGatewayView({ plan, onCancel, onPaymentSuccess }: PaymentGatewayViewProps) {
  const [activeTab, setActiveTab] = useState<"card" | "upi" | "netbanking">("card");
  
  // Card Form State
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  
  // UPI Form State
  const [upiId, setUpiId] = useState("");
  
  // Net banking State
  const [selectedBank, setSelectedBank] = useState("");

  // Payment progress animation simulator state
  const [paymentStep, setPaymentStep] = useState<"idle" | "processing" | "authenticating" | "finalizing" | "success">("idle");
  const [progressText, setProgressText] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [countdown, setCountdown] = useState(899); // 14:59 minutes

  // Format countdown
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute pricing
  const basePriceString = plan.discountedYearly.replace(/[^0-9]/g, "");
  const basePrice = parseInt(basePriceString, 10) || 12000;
  const cgst = Math.round(basePrice * 0.09); // 9% CGST
  const sgst = Math.round(basePrice * 0.09); // 9% SGST
  const totalAmount = basePrice + cgst + sgst;

  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(totalAmount);

  const formattedBase = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(basePrice);

  const formattedCgst = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(cgst);

  const formattedSgst = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(sgst);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 16) {
      // Add spaces every 4 digits
      const formatted = val.replace(/(.{4})/g, "$1 ").trim();
      setCardNumber(formatted);
    }
  };

  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 4) {
      const formatted = val.length >= 3 ? `${val.slice(0, 2)}/${val.slice(2)}` : val;
      setCardExpiry(formatted);
    }
  };

  const startPaymentSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validations
    if (activeTab === "card") {
      if (cardNumber.replace(/\s/g, "").length < 16 || cardExpiry.length < 5 || cardCvv.length < 3 || !cardName) {
        alert("Please complete all credit/debit card information standard fields.");
        return;
      }
    } else if (activeTab === "upi") {
      if (!upiId || !upiId.includes("@")) {
        alert("Please specify a valid UPI Virtual Private Address (VPA) descriptor.");
        return;
      }
    } else if (activeTab === "netbanking") {
      if (!selectedBank) {
        alert("Please select your national authorized banking institution.");
        return;
      }
    }

    setPaymentStep("processing");
    setProgressText("Initializing 256-bit bank handshakes...");

    setTimeout(() => {
      setPaymentStep("authenticating");
      setProgressText(`Awaiting authorization of ${formattedAmount} for Livance Corp Services...`);
    }, 1500);

    setTimeout(() => {
      setPaymentStep("finalizing");
      setProgressText("Generating Central MCA registry ledger tokens...");
    }, 3200);

    setTimeout(() => {
      const generatedTxn = `TXN-LIV-Y${Math.floor(100000 + Math.random() * 900000)}B`;
      setTransactionId(generatedTxn);
      setPaymentStep("success");
      
      setTimeout(() => {
        onPaymentSuccess({
          transactionId: generatedTxn,
          amountPaid: formattedAmount,
          planTitle: plan.title
        });
      }, 2000);
    }, 4800);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      
      {/* Back link */}
      <button 
        onClick={onCancel}
        className="inline-flex items-center gap-2 text-sm text-[#5C4D49] hover:text-[#D92D20] font-semibold transition cursor-pointer"
      >
        <ArrowLeft size={16} />
        <span>Modify address plan details</span>
      </button>

      {/* Grid Layout: Invoice Summary vs Payment Box */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Invoice Details) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#EAE3DF] rounded-[32px] p-6 lg:p-8 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#D92D20]">Secure Vault checkout</span>
                <h2 className="text-xl font-bold text-[#1A1514] font-display">Plan Invoice</h2>
              </div>
              <div className="bg-[#FAF8F5] border border-[#EAE3DF] rounded-2xl px-3 py-1.5 text-right">
                <span className="block text-[8px] uppercase tracking-wider text-[#5C4D49] font-bold">Expires in</span>
                <span className="font-mono text-xs font-semibold text-[#D92D20]">{formatCountdown(countdown)}</span>
              </div>
            </div>

            {/* Plan Card Detail */}
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EAE3DF] space-y-2">
              <span className="text-[9px] bg-[#D92D20]/10 text-[#D92D20] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                {plan.level}
              </span>
              <h3 className="text-base font-bold text-[#1A1514]">{plan.title}</h3>
              <p className="text-xs text-[#5C4D49] leading-relaxed font-medium">Billed Annually (Haryana Compliance Address)</p>
            </div>

            {/* Ledger breakdown */}
            <div className="space-y-3.5 pt-4 text-xs">
              <div className="flex justify-between items-center text-[#5C4D49]">
                <span>Annual Base Rate</span>
                <span className="font-semibold text-[#1A1514]">{formattedBase}</span>
              </div>
              
              <div className="flex justify-between items-center text-[#5C4D49]">
                <span>CGST (9%) <span className="text-[9px] text-neutral-400 font-mono">SAC:9982</span></span>
                <span className="font-semibold">{formattedCgst}</span>
              </div>

              <div className="flex justify-between items-center text-[#5C4D49]">
                <span>SGST (9%) <span className="text-[9px] text-neutral-400 font-mono">SAC:9982</span></span>
                <span className="font-semibold">{formattedSgst}</span>
              </div>

              <div className="flex justify-between items-center text-[#5C4D49] pt-2">
                <span className="text-[10px] text-emerald-600 font-bold uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Discount Code Applied</span>
                <span className="font-bold text-emerald-600">-{plan.standardYearly.replace(/[^0-9]/g, "") === "22000" ? "₹7,000" : plan.standardYearly.replace(/[^0-9]/g, "") === "18000" ? "₹6,000" : "₹5,000"}</span>
              </div>

              <div className="pt-4 border-t border-[#EAE3DF] flex justify-between items-baseline">
                <span className="text-sm font-bold text-[#1A1514]">Total Net Amount Payable</span>
                <span className="text-2xl font-bold text-[#D92D20] font-display">{formattedAmount}</span>
              </div>
            </div>

          </div>

          <div className="p-4 rounded-2xl bg-[#FFF1EC] border border-[#D25C38]/10 text-xs text-[#D92D20] leading-relaxed flex gap-3">
            <Info size={16} className="shrink-0 mt-0.5" />
            <span>
              All transactions are processed through 256-bit SSL tokenizations. Direct corporate tax invoices containing formal HSN credit paths are generated instantly.
            </span>
          </div>
        </div>

        {/* Right Column (Interactive Gateway) */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-[#EAE3DF] rounded-[32px] p-6 lg:p-10 shadow-sm relative overflow-hidden min-h-[500px]">
            
            <AnimatePresence mode="wait">
              
              {/* IDLE PAYMENT FORM SCREEN */}
              {paymentStep === "idle" && (
                <motion.div 
                  key="form-idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2.5">
                    <Lock size={20} className="text-[#D92D20]" />
                    <h3 className="text-lg font-bold text-[#1A1514] font-display">Select Payment Channel</h3>
                  </div>

                  {/* Payment Tabs */}
                  <div className="grid grid-cols-3 gap-2.5 bg-[#FAF8F5] p-1.5 rounded-2xl border border-[#EAE3DF]">
                    
                    <button
                      type="button"
                      onClick={() => setActiveTab("card")}
                      className={`py-3 px-2 rounded-xl text-xs font-bold transition flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                        activeTab === "card" 
                          ? "bg-white text-[#D92D20] shadow-xs border border-[#EAE3DF]" 
                          : "text-[#5C4D49] hover:text-[#D92D20]"
                      }`}
                    >
                      <CreditCard size={15} />
                      <span>Card Services</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("upi")}
                      className={`py-3 px-2 rounded-xl text-xs font-bold transition flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                        activeTab === "upi" 
                          ? "bg-white text-[#D92D20] shadow-xs border border-[#EAE3DF]" 
                          : "text-[#5C4D49] hover:text-[#D92D20]"
                      }`}
                    >
                      <Smartphone size={15} />
                      <span>UPI Integration</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("netbanking")}
                      className={`py-3 px-2 rounded-xl text-xs font-bold transition flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer ${
                        activeTab === "netbanking" 
                          ? "bg-white text-[#D92D20] shadow-xs border border-[#EAE3DF]" 
                          : "text-[#5C4D49] hover:text-[#D92D20]"
                      }`}
                    >
                      <Building size={15} />
                      <span>Net Banking</span>
                    </button>

                  </div>

                  {/* Dynamic Tab Body Form */}
                  <form onSubmit={startPaymentSimulation} className="space-y-5 pt-3">
                    
                    {/* TAB CARD DETAILED INPUTS */}
                    {activeTab === "card" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5C4D49] mb-1.5">
                            Credit/Debit Card Number
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              value={cardNumber}
                              onChange={handleCardNumberChange}
                              placeholder="4111 2222 3333 4444"
                              className="w-full bg-[#FAF8F5] border border-[#EAE3DF] rounded-xl pl-5 pr-12 py-3.5 text-sm text-[#1A1514] font-semibold outline-none focus:border-[#D92D20] transition font-mono tracking-widest"
                            />
                            <CreditCard size={18} className="absolute right-4 top-4 text-[#5C4D49]/50" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5C4D49] mb-1.5">
                              Expiry Date (MM/YY)
                            </label>
                            <input
                              type="text"
                              required
                              value={cardExpiry}
                              onChange={handleCardExpiryChange}
                              placeholder="08/29"
                              className="w-full bg-[#FAF8F5] border border-[#EAE3DF] rounded-xl px-5 py-3.5 text-sm text-[#1A1514] font-semibold outline-none focus:border-[#D92D20] transition font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5C4D49] mb-1.5">
                              Secure CVV/CVC
                            </label>
                            <input
                              type="password"
                              required
                              maxLength={3}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                              placeholder="•••"
                              className="w-full bg-[#FAF8F5] border border-[#EAE3DF] rounded-xl px-5 py-3.5 text-sm text-[#1A1514] font-semibold outline-none focus:border-[#D92D20] transition font-mono tracking-widest"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5C4D49] mb-1.5">
                            Name Printed on Card
                          </label>
                          <input
                            type="text"
                            required
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="e.g. Advait Singh"
                            className="w-full bg-[#FAF8F5] border border-[#EAE3DF] rounded-xl px-5 py-3.5 text-sm text-[#1A1514] font-semibold outline-none focus:border-[#D92D20] transition"
                          />
                        </div>
                      </div>
                    )}

                    {/* TAB UPI DETAILED INPUTS */}
                    {activeTab === "upi" && (
                      <div className="space-y-5">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5C4D49] mb-1.5">
                            UPI ID / Virtual Address (VPA)
                          </label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="e.g. name@gpay or phone@ybl"
                            className="w-full bg-[#FAF8F5] border border-[#EAE3DF] rounded-xl px-4 py-3.5 text-sm text-[#1A1514] font-bold outline-none focus:border-[#D92D20] transition font-sans placeholder-neutral-400"
                          />
                        </div>

                        <div className="flex items-center gap-4 py-4 px-5 bg-[#FAF8F5] rounded-2xl border border-[#EAE3DF]">
                          {/* Vector dynamic generated simulated QR */}
                          <div className="bg-white p-2.5 rounded-xl border border-[#EAE3DF] shrink-0">
                            <div className="w-24 h-24 bg-neutral-900 flex flex-col justify-between p-1.5 relative rounded-lg">
                              {/* Design a stylish mock QR layout */}
                              <div className="flex justify-between w-full">
                                <div className="w-5 h-5 border-[3px] border-white rounded-xs"></div>
                                <div className="w-5 h-5 border-[3px] border-white rounded-xs"></div>
                              </div>
                              <div className="flex justify-between w-full">
                                <div className="w-5 h-5 border-[3px] border-white rounded-xs"></div>
                                <div className="w-3.5 h-3.5 bg-white rounded-xs flex items-center justify-center text-[6px] font-extrabold text-[#D92D20] select-none scale-90">L</div>
                              </div>
                              {/* QR random decorative blocks */}
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-wrap w-10 h-10 px-1">
                                <div className="w-2 h-2 bg-white m-0.5 rounded-2xs"></div>
                                <div className="w-2 h-2 bg-white m-0.5 rounded-2xs"></div>
                                <div className="w-2 h-2 bg-white m-0.5 rounded-2xs"></div>
                                <div className="w-2 h-2 bg-white m-0.5 rounded-2xs"></div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-1.5">
                            <h4 className="text-xs font-bold text-[#1A1514]">Simulated Dynamic BharatQR Code</h4>
                            <p className="text-[10px] text-[#5C4D49] leading-relaxed">
                              Open any UPI app like GPay, PhonePe or Paytm to scan this QR. The final check amount of <b className="text-[#D92D20]">{formattedAmount}</b> will be loaded instantly to proceed.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB NET BANKING INPUTS */}
                    {activeTab === "netbanking" && (
                      <div className="space-y-4">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-[#5C4D49] mb-1">
                          Select Banking Institution
                        </label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-[#EAE3DF] rounded-xl px-4 py-3.5 text-sm text-[#1A1514] font-bold outline-none focus:border-[#D92D20] transition"
                        >
                          <option value="">-- Choose Authorized Institutional Bank --</option>
                          <option value="HDFC">HDFC Bank Corporate</option>
                          <option value="ICICI">ICICI Bank Retail</option>
                          <option value="SBI">State Bank of India Corporate</option>
                          <option value="AXIS">Axis Bank Retail</option>
                          <option value="KOTAK">Kotak Mahindra Bank</option>
                          <option value="YES">Yes Bank Limited</option>
                        </select>

                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 flex gap-2">
                          <AlertCircle size={15} className="shrink-0 mt-0.5" />
                          <span>Upon confirmation, you will be directed to the selected corporate banking landing gateway to sign standard verification challenges.</span>
                        </div>
                      </div>
                    )}

                    {/* Footer Lock Security & submission button */}
                    <div className="pt-6 border-t border-[#EAE3DF] space-y-4">
                      
                      <button
                        type="submit"
                        className="w-full bg-[#D92D20] hover:bg-[#B42318] text-white font-bold py-4 rounded-xl transition cursor-pointer flex items-center justify-center gap-2 shadow-md"
                      >
                        <ShieldCheck size={18} />
                        <span>Authorize Secure Payment {formattedAmount}</span>
                      </button>

                      <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 font-semibold font-mono uppercase tracking-widest text-center mt-2">
                        <Lock size={12} className="text-emerald-600" />
                        <span>PCI-DSS Regulatory Cryptographically Guarded</span>
                      </div>

                    </div>

                  </form>
                </motion.div>
              )}

              {/* PROCESSING LOADING SCREENS TYPE */}
              {(paymentStep === "processing" || paymentStep === "authenticating" || paymentStep === "finalizing") && (
                <motion.div
                  key="sim-loading"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-6"
                >
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full border-t-2 border-r-2 border-[#D92D20] animate-spin"></div>
                    <Lock size={18} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#D92D20]" />
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-base font-bold text-[#1A1514] font-display">Securing Transaction...</h4>
                    <p className="text-xs text-[#5C4D49] max-w-sm mx-auto font-medium font-mono border border-[#EAE3DF] bg-[#FAF8F5] px-4 py-1.5 rounded-full">
                      {progressText}
                    </p>
                  </div>
                  
                  <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider animate-pulse flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    <ShieldCheck size={12} />
                    <span>Secure Banking Token Activated</span>
                  </span>
                </motion.div>
              )}

              {/* DYNAMIC RETURNING COMPLIANT SUCCESS STATE */}
              {paymentStep === "success" && (
                <motion.div
                  key="sim-success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-6 bg-white"
                >
                  <div className="h-16 w-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center shadow-sm">
                    <CheckCircle2 size={36} className="animate-bounce" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-[#1A1514] font-display">Payment Succeeded!</h3>
                    <p className="text-xs text-[#5C4D49] font-medium leading-relaxed max-w-xs mx-auto">
                      Transaction was authorized successfully. Secure voucher reference token created:
                    </p>
                    <div className="bg-[#FAF8F5] border border-[#EAE3DF] rounded-xl font-mono text-sm py-2 px-4 inline-block font-bold text-[#1A1514] select-all">
                      {transactionId}
                    </div>
                  </div>

                  <div className="text-[10px] text-[#5C4D49] max-w-md bg-[#FAF8F5] border border-[#EAE3DF] px-4 py-3 rounded-2xl space-y-1">
                    <span className="font-extrabold text-[#D92D20] uppercase block">MCA Compliance Note:</span>
                    <span className="leading-relaxed block">Your digital rental NOC drafts and landlord certified deed files will auto-generate in the Workspace Planner. Redirecting now...</span>
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
