import React from 'react';
import { useStore } from '../context/StoreContext.js';
import {
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, setActiveCategory } = useStore();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-amber-400 text-slate-950 rounded-xl flex items-center justify-center font-black">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-lg font-black text-white tracking-tight">
                SAFTY <span className="text-amber-500">MART</span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed font-normal">
              We provide smart and reliable home safety solutions to protect what matters most – Your Family.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 font-medium">
              <li><button onClick={() => setActivePage('home')} className="hover:text-amber-400 transition-colors">Home</button></li>
              <li><button onClick={() => setActivePage('shop')} className="hover:text-amber-400 transition-colors">Shop All Products</button></li>
              <li><button onClick={() => { setActiveCategory('Home Safety'); setActivePage('shop'); }} className="hover:text-amber-400 transition-colors">Home Safety Solutions</button></li>
              <li><button onClick={() => setActivePage('shop')} className="hover:text-amber-400 transition-colors">New Arrivals</button></li>
              <li><button onClick={() => setActivePage('shop')} className="hover:text-amber-400 transition-colors">Best Sellers</button></li>
              <li><button onClick={() => setActivePage('contact')} className="hover:text-amber-400 transition-colors">Contact Us</button></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              CUSTOMER SERVICE
            </h4>
            <ul className="space-y-2 font-medium">
              <li><button onClick={() => setActivePage('track-order')} className="hover:text-amber-400 transition-colors">Track Order</button></li>
              <li><button onClick={() => setActivePage('shipping')} className="hover:text-amber-400 transition-colors">Shipping Policy</button></li>
              <li><button onClick={() => setActivePage('refund')} className="hover:text-amber-400 transition-colors">Refund & Returns Policy</button></li>
              <li><button onClick={() => setActivePage('faq')} className="hover:text-amber-400 transition-colors">Frequently Asked Questions</button></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              INFORMATION
            </h4>
            <ul className="space-y-2 font-medium">
              <li><button onClick={() => setActivePage('about')} className="hover:text-amber-400 transition-colors">About Us</button></li>
              <li><button onClick={() => setActivePage('terms')} className="hover:text-amber-400 transition-colors">Terms & Conditions</button></li>
              <li><button onClick={() => setActivePage('privacy')} className="hover:text-amber-400 transition-colors">Privacy Policy</button></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              CONTACT US
            </h4>
            <div className="flex items-start gap-2.5 text-slate-400">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>123, Safety Street, New Delhi – 110001, India</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-400">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-400">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>support@saftymart.in</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-400">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Mon – Sat: 9:00 AM – 7:00 PM</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Payment Icons */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-500 font-medium text-center sm:text-left">
            © 2026 SAFTY MART. All Rights Reserved. Built for Indian Home Security.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase font-bold text-slate-500">100% Secure Payments:</span>
            <div className="flex items-center gap-2 font-black text-[10px] text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="text-amber-400">UPI</span> |
              <span className="text-blue-400">VISA</span> |
              <span className="text-red-400">MasterCard</span> |
              <span className="text-emerald-400">RuPay</span> |
              <span className="text-sky-400">PayTM</span> |
              <span className="text-orange-400 font-extrabold">PayU</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Support Button */}
      <a
        href="https://wa.me/919876543210?text=Hi%20SAFTY%20MART,%20I%20have%20a%20question%20about%20home%20safety%20products."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center group"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-500" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-0 group-hover:pl-2">
          Chat with Us
        </span>
      </a>
    </footer>
  );
};
