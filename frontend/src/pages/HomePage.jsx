import React from 'react';
import { Leaf, ShieldCheck, Truck, MapPin, Users, ChevronRight, Sparkles, Sprout, Heart, Star } from 'lucide-react';

export default function HomePage({ onShopClick }) {
  return (
    <div className="animate-fade-in space-y-16 pb-16">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-900 to-stone-900 text-white py-24 px-4 sm:px-6 lg:px-8 shadow-xl">
        {/* Background graphic */}
        <div className="absolute inset-0 opacity-15 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=1600"
            alt="Fresh veggies background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center space-x-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 animate-pulse">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Farm-To-Home Delivery in Chhattisgarh</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display font-black tracking-tight leading-none mb-6">
            Vaatika <span className="text-emerald-400">Zone</span>
          </h1>

          <p className="text-lg sm:text-xl text-emerald-100/90 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Sourcing the freshest fruits and organic vegetables from the farms of Raipur, Bhilai, and Durg, delivered straight to your kitchen within 24 hours of harvest.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onShopClick}
              className="group flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all hover:scale-105 active:scale-98 cursor-pointer"
            >
              <span>Explore Fresh Catalog</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* THREE VALUE PROP COLUMNS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-stone-900 mb-3">
            The Vaatika Guarantee
          </h2>
          <p className="text-stone-500 text-sm">
            We prioritize quality, freshness, and local commerce above everything else.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Leaf className="h-6 w-6 text-emerald-600" />,
              title: "100% Fresh & Organic",
              desc: "Cultivated using pure organic fertilizers and bio-pesticides. No artificial chemical sprays or ripening agents."
            },
            {
              icon: <Truck className="h-6 w-6 text-emerald-600" />,
              title: "Next-Day Morning Delivery",
              desc: "Harvested at dawn, packaged eco-friendly, and delivered directly to your doorstep in Raipur, Bhilai, and Durg the next morning."
            },
            {
              icon: <Users className="h-6 w-6 text-emerald-600" />,
              title: "Supporting Local Farmers",
              desc: "By eliminating middlemen, we pay fair wages directly to agricultural communities across Chhattisgarh."
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-100 rounded-3xl p-8 hover:shadow-lg transition-all hover:-translate-y-1 duration-300"
            >
              <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="font-display font-bold text-stone-800 text-lg mb-3">{item.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OUR ORIGIN STORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-md aspect-video lg:aspect-square">
            <img
              src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&q=80"
              alt="Farmers in organic field"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent flex items-end p-6">
              <p className="text-white font-display font-semibold text-lg flex items-center gap-2">
                <Sprout className="h-5 w-5 text-emerald-400" />
                Empowering 120+ Small Farmers in Chhattisgarh
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              Our Roots & Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-stone-900 leading-tight">
              Rooted in the Soil of Chhattisgarh
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Founded in 2023, Vaatika Zone started with a simple, powerful vision: to connect the hardworking organic farmers of Chhattisgarh directly with consumers in urban hubs like Raipur, Durg, and Bhilai. For years, traditional supply chains forced fresh produce through multiple layers of middlemen, resulting in days of transit, heavy chemical preservation, and unfair earnings for farmers.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              We bypassed this archaic model. By partnering directly with cooperative farming societies in local villages, we establish an integrated cold chain and a guaranteed transparent pricing matrix. Today, we supply nutrient-dense, chemical-free greens, root vegetables, and seasonal local fruits harvested at dawn and delivered to your doorstep within 24 hours.
            </p>
            <div className="border-t border-stone-200/60 pt-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="block font-display text-2xl font-black text-emerald-600">120+</span>
                <span className="text-stone-400 text-[10px] uppercase font-bold tracking-wider">Local Farms</span>
              </div>
              <div>
                <span className="block font-display text-2xl font-black text-emerald-600">10k+</span>
                <span className="text-stone-400 text-[10px] uppercase font-bold tracking-wider">Happy Families</span>
              </div>
              <div>
                <span className="block font-display text-2xl font-black text-emerald-600">24 Hrs</span>
                <span className="text-stone-400 text-[10px] uppercase font-bold tracking-wider">Harvest to Door</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-emerald-50/50 border-y border-emerald-100/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-stone-900 mb-3">
              How Vaatika Zone Works
            </h2>
            <p className="text-stone-500 text-sm">
              We have optimized our supply chain to ensure minimal transit times.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              { step: "01", title: "Place Order", desc: "Browse our dynamic seasonal catalog of vegetables and fruits and order." },
              { step: "02", title: "Midnight Harvest", desc: "Farmers harvest produce at midnight once orders are locked." },
              { step: "03", title: "Quality Check", desc: "We screen every apple, tomato, and orange at local hubs for grade checks." },
              { step: "04", title: "Eco Delivery", desc: "Delivered fresh to your address in Raipur, Bhilai or Durg in reusable bags." }
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center p-4">
                <span className="font-display text-4xl font-black text-emerald-200/70 mb-4 block">
                  {step.step}
                </span>
                <h3 className="font-display font-bold text-stone-800 text-base mb-2">{step.title}</h3>
                <p className="text-stone-500 text-xs leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGIONAL SOURCING & PHILOSOPHY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-stone-100 shadow-xs p-8 sm:p-12 md:flex md:items-center md:justify-between gap-10">
          <div className="max-w-xl mb-6 md:mb-0">
            <div className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-emerald-100">
              <MapPin className="h-3.5 w-3.5 text-emerald-600 animate-bounce" />
              <span>Chhattisgarh Region Sourcing</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-stone-900 mb-4 leading-tight">
              Sourced Locally from Chhattisgarh Farms
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              Our products are cultivated in the fertile agricultural belts around **Raipur**, **Bhilai**, and **Durg**. Because we serve only these locations, we consume 80% less carbon emissions in logistics compared to supermarkets that import from other states.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed mb-6">
              Our farming partners employ eco-friendly cultivation practices: utilizing crop rotations, vermicompost, and organic botanical pest controls instead of synthetic chemicals. This ensures your fruits and vegetables retain maximum nutrient integrity and natural flavor.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {['Raipur', 'Bhilai', 'Durg', 'Bilaspur', 'Rajnandgaon'].map((city) => (
                <span key={city} className="bg-stone-50 border border-stone-200 text-stone-600 text-xs font-semibold px-3 py-1.5 rounded-xl">
                  {city} Hub
                </span>
              ))}
            </div>
          </div>

          <div className="shrink-0 bg-gradient-to-br from-emerald-900 to-stone-900 text-white rounded-2xl p-8 max-w-xs md:max-w-sm w-full border border-emerald-800/30">
            <h3 className="font-display font-bold text-emerald-400 text-lg mb-4">The Vaatika Promise</h3>
            <ul className="space-y-4 text-xs text-stone-300">
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                <span>Harvested within 24 hours of delivery</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                <span>Pesticide-free testing on all batches</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                <span>Supporting fair-trade farming wages</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider inline-block mb-3">
            Voices of Chhattisgarh
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-stone-900">
            Loved by Families in Raipur, Bhilai & Durg
          </h2>
          <p className="text-stone-500 text-sm mt-2">
            Read what our community has to say about our farm-fresh quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "The difference in taste is incredible. The local Bhindi and tomatoes I ordered felt like they were plucked from a backyard garden. Delivered right to my apartment in Raipur by 7:30 AM!",
              author: "Priyanka Sahu",
              location: "Raipur (CG)"
            },
            {
              quote: "I am very conscious of pesticide residue for my kids. Knowing that Vaatika Zone tests their batches and sources directly from organic cooperative farms around Durg gives me huge peace of mind.",
              author: "Dr. Alok Verma",
              location: "Durg (CG)"
            },
            {
              quote: "Excellent packaging! They delivered my mangoes and leafy greens in reusable cotton bags. The quality was pristine—no yellowed leaves or bruised fruits. 10/10 service.",
              author: "Rohan Agrawal",
              location: "Bhilai (CG)"
            }
          ].map((t, idx) => (
            <div key={idx} className="bg-white border border-stone-100 rounded-3xl p-8 shadow-xs relative flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center text-amber-400 gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-current" />
                  ))}
                </div>
                <p className="text-stone-600 text-sm italic leading-relaxed mb-6">"{t.quote}"</p>
              </div>
              <div className="border-t border-stone-100 pt-4 flex justify-between items-center">
                <span className="font-display font-bold text-stone-800 text-sm">{t.author}</span>
                <span className="text-emerald-700 font-semibold text-xs">{t.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider inline-block mb-3">
            Have Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-stone-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-500 text-sm">
            Everything you need to know about our sourcing, delivery, and quality guarantee.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Where exactly is the produce sourced from?",
              a: "We partner directly with certified organic farmer cooperatives in the agricultural belts surrounding Raipur, Bhilai, and Durg. This includes villages in Dhamtari, Abhanpur, and Patan, utilizing the fertile soils of the Mahanadi basin."
            },
            {
              q: "What is the order cutoff time for next-day delivery?",
              a: "To guarantee dawn-harvested freshness, orders must be placed before 10:00 PM. Once the order window closes, our harvest schedules are sent to the farms so picking begins at midnight."
            },
            {
              q: "How does the Return & Quality Policy work?",
              a: "If you receive any vegetable or fruit that does not meet your freshness standards, you can return it to our delivery partner right at your doorstep. We will issue a 100% refund to your wallet or original payment mode, no questions asked."
            },
            {
              q: "Do you use single-use plastics for packaging?",
              a: "No! In alignment with our organic values, we package all produce in eco-friendly paper bags and reusable cotton/jute delivery bags. You can hand back our delivery bags on your next order to reduce waste."
            }
          ].map((faq, idx) => (
            <details
              key={idx}
              className="group bg-white border border-stone-100 rounded-2xl p-6 transition-all duration-300 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
            >
              <summary className="flex items-center justify-between font-display font-bold text-stone-800 text-sm sm:text-base select-none cursor-pointer">
                <span>{faq.q}</span>
                <span className="ml-1.5 transition-transform duration-300 group-open:-rotate-180 text-emerald-600">
                  ▼
                </span>
              </summary>
              <p className="mt-4 text-xs sm:text-sm text-stone-550 leading-relaxed border-t border-stone-100 pt-4 cursor-default">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-900 to-stone-900 text-white rounded-3xl p-12 text-center shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="font-display font-black text-2xl sm:text-4xl mb-4 leading-tight">
              Ready to Taste the Freshness?
            </h2>
            <p className="text-stone-300 text-sm mb-8 leading-relaxed font-light">
              Explore our fresh inventory of local fruits and farm vegetables today. Log in now and get free next-morning home delivery.
            </p>
            <button
              onClick={onShopClick}
              className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-8 py-4 rounded-xl shadow-lg transition-all hover:scale-105 active:scale-98 cursor-pointer"
            >
              <span>Start Shopping</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          {/* Abstract background graphics */}
          <div className="absolute -left-20 -bottom-20 opacity-10 pointer-events-none">
            <svg width="250" height="250" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 C75 25 100 50 100 75 C100 100 75 100 50 100 C25 100 0 100 0 75 C0 50 25 25 50 0 Z" />
            </svg>
          </div>
        </div>
      </section>

    </div>
  );
}
