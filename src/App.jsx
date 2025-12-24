import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Users, 
  FileText, 
  Download, 
  BookOpen, 
  Scale, 
  Cpu, 
  Layout, 
  ArrowUpRight, 
  Menu, 
  X,
  MessageSquare
} from 'lucide-react';

// --- FONDO DE PROFUNDIDAD DINÁMICA ---
const DeepSpaceBackground = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(position / maxScroll);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interpolación de colores basada en scroll
  const getColors = () => {
    if (scroll < 0.3) return { bg: '#020617', accent: '#3b82f6', glow: 'rgba(59, 130, 246, 0.1)' };
    if (scroll < 0.6) return { bg: '#0f0720', accent: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.1)' };
    return { bg: '#041614', accent: '#10b981', glow: 'rgba(16, 185, 129, 0.1)' };
  };

  const current = getColors();

  return (
    <div className="fixed inset-0 z-0 transition-colors duration-1000" style={{ backgroundColor: current.bg }}>
      {/* Rejilla 3D con Perspectiva */}
      <div 
        className="absolute inset-0 transition-all duration-700 ease-out opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${current.accent} 1px, transparent 1px),
            linear-gradient(to bottom, ${current.accent} 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(circle at 50% 40%, black, transparent 80%)',
          transform: `perspective(1000px) rotateX(${60 + scroll * 10}deg) translateY(${-scroll * 100}px)`,
          transformOrigin: 'top',
          height: '200%'
        }}
      />
      
      {/* Partículas de Profundidad */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              backgroundColor: current.accent,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5,
              filter: 'blur(1px)',
              animationDelay: Math.random() * 5 + 's'
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
    </div>
  );
};

// --- LOGO: COLOSSUS NEXUS (REFINADO) ---
const Logo = ({ className = "" }) => (
  <div className={`flex items-center gap-2 group cursor-pointer ${className}`}>
    <div className="relative">
      <Zap size={28} className="text-blue-500 fill-blue-500 transition-transform group-hover:scale-110 group-hover:rotate-12 duration-300" />
      <div className="absolute inset-0 blur-lg bg-blue-500 opacity-0 group-hover:opacity-40 transition-opacity" />
    </div>
    <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase">
      Colossus<span className="text-blue-500">lab</span>
    </span>
  </div>
);

