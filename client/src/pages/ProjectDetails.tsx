import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
// CORREÇÃO: ArrowRight adicionado na importação abaixo
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, Layers, User } from "lucide-react";
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
    color: "from-teal-500 to-emerald-700",
    images: [
      "bg-gradient-to-br from-teal-900/40 to-black",
      "bg-gradient-to-tl from-emerald-900/40 to-black",
      "bg-gradient-to-bl from-teal-800/20 to-black"
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
    color: "from-orange-600 to-red-800",
    images: [
      "bg-gradient-to-br from-orange-900/40 to-black",
      "bg-gradient-to-tl from-red-900/40 to-black",
      "bg-gradient-to-bl from-orange-800/20 to-black"
    ]
  }
};

export default function ProjectDetails({ params }: { params: { id: string } }) {
  const [, setLocation] = useLocation();
  
  const projectId = params.id;
  const project = projectsData[projectId];

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
    <div className="min-h-screen bg-background text-foreground selection:bg-teal-500/30">
      <ParticlesBackground />
      
      {/* HEADER DE NAVEGAÇÃO */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-sm bg-background/50 border-b border-white/5">
        <Button 
          onClick={() => setLocation("/")} 
          variant="ghost" 
          className="text-muted-foreground hover:text-white hover:bg-white/5 gap-2 uppercase tracking-widest text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Button>
        <span className="text-xs font-mono text-muted-foreground uppercase">{project.category}</span>
      </nav>

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        
        {/* HERO DO PROJETO */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto mb-24"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter leading-[0.9]">
            {project.title}
            <span className={`block text-2xl md:text-4xl font-normal mt-4 bg-gradient-to-r ${project.color} bg-clip-text text-transparent tracking-normal font-sans`}>
              {project.subtitle}
            </span>
          </h1>
        </motion.div>

        {/* GRID DE INFORMAÇÕES */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 border-y border-white/10 py-12 mb-24"
        >
          <div className="space-y-2">
            <span className="flex items-center gap-2 text-xs font-mono text-teal-500 uppercase"><User className="w-3 h-3" /> Cliente</span>
            <p className="text-lg font-medium">{project.client}</p>
          </div>
          <div className="space-y-2">
            <span className="flex items-center gap-2 text-xs font-mono text-teal-500 uppercase"><Calendar className="w-3 h-3" /> Ano</span>
            <p className="text-lg font-medium">{project.year}</p>
          </div>
          <div className="space-y-2 md:col-span-2">
            <span className="flex items-center gap-2 text-xs font-mono text-teal-500 uppercase"><Layers className="w-3 h-3" /> Serviços</span>
            <div className="flex flex-wrap gap-2">
              {project.services.map((s, i) => (
                <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-xs border border-white/10">{s}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* DESCRIÇÃO E CONTEXTO */}
        <div className="grid md:grid-cols-12 gap-12 mb-32">
          <div className="md:col-span-4">
            <h3 className="text-2xl font-bold mb-4 border-l-4 border-teal-500 pl-4">O Desafio</h3>
          </div>
          <div className="md:col-span-8">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              {project.description}
            </p>
            <div className="mt-8">
                <Button className={`bg-gradient-to-r ${project.color} text-white border-0`}>
                    Visitar Projeto Online <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
            </div>
          </div>
        </div>

        {/* GALERIA DE IMAGENS */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`w-full aspect-video rounded-xl border border-white/10 ${project.images[0]} relative overflow-hidden group`}
          >
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/20 text-4xl font-bold uppercase tracking-widest group-hover:scale-110 transition-transform duration-700">Project Highlight 01</span>
             </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {project.images.slice(1).map((imgClass, index) => (
               <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`w-full aspect-square rounded-xl border border-white/10 ${imgClass} relative overflow-hidden group`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/20 text-2xl font-bold uppercase tracking-widest group-hover:scale-110 transition-transform duration-700">Detail {index + 2}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FOOTER DO PROJETO */}
        <div className="mt-32 border-t border-white/10 pt-12 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Próximo Projeto</div>
            <Button 
                variant="link" 
                className="text-2xl font-bold text-white hover:text-teal-500 transition-colors p-0 h-auto"
                onClick={() => setLocation(projectId === 'abela-mielo' ? '/project/core-engine' : '/project/abela-mielo')}
            >
                {projectId === 'abela-mielo' ? 'Core Engine' : 'Abela Mielo'} <ArrowRight className="ml-4 w-6 h-6" />
            </Button>
        </div>

      </div>
    </div>
  );
}