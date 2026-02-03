import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Code,
  Smartphone,
  Globe,
  Bot,
  Palette,
  Database,
  ExternalLink,
  Github,
  ArrowLeft,
  Sparkles,
  Zap,
  Star,
  LucideIcon,
} from 'lucide-react';

// @ts-ignore
import ParticlesBackground from '@/components/ParticlesBackground';

interface ProjectStats {
  users: string;
  rating: string;
  completion: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  icon: LucideIcon;
  gradient: string;
  bgGradient: string;
  image: string;
  mockImage: string;
  stats: ProjectStats;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Melífera Premium',
    category: 'Web',
    description:
      'Plataforma especializada para venda de mel orgânico e favos, com foco em experiência visual rica e rastreabilidade do produto.',
    longDescription:
      'Desenvolvemos um portal de vendas focado no produtor melífero, permitindo a venda direta de mel, favos e derivados com sistema de frete inteligente e catálogo de floradas sazonais.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'AWS'],
    icon: Globe,
    gradient: 'from-amber-400 to-orange-600',
    bgGradient: 'text-amber-500',
    image: '🍯',
    mockImage: '/src/assets/mock-melifera.png',
    stats: { users: '12k+', rating: '5.0', completion: '100%' },
  },
  {
    id: 2,
    title: 'Gateway de Pagamento Fintech',
    category: 'Software',
    description:
      'Integração de infraestrutura financeira robusta com processamento de alta performance, split de pagamentos e segurança bancária.',
    longDescription:
      'Arquitetura de gateway customizada para Fintechs, incluindo suporte a múltiplas adquirentes, sistema antifraude avançado e conformidade total com PCI DSS.',
    technologies: ['Python', 'PostgreSQL', 'Docker', 'Kubernetes', 'Redis'],
    icon: Database,
    gradient: 'from-blue-600 to-cyan-500',
    bgGradient: 'text-[#00CED1]',
    image: '💳',
    mockImage: '/src/assets/mock-fintech.png',
    stats: { users: '50k+', rating: '4.9', completion: '100%' },
  },
  {
    id: 3,
    title: 'Identidade Visual Melífera',
    category: 'Design',
    description:
      'Criação de branding completo para apicultura de luxo, incluindo embalagens sustentáveis e manual da marca.',
    longDescription:
      'Desenvolvimento de marca que une a tradição da apicultura com o design minimalista moderno, focando na pureza do mel e na preservação das abelhas.',
    technologies: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Indesign'],
    icon: Palette,
    gradient: 'from-yellow-500 to-amber-700',
    bgGradient: 'text-amber-600',
    image: '🐝',
    mockImage: '/src/assets/mock-branding-mel.png',
    stats: { users: '100+', rating: '5.0', completion: '100%' },
  },
];

const categories = ['Todos', 'Web', 'Software', 'Design'];

interface PortfolioPageProps {
  onBack: () => void;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === 'Todos'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative portfolio-page">
      <style dangerouslySetInnerHTML={{ __html: `
        html {
          scrollbar-width: thin;
          scrollbar-color: transparent transparent;
          transition: scrollbar-color 0.3s ease;
        }
        html:hover, html:active {
          scrollbar-color: #00ced1 transparent;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background-color: transparent;
          border-radius: 10px;
          transition: background-color 0.3s ease;
        }
        html:hover ::-webkit-scrollbar-thumb,
        body:hover ::-webkit-scrollbar-thumb,
        html:active ::-webkit-scrollbar-thumb {
          background-color: #00ced1;
        }
      `}} />

      <div className="fixed inset-0 z-0">
        <ParticlesBackground />
      </div>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 border-b border-white/10 backdrop-blur-md bg-black/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Voltar ao Site</span>
            </button>
            <h1 className="text-2xl font-bold text-[#00CED1] text-center">
              Portfólio Completo
            </h1>
            <div className="flex items-center gap-2 text-gray-400">
              <Sparkles size={20} className="animate-pulse" />
              <span className="text-sm hidden sm:inline">{projects.length} Projetos Selecionados</span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-300 text-sm font-medium mb-6"
          >
            <Zap size={16} className="text-yellow-400 animate-pulse" />
            Excelência em Desenvolvimento e Design
          </motion.div>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-[#00CED1]">
              Transformando
            </span>
            <br />
            <span className="text-white">Ideias em Realidade</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Conheça nossos casos de sucesso em e-commerce, finanças e branding estratégico.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-white text-black shadow-lg'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/30 hover:text-white backdrop-blur-sm'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredProjects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedProject(project)}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-500">
                    <IconComponent className={`w-10 h-10 ${project.bgGradient}`} />
                  </div>

                  <div className="absolute top-6 right-6">
                    <span className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs font-medium text-gray-300">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00CED1] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-gray-300">{project.stats.rating}</span>
                    </div>
                    <div className="text-gray-400">{project.stats.users} atendidos</div>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors text-sm font-medium">
                    <span>Ver Detalhes</span>
                    <ExternalLink size={16} />
                  </div>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-white/5 border border-white/10 rounded-2xl p-12 backdrop-blur-sm"
        >
          <h3 className="text-3xl font-bold text-white mb-4">Seu Projeto é o Próximo?</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
            Estamos prontos para aplicar tecnologia e design de ponta no seu negócio.
          </p>
          <button
            onClick={onBack}
            className="relative px-8 py-4 rounded-lg font-bold text-lg text-black transition-all duration-300 
                       bg-gradient-to-r from-[#00CED1] to-[#CC5500] 
                       hover:scale-105 hover:shadow-[0_0_20px_rgba(0,206,209,0.5)]
                       active:scale-95 overflow-hidden group"
          >
            <span className="relative z-10">Iniciar Projeto</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 max-w-3xl w-full my-auto shadow-2xl"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-6">
                  <selectedProject.icon className={`w-12 h-12 ${selectedProject.bgGradient}`} />
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                    <span className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-sm font-medium text-gray-300">
                      {selectedProject.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">{selectedProject.longDescription}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{selectedProject.stats.users}</div>
                  <div className="text-sm text-gray-500">Alcance</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{selectedProject.stats.rating}</div>
                  <div className="text-sm text-gray-500">Satisfação</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{selectedProject.stats.completion}</div>
                  <div className="text-sm text-gray-500">Status</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-lg transition-all font-medium flex items-center justify-center gap-2">
                  <ExternalLink size={20} /> Ver Case
                </button>
                <button className="flex-1 bg-white/10 text-white hover:bg-white/20 border border-white/10 px-6 py-3 rounded-lg transition-all font-medium flex items-center justify-center gap-2">
                  <Github size={20} /> Detalhes Técnicos
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioPage;