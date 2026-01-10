import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, Users, FileText, Activity, Library,
  Atom, Gavel, ClipboardList,
  ArrowUpRight, Menu, X, Bot, Database,
  Brain, ShieldCheck, Cpu, Scale,
  Linkedin, Twitter, Mail,
  GraduationCap, Bus, Leaf, Briefcase,
  Terminal as TerminalIcon, Lock, Upload
} from 'lucide-react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

// --- 1. FONDO Y EFECTOS GLOBALES ---

const DeepSpaceBackground = () => {
  const gridRef = useRef(null);
  const [particles] = useState(() => [...Array(15)].map((_, i) => ({
    id: i,
    width: Math.random() * 2 + 'px',
    height: Math.random() * 2 + 'px',
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    opacity: Math.random() * 0.4,
    animationDelay: Math.random() * 5 + 's'
  })));

  useEffect(() => {
    // Optimization: Use requestAnimationFrame and direct DOM manipulation
    // to update background position on scroll without triggering React re-renders.
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (gridRef.current) {
            const offset = window.scrollY * 0.5;
            gridRef.current.style.transform = `perspective(1000px) rotateX(60deg) translateY(${offset}px) scale(1.5)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-[#020617]">
      {/* Malla Cibernética de Fondo */}
      <div 
        ref={gridRef}
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3b82f6 1px, transparent 1px),
            linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)',
          transform: `perspective(1000px) rotateX(60deg) translateY(0px) scale(1.5)`,
        }}
      />
      {/* Partículas Flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <div 
            key={p.id}
            className="absolute rounded-full animate-pulse bg-blue-500"
            style={{
              width: p.width,
              height: p.height,
              left: p.left,
              top: p.top,
              opacity: p.opacity,
              animationDelay: p.animationDelay
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
    </div>
  );
};

const Logo = ({ onClick }) => (
  <div onClick={onClick} className="flex items-center gap-2 group cursor-pointer z-50">
    <div className="relative">
      <Zap size={28} className="text-blue-500 fill-blue-500 transition-transform group-hover:scale-110 group-hover:rotate-12 duration-300" />
      <div className="absolute inset-0 blur-lg bg-blue-500 opacity-0 group-hover:opacity-40 transition-opacity" />
    </div>
    <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase">
      Colossus<span className="text-blue-500">lab</span>
    </span>
  </div>
);

const MatrixIntro = ({ onComplete }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(0);
  const fullText = "Initializing Colossus System...";

  useEffect(() => {
    if (text.length < fullText.length) {
      const timeout = setTimeout(() => setText(fullText.slice(0, text.length + 1)), 50);
      return () => clearTimeout(timeout);
    } else {
      const interval = setInterval(() => {
        setLoading(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(onComplete, 500);
            return 100;
          }
          return prev + 10;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [text, onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[2000] flex flex-col items-center justify-center font-mono p-4 text-center">
      <div className="text-emerald-500 text-xl md:text-2xl mb-8 border-r-2 border-emerald-500 animate-pulse pr-2">
        {text}
      </div>
      <div className="w-64 h-1 bg-emerald-900/30 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${loading}%` }} />
      </div>
    </div>
  );
};

// --- 2. COMPONENTES DE UI REUTILIZABLES ---

