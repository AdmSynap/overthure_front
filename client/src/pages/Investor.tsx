import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, ShieldCheck, Globe, Rocket, CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import ParticlesBackground from "@/components/ParticlesBackground";
import emailjs from "@emailjs/browser";

export default function Investor() {
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Ref para o formulário
  const formRef = useRef<HTMLFormElement>(null);

  // --- LÓGICA DA BARRA DE ROLAGEM ---
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
  // ----------------------------------

  const reasons = [
    {
      icon: TrendingUp,
      title: "Crescimento Exponencial",
      desc: "Atuamos em mercados de alta demanda com escalabilidade validada e roadmap de expansão agressivo."
    },
    {
      icon: Rocket,
      title: "Tecnologia Proprietária",
      desc: "IP (Propriedade Intelectual) exclusiva desenvolvida internamente, criando barreiras de entrada para competidores."
    },
    {
      icon: ShieldCheck,
      title: "Segurança & ESG",
      desc: "Governança corporativa sólida com compliance total e compromisso com práticas sustentáveis."
    },
    {
      icon: Globe,
      title: "Alcance Global",
      desc: "Soluções agnósticas a fronteiras, prontas para internacionalização desde o dia um."
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // DADOS PARA O EMAILJS
    const form = formRef.current;
    
    const templateParams = {
        from_name: form?.firstName.value,
        from_lastname: form?.lastName.value,
        from_email: form?.email.value,
        company: form?.company.value || "Não informada",
        message: form?.interest.value
    };

    // --- SUAS CHAVES DO EMAILJS ---
    // Dica: Você pode usar o mesmo Service ID e Public Key, 
    // mas recomendo criar um Template diferente para Investidores.
    const SERVICE_ID = "service_9jrlhhh";         // Mesmo do contato
    const TEMPLATE_ID = "template_09d9pdy"; // Crie um template novo para investidores
    const PUBLIC_KEY = "UQ-1Pjv_78A_IEebC";         // Mesma do contato

    try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        
        setIsSubmitting(false);
        toast.success("Solicitação Recebida", {
            description: "Nossa equipe de RI (Relações com Investidores) entrará em contato em até 24h.",
        });
        
        // Redireciona para home após sucesso
        setTimeout(() => setLocation("/"), 4000);

    } catch (error) {
        console.error("Erro EmailJS:", error);
        setIsSubmitting(false);
        toast.error("Erro ao enviar. Por favor, tente novamente.");
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className={`min-h-screen bg-background text-foreground overflow-x-hidden ${isScrolling ? 'scrolling' : 'idle'}`}>
      
      {/* --- ESTILO DINÂMICO DA SCROLLBAR --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { 
          background: ${isScrolling ? '#2dd4bf' : 'transparent'}; 
          border-radius: 10px; 
          transition: background 0.3s; 
        }
        html {
          scrollbar-width: thin;
          scrollbar-color: ${isScrolling ? '#2dd4bf' : 'transparent'} transparent;
          transition: scrollbar-color 0.3s;
        }
      `}} />

      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <ParticlesBackground />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-teal-500 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para Home
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          <div className="space-y-12">
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <span className="text-teal-500 font-medium tracking-wider text-sm uppercase">Investidores</span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                Impulsione o Futuro com a <span className="text-teal-500">Overthure</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Estamos construindo a próxima geração de infraestrutura digital. Junte-se a nós nesta jornada e faça parte de um portfólio de alta performance.
              </p>
            </motion.div>

            <div className="grid gap-6">
              {reasons.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Card className="bg-card/50 border-teal-500/20 hover:border-teal-500/50 transition-colors">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="bg-teal-500/10 p-3 rounded-lg text-teal-500">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1 text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.8 }}
              className="p-6 bg-gradient-to-r from-teal-900/20 to-orange-900/20 rounded-xl border border-white/10"
            >
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="text-teal-500 w-5 h-5" />
                <h4 className="font-bold text-white">Rodada Série A Aberta</h4>
              </div>
              <p className="text-sm text-gray-400 pl-8">
                Estamos aceitando propostas para nossa nova rodada de captação estratégica.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="sticky top-8"
          >
            <Card className="bg-[#0a0a0a] border-orange-600/20 shadow-2xl shadow-orange-900/5 overflow-hidden">
              <div className="h-2 w-full bg-gradient-to-r from-teal-500 to-orange-600" />
              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">Agendar Reunião</h2>
                  <p className="text-muted-foreground text-sm">
                    Preencha o formulário abaixo para receber nosso Pitch Deck e agendar uma conversa com nossos fundadores.
                  </p>
                </div>

                {/* Form com REF para capturar dados */}
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nome</Label>
                      {/* Name adicionado */}
                      <Input id="firstName" name="firstName" placeholder="Seu nome" required className="bg-white/5 border-white/10 focus:border-orange-500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Sobrenome</Label>
                      {/* Name adicionado */}
                      <Input id="lastName" name="lastName" placeholder="Sobrenome" required className="bg-white/5 border-white/10 focus:border-orange-500" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail Corporativo</Label>
                    {/* Name adicionado */}
                    <Input id="email" name="email" type="email" placeholder="voce@empresa.com" required className="bg-white/5 border-white/10 focus:border-orange-500" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa / Fundo</Label>
                    {/* Name adicionado */}
                    <Input id="company" name="company" placeholder="Nome da organização" className="bg-white/5 border-white/10 focus:border-orange-500" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interest">Mensagem / Interesse</Label>
                    {/* Name adicionado */}
                    <Textarea 
                      id="interest"
                      name="interest"
                      placeholder="Breve descrição do seu interesse de investimento..." 
                      className="min-h-[120px] bg-white/5 border-white/10 focus:border-orange-500 resize-none" 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-12 mt-4 font-bold transition-all border-0 bg-gradient-to-r from-teal-500 to-orange-600 text-black hover:opacity-90"
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <span className="flex items-center gap-2">
                        Solicitar Reunião <Calendar className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Seus dados estão protegidos sob nossa política de confidencialidade (NDA).
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}