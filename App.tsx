
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Globe,
  ShieldCheck,
  TrendingUp,
  Truck,
  Leaf,
  Anchor,
  Cpu,
  ChevronRight,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Zap,
  Star,
  Layers,
  Award
} from 'lucide-react';

// --- LOGO COMPONENT ---
const OrionLogo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <div className={`${className} flex items-center justify-center overflow-hidden`}>
    <img
      src="/logo.png"
      alt="Orion Bridge Co. Logo"
      className="w-full h-full object-contain"
      onError={(e) => {
        e.currentTarget.src = "https://api.dicebear.com/7.x/initials/svg?seed=OB&backgroundColor=f37321";
      }}
    />
  </div>
);

// --- ENHANCED PARTICLE COMPONENT ---
const ParticleBackground: React.FC = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * -20,
      opacity: Math.random() * 0.5 + 0.1
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5],
            y: ['0%', '-30%', '0%'],
            x: ['0%', '5%', '0%'],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
          className="absolute rounded-full bg-[#f37321] blur-[0.5px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
};

// --- PURE HTML/CSS 3D GLOBE ---
const FuturisticGlobe: React.FC = () => {
  return (
    <div className="relative w-full aspect-square max-w-[700px] flex items-center justify-center group overflow-visible">
      {/* Outer Glows */}
      <div className="absolute w-[140%] h-[140%] bg-[#f37321]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* 3D Globe Container - Responsive sizing */}
      <div className="relative w-64 h-64 md:w-[480px] md:h-[480px] preserve-3d">
        {/* Core Wireframe Sphere */}
        <motion.div
          className="w-full h-full absolute preserve-3d"
          animate={{ rotateY: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {/* Latitude Bands */}
          {[0, 30, 60, 90, 120, 150].map((deg) => (
            <div
              key={`lat-${deg}`}
              className="absolute inset-0 border border-white/5 rounded-full"
              style={{ transform: `rotateY(${deg}deg)` }}
            />
          ))}

          {/* Longitude Bands */}
          {[0, 45, 90, 135].map((deg) => (
            <div
              key={`long-${deg}`}
              className="absolute inset-0 border border-[#f37321]/10 rounded-full"
              style={{ transform: `rotateX(${deg}deg)` }}
            />
          ))}

          {/* Connection Hubs (Hotspots) with Mobile Corrections */}
          <style>{`
            .preserve-3d div[style*="rotateY"] {
                transform-style: preserve-3d;
            }
            @media (min-width: 768px) {
              .hotspot { transform: rotateY(var(--ry)) rotateX(var(--rx)) translateZ(240px) !important; }
            }
            @media (max-width: 767px) {
              /* w-64 is 256px, so translateZ is 128px */
              .hotspot { transform: rotateY(var(--ry)) rotateX(var(--rx)) translateZ(128px) !important; }
            }
          `}</style>

          {/* Re-rendering hubs with class for responsive 3d translation */}
          {[
            { ry: 0, rx: 0, color: "#f37321" },
            { ry: 100, rx: 30, color: "white" },
            { ry: 200, rx: -20, color: "white" },
            { ry: -40, rx: 40, color: "#f37321" },
            { ry: 60, rx: -45, color: "white" },
          ].map((point, i) => (
            <div
              key={`hotspot-${i}`}
              className="hotspot absolute w-3 h-3 md:w-4 md:h-4 rounded-full left-1/2 top-1/2 -ml-1.5 -mt-1.5 md:-ml-2 md:-mt-2"
              style={{
                '--ry': `${point.ry}deg`,
                '--rx': `${point.rx}deg`,
                backgroundColor: point.color,
                boxShadow: `0 0 15px ${point.color}`,
                color: point.color
              } as React.CSSProperties}
            >
              <div className="absolute inset-0 rounded-full animate-ping opacity-40 bg-current" />
            </div>
          ))}
        </motion.div>

        {/* Global Connection Routes (SVG Arcs with arrows) */}
        <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-20" viewBox="0 0 100 100">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3" markerHeight="3" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#f37321" />
            </marker>
            <filter id="neon-glow">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {[
            { d: "M20,50 Q50,0 80,50", dur: 3 },
            { d: "M10,30 Q50,-20 90,30", dur: 4 },
            { d: "M30,80 Q50,120 70,80", dur: 5 },
            { d: "M40,10 Q5,50 40,90", dur: 6 },
            { d: "M60,10 Q95,50 60,90", dur: 3.5 }
          ].map((route, i) => (
            <g key={`route-${i}`}>
              <path d={route.d} fill="none" stroke="#f37321" strokeWidth="0.5" strokeDasharray="2, 4" opacity="0.2" />
              <motion.path
                d={route.d}
                fill="none"
                stroke="#f37321"
                strokeWidth="1.2"
                filter="url(#neon-glow)"
                initial={{ pathLength: 0, pathOffset: 0 }}
                animate={{ pathOffset: [0, 1] }}
                transition={{
                  duration: route.dur,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.7
                }}
                style={{ pathLength: 0.15 }}
              />
              <motion.g>
                <circle r="1" fill="#f37321" filter="url(#neon-glow)">
                  <animateMotion
                    path={route.d}
                    dur={`${route.dur}s`}
                    repeatCount="indefinite"
                    calcMode="linear"
                    begin={`${i * 0.7}s`}
                  />
                </circle>
              </motion.g>
            </g>
          ))}
        </svg>

        {/* Floating Data Labels - Responsive Font and Positioning */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-12 -right-12 md:-top-16 md:-right-20 px-4 md:px-5 py-2 md:py-2.5 bg-slate-900/90 backdrop-blur-xl border border-[#f37321]/30 rounded-full text-[9px] md:text-[11px] font-bold text-white shadow-lg shadow-orange-600/10 z-10"
        >
          <span className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Conectamos marcas</span>
          </span>
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-8 -left-12 md:-bottom-12 md:-left-16 px-4 md:px-5 py-2 md:py-2.5 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-full text-[9px] md:text-[11px] font-bold text-orion-orange shadow-lg z-10"
        >
          <span className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#f37321] rounded-full animate-pulse" />
            <span>We connect brands</span>
          </span>
        </motion.div>
      </div>

      <style>{`
        .preserve-3d {
          transform-style: preserve-3d;
          perspective: 1200px;
        }
      `}</style>
    </div>
  );
};

// --- CORE COMPONENTS ---

const SectionHeader: React.FC<{ pt: string; en: string; subtitlePt?: string; subtitleEn?: string; centered?: boolean }> = ({ pt, en, subtitlePt, subtitleEn, centered = true }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`mb-16 ${centered ? 'text-center' : ''}`}
  >
    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
      <span className="block text-white mb-2">{pt}</span>
      <span className="block text-[#f37321] text-xl md:text-2xl font-medium uppercase tracking-widest">{en}</span>
    </h2>
    {(subtitlePt || subtitleEn) && (
      <div className="max-w-2xl mx-auto opacity-70">
        <p className="text-lg leading-relaxed">{subtitlePt}</p>
        <p className="text-sm italic mt-1">{subtitleEn}</p>
      </div>
    )}
    <div className={`h-1 w-24 bg-gradient-to-r from-[#f37321] to-orange-700 mt-6 ${centered ? 'mx-auto' : ''} rounded-full`} />
  </motion.div>
);

const AnimatedCounter: React.FC<{ value: number; labelPt: string; labelEn: string; suffix?: string }> = ({ value, labelPt, labelEn, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl transition-all hover:border-[#f37321]/30">
      <div className="text-4xl font-bold text-white mb-2">{count}{suffix}</div>
      <div className="text-sm font-semibold text-[#f37321] uppercase tracking-wider">{labelPt}</div>
      <div className="text-xs text-slate-400 italic">{labelEn}</div>
    </div>
  );
};

const SolutionCard: React.FC<{ icon: React.ReactNode; pt: string; en: string; descPt: string; descEn: string }> = ({ icon, pt, en, descPt, descEn }) => (
  <motion.div
    whileHover={{ y: -10, scale: 1.02 }}
    className="group p-8 bg-slate-900/50 border border-white/5 rounded-3xl transition-all duration-300 hover:border-[#f37321]/50 hover:bg-slate-900"
  >
    <div className="mb-6 p-4 bg-[#f37321]/10 rounded-2xl w-fit group-hover:bg-[#f37321]/20 transition-colors">
      <div className="text-[#f37321]">{icon}</div>
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{pt}</h3>
    <h4 className="text-sm text-[#f37321] uppercase tracking-widest mb-4">{en}</h4>
    <p className="text-slate-400 text-sm mb-2">{descPt}</p>
    <p className="text-slate-500 text-xs italic">{descEn}</p>
  </motion.div>
);

// --- SECTIONS ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { pt: 'Início', en: 'Home', href: '#home' },
    { pt: 'Quem somos', en: 'About', href: '#about' },
    { pt: 'Soluções', en: 'Solutions', href: '#solutions' },
    { pt: 'Missão', en: 'Mission', href: '#mission' },
    { pt: 'Contato', en: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-xl py-4 shadow-2xl' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <OrionLogo className="w-20 h-20" />
        </div>

        <div className="hidden lg:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a key={item.href} href={item.href} className="group flex flex-col items-center">
              <span className="text-slate-200 text-sm font-medium group-hover:text-[#f37321] transition-colors">{item.pt}</span>
              <span className="text-[10px] text-slate-500 italic group-hover:text-orange-400 transition-colors uppercase">{item.en}</span>
            </a>
          ))}
          <a href="#contact" className="px-6 py-2 bg-[#f37321] hover:bg-orange-500 text-white rounded-full text-sm font-bold transition-all shadow-lg shadow-orange-600/20">
            Falar com Especialista
          </a>
        </div>

        <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-900 border-t border-white/10 mt-4 px-6 py-8 space-y-6"
          >
            {menuItems.map((item) => (
              <a key={item.href} href={item.href} className="block text-lg font-bold" onClick={() => setIsMobileMenuOpen(false)}>
                {item.pt} <span className="text-xs text-slate-500 block">{item.en}</span>
              </a>
            ))}
            <a href="#contact" className="block w-full text-center py-3 bg-[#f37321] rounded-xl font-bold" onClick={() => setIsMobileMenuOpen(false)}>
              Falar com Especialista
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <ParticleBackground />
        <motion.div style={{ y: y1 }} className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-[#f37321]/15 rounded-full blur-[120px]" />
        <motion.div style={{ y: y1 }} className="absolute top-[40%] -left-20 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(circle, #f37321 0.5px, transparent 0.5px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-[#f37321]/10 border border-[#f37321]/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-[#f37321] rounded-full animate-pulse" />
                <span className="text-xs font-bold text-[#f37321] uppercase tracking-widest">Global Bridge Startup</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white mb-6">
                Conectamos marcas <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f37321] to-orange-400">brasileiras</span> ao mercado global.
              </h1>
              <p className="text-sm md:text-lg text-slate-400 italic mb-8 max-w-xl mx-auto lg:mx-0">
                "We connect Brazilian brands to the global market with excellence and trust."
              </p>
              <p className="text-slate-300 mb-10 text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Da estratégia ao embarque: soluções completas de exportação e importação com rastreabilidade, sustentabilidade e valor agregado.
              </p>


              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8">
                <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-[#f37321] text-white font-bold rounded-full hover:bg-orange-500 hover:scale-105 transition-all flex items-center justify-center group shadow-2xl shadow-orange-600/30 whitespace-nowrap">
                  Fale com um especialista
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all whitespace-nowrap">
                  Solicitar diagnóstico
                </a>
              </div>

              <div className="mt-12 text-5xl md:text-6xl font-black text-slate-900 select-none tracking-tighter uppercase opacity-30">
                We are Brasil
              </div>
            </motion.div>
          </div>

          {/* Visual Content: 3D Globe - Larger Wrapper */}
          <motion.div
            className="lg:w-1/2 relative flex justify-center lg:justify-end min-h-[300px] md:min-h-[600px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <FuturisticGlobe />
          </motion.div>
        </div>

        {/* Counter Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-20">
          <AnimatedCounter value={25} labelPt="Países atendidos" labelEn="Countries served" suffix="+" />
          <AnimatedCounter value={150} labelPt="Marcas representadas" labelEn="Brands represented" suffix="+" />
          <AnimatedCounter value={500} labelPt="Projetos concluídos" labelEn="Projects completed" suffix="+" />
          <AnimatedCounter value={12} labelPt="Tempo médio (dias)" labelEn="Average lead time" />
        </div>
      </div>
    </section>
  );
};

const AboutUs = () => (
  <section id="about" className="py-24 bg-slate-900/30">
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeader pt="Quem somos" en="About us" centered={false} />
          <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
            <p>
              A <span className="text-white font-bold">Orion Bridge Co.</span> é uma startup de comércio exterior especializada na representação internacional de marcas brasileiras. Unimos a qualidade e a diversidade do Brasil às demandas globais, oferecendo soluções completas do posicionamento à entrega.
            </p>
            <p className="italic text-slate-500 text-sm">
              Orion Bridge Co. is a foreign trade startup specializing in the international representation of Brazilian brands. We combine the quality and diversity of Brazil with global demands, offering complete solutions from positioning to delivery.
            </p>
            <p>
              Temos foco em sustentabilidade, rastreabilidade e valor agregado. Nosso propósito é simples e forte: levar prosperidade com honestidade, fé e excelência.
            </p>
          </div>
          <div className="mt-10 flex items-center space-x-4">
            <div className="p-3 bg-white/5 rounded-2xl border border-[#f37321]/20">
              <ShieldCheck className="w-8 h-8 text-[#f37321]" />
            </div>
            <div>
              <h4 className="text-white font-bold">Excelência Operacional</h4>
              <p className="text-slate-500 text-sm italic">Operational Excellence</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="lg:w-1/2 relative"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
            <img src="https://picsum.photos/seed/orion-trading/800/600" alt="Global Trade" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-[#f37321]/20">
              <p className="text-[#f37321] font-bold mb-1">Ponte Estratégica Global</p>
              <p className="text-slate-400 text-xs italic">A reliable connection for your business expansion.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const BrandEssence = () => (
  <section className="py-24 relative overflow-hidden bg-slate-950">
    <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/40 via-transparent to-transparent" />
    <div className="container mx-auto px-6 text-center relative z-10">
      <SectionHeader pt="A ponte estratégica entre o Brasil e o mundo" en="The strategic bridge between Brazil and the world" />
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-xl md:text-3xl font-light text-slate-300 max-w-4xl mx-auto leading-relaxed"
      >
        "Orion Bridge Co." representa o orgulho e a força de um país criativo, confiável e inovador. É a expressão da união entre fé, trabalho e excelência brasileira aplicada ao comércio global.
      </motion.p>

      <div className="mt-16 flex flex-wrap justify-center gap-4">
        {['Confiança', 'Brasil', 'Negócios', 'Valor Agregado', 'Soluções', 'Esperança', 'Excelência'].map((keyword, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-bold text-[#f37321] hover:bg-[#f37321] hover:text-white transition-all cursor-default shadow-sm"
          >
            {keyword}
          </motion.span>
        ))}
      </div>
    </div>
  </section>
);

const Solutions = () => (
  <section id="solutions" className="py-24 bg-slate-900/20">
    <div className="container mx-auto px-6">
      <SectionHeader pt="Soluções Especializadas" en="Expert Solutions" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <SolutionCard
          icon={<Award className="w-8 h-8" />}
          pt="Representação Internacional"
          en="International Brand Representation"
          descPt="Levamos marcas brasileiras aos mercados mais exigentes do mundo."
          descEn="Bringing Brazilian brands to the most demanding world markets."
        />
        <SolutionCard
          icon={<TrendingUp className="w-8 h-8" />}
          pt="Estratégia & Posicionamento"
          en="Market Strategy & Positioning"
          descPt="Análise profunda para garantir o sucesso do seu produto no exterior."
          descEn="Deep analysis to ensure your product's success abroad."
        />
        <SolutionCard
          icon={<Cpu className="w-8 h-8" />}
          pt="Inteligência Comercial"
          en="Commercial Intelligence"
          descPt="Prospecção ativa e mapeamento de oportunidades globais."
          descEn="Active prospecting and mapping of global opportunities."
        />
        <SolutionCard
          icon={<Truck className="w-8 h-8" />}
          pt="Gestão de Exportação"
          en="End-to-End Export Management"
          descPt="Cuidamos de todo o processo, da fábrica ao destino final."
          descEn="We take care of the entire process, from factory to destination."
        />
        <SolutionCard
          icon={<ShieldCheck className="w-8 h-8" />}
          pt="Gestão de Importação"
          en="Secure Import Management"
          descPt="Operações seguras e conformidade tributária em cada etapa."
          descEn="Secure operations and tax compliance at every stage."
        />
        <SolutionCard
          icon={<Anchor className="w-8 h-8" />}
          pt="Logística & Compliance"
          en="Logistics & Compliance"
          descPt="Gestão documental e desembaraço aduaneiro com excelência."
          descEn="Document management and customs clearance with excellence."
        />
      </div>
    </div>
  </section>
);

const MissionVisionValues = () => (
  <section id="mission" className="py-24 bg-slate-950">
    <div className="container mx-auto px-6">
      <SectionHeader pt="Nosso Propósito" en="Our Purpose" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            titlePt: "Missão", titleEn: "Mission", icon: <Star />,
            textPt: "Conectar marcas brasileiras no mercado global com excelência e confiança.",
            textEn: "Connect Brazilian brands to the global market with excellence and trust."
          },
          {
            titlePt: "Visão", titleEn: "Vision", icon: <Globe />,
            textPt: "Ser reconhecida como a ponte estratégica entre o Brasil e o mundo, promovendo crescimento sustentável.",
            textEn: "Be recognized as the strategic bridge between Brazil and the world, promoting sustainable growth."
          },
          {
            titlePt: "Valores", titleEn: "Values", icon: <Award />,
            textPt: "Confiança, Excelência, Transparência, Inovação, Sustentabilidade.",
            textEn: "Trust, Excellence, Transparency, Innovation, Sustainability."
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="p-10 bg-slate-900 border-b-4 border-[#f37321] rounded-2xl"
          >
            <div className="mb-6 text-[#f37321] w-12 h-12 flex items-center justify-center bg-[#f37321]/10 rounded-xl">
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{item.titlePt}</h3>
            <h4 className="text-xs text-slate-500 italic uppercase tracking-widest mb-6">{item.titleEn}</h4>
            <p className="text-slate-300 mb-4">{item.textPt}</p>
            <p className="text-xs text-slate-500 italic">{item.textEn}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Sustainability = () => (
  <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <motion.div
          className="lg:w-1/2"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <SectionHeader pt="Sustentabilidade & Rastreabilidade" en="Sustainability & Traceability" centered={false} />
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Acreditamos que o comércio global deve gerar impacto positivo. Implementamos protocolos rigorosos de conformidade e ética, garantindo que cada produto exportado carregue a essência da preservação ambiental brasileira.
          </p>

          <div className="space-y-6">
            {[
              { pt: 'Rastreabilidade total da cadeia', en: 'Full chain traceability' },
              { pt: 'Conformidade ética e regulatória', en: 'Ethical and regulatory compliance' },
              { pt: 'Geração de valor agregado e impacto social', en: 'Added value and social impact' }
            ].map((step, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-[#f37321] flex-shrink-0">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-white font-bold">{step.pt}</h5>
                  <p className="text-slate-500 text-xs italic">{step.en}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="lg:w-1/2 flex justify-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center text-center shadow-lg hover:border-[#f37321]/50">
              <ShieldCheck className="w-12 h-12 text-[#f37321] mb-4" />
              <p className="text-white font-bold text-sm uppercase">Compliance</p>
              <div className="h-1 w-12 bg-[#f37321] mt-2" />
            </div>
            <div className="p-8 bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center text-center mt-8">
              <Layers className="w-12 h-12 text-orange-400 mb-4" />
              <p className="text-white font-bold text-sm uppercase">Integridade</p>
              <div className="h-1 w-12 bg-orange-400 mt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 bg-slate-900/30">
    <div className="container mx-auto px-6">
      <SectionHeader pt="Confiança de Mercado" en="Market Trust" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-8 bg-slate-950/50 rounded-2xl border border-white/5">
            <div className="flex text-[#f37321] mb-4">
              <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
            </div>
            <p className="text-slate-300 mb-6 italic">"A Orion Bridge Co. transformou nossa visão global em realidade. O suporte logístico e a transparência são impecáveis."</p>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-slate-800" />
              <div>
                <p className="text-white font-bold">Diretor Executivo</p>
                <p className="text-xs text-slate-500 italic">Indústria de Alimentos</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-y border-white/5 py-10">
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all">
          <Globe className="w-12 h-12 text-[#f37321]" />
          <Award className="w-12 h-12 text-[#f37321]" />
          <ShieldCheck className="w-12 h-12 text-[#f37321]" />
          <Zap className="w-12 h-12 text-[#f37321]" />
          <Anchor className="w-12 h-12 text-[#f37321]" />
        </div>
      </div>
    </div>
  </section>
);

const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Obrigado! Recebemos seu pedido de diagnóstico. / Thank you! We have received your diagnosis request.');
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f37321]/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-4xl font-extrabold mb-4 text-white">Pronto para levar sua marca ao mundo?</h2>
            <p className="text-[#f37321] text-xl font-medium mb-8">Ready to take your brand global?</p>
            <p className="text-slate-400 mb-10 text-lg">Fale com a Orion Bridge Co. e receba um diagnóstico objetivo do seu próximo passo no comércio exterior.</p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[#f37321]">
                  <Mail />
                </div>
                <div>
                  <p className="text-white font-bold">E-mail</p>
                  <p className="text-slate-400 text-sm">contato@orionbridge.co</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[#f37321]">
                  <Phone />
                </div>
                <div>
                  <p className="text-white font-bold">WhatsApp</p>
                  <p className="text-slate-400 text-sm">+55 11 99999-9999</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[#f37321]">
                  <MapPin />
                </div>
                <div>
                  <p className="text-white font-bold">Localização</p>
                  <p className="text-slate-400 text-sm">São Paulo - BR | Global Presence</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="p-8 md:p-12 bg-slate-900 border border-white/5 rounded-[40px] shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Nome Completo</label>
                  <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#f37321] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Empresa</label>
                  <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#f37321] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">E-mail Corporativo</label>
                  <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#f37321] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">WhatsApp / Telefone</label>
                  <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#f37321] outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">País / Região de Interesse</label>
                  <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#f37321] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Interesse Principal</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#f37321] outline-none transition-all">
                    <option value="export">Exportação (Export)</option>
                    <option value="import">Importação (Import)</option>
                    <option value="both">Ambos (Both)</option>
                  </select>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Mensagem</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#f37321] outline-none transition-all"></textarea>
              </div>

              <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#f37321] to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold rounded-xl transition-all shadow-xl shadow-orange-600/20 uppercase tracking-widest">
                Enviar Mensagem / Solicitar Diagnóstico
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-20 bg-slate-950 border-t border-white/5">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center space-x-3 mb-6">
            <OrionLogo className="w-12 h-12" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white tracking-tighter leading-tight">ORION BRIDGE CO.</span>
              <span className="text-[10px] text-[#f37321] font-bold tracking-[0.3em] uppercase">TRADING</span>
            </div>
          </div>
          <p className="text-slate-400 mb-6 max-w-xs">Representação internacional estratégica de marcas brasileiras com excelência e sustentabilidade.</p>
          <div className="text-3xl font-black text-slate-900 uppercase">We are Brasil</div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Navegação</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><a href="#home" className="hover:text-[#f37321]">Início</a></li>
            <li><a href="#about" className="hover:text-[#f37321]">Quem Somos</a></li>
            <li><a href="#solutions" className="hover:text-[#f37321]">Soluções</a></li>
            <li><a href="#mission" className="hover:text-[#f37321]">Missão & Valores</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Suporte</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><a href="#" className="hover:text-[#f37321]">Política de Privacidade</a></li>
            <li><a href="#" className="hover:text-[#f37321]">Termos de Uso</a></li>
            <li><a href="#" className="hover:text-[#f37321]">Compliance</a></li>
            <li><a href="#" className="hover:text-[#f37321]">Portal do Cliente</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Newsletter</h4>
          <p className="text-slate-400 text-sm mb-4">Inscreva-se para insights de mercado global.</p>
          <div className="flex">
            <input type="email" placeholder="Seu e-mail" className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 text-sm outline-none focus:border-[#f37321] w-full text-white" />
            <button className="bg-[#f37321] px-4 py-2 rounded-r-lg hover:bg-orange-500 transition-all"><ChevronRight className="w-5 h-5 text-white" /></button>
          </div>
        </div>
      </div>

      <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-500 text-xs">© 2024 Orion Bridge Co. - Todos os direitos reservados. CNPJ 00.000.000/0001-00</p>
        <div className="flex space-x-6">
          <a href="#" className="text-slate-500 hover:text-[#f37321] transition-colors"><MessageSquare className="w-5 h-5" /></a>
          <a href="#" className="text-slate-500 hover:text-[#f37321] transition-colors"><Globe className="w-5 h-5" /></a>
          <a href="#" className="text-slate-500 hover:text-[#f37321] transition-colors"><ShieldCheck className="w-5 h-5" /></a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen selection:bg-[#f37321] selection:text-white">
      <Navbar />
      <Hero />
      <AboutUs />
      <BrandEssence />
      <Solutions />
      <Sustainability />
      <MissionVisionValues />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
}