const NavTerminal = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-24 mb-12 bg-black/90 rounded-lg border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)] overflow-hidden font-mono text-sm">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-emerald-950/30 border-b border-emerald-500/20">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
        </div>
        <div className="text-emerald-500/50 text-xs font-bold tracking-wider">ROOT_ACCESS // NAVIGATION_PANEL</div>
      </div>

      {/* Terminal Body */}
      <div className="p-6 md:p-8 space-y-6">
        <div className="text-emerald-700 mb-4">
          <span>sysadmin@colossus:~$</span> <span className="text-emerald-400">./list_modules.sh</span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Opción 1: Quiénes Somos */}
          <button
            onClick={() => onNavigate('about')}
            className="group text-left p-4 rounded bg-emerald-500/5 border border-emerald-500/10 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all"
          >
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <Users size={16} />
              <span className="font-bold uppercase tracking-wider">/team</span>
            </div>
            <p className="text-emerald-600/70 text-xs leading-relaxed group-hover:text-emerald-500/80">
              Acceder al directorio de personal y consejo asesor.
            </p>
            <div className="mt-3 text-[10px] text-emerald-800 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              &gt; EXECUTE_MODULE
            </div>
          </button>

          {/* Opción 2: Laboratorio */}
          <button
            onClick={() => onNavigate('lab')}
            className="group text-left p-4 rounded bg-emerald-500/5 border border-emerald-500/10 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all"
          >
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <Bot size={16} />
              <span className="font-bold uppercase tracking-wider">/lab</span>
            </div>
            <p className="text-emerald-600/70 text-xs leading-relaxed group-hover:text-emerald-500/80">
              Prototipado de soluciones: Radar Normativo y OpenArg.
            </p>
            <div className="mt-3 text-[10px] text-emerald-800 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              &gt; EXECUTE_MODULE
            </div>
          </button>

          {/* Opción 3: Biblioteca */}
          <button
            onClick={() => onNavigate('library')}
            className="group text-left p-4 rounded bg-emerald-500/5 border border-emerald-500/10 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all"
          >
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <Library size={16} />
              <span className="font-bold uppercase tracking-wider">/library</span>
            </div>
            <p className="text-emerald-600/70 text-xs leading-relaxed group-hover:text-emerald-500/80">
              Repositorio de documentos, informes y papers.
            </p>
            <div className="mt-3 text-[10px] text-emerald-800 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              &gt; EXECUTE_MODULE
            </div>
          </button>
        </div>

        <div className="text-emerald-700 mt-4 animate-pulse">
          <span>sysadmin@colossus:~$</span> <span className="inline-block w-2 h-4 bg-emerald-500 ml-1 align-middle"></span>
        </div>
      </div>
    </div>
  );
};

const TeamCard = ({ name, role, bio, icon, image }) => {
  const Icon = icon;
  return (
    <div className="group p-8 bg-white/[0.03] backdrop-blur-xl rounded-[2rem] border border-white/10 hover:bg-white/[0.06] hover:border-blue-500/30 transition-all hover:-translate-y-1 text-center md:text-left flex flex-col items-center md:items-start h-full">
      <div className="w-24 h-24 mb-6 bg-gradient-to-br from-slate-800 to-black rounded-full flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:border-blue-500/50 transition-all shadow-xl relative overflow-hidden shrink-0">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-full opacity-90 group-hover:opacity-100 transition-opacity"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        ) : (
          <>
            <Icon size={40} className="text-slate-400 group-hover:text-blue-400 transition-colors relative z-10" />
            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </>
        )}
        {image && (
          <div className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full border border-black shadow-lg z-20 translate-y-1 translate-x-1">
            <Icon size={12} className="text-white" />
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4 w-full">
        <h3 className="text-xl font-bold text-white tracking-tight leading-tight">{name}</h3>
        <div className="inline-block px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
          <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">{role}</span>
        </div>
      </div>

      <p className="text-xs text-slate-400 font-light leading-relaxed mb-6 flex-grow">{bio}</p>

      <div className="flex gap-3 pt-4 border-t border-white/5 w-full justify-center md:justify-start">
        <button className="p-1.5 rounded-full hover:bg-white/10 text-slate-600 hover:text-white transition-colors"><Linkedin size={14} /></button>
        <button className="p-1.5 rounded-full hover:bg-white/10 text-slate-600 hover:text-white transition-colors"><Twitter size={14} /></button>
        <button className="p-1.5 rounded-full hover:bg-white/10 text-slate-600 hover:text-white transition-colors"><Mail size={14} /></button>
      </div>
    </div>
  );
};

