import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
// 1. IMPORTANTE: Adicionado useSpring
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowDown, ExternalLink, Calendar, Layers, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticlesBackground from "@/components/ParticlesBackground";

interface Project {
  title: string;
  subtitle: string;
  category: string;
  description: string;
  year: string;
  client: string;
  services: string[];
  color: string;
  images: string[];
  url: string;
}

const projectsData: Record<string, Project> = {
  "abela-mielo": {
    title: "Abela Mielo",
    subtitle: "Redefinindo a Estética Natural",
    category: "Brand Design & Website",
    description: "Uma abordagem minimalista e sensorial para uma marca de cosméticos naturais. O desafio foi traduzir a pureza dos ingredientes em uma experiência digital imersiva, utilizando texturas orgânicas e uma paleta de cores terrosa com toques de sofisticação.",
    year: "2025",
    client: "Abela Mielo Cosmetics",
    services: ["Identidade Visual", "UX/UI Design", "Frontend Dev"],
    color: "from-white to-gray-500", // Cor neutra para o gradiente de texto
    url: "https://www.instagram.com/abelamielo",
    images: [
      "bg-gradient-to-br from-gray-900/60 to-black",
      "bg-gradient-to-tl from-gray-800/50 to-black",
      "bg-gradient-to-bl from-zinc-900/40 to-black"
    ]
  },
  "core-engine": {
    title: "Core Engine",
    subtitle: "High-Frequency Trading Platform",
    category: "Software Financeiro",
    description: "Desenvolvimento de uma interface de alta performance para traders institucionais. O foco foi a redução da carga cognitiva e a velocidade de resposta. Criamos um sistema de design modular que permite a visualização de dados complexos em tempo real com clareza absoluta.",
    year: "2024",
    client: "FinTech Global Corp",
    services: ["Software Architecture", "React Development", "Real-time Data"],
    color: "from-gray-300 to-gray-600", // Cor neutra para o gradiente de texto
    url: "https://www.google.com",
    images: [
      "bg-gradient-to-br from-zinc-900/60 to-black",
      "bg-gradient-to-tl from-zinc-800/50 to-black",
      "bg-gradient-to-bl from-gray-900/40 to-black"
    ]
  }
};

// --- COMPONENTE COM EFEITO "AMANTEIGADO" ---
const ZoomImage = ({ imgClass, index }: { imgClass: string, index: number }) => {
    const ref = useRef(null);
    
    // 1. Captura o scroll bruto
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"] 
    });

    // 2. Aplica a física de mola (O segredo do "Buttery Smooth")
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 150, // Tensão da mola (quanto maior, mais rápido segue)
        damping: 25,    // Fricção (quanto maior, menos "balança")
        mass: 0.5,      // Peso
        restDelta: 0.001
    });

    // 3. Usa o valor suavizado (smoothProgress) ao invés do bruto
    const scale = useTransform(smoothProgress, [0, 1], [0.85, 1]);
    const opacity = useTransform(smoothProgress, [0, 0.6], [0.5, 1]);

    return (
        <motion.div 
            ref={ref}
            style={{ scale, opacity }}
            className={`w-full aspect-square rounded-xl border border-white/10 ${imgClass} relative overflow-hidden group`}
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/20 text-2xl font-bold uppercase tracking-widest group-hover:scale-110 transition-transform duration-700">Detail {index + 2}</span>
            </div>
        </motion.div>
    );
};
// -------------------------------------------------------

export default function ProjectDetails({ params }: { params: { id: string } }) {
  const [, setLocation] = useLocation();
  
  const projectId = params.id;
  const project = projectsData[projectId];

  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1000); 
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Projeto não encontrado</h1>
          <Button onClick={() => setLocation("/")}>Voltar para Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background text-foreground selection:bg-white/30 overflow-x-hidden ${isScrolling ? 'scrolling' : 'idle'}`}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { 
          background: ${isScrolling ? '#ffffff' : 'transparent'}; 
          border-radius: 10px; 
          transition: background 0.3s; 
        }
        html {
          scrollbar-width: thin;
          scrollbar-color: ${isScrolling ? '#ffffff' : 'transparent'} transparent;
          transition: scrollbar-color 0.3s;
        }
      `}} />

      <ParticlesBackground />
      
      {/* HEADER TRANSPARENTE */}
      <nav className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-transparent">
        <Button 
          onClick={() => setLocation("/")} 
          variant="ghost" 
          className="text-muted-foreground hover:text-white hover:bg-white/10 gap-2 uppercase tracking-widest text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Button>
        <span className="text-xs font-mono text-muted-foreground uppercase">{project.category}</span>
      </nav>

      {/* HERO FULL SCREEN */}
      <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={`relative w-full h-screen flex items-center justify-center ${project.images[0]} bg-cover bg-center`}
      >
          <span className="text-white/20 text-4xl md:text-6xl font-bold uppercase tracking-widest">
              Project Highlight 01
          </span>
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
             <ArrowDown className="w-8 h-8 text-white/70" />
          </motion.div>
      </motion.div>

      {/* CONTEÚDO */}
      <div className="container mx-auto px-4 pt-24 pb-20 relative z-10">
        
        {/* TÍTULO */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto mb-24 text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter leading-[0.9]">
            {project.title}
            <span className={`block text-2xl md:text-4xl font-normal mt-4 bg-gradient-to-r ${project.color} bg-clip-text text-transparent tracking-normal font-sans`}>
              {project.subtitle}
            </span>
          </h1>
        </motion.div>

        {/* INFO GRID */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 border-y border-white/10 py-12 mb-24"
        >
          <div className="space-y-2">
            <span className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase"><User className="w-3 h-3" /> Cliente</span>
            <p className="text-lg font-medium">{project.client}</p>
          </div>
          <div className="space-y-2">
            <span className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase"><Calendar className="w-3 h-3" /> Ano</span>
            <p className="text-lg font-medium">{project.year}</p>
          </div>
          <div className="space-y-2 md:col-span-2">
            <span className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase"><Layers className="w-3 h-3" /> Serviços</span>
            <div className="flex flex-wrap gap-2">
              {project.services.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-xs border border-white/10">{s}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* DESCRIÇÃO */}
        <div className="grid md:grid-cols-12 gap-12 mb-32">
          <div className="md:col-span-4">
            <h3 className="text-2xl font-bold mb-4 border-l-4 border-white pl-4">O Desafio</h3>
          </div>
          <div className="md:col-span-8">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              {project.description}
            </p>
            <div className="mt-8">
                <Button 
                  onClick={() => window.open(project.url, '_blank')}
                  className="bg-white text-black font-bold hover:bg-gray-200 border-0 transition-all px-8 h-12"
                >
                    Visitar Website <ExternalLink className="ml-2 w-5 h-5" />
                </Button>
            </div>
          </div>
        </div>

        {/* GALERIA SECUNDÁRIA (COM EFEITO SPRING) */}
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {project.images.slice(1).map((imgClass, index) => (
               <ZoomImage key={index} imgClass={imgClass} index={index} />
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-32 border-t border-white/10 pt-12 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Próximo Projeto</div>
            <Button 
                variant="link" 
                className="text-2xl font-bold text-white hover:text-gray-400 transition-colors p-0 h-auto"
                onClick={() => setLocation(projectId === 'abela-mielo' ? '/project/core-engine' : '/project/abela-mielo')}
            >
                {projectId === 'abela-mielo' ? 'Core Engine' : 'Abela Mielo'} <ArrowRight className="ml-4 w-6 h-6" />
            </Button>
        </div>

      </div>
    </div>
  );
}