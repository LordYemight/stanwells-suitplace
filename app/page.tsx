'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Ruler, 
  Globe, 
  Tag, 
  Star, 
  Heart, 
  Truck, 
  ArrowRight, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Menu, 
  X,
  ImageOff,
  Quote,
  CheckCircle2
} from 'lucide-react';

// --- Types & Data ---

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1583858724329-c4435da852a5?auto=format&fit=crop&w=1920&q=80",
  about: "https://images.unsplash.com/photo-1625036806858-6a74ab2400e3?auto=format&fit=crop&w=900&q=80",
  products: [
    "https://images.unsplash.com/photo-1585412459165-5d94703e964b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1735195679343-4d39bb6487e8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1658859186520-99b3c627675e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1680774448666-971c04ae160f?auto=format&fit=crop&w=800&q=80"
  ],
  gallery: [
    "https://images.unsplash.com/photo-1741867667832-c90655349fe7?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1598850251936-6da37f83ff83?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1642764873855-934ed87e79e1?auto=format&fit=crop&w=800&q=80"
  ]
};

const BRAND = {
  name: "Stanwells Suitplace",
  tagline: "Tailored Perfection for the Modern Gentleman.",
  description: "Stanwells Suitplace delivers uncompromising quality in bespoke tailoring and luxury footwear, crafted for distinction in every setting.",
  industry: "fashion",
  region: "nigeria",
  currency: "₦"
};