const ProjectCard = ({ title, description, icon, tags, color }) => {
  const Icon = icon;
  return (
    <div className="group relative h-full">
      <div className={`absolute inset-0 bg-${color}-500/20 blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-700`} />
      <div className="relative h-full bg-[#050a14] border border-white/10 backdrop-blur-xl rounded-[2rem] p-8 flex flex-col gap-6 overflow-hidden hover:border-white/20 transition-colors">
        <div className="flex justify-between items-start">
          <div className={`p-3 rounded-xl bg-${color}-500/10 border border-${color}-500/20 text-${color}-400 group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={28} />
          </div>
          <ArrowUpRight className="text-slate-600 group-hover:text-white transition-colors" />
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">{title}</h3>
          <p className="text-sm text-slate-400 font-light leading-relaxed">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-auto pt-4">
          {tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-500 border border-white/5 group-hover:border-white/10">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReportCard = ({ title, date, category, description, icon, featured = false }) => {
  const Icon = icon;
  return (
    <div className={`group relative ${featured ? 'md:col-span-2 lg:col-span-3' : ''} p-6 md:p-8 bg-white/[0.03] backdrop-blur-xl rounded-[2rem] border border-white/10 hover:bg-white/[0.06] hover:border-blue-500/30 transition-all cursor-pointer`}>
      <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
        <div className={`w-16 h-16 ${featured ? 'md:w-24 md:h-24' : ''} bg-gradient-to-br from-blue-900/50 to-slate-900 rounded-2xl flex items-center justify-center border border-white/10 shrink-0 group-hover:scale-105 transition-transform`}>
          <Icon size={featured ? 32 : 24} className="text-blue-400" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest px-2 py-1 bg-blue-500/10 rounded-md">{category}</span>
            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{date}</span>
          </div>
          <h3 className={`${featured ? 'text-2xl md:text-3xl' : 'text-lg'} font-bold text-white leading-tight`}>{title}</h3>
          <p className="text-sm text-slate-400 font-light leading-relaxed max-w-2xl">{description}</p>
        </div>
      </div>
    </div>
  );
};

const ConsoleRoadmap = () => {
  const steps = [
    { f: "01", t: "Núcleo de Datos", d: "Sincronización de registros públicos en una capa de datos unificada.", s: "Diseño", cmd: "init --core" },
    { f: "02", t: "Agentes Operativos", d: "Despliegue de IA para la resolución de trámites ciudadanos.", s: "Q4 2025", cmd: "deploy --agents" },
    { f: "03", t: "Consenso Digital", d: "Mecanismos de votación y consulta ciudadana en tiempo real.", s: "Q2 2026", cmd: "run consensus.v3" },
    { f: "04", t: "Estado Agéntico", d: "Gobernanza asistida por agentes que optimizan el gasto.", s: "2027", cmd: "boot --full" }
  ];
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="w-full bg-black/80 backdrop-blur-xl rounded-2xl border border-emerald-500/30 overflow-hidden font-mono text-xs md:text-sm">
      <div className="flex items-center justify-between px-4 py-3 bg-emerald-950/30 border-b border-emerald-500/20">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>
        <span className="text-emerald-500/60 font-bold tracking-widest">TERMINAL v2.0</span>
      </div>
      <div className="grid md:grid-cols-3 min-h-[300px]">
        <div className="border-r border-emerald-500/20 bg-black/40">
          {steps.map((step, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`w-full flex items-center gap-3 p-4 text-left transition-all ${activeStep === i ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500' : 'text-emerald-800 hover:text-emerald-600'}`}
            >
              <span className="opacity-50">{step.f}</span>
              <span className="font-bold uppercase">{step.t}</span>
            </button>
          ))}
        </div>
        <div className="md:col-span-2 p-6 md:p-8 relative">
          <div className="space-y-4">
            <p className="text-emerald-700">user@colossus:~$ {steps[activeStep].cmd}</p>
            <h4 className="text-xl md:text-2xl font-black text-white uppercase">{steps[activeStep].t}</h4>
            <p className="text-emerald-400 leading-relaxed">
              {steps[activeStep].d}
              <span className="inline-block w-2 h-4 bg-emerald-500 ml-1 animate-pulse" />
            </p>
            <div className="inline-block px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold uppercase tracking-wider mt-4">
              Status: {steps[activeStep].s}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. VISTAS (PÁGINAS) ---

// VISTA: HOME
const HomeView = ({ onNavigate }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-24">
    <section className="pt-20 md:pt-32 text-center max-w-4xl mx-auto px-4">
      <div className="inline-block px-4 py-1.5 mb-8 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
        Comunidad de Participación Ciudadana
      </div>
      <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
        Hackeando la <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
          Democracia.
        </span>
      </h1>
      <p className="text-lg md:text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed mb-10">
        Exploración y formación que conecta la tecnología emergente con la democracia.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button onClick={() => onNavigate('lab')} className="px-8 py-4 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-lg shadow-blue-600/20">
          Explorar Laboratorio
        </button>
        <button onClick={() => onNavigate('library')} className="px-8 py-4 bg-white/5 text-white rounded-xl font-black uppercase tracking-widest border border-white/10 hover:bg-white/10 text-xs transition-all">
          Biblioteca Digital
        </button>
      </div>
    </section>

    {/* SECCIÓN MISION (PRESERVADA) */}
    <section className="py-20 px-4 border-y border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto space-y-12">
        <Users size={40} className="text-blue-500 mx-auto" />
        <div className="space-y-8 text-slate-300 text-lg md:text-xl leading-relaxed text-left md:text-center font-light">
          <p>Colossus es un espacio de <strong>participación ciudadana</strong> para la exploración, innovación y formación que conecta la tecnología emergente con la democracia.</p>
          <p className="text-white font-bold italic border-l-4 border-blue-600 pl-6 text-2xl md:text-3xl">"Incidimos en la discusión pública con la finalidad de definir una estrategia de desarrollo para Argentina basada en sus personas y recursos potenciados por la tecnología."</p>
        </div>
      </div>
    </section>

    {/* SECCIÓN ESTADÍSTICAS */}
    <section className="py-20 px-4 max-w-7xl mx-auto">
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

    {/* SECCIÓN NUEVA: TERMINAL DE NAVEGACIÓN */}
    <section className="py-12 px-4">
      <NavTerminal onNavigate={onNavigate} />
    </section>
  </div>
);

// VISTA: QUIENES SOMOS
const AboutView = () => (
  <div className="animate-in fade-in slide-in-from-right-8 duration-500 pt-20 max-w-7xl mx-auto px-4">
    <div className="text-center mb-16 space-y-4">
      <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Quiénes Somos</h2>
      <p className="text-blue-500 uppercase tracking-widest text-xs font-bold">Arquitectos del Futuro Cívico</p>
    </div>

    <div className="max-w-3xl mx-auto text-center mb-24">
      <Users size={40} className="text-blue-500 mx-auto mb-6" />
      <p className="text-xl md:text-3xl text-slate-300 font-light leading-relaxed">
        Incidimos en la discusión pública con la finalidad de definir una estrategia de desarrollo para <span className="text-white font-bold">Argentina</span> basada en sus personas y recursos potenciados por la tecnología.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
      <TeamCard
        name="Federico Panzieri"
        role="Fundador & CEO"
        bio="Liderando la visión estratégica y la innovación cívica en Colossus."
        icon={Brain}
      />
      <TeamCard
        name="Martín Iván Yeza"
        role="Head del Consejo Asesor"
        bio="Dirección estratégica y construcción de alianzas institucionales para el impacto público."
        icon={Users}
      />
      <TeamCard
        name="Silvina Carreño"
        role="Educación"
        bio="Transformando el aprendizaje y la formación para la era digital."
        icon={GraduationCap}
      />
      <TeamCard
        name="Agustina Ordoñez"
        role="Seguridad"
        bio="Diseño de estrategias inteligentes para la protección ciudadana."
        icon={ShieldCheck}
      />
      <TeamCard
        name="Gonzalo Vazquez"
        role="Seguridad"
        bio="Implementación de protocolos de seguridad basados en datos y tecnología."
        icon={ShieldCheck}
      />
      <TeamCard
        name="Claudio Riffourcat"
        role="Transporte"
        bio="Optimizando la movilidad urbana a través de sistemas eficientes."
        icon={Bus}
      />
      <TeamCard
        name="Luis García Balcarce"
        role="Gobernanza de Datos"
        bio="Estructurando la soberanía, privacidad y transparencia de la información pública."
        icon={Database}
      />
      <TeamCard
        name="Leandro Capítulo"
        role="Recursos Naturales"
        bio="Gestión sostenible de recursos impulsada por monitoreo tecnológico."
        icon={Leaf}
      />
      <TeamCard
        name="Fernando Arrili"
        role="Smart Reg & Policy"
        bio="Desarrollo de marcos normativos ágiles que fomenten la innovación."
        icon={Gavel}
      />
      <TeamCard
        name="Horacio Llovet"
        role="Empleo"
        bio="Repensando el futuro del trabajo y el desarrollo de nuevo talento digital."
        icon={Briefcase}
      />
    </div>
  </div>
);

// VISTA: LABORATORIO
const LabView = () => (
  <div className="animate-in fade-in slide-in-from-right-8 duration-500 pt-20 max-w-7xl mx-auto px-4">
    <div className="text-center mb-16 space-y-4">
      <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Laboratorio</h2>
      <p className="text-emerald-500 uppercase tracking-widest text-xs font-bold">Prototipado de Soluciones Cívicas</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
      <ProjectCard
        title="Radar Normativo"
        description="Motor de búsqueda inteligente y análisis legislativo basado en IA y arquitectura RAG. Ordena y evalúa la normativa municipal con precisión."
        icon={Bot}
        tags={["IA / RAG", "Python", "Legislativo"]}
        color="emerald"
      />
      <ProjectCard
        title="OpenArg"
        description="Plataforma que nuclea datos públicos de Argentina mediante un workflow artesanal supervisado por humanos para garantizar calidad."
        icon={Database}
        tags={["Open Data", "React", "Crowdsourcing"]}
        color="blue"
      />
    </div>

    <div className="max-w-4xl mx-auto pb-20">
      <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-8 text-center">Roadmap Tecnológico</h3>
      <ConsoleRoadmap />
    </div>
  </div>
);

// VISTA: BIBLIOTECA
const LibraryView = ({ reports }) => (
  <div className="animate-in fade-in slide-in-from-right-8 duration-500 pt-20 max-w-7xl mx-auto px-4">
    <div className="text-center mb-16 space-y-4">
      <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Biblioteca Digital</h2>
      <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">Investigación e Informes Estratégicos</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
      {reports.map((report, index) => (
        <ReportCard key={index} {...report} />
      ))}
    </div>
  </div>
);

// VISTA: LOGIN
const LoginView = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch {
      setError('Acceso denegado. Verifique sus credenciales.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl">
        <div className="flex justify-center mb-8">
           <Lock className="text-blue-500" size={48} />
        </div>
        <h2 className="text-2xl font-black text-white text-center mb-6 uppercase tracking-wider">Acceso Desarrollador</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="usuario@colossus.tech"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-500 text-xs text-center font-bold">{error}</p>}
          <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-lg font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-colors">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

// VISTA: ADMIN
const AdminView = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 pt-32 max-w-4xl mx-auto px-4 pb-20">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <TerminalIcon className="text-blue-400" size={32} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Portal de Desarrollo</h2>
          <p className="text-blue-500 uppercase tracking-widest text-xs font-bold">Gestión de Contenidos</p>
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Título del Artículo</label>
              <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Ej: Avances en IA..." />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Descripción Corta</label>
              <input type="text" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Resumen breve..." />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Contenido Principal</label>
            <textarea rows="8" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors font-mono text-sm" placeholder="Escriba el contenido aquí..." />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Archivo Adjunto (PDF)</label>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-blue-500/40 transition-colors cursor-pointer bg-black/20">
              <Upload className="mx-auto text-slate-500 mb-4" size={32} />
              <p className="text-sm text-slate-400">Arrastra tu archivo aquí o haz clic para seleccionar</p>
              <p className="text-xs text-slate-600 mt-2">Solo archivos PDF (Max. 10MB)</p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex justify-end">
            <button type="button" className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20">
              Publicar Contenido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- 4. COMPONENTE PRINCIPAL (CONTROLADOR DE VISTAS) ---

export default function App() {
  const [booted, setBooted] = useState(false);

  // Inicialización perezosa para evitar efectos secundarios en la renderización inicial
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      return (window.location.pathname === '/login' || window.location.hash === '#/login') ? 'login' : 'home';
    }
    return 'home';
  });

  const [mobileMenu, setMobileMenu] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Scroll to top al cambiar de vista
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleLogin = () => {
    setIsAdmin(true);
    setCurrentView('admin');
  };

  // Wrapper para la navegación que cierra el menú móvil
  const handleNavigate = (view) => {
    setCurrentView(view);
    setMobileMenu(false);
  };

  const reports = [
    { title: "IA y Desarrollo: Panorama Argentino", category: "Estrategia", date: "Jun 2025", description: "Estado de la IA, talento STEM y desafíos globales.", icon: FileText, featured: true },
    { title: "Plan Nuclear 2025", category: "Energía", date: "Oct 2025", description: "Reactores SMR y minería de uranio.", icon: Atom },
    { title: "IA y Poder Judicial", category: "Legal Tech", date: "Oct 2025", description: "Capacitación en justicia argentina.", icon: Gavel },
    { title: "Ineficiencia del Congreso", category: "Democracia", date: "Jul 2025", description: "Análisis de labor parlamentaria.", icon: ClipboardList },
    { title: "Toolkit Práctico de IA", category: "Práctica", date: "2025", description: "Guía de implementación pública.", icon: Cpu },
    { title: "IA en la Abogacía", category: "Legal", date: "Dic 2025", description: "Innovación y responsabilidad.", icon: Scale },
  ];

  if (!booted) return <MatrixIntro onComplete={() => setBooted(true)} />;

  // Función para renderizar la vista actual
  const renderView = () => {
    switch(currentView) {
      case 'home': return <HomeView onNavigate={handleNavigate} />;
      case 'about': return <AboutView />;
      case 'lab': return <LabView />;
      case 'library': return <LibraryView reports={reports} />;
      case 'login': return <LoginView onLogin={handleLogin} />;
      case 'admin': return isAdmin ? <AdminView /> : <LoginView onLogin={handleLogin} />;
      default: return <HomeView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen text-slate-300 font-sans selection:bg-blue-500/30">
      <DeepSpaceBackground />

      {/* NAVBAR */}
      {currentView !== 'login' && (
        <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex justify-between items-center">
            <Logo onClick={() => handleNavigate('home')} />

            {/* Menú Desktop */}
            <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <button
                onClick={() => handleNavigate('about')}
                className={`hover:text-white transition-colors ${currentView === 'about' ? 'text-white' : ''}`}
              >
                Quiénes Somos
              </button>
              <button
                onClick={() => handleNavigate('lab')}
                className={`hover:text-white transition-colors ${currentView === 'lab' ? 'text-white' : ''}`}
              >
                Laboratorio
              </button>
              <button
                onClick={() => handleNavigate('library')}
                className={`hover:text-white transition-colors ${currentView === 'library' ? 'text-blue-400' : ''}`}
              >
                Biblioteca
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button className="hidden sm:block px-5 py-2 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-lg">
                Sumate
              </button>
              <button className="lg:hidden text-white" onClick={() => setMobileMenu(!mobileMenu)}>
                {mobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Menú Mobile */}
          {mobileMenu && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 p-8 flex flex-col gap-6 text-center animate-in slide-in-from-top-2 shadow-2xl">
              <button onClick={() => handleNavigate('about')} className="text-xl font-bold uppercase text-white">Quiénes Somos</button>
              <button onClick={() => handleNavigate('lab')} className="text-xl font-bold uppercase text-white">Laboratorio</button>
              <button onClick={() => handleNavigate('library')} className="text-xl font-bold uppercase text-white">Biblioteca</button>
            </div>
          )}
        </nav>
      )}

      {/* CONTENIDO PRINCIPAL (CAMBIA DINÁMICAMENTE) */}
      <main className="relative z-10 min-h-screen">
        {renderView()}
      </main>

      {/* FOOTER */}
      {currentView !== 'login' && currentView !== 'admin' && (
        <footer className="relative z-10 py-12 border-t border-white/5 bg-black/40 text-center">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-slate-600 uppercase tracking-widest font-black">
              ©️ 2025 Colossus Lab - Buenos Aires
            </p>
            <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <a href="#" className="hover:text-blue-400">LinkedIn</a>
              <a href="#" className="hover:text-blue-400">Twitter</a>
              <a href="mailto:info@colossuslab.tech" className="hover:text-blue-400">Contacto</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
