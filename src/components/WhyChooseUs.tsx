import React from 'react';
import { Users, ShieldCheck, Wrench, Tag, Headphones } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: Users,
      title: 'Trusted by 10,000+',
      desc: 'Happy Indian Families'
    },
    {
      icon: ShieldCheck,
      title: 'Carefully Selected',
      desc: 'Safe & Lab-Tested Products'
    },
    {
      icon: Wrench,
      title: 'Easy to Install',
      desc: 'Anyone Can Use'
    },
    {
      icon: Tag,
      title: 'Affordable Prices',
      desc: 'Best Value for Money'
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      desc: "We're Here To Help"
    }
  ];

  return (
    <section className="py-10 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-lg sm:text-xl font-black text-slate-900 tracking-tight uppercase mb-8">
          WHY CHOOSE SAFTY MART?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {reasons.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center flex flex-col items-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-xs font-black text-slate-900 leading-snug">{r.title}</h3>
                <p className="text-[11px] text-slate-500 font-medium mt-1">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
