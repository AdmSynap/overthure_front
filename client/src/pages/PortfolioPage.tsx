import { motion } from 'framer-motion';
import {
  Globe,
  Database,
  ArrowLeft,
  ArrowRight,
  PlayIcon,
  ChevronDown
} from 'lucide-react';

// Componente decorativo de fundo
const ParticlesBackground = () => (
  <div className="absolute inset-0 opacity-10 pointer-events-none grid-pattern fixed" />
);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  objectiveTitle: string;
  objectiveText: string;
  processTitle: string;
  processText: string;
  transmission: string;
  technologies: string[];
  icon: any;
  mockImage: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Melífera Abela Mielo',
    category: 'Web & Design',
    description: 'Plataforma especializada para venda de mel orgânico e favos.',
    longDescription: 'Desenvolvemos um portal de vendas focado no produtor melífero, permitindo a venda direta de mel, favos e derivados com sistema de frete inteligente. O design foi pensado para evocar a naturalidade e pureza do produto, utilizando tons terrosos e dourados.',
    objectiveTitle: 'TORNAR A PUREZA DO MEL TANGÍVEL.',
    objectiveText: 'O objetivo deste projeto foi tornar óbvio o que a marca faz, para quem é, e por que a qualidade importa logo na seção principal. Focamos em mostrar o ciclo da colheita até a mesa, reduzindo a carga cognitiva e tornando "Comprar Agora" a ação primária clara.',
    processTitle: 'DESIGN ATÔMICO E PROTOTIPAGEM ÁGIL.',
    processText: 'Utilizamos Figma para criar um sistema de design atômico, garantindo que botões, cores e tipografia transmitissem a sensação "orgânica" da marca. Após validar o fluxo de compra com usuários reais via protótipos, partimos para o desenvolvimento componentizado.',
    transmission: 'Queríamos capturar a essência dourada e viscosa do mel. Utilizamos tipografia serifada para evocar tradição e uma paleta de cores quentes para transmitir o acolhimento e a pureza de um produto 100% natural.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    icon: Globe,
    mockImage: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=2080&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Gateway Fintech',
    category: 'Software',
    description: 'Infraestrutura financeira robusta com alta performance.',
    longDescription: 'Arquitetura de gateway customizada para Fintechs, incluindo suporte a múltiplas adquirentes, sistema antifraude avançado e conformidade total com PCI DSS. Focado em estabilidade, segurança bancária e velocidade milimétrica.',
    objectiveTitle: 'CONFIANÇA E VELOCIDADE CIRÚRGICA.',
    objectiveText: 'O Gateway Fintech precisava processar milhões de requisições. O objetivo foi reescrever o núcleo do processamento para garantir estabilidade absoluta e segurança bancária. Focamos em latência zero e uma dashboard clara para gestores.',
    processTitle: 'ARQUITETURA DE MICROSSERVIÇOS RESILIENTE.',
    processText: 'Para garantir zero downtime, adotamos o strangler pattern, migrando funcionalidades críticas gradualmente. O desenvolvimento foi pautado em TDD (Test Driven Development) para assegurar que cada transação fosse processada corretamente.',
    transmission: 'A prioridade era transmitir solidez inabalável. O design visual foi despido de ornamentos, focando em dados claros e contraste alto (Dark Mode). A sensação é de uma máquina perfeitamente azeitada.',
    technologies: ['Python', 'PostgreSQL', 'Docker', 'Kubernetes'],
    icon: Database,
    mockImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop',
  },
];

const PortfolioPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-teal-500 selection:text-black">
      <style dangerouslySetInnerHTML={{ __html: `
        .grid-pattern {
          background-image: linear-gradient(rgba(45, 212, 191, 0.05) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(45, 212, 191, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        html { scroll-behavior: smooth; }
      `}} />

      <ParticlesBackground />

      {/* Header Fixo */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-xl bg-black/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-black tracking-tighter text-[#00CED1]">OVERTHURE</span>
          <button onClick={onBack} className="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={14} /> VOLTAR AO INÍCIO
          </button>
        </div>
      </nav>

      {/* --- SEÇÕES DOS PROJETOS --- */}
      <main className="pt-24">
        {projects.map((project, index) => (
          <section key={project.id} className={`relative py-24 ${index !== 0 ? 'border-t border-white/5' : ''}`}>
            <div className="max-w-6xl mx-auto px-6">
              
              {/* 1. Header do Projeto */}
              <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <project.icon className="text-teal-500 w-6 h-6" />
                    <span className="text-xs font-black tracking-[0.3em] text-teal-500 uppercase">{project.category}</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-[0.9]">
                    {project.title}
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-white/10 pl-6 mb-8">
                    {project.longDescription}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map(t => (
                      <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-gray-500">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="absolute -inset-4 bg-teal-500/10 rounded-[2rem] blur-2xl group-hover:bg-teal-500/20 transition-all" />
                  <img 
                    src={project.mockImage} 
                    alt={project.title} 
                    className="relative rounded-2xl border border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </motion.div>
              </div>

              {/* 2. Detalhes em Grid (Objetivo e Processo) */}
              <div className="grid md:grid-cols-2 gap-12 lg:gap-24 mb-32">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-[10px] font-black tracking-[0.4em] text-gray-600 uppercase mb-6 flex items-center gap-2">
                    <div className="w-8 h-[1px] bg-gray-800" /> Objetivo
                  </h4>
                  <h3 className="text-2xl font-bold mb-6 text-white uppercase tracking-tight">{project.objectiveTitle}</h3>
                  <p className="text-gray-400 leading-relaxed font-light">{project.objectiveText}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="text-[10px] font-black tracking-[0.4em] text-gray-600 uppercase mb-6 flex items-center gap-2">
                    <div className="w-8 h-[1px] bg-gray-800" /> O Processo
                  </h4>
                  <h3 className="text-2xl font-bold mb-6 text-white uppercase tracking-tight">{project.processTitle}</h3>
                  <p className="text-gray-400 leading-relaxed font-light">{project.processText}</p>
                </motion.div>
              </div>

              {/* 3. Essência e Vídeo/Demo */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-8 md:p-16 grid lg:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <h4 className="text-[10px] font-black tracking-[0.4em] text-teal-500 uppercase mb-6">A Essência Visual</h4>
                  <p className="text-2xl md:text-3xl font-medium text-white leading-snug tracking-tight mb-8">
                    "{project.transmission}"
                  </p>
                  <button className="flex items-center gap-3 text-sm font-bold border-b border-teal-500 pb-2 hover:text-teal-500 transition-colors">
                    VER PROJETO AO VIVO <ArrowRight size={16} />
                  </button>
                </div>
                <div className="aspect-video bg-black rounded-2xl border border-white/10 flex flex-col items-center justify-center group cursor-pointer overflow-hidden relative">
                   <div className="absolute inset-0 bg-teal-500/5 group-hover:bg-transparent transition-colors" />
                   <PlayIcon className="w-12 h-12 text-white group-hover:scale-125 transition-transform relative z-10" />
                   <span className="mt-4 text-[9px] font-black tracking-[0.3em] uppercase opacity-50 relative z-10">Solicitar Demo</span>
                </div>
              </motion.div>

              {/* Indicador de "Próximo Projeto" */}
              {index === 0 && (
                <div className="mt-32 flex flex-col items-center gap-4 opacity-30">
                  <span className="text-[10px] font-bold tracking-[0.5em] uppercase">Próximo Projeto</span>
                  <ChevronDown className="animate-bounce" />
                </div>
              )}
            </div>
          </section>
        ))}
      </main>

      {/* Footer Final */}
      <footer className="py-32 bg-black relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-2xl mx-auto px-6"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tighter italic">SEU PROJETO É O PRÓXIMO?</h2>
          <button 
            onClick={onBack}
            className="px-10 py-5 bg-[#00CED1] text-black font-black text-sm tracking-[0.2em] rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,206,209,0.3)]"
          >
            INICIAR CONSULTORIA
          </button>
        </motion.div>
      </footer>
    </div>
  );
};

export default PortfolioPage;