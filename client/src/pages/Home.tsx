import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Lightbulb, Rocket, Target, Mail, Linkedin, Twitter, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function Home() {
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Navegação */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">I</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              InnovaTech
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#sobre" className="text-sm hover:text-primary transition-colors">Sobre</a>
            <a href="#areas" className="text-sm hover:text-primary transition-colors">Áreas de Atuação</a>
            <a href="#diferenciais" className="text-sm hover:text-primary transition-colors">Diferenciais</a>
            <a href="#contato" className="text-sm hover:text-primary transition-colors">Contato</a>
          </div>
          <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Fale Conosco
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background decorativo */}
        <div className="absolute inset-0 overflow-hidden">
          <ParticlesBackground />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
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
            <motion.div
              variants={fadeInUp}
              className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4"
            >
              <span className="text-primary text-sm font-medium">Inovação que Transforma o Futuro</span>
            </motion.div>
            
            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold leading-tight"
            >
              Desenvolvendo o{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                Amanhã
              </span>
              {" "}com Tecnologia de Ponta
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
            >
              Somos uma startup dedicada à pesquisa e desenvolvimento de soluções inovadoras que 
              revolucionam indústrias e criam valor sustentável.
            </motion.p>
            
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 group">
                Conheça Nossos Projetos
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Seja um Investidor
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="h-8 w-8 text-primary" />
          </motion.div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="py-24 bg-card/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold">Sobre a InnovaTech</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A InnovaTech nasceu da visão de transformar ideias ousadas em realidade tecnológica. 
              Somos uma equipe multidisciplinar de pesquisadores, engenheiros e visionários comprometidos 
              em desenvolver soluções que não apenas atendem às necessidades atuais, mas antecipam os 
              desafios do futuro. Nossa abordagem combina rigor científico com criatividade disruptiva, 
              resultando em inovações que redefinem padrões de mercado.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Embora nossos produtos ainda estejam em fase de desenvolvimento, nossa metodologia já está 
              consolidada e nossa equipe está preparada para entregar soluções de classe mundial. 
              Buscamos parceiros e investidores que compartilhem nossa visão de um futuro tecnologicamente 
              avançado e sustentável.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section id="areas" className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Áreas de Atuação</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Exploramos fronteiras tecnológicas em múltiplas disciplinas para criar soluções integradas e inovadoras.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: "Inteligência Artificial",
                description: "Desenvolvimento de algoritmos avançados de machine learning e deep learning para automação inteligente e análise preditiva de dados complexos."
              },
              {
                icon: Rocket,
                title: "IoT & Sistemas Embarcados",
                description: "Criação de ecossistemas conectados que integram dispositivos inteligentes para otimização de processos industriais e residenciais."
              },
              {
                icon: Target,
                title: "Tecnologias Sustentáveis",
                description: "Pesquisa e implementação de soluções tecnológicas que promovem eficiência energética e redução de impacto ambiental."
              }
            ].map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-8 bg-card border-border hover:border-primary/50 transition-all duration-300 group h-full">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <area.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{area.title}</h3>
                  <p className="text-muted-foreground">{area.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section id="diferenciais" className="py-24 bg-card/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Por que Investir na InnovaTech?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nossa proposta de valor vai além da tecnologia: oferecemos visão estratégica e execução impecável.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                number: "01",
                title: "Equipe Multidisciplinar de Elite",
                description: "Profissionais com formação nas melhores instituições globais e experiência em projetos de alto impacto tecnológico."
              },
              {
                number: "02",
                title: "Metodologia Ágil e Validada",
                description: "Processos de desenvolvimento baseados em pesquisa científica rigorosa e validação contínua de hipóteses."
              },
              {
                number: "03",
                title: "Foco em Escalabilidade",
                description: "Todas as nossas soluções são projetadas desde o início para crescimento exponencial e adaptação a diferentes mercados."
              },
              {
                number: "04",
                title: "Compromisso com Sustentabilidade",
                description: "Integramos princípios ESG em todos os nossos projetos, garantindo impacto positivo de longo prazo."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">{item.number}</span>
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

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
        </div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Pronto para Fazer Parte da Revolução?
            </h2>
            <p className="text-xl text-muted-foreground">
              Entre em contato conosco para conhecer nossas oportunidades de investimento e parceria.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Agendar Reunião
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Baixar Pitch Deck
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-24 bg-card/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold">Entre em Contato</h2>
            <p className="text-lg text-muted-foreground">
              Estamos ansiosos para ouvir de você. Seja para investimento, parceria ou simplesmente 
              para conhecer mais sobre nosso trabalho.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <a 
                href="mailto:contato@innovatech.com" 
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>contato@innovatech.com</span>
              </a>
              <div className="flex items-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-primary" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <Twitter className="h-5 w-5 text-primary" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-primary-foreground">I</span>
              </div>
              <span className="text-sm text-muted-foreground">© 2025 InnovaTech. Todos os direitos reservados.</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
              <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

