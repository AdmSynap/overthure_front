import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, CheckCircle2, Mail, MapPin, Sparkles, Code2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import ParticlesBackground from "@/components/ParticlesBackground";
import emailjs from "@emailjs/browser"; 

export default function ContatoForm() {
  const [, setLocation] = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
  
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [hasDeadline, setHasDeadline] = useState<string>("");

  const servicesOptions = [
    "Identidade Visual", "Design UI/UX", "Web Development", 
    "Software Customizado", "App Mobile", "WebGL / 3D", 
    "Design de Produto", "Branding"
  ];

  const budgetOptions = ["2k - 5k", "10k - 25k", "30k - 50k", "+50k"];
  
  const deadlineOptions = [
    { id: "sim", label: "Sim" },
    { id: "nao", label: "Não" },
    { id: "urgente", label: "Urgente" }
  ];

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (selectedServices.length === 0) {
      toast.error("Por favor, selecione pelo menos um serviço.");
      return;
    }
    if (!selectedBudget || !hasDeadline) {
      toast.error("Preencha todos os campos de seleção (Orçamento e Prazo).");
      return;
    }

    setIsSubmitting(true);

    // --- INTEGRAÇÃO EMAILJS ---
    const form = formRef.current;
    
    const templateParams = {
        from_name: form?.firstName.value,
        from_email: form?.email.value,
        website: form?.website.value || "Não informado",
        message: form?.message.value,
        services: selectedServices.join(", "),
        budget: selectedBudget,
        deadline: hasDeadline === "sim" ? form?.deadlineDate.value : hasDeadline === "urgente" ? "Urgente" : "Sem prazo definido"
    };

    const SERVICE_ID = "service_9jrlhhh";   
    const TEMPLATE_ID = "template_tsd065c"; 
    const PUBLIC_KEY = "UQ-1Pjv_78A_IEebC";   

    try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        
        setIsSubmitting(false);
        setSubmitted(true);
        toast.success("Briefing enviado com sucesso! Entraremos em contato.");
        
        setTimeout(() => setLocation("/"), 5000);

    } catch (error) {
        console.error("Erro EmailJS:", error);
        setIsSubmitting(false);
        toast.error("Erro ao enviar. Por favor, verifique sua conexão ou tente mais tarde.");
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const chipStyle = (isSelected: boolean) => `
    px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-md border transition-all duration-300
    ${isSelected 
      ? "bg-white border-transparent text-black shadow-lg shadow-white/20" 
      : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/50 hover:text-white"
    }
  `;

  return (
    <div className={`min-h-screen bg-background text-foreground overflow-x-hidden ${isScrolling ? 'scrolling' : 'idle'}`}>
      
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
      
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <ParticlesBackground />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para Home
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Coluna Esquerda */}
          <div className="space-y-12">
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              {/* PALAVRA "CONTATO" EM CINZA AQUI */}
              <span className="text-gray-400 font-medium tracking-wider text-sm uppercase">Contato</span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 leading-tight">
                {/* PALAVRA "INCRÍVEL" EM CINZA AQUI */}
                Vamos Construir Algo <span className="text-gray-400">Incrível</span> Juntos?
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Conte-nos sobre o seu projeto. Nossa equipe de especialistas analisará seu briefing e retornará com uma proposta estratégica.
              </p>
            </motion.div>

            <div className="grid gap-6">
              {[
                { icon: Sparkles, title: "Design Exclusivo", desc: "Criamos identidades visuais únicas que destacam sua marca." },
                { icon: Code2, title: "Tecnologia de Ponta", desc: "Desenvolvimento robusto, escalável e seguro." },
                { icon: Rocket, title: "Foco em Performance", desc: "Otimização para conversão e velocidade." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Card className="bg-card/50 border-white/20 hover:border-white/50 transition-colors">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="bg-white/10 p-3 rounded-lg text-white">
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

            <div className="pt-8 border-t border-white/10 space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-white" />
                <span>contato@overthure.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors">
                <MapPin className="w-5 h-5 text-white" />
                <span>Curitiba, PR - Brasil (Atendimento Global)</span>
              </div>
            </div>
          </div>

          {/* Coluna Direita (Formulário) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="sticky top-8"
          >
            <Card className="bg-[#0a0a0a] border-white/20 shadow-2xl shadow-white/5 overflow-hidden">
              <div className="h-2 w-full bg-white" />
              
              <CardContent className="p-8">
                {!submitted ? (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-white">Briefing do Projeto</h2>
                      <p className="text-muted-foreground text-sm">
                        Preencha os detalhes abaixo para iniciarmos.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nome Completo</Label>
                        <Input name="firstName" required placeholder="Seu nome" className="bg-white/5 border-white/10 focus:border-white text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label>E-mail</Label>
                        <Input name="email" required type="email" placeholder="seu@email.com" className="bg-white/5 border-white/10 focus:border-white text-white" />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Quais serviços você precisa?</Label>
                      <div className="flex flex-wrap gap-2">
                        {servicesOptions.map((s) => (
                          <button key={s} type="button" onClick={() => toggleService(s)} className={chipStyle(selectedServices.includes(s))}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>URL Atual (Opcional)</Label>
                      <Input name="website" placeholder="https://www.seusite.com.br" className="bg-white/5 border-white/10 focus:border-white text-white" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label>Orçamento Estimado</Label>
                        <div className="flex flex-wrap gap-2">
                          {budgetOptions.map((b) => (
                            <button key={b} type="button" onClick={() => setSelectedBudget(b)} className={chipStyle(selectedBudget === b)}>
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label>Prazo de Entrega</Label>
                        <div className="flex flex-wrap gap-2">
                          {deadlineOptions.map((opt) => (
                            <button key={opt.id} type="button" onClick={() => setHasDeadline(opt.id)} className={chipStyle(hasDeadline === opt.id)}>
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {hasDeadline === "sim" && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <Input name="deadlineDate" required placeholder="Qual a data limite desejada?" className="bg-white/5 border-white/10 focus:border-white text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-2">
                      <Label>Resumo do Projeto (Briefing)</Label>
                      <Textarea 
                        name="message"
                        required 
                        rows={4} 
                        placeholder="Descreva os objetivos, público-alvo e funcionalidades principais..." 
                        className="bg-white/5 border-white/10 focus:border-white resize-none text-white" 
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-12 bg-white text-black font-bold uppercase tracking-wide hover:bg-gray-200 transition-all border-0"
                    >
                      {isSubmitting ? "Enviando..." : (
                        <span className="flex items-center gap-2">
                          Enviar Proposta <Send className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-20 space-y-6">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                      <CheckCircle2 className="h-24 w-24 text-white mx-auto" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-white uppercase tracking-tighter">Briefing Recebido!</h3>
                    <p className="text-muted-foreground">Nossa equipe analisará sua solicitação e entrará em contato em breve.</p>
                    <div className="pt-8">
                      <div className="w-48 h-1 bg-white/10 mx-auto rounded-full overflow-hidden">
                          <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 5 }} className="h-full bg-white shadow-[0_0_10px_#ffffff]" />
                      </div>
                      <p className="text-[10px] mt-4 text-white uppercase tracking-[0.2em] font-black italic">Redirecionando...</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}