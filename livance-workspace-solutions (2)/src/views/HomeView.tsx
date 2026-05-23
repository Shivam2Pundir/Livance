import React from "react";
import { Sparkles, ArrowRight, Award, TrendingUp, Star, ShieldCheck, CheckCircle2, ChevronRight, Building, Check, Clock } from "lucide-react";
import InteractiveLocations from "../components/InteractiveLocations";

interface HomeViewProps {
  onNavigate: (view: string, prefill?: string) => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  const [currentImgIndex, setCurrentImgIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const heroImages = [
    "/src/assets/images/gurgaon_open_workspace_1779398526846.png",
    "/src/assets/images/gurgaon_meeting_room_1779398546797.png",
    "/src/assets/images/gurgaon_dedicated_desks_1779398569488.png"
  ];

  React.useEffect(() => {
    if (!isHovered) return;
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [isHovered, heroImages.length]);

  return (
    <div className="space-y-20 pb-20">
      
      {/* High-Fidelity Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FAF8F5] border-b border-[#EAE3DF]">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#D92D20]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#D25C38]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center relative">
          
          {/* Left Hero: Title & Dynamic Links */}
          <div className="space-y-8 w-full lg:col-span-7 xl:col-span-6 lg:pr-10 xl:pr-16">
            <div className="inline-flex items-center gap-2 bg-[#FFF1EC] text-[#D92D20] border border-[#D25C38]/20 px-3.5 py-1.5 rounded-full">
              <Sparkles size={14} className="animate-spin" style={{ animationDuration: "12s" }} />
              <span className="uppercase tracking-[0.2em] text-[10px] font-extrabold">
                Gurgaon's Premier Enterprise Address
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[42px] xl:text-5xl 2xl:text-6xl font-semibold leading-[1.12] lg:leading-[1.10] tracking-tight text-[#1A1514] font-display">
              Workspace solutions built for <span className="text-[#D92D20] font-light italic">modern</span> Indian firms.
            </h1>

            <p className="text-base lg:text-lg text-[#5C4D49] leading-relaxed max-w-xl lg:max-w-md xl:max-w-lg">
              Establish a highly credible presence at DLF CyberCity, Gurgaon. From premium Virtual addresses to fully-contained private cabins and dedicated desks, we deliver seamless state compliance and operational luxury.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-2 pb-4 border-y border-[#EAE3DF] max-w-md lg:max-w-none">
              <div>
                <div className="text-xl md:text-2xl font-bold font-display text-[#1A1514]">Gurgaon Hub</div>
                <p className="text-[10px] text-[#5C4D49] font-medium uppercase mt-0.5">DLF CyberCity HQ</p>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold font-display text-[#1A1514]">100% Legal</div>
                <p className="text-[10px] text-[#5C4D49] font-medium uppercase mt-0.5 font-sans">GST & MCA Audited</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="text-xl md:text-2xl font-bold font-display text-[#1A1514] flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Immediate</span>
                </div>
                <p className="text-[10px] text-[#5C4D49] font-medium uppercase mt-0.5">Document Courier Speed</p>
              </div>
            </div>

            {/* Primary Action Button Group */}
            <div className="flex flex-wrap gap-4 pt-1">
              <button 
                onClick={() => onNavigate("virtual")}
                className="bg-[#D92D20] hover:bg-[#B42318] active:scale-95 text-white px-7 py-4 rounded-2xl transition font-semibold text-sm shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                id="btn-hero-virtual"
              >
                <span>Explore Virtual Office Page</span>
                <ArrowRight size={16} />
              </button>

              <button 
                onClick={() => onNavigate("dedicated")}
                className="border border-[#D25C38] text-[#D25C38] hover:bg-[#FFF1EC] active:scale-95 px-7 py-4 rounded-2xl transition font-semibold text-sm cursor-pointer"
                id="btn-hero-seats"
              >
                View Dedicated Seats Page
              </button>
            </div>
          </div>

          {/* Right Hero: High Quality Gurgaon Office Graphic with Hover transition */}
          <div className="relative w-full lg:col-span-5 xl:col-span-6">
            <div 
              className="aspect-[4/3] md:aspect-[3/2] lg:aspect-[1.15] xl:h-[510px] w-full rounded-[40px] overflow-hidden shadow-2xl border-4 border-white relative group cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false);
                setCurrentImgIndex(0);
              }}
            >
              {heroImages.map((imgSrc, idx) => {
                const offset = idx - currentImgIndex;
                return (
                  <img
                    key={imgSrc}
                    src={imgSrc}
                    alt={`Gurgaon elite corporate workplace lounge view ${idx + 1}`}
                    className="absolute inset-0 object-cover h-full w-full transition-transform duration-700 ease-in-out transform"
                    style={{
                      transform: `translateX(${offset * 100}%)`,
                      zIndex: idx === currentImgIndex ? 10 : 0,
                    }}
                    referrerPolicy="no-referrer"
                  />
                );
              })}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1514]/75 via-[#1A1514]/10 to-transparent z-15 pointer-events-none" />
              
              <div className="absolute bottom-8 left-8 right-8 text-white space-y-2 z-20 pointer-events-none">
                <div className="flex items-center gap-2 bg-[#D92D20] text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full w-fit">
                  <Award size={12} />
                  <span>PREMIUM GURGAON HQ</span>
                </div>
                <h3 className="text-2xl font-light tracking-tight font-display">
                  Corporate addressing with immediate state-compliance audit logs.
                </h3>
              </div>
            </div>


          </div>

        </div>
      </section>

      {/* Office Hub Selector (Gurgaon active, others coming soon) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 space-y-3">
          <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#D92D20]">
            Our Active Regional Network
          </span>
          <h2 className="text-4xl lg:text-5xl font-light font-display text-[#1A1514] tracking-tight">
            Our prime commercial <span className="font-semibold text-[#D92D20]">business hubs</span>
          </h2>
          <p className="text-sm text-[#5C4D49] max-w-xl mx-auto">
            The active office is fully functional in Gurgaon. Explore upcoming premium hub spaces and book a reservation or join target pre-sales waitlists.
          </p>
        </div>

        <InteractiveLocations 
          onHubSelected={(preset) => onNavigate("consultation", preset)} 
        />
      </section>

      {/* Beautiful High-Conversion Overview Cards (Call to Actions to Separate Pages) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Virtual Office Box CTA */}
          <div className="bg-white border border-[#EAE3DF] hover:border-[#D92D20]/40 rounded-[32px] p-8 lg:p-10 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D92D20]/5 rounded-bl-full pointer-events-none" />
            <div className="space-y-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF1EC] text-[#D92D20]">
                <ShieldCheck size={24} />
              </div>

              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-[#1A1514] font-display">Virtual Office Solutions Page</h3>
                <p className="text-sm text-[#5C4D49] mt-2 leading-relaxed">
                  Establish an official board address inside our prestigious Gurgaon space. Includes instant state GST registration agreement support, professional physical liaison proof, and secure courier dispatching.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#1A1514] font-semibold">
                  <CheckCircle2 size={14} className="text-[#D92D20]" />
                  <span>Legally compliant with all local MCA guidelines</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#1A1514] font-semibold">
                  <CheckCircle2 size={14} className="text-[#D92D20]" />
                  <span>Immediate rental agreements under 2 hours</span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#FAF8F5] mt-8 flex items-center justify-between">
              <span className="text-xs font-bold text-[#5C4D49]">Starting at ₹999/mo</span>
              <button 
                onClick={() => onNavigate("virtual")}
                className="inline-flex items-center gap-1 text-[#D92D20] font-bold text-sm hover:translate-x-1 transition cursor-pointer"
                id="cta-home-go-virtual"
              >
                <span>More Details</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Dedicated Seats Box CTA */}
          <div className="bg-[#1A1514] text-white rounded-[32px] p-8 lg:p-10 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group border border-[#1A1514] hover:border-[#D25C38]/40">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D25C38]/10 rounded-bl-full pointer-events-none" />
            <div className="space-y-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D25C38]/20 text-[#FFB199]">
                <Building size={24} />
              </div>

              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-[#FFB199] font-display">Dedicated Seats & Private Cabins</h3>
                <p className="text-sm text-[#D8CFCB] mt-2 leading-relaxed">
                  Walk in to our luxury Gurgaon physical center. Choose between dedicated single ergonomic desks, sound-proof focus cabins, and highly collaborative shared team tables.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#D8CFCB] font-semibold">
                  <CheckCircle2 size={14} className="text-[#FFB199]" />
                  <span>Herman Miller Chairs & Gigabit Redundant Fiber</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#D8CFCB] font-semibold">
                  <CheckCircle2 size={14} className="text-[#FFB199]" />
                  <span>Fully-furnished executive lockers & meeting hours</span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#EAE3DF]/10 mt-8 flex items-center justify-between">
              <span className="text-xs font-bold text-[#D8CFCB]">Dedicated starts from ₹8,000/- per month</span>
              <button 
                onClick={() => onNavigate("dedicated")}
                className="inline-flex items-center gap-1 text-[#FFB199] font-bold text-sm hover:translate-x-1 transition cursor-pointer"
                id="cta-home-go-dedicated"
              >
                <span>View Desk Cabin Layouts</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Beautiful High-Contrast Client Credentials */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-[#1A1514] rounded-[40px] p-12 lg:p-20 text-white text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#D92D20]/5 text-[280px] font-extrabold select-none pointer-events-none">
            LV
          </div>

          <div className="relative space-y-6 max-w-4xl mx-auto">
            <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#FFB199]">
              Corporate Credential Board
            </span>

            <div className="flex justify-center gap-1 text-[#FFB199]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#FFB199" color="#FFB199" />
              ))}
            </div>

            <h2 className="text-3xl lg:text-5xl font-light font-display leading-tight tracking-tight">
              “Livance helped us establish a modular corporate desk presence inside Gurgaon DLF CyberCity in days. The state-level GST address setup process is incredibly compliant.”
            </h2>

            <div className="pt-4">
              <p className="text-md font-semibold text-[#FFB199]">— Karthik Subramanian</p>
              <p className="text-xs text-[#D8CFCB] mt-1 font-medium">Founder & Managing Director, Indian SaaS Unicorn</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Inquiry Call to Action Section (Exactly where the arrow points) */}
      <section className="max-w-7xl mx-auto px-6 pt-4 pb-8">
        <div className="bg-white border border-[#EAE3DF] rounded-[32px] p-8 lg:p-12 shadow-sm grid md:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D92D20]/5 rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D25C38]/5 rounded-tr-full pointer-events-none" />
          
          <div className="md:col-span-6 space-y-4 relative z-10">
            <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#D92D20] bg-[#FFF1EC] px-3.5 py-1.5 rounded-full border border-[#D25C38]/10 w-fit inline-flex items-center gap-1.5">
              <Sparkles size={12} className="animate-pulse" />
              <span>Immediate Gurgaon Setup</span>
            </span>
            <h3 className="text-3xl font-semibold tracking-tight text-[#1A1514] font-display">
              Establish your premium <span className="text-[#D92D20] font-light italic">DLF CyberCity</span> address today.
            </h3>
            <p className="text-sm text-[#5C4D49] leading-relaxed max-w-md">
              Leave your details block opposite. Our dedicated onboarding team will immediately dispatch documentation compliance checks, custom layout options, and custom pricing worksheets.
            </p>
            
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-[#5C4D49] font-medium">
                <CheckCircle2 size={14} className="text-[#D92D20]" />
                <span>100% legal GST & MCA address compliance</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#5C4D49] font-medium">
                <CheckCircle2 size={14} className="text-[#D92D20]" />
                <span>Immediate agreement delivery via digital courier speed</span>
              </div>
            </div>
          </div>

          {/* Form Column - Small, highly polished column container */}
          <div className="md:col-span-6 bg-[#FAF8F5] p-6 lg:p-8 rounded-2xl border border-[#EAE3DF] relative z-10 shadow-inner">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF1EC] text-[#D92D20]">
                  <Check className="h-6 w-6 stroke-[3]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-[#1A1514]">Request Initiated!</h4>
                  <p className="text-xs text-[#5C4D49] max-w-xs mx-auto">
                    Thank you, <span className="font-semibold text-[#1A1514]">{name}</span>. An onboarding specialist will contact you at <span className="font-semibold text-[#1A1514]">{phone}</span> shortly.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="cta-name" className="text-[10px] font-bold text-[#5C4D49] uppercase tracking-wider block">
                    Full Name
                  </label>
                  <input
                    id="cta-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-white border border-[#EAE3DF] rounded-xl px-4 py-3 text-xs text-[#1A1514] outline-none focus:border-[#D92D20] transition placeholder:text-[#A89F9B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="cta-phone" className="text-[10px] font-bold text-[#5C4D49] uppercase tracking-wider block">
                      Phone Number
                    </label>
                    <input
                      id="cta-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 99999 99999"
                      className="w-full bg-white border border-[#EAE3DF] rounded-xl px-4 py-3 text-xs text-[#1A1514] outline-none focus:border-[#D92D20] transition placeholder:text-[#A89F9B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="cta-email" className="text-[10px] font-bold text-[#5C4D49] uppercase tracking-wider block">
                      Email Address
                    </label>
                    <input
                      id="cta-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-white border border-[#EAE3DF] rounded-xl px-4 py-3 text-xs text-[#1A1514] outline-none focus:border-[#D92D20] transition placeholder:text-[#A89F9B]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#D92D20] hover:bg-[#B42318] disabled:bg-[#EAE3DF] text-white py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-xs hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Registering...</span>
                  ) : (
                    <>
                      <span>Get Instant Quotation</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      
    </div>
  );
}
