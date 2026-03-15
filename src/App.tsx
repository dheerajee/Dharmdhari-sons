import React from 'react';
import { motion } from 'motion/react';
import { 
  Sun, 
  Flame, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Leaf, 
  Phone, 
  MapPin, 
  ArrowRight, 
  CookingPot,
  History,
  TrendingUp,
  Cpu
} from 'lucide-react';
import SolarAssistant from './components/SolarAssistant';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#2D2D2D] font-sans selection:bg-orange-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-lg text-white">
              <Sun size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-orange-900">Dharmdhari Sons</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#evolution" className="hover:text-orange-600 transition-colors">Evolution</a>
            <a href="#benefits" className="hover:text-orange-600 transition-colors">Benefits</a>
            <a href="#scheme" className="hover:text-orange-600 transition-colors">Govt Scheme</a>
            <a href="#contact" className="bg-orange-500 text-white px-6 py-2.5 rounded-full hover:bg-orange-600 transition-all shadow-md hover:shadow-lg">
              Contact Us
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider mb-6">
              <Cpu size={14} />
              The Future of Cooking is Here
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 text-orange-950">
              LPG की कतार छोड़ें, <br />
              <span className="text-orange-600 italic serif">सोलर</span> अपनाएं।
            </h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-xl">
              दुनिया बदल रही है। अमेरिका, ईरान, इस्राइल के तनाव से ऊर्जा संकट गहरा रहा है। 
              समझदार वही है जो आज का भी इंतजाम रखे और आने वाले समय की तैयारी भी करे।
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="px-8 py-4 bg-orange-500 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-orange-200">
                Get Free Site Survey <ArrowRight size={20} />
              </a>
              <div className="flex items-center gap-4 px-6 py-4 bg-white border border-orange-100 rounded-2xl">
                <div className="text-orange-500">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase">Call Mr. Dheeraj</p>
                  <p className="font-bold">+91 7739 858585</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://picsum.photos/seed/solar-cooking/1000/1000" 
                alt="Solar Panel and Induction Cooking" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-orange-50 max-w-[240px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-100 p-2 rounded-lg text-green-600">
                  <Leaf size={20} />
                </div>
                <span className="font-bold text-green-900">100% Free Energy</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Solar panels provide free electricity for 30 years. No more LPG bills!
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Evolution Section */}
      <section id="evolution" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center mb-20">
          <h2 className="text-sm font-bold text-orange-500 uppercase tracking-[0.2em] mb-4">Evolution of Cooking</h2>
          <p className="text-4xl font-bold text-orange-950">समय के साथ बदलना ही समझदारी है</p>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          {[
            { icon: History, title: "मिट्टी का चूल्हा", desc: "लकड़ी और धुआँ (Past)", color: "bg-stone-100 text-stone-600" },
            { icon: Flame, title: "केरोसिन स्टोव", desc: "तकनीक की शुरुआत", color: "bg-blue-100 text-blue-600" },
            { icon: CookingPot, title: "LPG सिलेंडर", desc: "गैस चूल्हा का दौर", color: "bg-red-100 text-red-600" },
            { icon: Zap, title: "इंडक्शन चूल्हा", desc: "सोलर बिजली से मुफ्त खाना", color: "bg-orange-100 text-orange-600" }
          ].map((item, i) => (
            <div key={i} className="group p-8 rounded-[2rem] border border-gray-100 hover:border-orange-200 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-orange-50/30">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8 text-orange-950">इंडक्शन कूकर और चूल्हा के फायदे</h2>
            <div className="space-y-6">
              {[
                { icon: ShieldCheck, title: "सुरक्षित और साफ", desc: "कोई धुआँ नहीं, कोई आग का खतरा नहीं।" },
                { icon: Clock, title: "समय की बचत", desc: "खाना जल्दी बनता है और समय बचता है।" },
                { icon: Zap, title: "LPG से आजादी", desc: "सिलेंडर की कोई जरूरत नहीं, बिजली से चलता है।" },
                { icon: Leaf, title: "मुफ्त बिजली", desc: "सोलर पैनल के साथ खाना बनाना बिल्कुल मुफ्त।" }
              ].map((benefit, i) => (
                <div key={i} className="flex gap-6 p-6 bg-white rounded-3xl border border-orange-100 shadow-sm">
                  <div className="bg-orange-500/10 p-4 rounded-2xl text-orange-600 h-fit">
                    <benefit.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-orange-500 rounded-[3rem] p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10">
              <TrendingUp size={48} className="mb-8 opacity-50" />
              <h3 className="text-3xl font-bold mb-6 italic serif">"जो समय के साथ बदलता है, वही अपना भविष्य बनाता है।"</h3>
              <p className="text-orange-100 leading-relaxed mb-8">
                आज अगर हम सोलर अपनाते हैं और बिजली से खाना बनाना सीखते हैं, तो आने वाले समय में महंगी गैस और ऊर्जा संकट से बच सकते हैं।
              </p>
              <div className="h-1 w-20 bg-white/30 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Govt Scheme Section */}
      <section id="scheme" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#151619] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full -mb-48 -mr-48 blur-3xl" />
            
            <div className="max-w-3xl relative z-10">
              <div className="flex items-center gap-3 text-orange-400 font-bold uppercase tracking-widest text-sm mb-8">
                <Sun size={20} />
                PM Surya Ghar Muft Bijli Yojana
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-12 leading-tight">
                भारत सरकार दे रही है <br />
                <span className="text-orange-500">₹78,000</span> की सब्सिडी
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-8 mb-12">
                <div className="space-y-2">
                  <p className="text-orange-500 font-bold text-2xl">30 Years</p>
                  <p className="text-gray-400 text-sm">एक बार सोलर पैनल लगाने के बाद 30 सालों तक मुफ्त बिजली</p>
                </div>
                <div className="space-y-2">
                  <p className="text-orange-500 font-bold text-2xl">5.8% Loan</p>
                  <p className="text-gray-400 text-sm">सोलर पैनल पर आसान और सस्ता लोन सालाना ब्याज दर पर</p>
                </div>
              </div>

              <a href="#contact" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all">
                Apply Now <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl font-bold mb-8 text-orange-950">संपर्क करें</h2>
              <p className="text-gray-600 mb-12 leading-relaxed">
                Dharmdhari Sons आपके लिए फ्री साइट सर्वे लेकर आया है। सोलर पैनल सेटअप और साइट सर्वे करवाने के लिए हमें आज ही संपर्क करें।
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                    <Phone size={28} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium uppercase">Call Mr. Dheeraj Kumar</p>
                    <p className="text-2xl font-bold">+91 7739 858585</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium uppercase">Service Area</p>
                    <p className="text-2xl font-bold">Pan India Site Survey</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-orange-50">
              <h3 className="text-2xl font-bold mb-8">Request a Free Survey</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-400">Full Name</label>
                    <input type="text" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-400">Phone Number</label>
                    <input type="tel" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all" placeholder="+91" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-400">Location</label>
                  <input type="text" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all" placeholder="City, State" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-400">Message (Optional)</label>
                  <textarea className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-transparent focus:border-orange-500 focus:bg-white outline-none transition-all h-32 resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <button className="w-full py-5 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200">
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-orange-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-1.5 rounded-lg text-white">
              <Sun size={18} />
            </div>
            <span className="font-bold tracking-tight text-orange-900">Dharmdhari Sons</span>
          </div>
          <p className="text-sm text-gray-400">
            © 2026 Dharmdhari Sons Solar. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-orange-500">Privacy Policy</a>
            <a href="#" className="hover:text-orange-500">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* AI Assistant Component */}
      <SolarAssistant />
    </div>
  );
}
