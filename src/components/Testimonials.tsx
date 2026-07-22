import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Neha Sharma',
      role: 'Verified Buyer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      comment: '"The baby gate is very sturdy and keeps my child safe. Great quality!"',
      rating: 5
    },
    {
      name: 'Rahul Verma',
      role: 'Verified Buyer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      comment: '"Fan cleaning duster is amazing. Cleaning is now so easy and safe."',
      rating: 5
    },
    {
      name: 'Pooja Mehta',
      role: 'Verified Buyer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      comment: '"Good products at affordable prices. Fast delivery and good support."',
      rating: 5
    },
    {
      name: 'Amit Khanna',
      role: 'Verified Buyer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      comment: '"Stair safety net quality is excellent. Feels very safe for kids and pets."',
      rating: 5
    }
  ];

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
              WHAT OUR CUSTOMERS SAY
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Real feedback from verified parents and homeowners</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 italic font-medium leading-relaxed">{r.comment}</p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover border-2 border-amber-300" />
                <div>
                  <h4 className="text-xs font-black text-slate-900">{r.name}</h4>
                  <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {r.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
