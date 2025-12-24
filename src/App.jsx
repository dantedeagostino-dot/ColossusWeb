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
  MessageSquare,
  TrendingUp,
  ShieldCheck,
  ZapOff,
  Activity,
  Library,
  Atom,
  Gavel,
  ClipboardList,
  Terminal,
  ChevronRight,
  Play
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

  const getColors = () => {
    if (scroll < 0.3) return { bg: '#020617', accent: '#3b82f6', glow: 'rgba(59, 130, 246, 0.1)' };
    if (scroll < 0.6) return { bg: '#0f0720', accent: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.1)' };
    return { bg: '#041614', accent: '#10b981', glow: 'rgba(16, 185, 129, 0.1)' };
  };

  const current = getColors();

  return (
    <div className="fixed inset-0 z-0 transition-colors duration-1000" style={{ backgroundColor: current.bg }}>
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

// --- LOGO: COLOSSUS NEXUS ---
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
  }, [text, onComplete]);

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

// --- COMPONENTE DE TARJETA DE INFORME ---
const ReportCard = ({ title, date, category, description, icon: Icon, featured = false }) => (
  <div className={`group relative ${featured ? 'md:col-span-2 lg:col-span-3' : ''} p-8 bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] border border-white/10 hover:bg-white/[0.06] hover:border-blue-500/30 transition-all cursor-pointer overflow-hidden`}>
    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
      <div className={`w-20 h-28 ${featured ? 'md:w-32 md:h-44' : ''} bg-gradient-to-br from-blue-600 to-indigo-800 rounded-xl flex items-center justify-center shadow-2xl shrink-0 group-hover:rotate-3 transition-transform`}>
        <Icon size={featured ? 48 : 32} className="text-white opacity-80" />
      </div>
      <div className="flex-1 space-y-3 text-center md:text-left">
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.3em] px-2 py-1 bg-blue-500/10 rounded-md">{category}</span>
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{date}</span>
        </div>
        <h3 className={`${featured ? 'text-2xl md:text-4xl' : 'text-xl'} font-black text-white italic tracking-tight leading-none`}>{title}</h3>
        <p className="text-sm text-slate-400 font-light leading-relaxed max-w-2xl">{description}</p>
        <button className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl">
          <Download size={14} /> Descargar PDF
        </button>
      </div>
    </div>
    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
      <ArrowUpRight size={24} className="text-blue-500" />
    </div>
  </div>
);

