import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { useStore } from '../context/StoreContext.js';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      showToast('Thank you for subscribing to SAFTY MART safety tips!', 'success');
      setEmail('');
    }
  };

  return (
    <section className="bg-slate-900 text-white py-10 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 bg-amber-400 text-slate-950 rounded-2xl flex items-center justify-center shrink-0 hidden sm:flex">
              <Mail className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight uppercase text-amber-400">
                SUBSCRIBE TO OUR NEWSLETTER
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                Get latest updates on new arrivals, safety offers & child-proofing guides.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full md:w-auto items-center max-w-md bg-slate-800 rounded-xl overflow-hidden border border-slate-700 p-1">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 text-xs text-white placeholder-slate-400 bg-transparent focus:outline-hidden"
            />
            <button
              type="submit"
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs px-6 py-2.5 rounded-lg transition-all shrink-0 uppercase tracking-wider flex items-center gap-1.5"
            >
              <span>SUBSCRIBE</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