// --- SECUENCIA MATRIX ---
const MatrixIntro = ({ onComplete }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(0);
  const fullText = "Follow the white rabbit...";

  useEffect(() => {
    if (text.length < fullText.length) {
      const timeout = setTimeout(() => setText(fullText.slice(0, text.length + 1)), 80);
      return () => clearTimeout(timeout);
    } else {
      const interval = setInterval(() => {
        setLoading(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(onComplete, 600);
            return 100;
          }
          return prev + 5;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [text]);

  return (
    <div className="fixed inset-0 bg-black z-[1000] flex flex-col items-center justify-center font-mono p-4 text-center">
      <div className="max-w-md w-full">
        <div className="text-green-500 text-xl md:text-2xl mb-8 min-h-[1.5em] border-r-2 border-green-500 animate-pulse inline-block pr-1">
          {text}
        </div>
        {text.length === fullText.length && (
          <div className="space-y-4 animate-in fade-in duration-700">
            <div className="flex justify-between text-green-500 text-[10px] uppercase font-bold tracking-[0.3em]">
              <span>Hackeando la democracia</span>
              <span>{loading}%</span>
            </div>
            <div className="w-full h-1 bg-green-900/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 shadow-[0_0_15px_#4ade80] transition-all"
                style={{ width: `${loading}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- APP ---
export default function App() {
  const [booted, setBooted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  if (!booted) return <MatrixIntro onComplete={() => setBooted(true)} />;

  return (
    <div className="min-h-screen text-slate-300 font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      <DeepSpaceBackground />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex justify-between items-center">
          <Logo />
          
          <div className="hidden lg:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            <a href="#mision" className="hover:text-white transition-colors">Misión</a>
            <a href="#numeros" className="hover:text-white transition-colors">Números</a>
            <a href="#proyectos" className="hover:text-white transition-colors">Proyectos</a>
            <a href="#informes" className="hover:text-white transition-colors">Informes</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block px-6 py-2.5 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
              Sumate
            </button>
            <button className="lg:hidden text-white" onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="lg:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 p-8 flex flex-col gap-6 text-center animate-in slide-in-from-top-4">
            {["Misión", "Números", "Proyectos", "Informes"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="text-xl font-bold uppercase text-white">{item}</a>
            ))}
            <button className="py-4 bg-blue-600 text-white rounded-xl font-black uppercase">Unirse</button>
          </div>
        )}
      </nav>

      {/* Content */}
      <div className="relative z-10 animate-in fade-in duration-1000">
        
        {/* Hero */}
        <section className="pt-48 pb-32 px-4 text-center max-w-5xl mx-auto">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
              Comunidad de Participación Ciudadana
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter">
              Hackeando la <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">Democracia.</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
              Exploración y formación que conecta la tecnología emergente con la democracia.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
              <a href="#mision" className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-2xl shadow-blue-600/30">
                Conocé el Laboratorio
              </a>
              <a href="#informes" className="px-10 py-5 bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest border border-white/10 hover:bg-white/10 text-xs transition-all">
                Publicaciones
              </a>
            </div>
          </div>
        </section>

        {/* Misión (Texto Intacto) */}
        <section id="mision" className="py-32 px-4 border-y border-white/5 bg-black/20 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto space-y-12">
            <Users size={40} className="text-blue-500 mx-auto" />
            <div className="space-y-8 text-slate-300 text-lg md:text-xl leading-relaxed text-left md:text-center font-light">
              <p>
                Colossus es un espacio de <strong>participación ciudadana</strong> para la exploración, innovación y formación que conecta la tecnología emergente con la democracia para adaptar y mejorar sus instituciones y el diseño de las políticas públicas.
              </p>
              <p>
                Es también un laboratorio donde comprobar nuevos mecanismos y lógicas institucionales que mejoren la calidad de vida de los ciudadanos y aumenten la eficacia de la democracia para proveer soluciones y mejores servicios.
              </p>
              <p className="text-white font-bold italic border-l-4 border-blue-600 pl-6 text-2xl md:text-3xl">
                "Incidimos en la discusión pública con la finalidad de definir una estrategia de desarrollo para Argentina basada en sus personas y recursos potenciados por la tecnología."
              </p>
            </div>
          </div>
        </section>

        {/* El Futuro en Números */}
        <section id="numeros" className="py-32 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">El Futuro en Números</h2>
            <p className="text-slate-500 uppercase tracking-widest text-xs">Indicadores estratégicos de la nación</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { v: "#12", l: "Entorno Operativo", s: "Argentina lidera LATAM en opinión pública y regulación de IA." },
              { v: "+26%", l: "Talento IA", s: "Crecimiento en contratación de perfiles especializados en 2024." },
              { v: "494k", l: "Empleos IT", s: "Récord de puestos en la economía del conocimiento." },
              { v: "#48", l: "Global Index", s: "Posición argentina sobre 88 países analizados por Tortoise." }
            ].map((stat, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-blue-500/40 transition-all group">
                <div className="text-5xl font-black text-blue-400 mb-3 group-hover:scale-110 transition-transform origin-left">{stat.v}</div>
                <div className="text-[10px] font-black text-white uppercase tracking-widest mb-2">{stat.l}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{stat.s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Proyectos */}
        <section id="proyectos" className="py-32 px-4 bg-white/[0.02] border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Proyectos</h2>
              <p className="text-blue-500 text-xs font-bold uppercase tracking-widest hidden md:block">Líneas de investigación</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { cat: "Democracia", icon: Scale, title: "Justicia Digital", desc: "IA aplicada al Poder Judicial para optimizar tiempos e instituciones." },
                { cat: "Innovación", icon: Cpu, title: "Formación IA", desc: "Capacitación para que el talento argentino lidere la transición tecnológica." },
                { cat: "Sociedad", icon: Layout, title: "Gobernanza", desc: "Marcos regulatorios inteligentes para proteger datos y fomentar el desarrollo." }
              ].map((proj, i) => (
                <div key={i} className="p-10 bg-black/40 rounded-[3rem] border border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden">
                  <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <proj.icon size={28} />
                  </div>
                  <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">{proj.cat}</div>
                  <h3 className="text-2xl font-black text-white mb-4">{proj.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{proj.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Informes */}
        <section id="informes" className="py-32 px-4 max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-6 mb-20 text-center">
            <BookOpen className="text-blue-500" size={48} />
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Informes</h2>
          </div>
          <div className="group p-8 md:p-16 bg-white/[0.04] backdrop-blur-3xl rounded-[3rem] md:rounded-[5rem] border border-white/10 flex flex-col lg:flex-row items-center gap-10 hover:bg-white/[0.06] transition-all">
            <div className="w-24 h-32 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shrink-0 group-hover:rotate-3 transition-transform">
              <FileText size={48} className="text-white" />
            </div>
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Junio 2025</div>
              <h3 className="text-3xl font-black text-white italic">IA y Desarrollo: Panorama Argentino</h3>
              <p className="text-slate-400 max-w-2xl font-light">
                Análisis exhaustivo sobre el estado de la IA, el talento STEM y los desafíos de inserción global.
              </p>
            </div>
            <button className="px-10 py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl">
              <Download size={18} className="inline mr-2" /> PDF
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-24 px-4 border-t border-white/5 bg-black/20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="space-y-6 text-center md:text-left">
              <Logo />
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">
                Fundación para la innovación democrática.
              </p>
            </div>
            <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest">
              <a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Twitter (X)</a>
              <a href="mailto:info@colossuslab.tech" className="hover:text-blue-400 transition-colors">info@colossuslab.tech</a>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-center">
            <span className="text-[9px] text-slate-700 font-bold uppercase tracking-[0.5em]">Buenos Aires - Argentina - 2025</span>
          </div>
        </footer>

      </div>
    </div>
  );
}