// --- COMPONENTE CONSOLA ROADMAP ---
const ConsoleRoadmap = () => {
  const steps = [
    { f: "01", t: "Núcleo de Datos", d: "Sincronización de registros públicos en una capa de datos unificada, segura y accesible.", s: "Fase de Diseño", cmd: "sudo protocols init --core-data" },
    { f: "02", t: "Agentes Operativos", d: "Despliegue de IA para la resolución de trámites ciudadanos complejos sin intermediarios.", s: "Q4 2025", cmd: "execute agent_deploy.sh --mode=autonomy" },
    { f: "03", t: "Consenso Digital", d: "Mecanismos de votación y consulta ciudadana en tiempo real con validación criptográfica.", s: "Q2 2026", cmd: "run consensus_protocol.v3" },
    { f: "04", t: "Estado Agéntico", d: "Gobernanza asistida por agentes que optimizan el gasto y recursos según demanda real.", s: "Visión 2027", cmd: "boot agentic_state --full-integration" }
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    let i = 0;
    const text = steps[activeStep].d;
    setDisplayText('');
    
    const timer = setInterval(() => {
      setDisplayText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [activeStep]);

  return (
    <div className="w-full max-w-5xl mx-auto bg-black/60 backdrop-blur-xl rounded-[2rem] border border-emerald-500/30 overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)]">
      <div className="flex items-center justify-between px-6 py-4 bg-emerald-950/20 border-b border-emerald-500/20">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
          </div>
          <span className="text-[10px] font-mono text-emerald-500/70 uppercase tracking-widest font-bold">Terminal v2.0 - Agentic Roadmap</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-500/40 font-mono text-[9px]">
          <Activity size={10} className="animate-pulse" />
          SYSTEM: OPTIMAL
        </div>
      </div>

      <div className="grid md:grid-cols-12 min-h-[400px]">
        <div className="md:col-span-4 border-r border-emerald-500/10 p-6 space-y-2 bg-black/40">
          <p className="text-[9px] font-mono text-emerald-700 uppercase tracking-widest mb-4">Select Protocol:</p>
          {steps.map((step, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl font-mono text-left transition-all group ${activeStep === i ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'text-emerald-900 hover:text-emerald-600'}`}
            >
              <span className="text-[10px] opacity-50">{step.f}</span>
              <span className="text-xs font-bold uppercase tracking-tighter">{step.t}</span>
              {activeStep === i && <ChevronRight size={14} className="ml-auto animate-pulse" />}
            </button>
          ))}
        </div>

        <div className="md:col-span-8 p-8 font-mono relative overflow-hidden">
          <div className="space-y-6">
            <div className="space-y-1">
              <p className="text-emerald-800 text-[10px]">colossus@lab:~$ {steps[activeStep].cmd}</p>
              <p className="text-emerald-500/50 text-[10px]">Iniciando secuencia de despliegue...</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[9px] font-bold rounded uppercase">Status: {steps[activeStep].s}</span>
                <div className="h-[1px] flex-1 bg-emerald-500/10" />
              </div>
              <h4 className="text-2xl font-black text-white tracking-tighter uppercase">{steps[activeStep].t}</h4>
              <p className="text-emerald-400/90 text-sm leading-relaxed min-h-[80px]">
                {displayText}
                <span className="inline-block w-2 h-4 bg-emerald-500 ml-1 animate-pulse" />
              </p>
            </div>

            <div className="pt-8 border-t border-emerald-500/10">
              <div className="grid grid-cols-2 gap-4 text-[9px] text-emerald-900 uppercase font-bold">
                <div className="space-y-1">
                  <p>Encapsulación: ACTIVA</p>
                  <p>Lógica: AGÉNTICA</p>
                </div>
                <div className="space-y-1 text-right">
                  <p>Latencia: 0.02ms</p>
                  <p>Seguridad: CRIPTOGRÁFICA</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 p-4 opacity-[0.02] pointer-events-none select-none text-[8px] leading-none">
            {Array(20).fill(0).map((_, i) => (
              <p key={i}>01011101011010101000101110101101010</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
  const [booted, setBooted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const reports = [
    { title: "IA y Desarrollo: Panorama Argentino", category: "Estrategia", date: "Junio 2025", description: "Análisis exhaustivo sobre el estado de la IA, el talento STEM y los desafíos de inserción global de Argentina.", icon: FileText, featured: true },
    { title: "Plan Nuclear Argentino 2025", category: "Energía", date: "Octubre 2025", description: "Reactores SMR, minería de uranio y tierras raras para alimentar la revolución de datos.", icon: Atom },
    { title: "IA y Poder Judicial", category: "Legal Tech", date: "Octubre 2025", description: "Análisis exploratorio de capacitación y avances institucionales en la justicia argentina.", icon: Gavel },
    { title: "Ineficiencia del Congreso", category: "Democracia", date: "Julio 2025", description: "La labor parlamentaria en números: desglose del tiempo legislativo y procedimental.", icon: ClipboardList },
    { title: "Toolkit Práctico de IA", category: "Práctica", date: "2025", description: "Guía esencial para la implementación de herramientas de inteligencia artificial en organizaciones públicas.", icon: Cpu },
    { title: "Anexo I: Desglose Congreso", category: "Datos", date: "2025", description: "Aproximación cuantitativa al tiempo no legislativo y cuestiones de privilegio por bloque.", icon: Layout },
    { title: "IA en la Abogacía", category: "Jurisprudencia", date: "Diciembre 2025", description: "Entre la innovación tecnológica y la responsabilidad profesional: el fin de las alucinaciones.", icon: Scale },
    { title: "Impacto Privacidad de Datos", category: "Derechos", date: "2025", description: "Tesis de Liliana Molina Soljan sobre la amenaza de la IA a la privacidad de datos personales.", icon: ShieldCheck }
  ];

  if (!booted) return <MatrixIntro onComplete={() => setBooted(true)} />;

  return (
    <div className="min-h-screen text-slate-300 font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      <DeepSpaceBackground />

      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex justify-between items-center">
          <Logo />
          <div className="hidden lg:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            <a href="#mision" className="hover:text-white transition-colors">Misión</a>
            <a href="#numeros" className="hover:text-white transition-colors">Números</a>
            <a href="#estado-agentico" className="hover:text-white transition-colors">Estado Agéntico</a>
            <a href="#informes" className="text-blue-400 border-b border-blue-400 pb-1">Informes</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden sm:block px-6 py-2.5 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-white/5">Sumate</button>
            <button className="lg:hidden text-white" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>
        {mobileMenu && (
          <div className="lg:hidden bg-black/95 backdrop-blur-2xl border-b border-white/10 p-8 flex flex-col gap-6 text-center animate-in slide-in-from-top-4">
            {["Misión", "Números", "Estado Agéntico", "Informes"].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMobileMenu(false)} className="text-xl font-bold uppercase text-white">{item}</a>
            ))}
          </div>
        )}
      </nav>

      <div className="relative z-10 animate-in fade-in duration-1000">
        
        {/* SECCIÓN HERO - ACTUALIZADA */}
        <section className="pt-48 pb-32 px-4 text-center max-w-5xl mx-auto">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full">Comunidad de Participación Ciudadana</div>
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter">Hackeando la <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">Democracia.</span></h1>
            <p className="text-lg md:text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">Exploración y formación que conecta la tecnología emergente con la democracia.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
              {/* Botón principal actualizado para el informe */}
              <a href="#informes" className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-2xl shadow-blue-600/30">
                Informe IA y Desarrollo Argentina 2025
              </a>
              <a href="#informes" className="px-10 py-5 bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest border border-white/10 hover:bg-white/10 text-xs transition-all">
                Biblioteca Digital
              </a>
            </div>
          </div>
        </section>

        <section id="mision" className="py-32 px-4 border-y border-white/5 bg-black/20 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto space-y-12">
            <Users size={40} className="text-blue-500 mx-auto" />
            <div className="space-y-8 text-slate-300 text-lg md:text-xl leading-relaxed text-left md:text-center font-light">
              <p>Colossus es un espacio de <strong>participación ciudadana</strong> para la exploración, innovación y formación que conecta la tecnología emergente con la democracia.</p>
              <p className="text-white font-bold italic border-l-4 border-blue-600 pl-6 text-2xl md:text-3xl">"Incidimos en la discusión pública con la finalidad de definir una estrategia de desarrollo para Argentina basada en sus personas y recursos potenciados por la tecnología."</p>
            </div>
          </div>
        </section>

        <section id="numeros" className="py-32 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">El Futuro en Números</h2>
            <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">Diagnóstico Estratégico 2025</p>
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

        <section id="estado-agentico" className="py-32 px-4 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Roadmap Estado Agéntico</h2>
              <p className="text-emerald-500 uppercase tracking-[0.3em] text-[10px] font-bold">La transición hacia la gobernanza automatizada bajo control humano</p>
            </div>
            
            <ConsoleRoadmap />
            
            <div className="mt-16 flex justify-center">
              <div className="flex items-center gap-3 px-6 py-3 bg-emerald-500/5 border border-emerald-500/20 rounded-full">
                <Activity size={14} className="text-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-700 uppercase tracking-widest font-bold">Protocolos en ejecución interactiva</span>
              </div>
            </div>
          </div>
        </section>

        <section id="informes" className="py-40 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-6 mb-24 text-center">
            <Library className="text-blue-500" size={48} />
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">Biblioteca Digital</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report, index) => (
              <ReportCard key={index} {...report} />
            ))}
          </div>
        </section>

        <footer className="py-24 px-4 border-t border-white/5 bg-black/20 text-center md:text-left">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="space-y-6">
              <Logo />
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black max-w-xs mx-auto md:mx-0">Fundación para la innovación democrática. Exploración tecnológica con impacto social.</p>
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