const PRODUCTS = [
  {
    name: "The Executive Tuxedo",
    description: "Hand-stitched Italian wool tuxedo, perfect for black-tie events. Fully canvassed construction.",
    price: "₦450,000",
    image: IMAGES.products[0]
  },
  {
    name: "Cap-Toe Oxford Shoes",
    description: "Calfskin leather Oxford shoes, Blake stitched for durability and elegance.",
    price: "₦125,000",
    image: IMAGES.products[1]
  },
  {
    name: "Signature Bespoke Shirt",
    description: "Egyptian cotton shirt, custom collar and cuff design. Monogramming included.",
    price: "₦45,000",
    image: IMAGES.products[2]
  },
  {
    name: "Hand-Finished Leather Belt",
    description: "Reversible full-grain leather belt with brushed nickel buckle.",
    price: "₦32,000",
    image: IMAGES.products[3]
  }
];

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-secondary/50 border border-white/10 ${className}`}>
        <ImageOff size={32} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}

const useScrollReveal = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

// --- Page Content ---

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-secondary/90 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <span className="font-heading text-3xl font-black text-accent tracking-tighter group-hover:scale-110 transition-transform">
              SS
            </span>
            <span className="text-white/90 text-[10px] font-mono tracking-[0.3em] uppercase hidden sm:block">
              {BRAND.name}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            <a href="#products" className="text-sm font-medium tracking-widest text-white/70 hover:text-accent transition-colors">SUITS & SHOES</a>
            <a href="#about" className="text-sm font-medium tracking-widest text-white/70 hover:text-accent transition-colors">OUR STORY</a>
            <a href="#contact" className="bg-accent text-white px-6 py-2.5 rounded-full font-bold text-xs tracking-widest hover:brightness-110 transition-all">
              REQUEST A FIT
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <div className="relative w-[80%] max-w-sm h-full bg-secondary p-10 flex flex-col animate-slideIn">
            <button className="self-end text-white mb-12" onClick={() => setIsMenuOpen(false)}>
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8">
              <a href="#products" onClick={() => setIsMenuOpen(false)} className="text-2xl font-heading font-bold text-white">Suits & Shoes</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-2xl font-heading font-bold text-white">Our Story</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-2xl font-heading font-bold text-accent">Request a Fit</a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 z-0">
          <SafeImage src={IMAGES.hero} alt="Luxury Suit" fill className="object-cover opacity-40" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/40 to-secondary" />
        </div>
        
        {/* Decorative Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] animate-float" />

        <div className="relative z-10 text-center max-w-5xl px-6">
          <h1 className="font-heading text-6xl md:text-8xl font-bold text-white leading-[1.1] mb-8 animate-slideUp">
            Crafting Your Legacy, <br className="hidden md:block" /> One Stitch at a Time.
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-slideUp delay-200">
            {BRAND.description} Sharp tailoring, worldwide delivery.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slideUp delay-300">
            <a href="#contact" className="w-full sm:w-auto bg-accent text-white px-10 py-4 rounded-full font-bold text-sm tracking-widest hover:brightness-110 hover:scale-105 transition-all">
              BOOK A SESSION
            </a>
            <a href="#products" className="w-full sm:w-auto border border-white/30 text-white px-10 py-4 rounded-full font-bold text-sm tracking-widest hover:bg-white hover:text-secondary transition-all">
              VIEW COLLECTION
            </a>
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section id="products" className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">The Suit Vault</h2>
              <p className="text-white/50">Explore our core collections in tailoring and accessories. Hand-crafted excellence for the modern icon.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product, idx) => (
              <div key={idx} className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-500">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <SafeImage src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-60" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-white/40 text-sm line-clamp-2 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-accent font-bold">{product.price}</span>
                    <a href="#contact" className="text-white hover:text-accent transition-colors">
                      <ArrowRight size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Why Stanwells?</h2>
            <p className="text-white/50">The hallmarks of true craftsmanship. Quality wey go loud.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Bespoke Consultation", desc: "Personalized fittings with our master tailors to achieve your perfect silhouette.", icon: Ruler },
              { title: "Global Reach", desc: "Exceptional tailoring delivered to your doorstep, anywhere in the world.", icon: Globe },
              { title: "Fine Materials", desc: "Sourced only the finest wools, silks, and premium leathers available.", icon: Tag }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-3xl bg-secondary border border-white/5 hover:border-accent/30 transition-all group">
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent transition-all duration-500">
                  <f.icon className="text-accent group-hover:text-white transition-colors" size={28} />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4">{f.title}</h3>
                <p className="text-white/40 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Stats Split */}
      <section id="about" className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px] rounded-3xl overflow-hidden group">
            <SafeImage src={IMAGES.about} alt="About Stanwells" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute inset-0 bg-accent/10" />
          </div>
          
          <div>
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-8">The Stanwells Standard</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10">
              For over a decade, Stanwells Suitplace has stood as Lagos&apos;s premier destination for men who understand that presentation is paramount. 
              We blend traditional European craftsmanship with local flair to create pieces that are truly yours. 
              Whether it&apos;s a boardroom meeting or a grand wedding, we ensure you stand out with quiet confidence.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {[
                { n: "10+", l: "Years of Mastery", i: Star },
                { n: "200+", l: "Satisfied Grooms", i: Heart },
                { n: "100+", l: "Global Deliveries", i: Truck }
              ].map((s, idx) => (
                <div key={idx} className="flex flex-col">
                  <s.i className="text-accent mb-2" size={24} />
                  <span className="text-3xl font-heading font-bold text-white">{s.n}</span>
                  <span className="text-xs uppercase tracking-widest text-white/40">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Masonry */}
      <section className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Elite Endorsements</h2>
            <p className="text-white/50">Voices from our esteemed clientele.</p>
          </div>

          <div className="columns-1 md:columns-2 gap-8 space-y-8">
            {[
              { name: "Mr. Adekunle J.", role: "CEO, Oil & Gas", text: "The fit on my wedding suit was flawless. A true investment piece that speaks volumes. The attention to detail is simply unmatched in West Africa." },
              { name: "Dr. Chinedu O.", role: "Venture Capitalist", text: "My go-to for business travel. The shoes are comfortable yet undeniably sharp. Stanwells understands the value of time and quality." }
            ].map((t, i) => (
              <div key={i} className="break-inside-avoid bg-secondary p-10 rounded-3xl border border-white/5 relative group">
                <Quote size={60} className="absolute -top-4 -right-4 text-white/5 group-hover:text-accent/10 transition-colors" />
                <p className="text-white/80 text-xl italic font-heading leading-relaxed mb-8 relative z-10">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold font-heading">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white tracking-tight">{t.name}</h4>
                    <p className="text-accent/60 text-xs uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section C2 */}
      <section id="contact" className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="font-heading text-5xl font-bold mb-6">Bespoke Inquiry & Appointment</h2>
            <p className="text-white/50 text-lg mb-12">
              Ready for your standard of perfection? Fill out the form below or reach us directly via our luxury concierge.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Call / WhatsApp</h4>
                  <p className="text-white/50 text-sm mt-1">+234-XXXX-XXXXXX</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Email Inquiries</h4>
                  <p className="text-white/50 text-sm mt-1">inquiry@stanwells.ng</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white">Showroom Address</h4>
                  <p className="text-white/50 text-sm mt-1">Lekki Phase 1, Lagos, Nigeria</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 relative">
            {formSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-scaleIn">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} className="text-white" />
                </div>
                <h3 className="text-3xl font-heading font-bold mb-4">Request Received</h3>
                <p className="text-white/60">Our master clothier will reach out to you within 24 hours to schedule your fitting.</p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="mt-8 text-accent font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Full Name</label>
                    <input required type="text" className="w-full bg-secondary border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Phone Number</label>
                    <input required type="tel" className="w-full bg-secondary border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none transition-colors" placeholder="+234..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Email Address</label>
                  <input required type="email" className="w-full bg-secondary border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none transition-colors" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Interested In</label>
                  <select className="w-full bg-secondary border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none transition-colors">
                    <option>Bespoke Three-Piece Suit</option>
                    <option>Signature Footwear</option>
                    <option>Wedding Party Collection</option>
                    <option>Bespoke Accessories</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Message</label>
                  <textarea rows={4} className="w-full bg-secondary border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent outline-none transition-colors" placeholder="Tell us your requirements..."></textarea>
                </div>
                <button type="submit" className="w-full bg-accent text-white font-bold py-4 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2">
                  BOOK MY FITTING <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer F2 */}
      <footer className="py-20 bg-secondary border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <a href="#home" className="font-heading text-3xl font-black text-accent tracking-tighter block mb-6">SS</a>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                {BRAND.tagline} Nigeria&apos;s premier destination for luxury menswear.
              </p>
            </div>
            <div>
              <h5 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white mb-6">Collections</h5>
              <ul className="space-y-4">
                <li><a href="#products" className="text-white/40 hover:text-accent text-sm transition-colors">Bespoke Suits</a></li>
                <li><a href="#products" className="text-white/40 hover:text-accent text-sm transition-colors">Luxury Footwear</a></li>
                <li><a href="#products" className="text-white/40 hover:text-accent text-sm transition-colors">Signature Shirts</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white mb-6">Company</h5>
              <ul className="space-y-4">
                <li><a href="#about" className="text-white/40 hover:text-accent text-sm transition-colors">Our Story</a></li>
                <li><a href="#contact" className="text-white/40 hover:text-accent text-sm transition-colors">Process</a></li>
                <li><a href="#contact" className="text-white/40 hover:text-accent text-sm transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white mb-6">Follow Us</h5>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-accent hover:bg-accent/10 transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-accent hover:bg-accent/10 transition-all">
                  <Phone size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-xs">
              © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </p>
            <div className="flex gap-8">
              <span className="text-white/20 text-xs">Privacy Policy</span>
              <span className="text-white/20 text-xs">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}