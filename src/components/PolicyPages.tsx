import React, { useState } from 'react';
import { useStore } from '../context/StoreContext.js';
import {
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Clock,
  HelpCircle,
  Send,
  FileText,
  RotateCcw,
  Truck
} from 'lucide-react';

export const PolicyPages: React.FC = () => {
  const { activePage, showToast } = useStore();
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Your message has been sent to SAFTY MART support team!', 'success');
    setContactName('');
    setContactEmail('');
    setContactMsg('');
  };

  if (activePage === 'about') {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="bg-amber-100 text-amber-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
            About SAFTY MART
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Your Home. Our Priority.</h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            SAFTY MART was founded with a singular mission: to protect Indian families, children, and seniors by engineering certified, easy-to-install home safety devices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2 text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-black text-slate-900">Lab Certified Safety</h3>
            <p className="text-xs text-slate-500">BPA-free non-toxic materials engineered for maximum impact protection.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2 text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-black text-slate-900">Pan-India Express Delivery</h3>
            <p className="text-xs text-slate-500">Fast shipping with full PayU online payment protection & Cash on Delivery.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2 text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-black text-slate-900">7-Day No-Questions Return</h3>
            <p className="text-xs text-slate-500">Hassle-free 100% refund policy if products don't fit your home needs.</p>
          </div>
        </div>
      </div>
    );
  }

  if (activePage === 'contact') {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-slate-900 uppercase">Contact Safety Support</h1>
          <p className="text-xs text-slate-500">Have a question about child-proofing or product compatibility? We're here 24/7.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-6">
            <h3 className="text-lg font-black text-amber-400">SAFTY MART Headquarters</h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>123, Safety Street, Okhla Industrial Area Phase-3, New Delhi – 110020, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                <span>+91 98765 43210 (Toll Free)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                <span>support@saftymart.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Mon – Sat: 9:00 AM – 7:00 PM IST</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleContactSubmit} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <h3 className="text-base font-black text-slate-900">Send us a message</h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Email</label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
              <textarea
                required
                rows={4}
                value={contactMsg}
                onChange={(e) => setContactMsg(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black py-3 rounded-xl shadow-md transition-all text-xs flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (activePage === 'faq') {
    const faqs = [
      { q: 'How do I pay securely on SAFTY MART?', a: 'We use PayU India payment gateway with SHA512 signature encryption supporting UPI, Credit Cards, Debit Cards, and Netbanking. Cash on Delivery (COD) is also available across 25,000+ pincodes.' },
      { q: 'Are SAFTY MART child safety products non-toxic?', a: 'Yes! All baby gates, corner guards, and cabinet locks are made from medical grade, BPA-free, non-toxic materials safe for infants.' },
      { q: 'What if a product doesn\'t fit my door or window frame?', a: 'We offer a 7-day hassle-free return and exchange policy. Simply initiate a request from your orders tab.' },
      { q: 'How long does shipping take?', a: 'Orders are dispatched within 24 hours. Delivery takes 2-4 business days depending on your location.' }
    ];

    return (
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-2xl font-black text-slate-900 text-center uppercase">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <h3 className="text-xs font-extrabold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                {f.q}
              </h3>
              <p className="text-xs text-slate-600 pl-6 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white my-8 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs text-slate-700 leading-relaxed">
      <h1 className="text-xl font-black text-slate-900 uppercase border-b border-slate-200 pb-3">
        SAFTY MART Store Policy ({activePage.toUpperCase()})
      </h1>
      <p>
        Welcome to SAFTY MART. All purchases made on saftymart.in are subject to our standard quality verification, 256-bit encryption security, PayU India payment authorization, and GST compliance standards.
      </p>
      <p>
        For inquiries regarding returns, order cancellations, or GST tax invoices, please contact our support team at support@saftymart.in or call +91 98765 43210.
      </p>
    </div>
  );
};
