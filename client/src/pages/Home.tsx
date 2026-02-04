import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Lightbulb, Rocket, Target, Mail, Instagram, Layers, ShieldCheck, Zap, Star, Shield, Headphones, Cpu, Briefcase, Code2, Sparkles, ExternalLink, Users, Timer } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocation } from "wouter"; 
import ParticlesBackground from "@/components/ParticlesBackground";

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="-2 -2 28 28" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a2 2 0 0 0 2 2h2" />
  </svg>
);

export default function Home() {
  const [, setLocation] = useLocation();
  const [isScrolling, setIsScrolling] = useState(false);
  const lenisRef = useRef<any>(null); // Referência para o Lenis
  
  // Ref para controlar o scroll da Hero
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Transformações: de 100% para 70% de escala e de 1 para 0 de opacidade
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // INICIALIZAÇÃO DO LENIS VIA CDN (BLINDADO CONTRA ERROS)
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/lenis@1.1.18/dist/lenis.min.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      const lenis = new (window as any).Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };

    return () => {
      if (lenisRef.current) lenisRef.current.destroy();
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(element, { offset: -20 });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={`min-h-screen bg-background text-foreground ${isScrolling ? 'scrolling' : 'idle'}`}>
      
      {/* Partículas Fixas ao fundo */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticlesBackground />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Configuração obrigatória para o Lenis */
        html.lenis { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto !important; }
        .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
        .lenis.lenis-stopped { overflow: hidden; }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2dd4bf; border-radius: 10px; transition: opacity 0.3s; }
        .idle::-webkit-scrollbar-thumb { background: transparent; }
        * { scrollbar-width: thin; scrollbar-color: ${isScrolling ? '#2dd4bf' : 'transparent'} transparent; transition: scrollbar-color 0.3s; }
      `}} />

     {/* Navegação */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-teal-500/30"
      >
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-teal-500">Overthure Tech</h1>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {[
              { id: 'sobre', label: 'Sobre' },
              { id: 'areas', label: 'Áreas de Atuação' },
              { id: 'servicos', label: 'Nossos Serviços' },
              { id: 'portfolio', label: 'Portfólio' },
              { id: 'diferenciais', label: 'Diferenciais' },
              { id: 'contato', label: 'Contato' }
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                initial="initial"
                whileHover="hover"
                className="group relative py-2 text-sm font-medium overflow-hidden"
              >
                {/* Container das Letras */}
                <div className="relative flex overflow-hidden">
                  {item.label.split("").map((char, index) => (
                    <span 
                      key={index} 
                      className="relative inline-block"
                      style={{ minWidth: char === " " ? "0.4em" : "auto" }}
                    >
                      {/* Letra Original (Branca) - Sobe para sair */}
                      <motion.span
                        variants={{
                          initial: { y: 0 },
                          hover: { y: "-100%" }
                        }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.02,
                          ease: [0.215, 0.61, 0.355, 1]
                        }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>

                      {/* Letra Azul Turquesa - Sobe para entrar */}
                      <motion.span
                        variants={{
                          initial: { y: "100%" },
                          hover: { y: 0 }
                        }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.02,
                          ease: [0.215, 0.61, 0.355, 1]
                        }}
                        className="absolute left-0 top-0 text-teal-400"
                      >
                        {char}
                      </motion.span>
                    </span>
                  ))}
                </div>

                {/* Linha Azul Turquesa animada */}
                <motion.span 
                  variants={{
                    initial: { scaleX: 0 },
                    hover: { scaleX: 1 }
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-teal-400 origin-left"
                />
              </motion.button>
            ))}
          </div>

          <Button 
            onClick={() => setLocation("/contato-form")}
            variant="default" 
            className="bg-gradient-to-r from-teal-500 to-orange-600 text-black hover:opacity-90 border-0 transition-opacity"
          >
            Fale Conosco
          </Button>
        </div>
      </motion.nav>

      {/* HERO SECTION COM EFEITO DE DIMINUIÇÃO (SCALE DOWN) */}
      <section ref={heroRef} className="relative h-[150vh] z-10">
        <motion.div 
          style={{ scale, opacity }}
          className="sticky top-0 h-screen flex items-center justify-center overflow-hidden pt-20"
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
            />
          </div>
          
          <div className="container relative z-10">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="max-w-4xl mx-auto text-center space-y-8"
            >
              <motion.div variants={fadeInUp} className="inline-block px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full mb-4">
                <span className="text-teal-500 text-sm font-medium">Inovação que Transforma o Futuro</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold leading-tight">
                Desenvolvendo o <span className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 bg-clip-text text-transparent">Amanhã</span> com Tecnologia de Ponta
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Com foco e dedicação à pesquisa e desenvolvimento de soluções inovadoras que revolucionam indústrias e criam valor sustentável.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                {/* BOTÃO ATUALIZADO AQUI: Redireciona para 'portfolio' */}
                <Button onClick={() => scrollToSection('portfolio')} size="lg" className="bg-gradient-to-r from-teal-500 to-orange-600 text-black hover:opacity-90 border-0 transition-opacity group">
                  Conheça Nossos Projetos <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" className="bg-transparent border border-orange-600 text-orange-600 hover:bg-orange-100 hover:text-orange-700 transition-colors">
                  Seja um Investidor
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-24 bg-card/30 relative z-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center space-y-6 mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold">Sobre a Overthure Tech</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A Overthure Tech nasceu da visão de transformar ideias ousadas em reality tecnológica. O trabalho desenvolvido caracteriza-se por uma vision multidisciplinar, integrando pesquisa e engenharia para criar soluções à prova de futuro.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nossa base metodológica já se encontra validada e pronta para gerar soluções de excelência global.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Cpu, title: "Inovação", description: "Sempre na vanguarda tecnológica, buscando soluções disruptivas para os desafios mais complexos." },
              { icon: Shield, title: "Profissionalismo", description: "Comprometimento total com prazos, ética e a entrega de resultados de alto padrão corporativo." },
              { icon: Headphones, title: "Atendimento", description: "Suporte humanizado e consultoria próxima para garantir que cada cliente se sinta parte do projeto." },
              { icon: Star, title: "Excelência", description: "Rigor técnico e atenção aos mínimos detalhes para entregar softwares e designs impecáveis." }
            ].map((box, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-8 bg-card border-teal-500/30 hover:border-orange-600/50 transition-all duration-300 group h-full">
                  <div className="w-16 h-16 bg-teal-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-600/20 transition-colors">
                    <box.icon className="h-8 w-8 text-teal-500 group-hover:text-orange-600 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{box.title}</h3>
                  <p className="text-muted-foreground">{box.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfólio */}
<section id="portfolio" className="py-24 bg-black relative z-10 overflow-hidden">
  <div className="container relative z-10">
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm">
          <Sparkles className="w-4 h-4" /> <span>Projetos Realizados</span>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold text-white">Conheça Nosso <br /> <span className="text-teal-400">Portfólio</span></h2>
        <p className="text-lg text-gray-400 max-w-xl leading-relaxed">Explore uma selection dos nossos melhores projetos.</p>
      </motion.div>

      {/* CARDS ALTERADOS PARA O DESIGN DA IMAGEM */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
        
        {/* Card 1: Abela Mielo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          whileHover={{ y: -10 }}
          className="aspect-square rounded-[40px] border border-teal-500/10 grid-pattern relative flex flex-col justify-between p-10 bg-[#080808] group cursor-pointer"
        >
          {/* Ícone Superior Direito */}
          <div className="flex justify-end">
            <Code2 className="text-teal-500/40 w-10 h-10 group-hover:text-teal-400 transition-colors" />
          </div>
          
          {/* Conteúdo Inferior */}
          <div>
            <h3 className="text-white font-bold text-3xl mb-1">Abela Mielo</h3>
            <div className="flex items-center justify-between">
              <p className="text-teal-500 font-medium text-sm">Brand Design & Website</p>
              <div className="bg-teal-500/10 p-2.5 rounded-full border border-teal-500/20 group-hover:bg-teal-500 group-hover:text-black transition-all duration-300">
                <ArrowRight className="w-5 h-5 -rotate-45" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Core Engine */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 20 }} 
          whileHover={{ y: 10 }}
          className="aspect-square rounded-[40px] border border-orange-600/10 grid-pattern relative flex flex-col justify-between p-10 bg-[#080808] group cursor-pointer"
        >
          {/* Ícone Superior Direito */}
          <div className="flex justify-end">
            <Sparkles className="text-orange-600/40 w-10 h-10 group-hover:text-orange-500 transition-colors" />
          </div>

          {/* Conteúdo Inferior */}
          <div>
            <h3 className="text-white font-bold text-3xl mb-1">Core Engine</h3>
            <div className="flex items-center justify-between">
              <p className="text-orange-600 font-medium text-sm">Software Financeiro</p>
              <div className="bg-orange-600/10 p-2.5 rounded-full border border-orange-600/20 group-hover:bg-orange-600 group-hover:text-black transition-all duration-300">
                <ArrowRight className="w-5 h-5 -rotate-45" />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  </div>
</section>

      {/* Áreas de Atuação */}
      <section id="areas" className="py-24 relative z-10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Áreas de Atuação</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Exploramos fronteiras tecnológicas em múltiplas disciplinas para criar soluções integradas e inovadoras.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Lightbulb, title: "Engenharia de Software & Soluções Digitais", description: "Construção de ecossistemas digitais que abrangem desde o núcleo operacional até a vitrine da marca." },
              { icon: Rocket, title: "Design Estratégico & Experiência Visual", description: "Concepção de sistemas de identidade visual e narrativas imersivas em motion graphics." },
              { icon: Target, title: "Performance & Growth", description: "Implementação de estratégias de aquisição de tráfego baseadas em dados (data-driven)." }
            ].map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-8 bg-card border-teal-500/30 hover:border-orange-600/50 transition-all duration-300 group h-full">
                  <div className="w-16 h-16 bg-teal-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-600/20 transition-colors">
                    <area.icon className="h-8 w-8 text-teal-500 group-hover:text-orange-600 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{area.title}</h3>
                  <p className="text-muted-foreground">{area.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Nossos Serviços */}
      <section id="servicos" className="py-24 bg-card/30 relative z-10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Nossos Serviços</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Suporte técnico especializado e consultoria estratégica.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Layers, title: "Desenvolvimento Web & Mobile", description: "Criação de aplicações web e mobile modernas." },
              { icon: Zap, title: "Criação de Sites", description: "Sites profissionais, modernos e otimizados para SEO." },
              { icon: ShieldCheck, title: "Registro de domínio", description: "Registro e gerenciamento completo de domínios." },
              { icon: Mail, title: "E-mail profissional", description: "Configuração de e-mails corporativos personalizados." },
              { icon: Instagram, title: "Gestão de Redes Sociais", description: "Criação, administração e otimização de contas." },
              { icon: Rocket, title: "Desenvolvimento de Software", description: "Softwares personalizados desenvolvidos do zero." },
              { icon: Target, title: "Chatbots Completos", description: "Desenvolvimento de chatbots inteligentes." },
              { icon: Lightbulb, title: "Design & Branding de Marca", description: "Desenvolvimento de identidades visuais inteligentes." }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`flex ${index === 6 ? 'lg:translate-x-[50%]' : ''} ${index === 7 ? 'lg:translate-x-[50%]' : ''}`}
              >
                <Card className="p-8 bg-card border-teal-500/30 hover:border-orange-600/50 transition-all duration-300 group w-full flex flex-col">
                  <div className="w-16 h-16 bg-teal-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-600/20 transition-colors shrink-0">
                    <service.icon className="h-8 w-8 text-teal-500 group-hover:text-orange-600 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground flex-grow">{service.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center space-y-6"
          >
            <p className="text-muted-foreground text-lg md:text-xl font-medium">Não encontrou o que procura? Entre em contato.</p>
            <Button onClick={() => setLocation("/contato-form")} size="lg" className="bg-gradient-to-r from-teal-500 to-orange-600 text-black hover:opacity-90 border-0 transition-all group px-8">
              Solicitar Orçamento <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Diferenciais */}
      <section id="diferenciais" className="py-24 bg-card/30 relative z-10">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Por que Investir na Overthure Tech?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Oferecemos visão estratégica e execução impecável.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { number: "01", title: "Projetos de Assinatura", description: "Desenvolvimento de projetos digitais singulares." },
              { number: "02", title: "Metodologia Ágil", description: "Processos baseados em pesquisa científica." },
              { number: "03", title: "Escalabilidade", description: "Soluções projetadas para crescimento exponencial." },
              { number: "04", title: "Sustentabilidade", description: "Integramos princípios ESG em todos os projetos." }
            ].map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.6, delay: index * 0.1 }} className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center group-hover:bg-orange-600/20 transition-colors">
                  <span className="text-teal-500 font-bold text-xl group-hover:text-orange-600 transition-colors">{item.number}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Revolução */}
      <section className="py-24 relative overflow-hidden z-20 bg-background">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/15 via-transparent to-orange-600/15"></div>
        </div>
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">Pronto para Fazer Parte da Revolução?</h2>
            <p className="text-xl text-muted-foreground">Entre em contato conosco para conhecer nossas oportunidades.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button onClick={() => setLocation("/contato-form")} size="lg" className="bg-gradient-to-r from-teal-500 to-orange-600 text-black hover:opacity-90 border-0 transition-opacity group">
                Agendar Reunião <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" className="bg-transparent border border-orange-600 text-orange-600 hover:bg-orange-100 hover:text-orange-700 transition-colors">Baixar Pitch Deck</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-24 bg-card/30 relative z-10">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }} className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">Entre em Contato</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <a href="mailto:contato@overthuretech.com" className="flex items-center gap-2 text-white hover:text-teal-500 transition-colors">
                <Mail className="h-5 w-5 text-white" /> <span>contato@overthuretech.com</span>
              </a>
              <div className="flex items-center gap-4">
                <Instagram className="h-6 w-6 text-white cursor-pointer hover:text-teal-500 transition-colors" />
                <WhatsappIcon className="h-6 w-6 text-white cursor-pointer hover:text-teal-500 transition-colors" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-teal-500/30 relative z-10 bg-background/80 backdrop-blur-sm">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">© 2026 Overthure Tech. Todos os direitos reservados.</span>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-teal-500 transition-colors">Privacidade</a>
              <a href="#" className="hover:text-teal-500 transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}