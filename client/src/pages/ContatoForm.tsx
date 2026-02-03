import { useState, useEffect } from "react"; // Adicionado useEffect
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function ContatoForm() {
  const [, setLocation] = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false); // Estado para detectar scroll
  
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [hasDeadline, setHasDeadline] = useState<string>("");

  // Lógica para mostrar/esconder scrollbar
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1000); // Esconde após 1 segundo de inatividade
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const servicesOptions = [
    "Identidade Visual de Marca", "Design", "Desenvolvimento Web", 
    "Desenvolvimento de Software", "Desenvolvimento de App Mobile", 
    "WebGL", "Design de Produto", "Branding de Marca"
  ];

  const budgetOptions = ["2k - 5k", "10k - 25k", "30k - 50k"];
  
  const deadlineOptions = [
    { id: "sim", label: "Sim" },
    { id: "nao", label: "Não" },
    { id: "urgente", label: "Não, porém o quanto antes" }
  ];

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedBudget || !hasDeadline) return alert("Preencha todos os campos de seleção.");
    setSubmitted(true);
    setTimeout(() => setLocation("/"), 4000); 
  };

  const inputStyle = "w-full bg-[#2a2a2a] border border-white/5 rounded-lg p-4 text-white placeholder:text-white/30 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all";
  
  const chipStyle = (isSelected: boolean) => `
    px-6 py-3 border transition-all duration-300 text-xs font-bold uppercase tracking-tighter rounded-lg
    ${isSelected 
      ? "bg-gradient-to-r from-teal-500 to-orange-600 border-none text-black shadow-[0_0_15px_rgba(45,212,191,0.3)]" 
      : "bg-[#2a2a2a] border-white/5 text-white/70 hover:border-teal-500/50 hover:text-white"
    }
  `;

  return (
    <div className={`min-h-screen bg-background text-foreground relative overflow-hidden flex items-center justify-center p-4 py-12 ${isScrolling ? 'is-scrolling' : 'is-idle'}`}>
      
      {/* CSS DINÂMICO PARA A SCROLLBAR */}
      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { 
          background: ${isScrolling ? '#2dd4bf' : 'transparent'}; 
          border-radius: 10px; 
          transition: background 0.3s ease-in-out;
        }
        /* Firefox */
        * { 
          scrollbar-width: thin; 
          scrollbar-color: ${isScrolling ? '#2dd4bf' : 'transparent'} transparent; 
        }
      `}} />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParticlesBackground />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-3xl">
        <Button 
          onClick={() => setLocation("/")}
          variant="ghost" 
          className="mb-6 bg-[#2a2a2a] text-white hover:bg-[#333333] gap-2 rounded-lg border border-white/5"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar para o site
        </Button>

        <Card className="p-8 md:p-12 bg-card/60 backdrop-blur-xl border-teal-500/30 shadow-2xl">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">Inicie sua Revolução Digital</h2>
                <p className="text-muted-foreground text-lg text-teal-500/80 font-medium italic">Briefing Overthure Tech</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-teal-500 uppercase tracking-widest">Nome Completo</label>
                  <input required className={inputStyle} placeholder="Nome completo" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-teal-500 uppercase tracking-widest">E-mail</label>
                  <input required type="email" className={inputStyle} placeholder="seuemail@email.com" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-teal-500 uppercase tracking-widest">Quais serviços são necessários?</label>
                <div className="flex flex-wrap gap-3">
                  {servicesOptions.map((s) => (
                    <button key={s} type="button" onClick={() => toggleService(s)} className={chipStyle(selectedServices.includes(s))}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-teal-500 uppercase tracking-widest">URL do atual website</label>
                <input type="url" className={inputStyle} placeholder="https://www.seusite.com.br" />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-teal-500 uppercase tracking-widest">Qual é o seu orçamento?</label>
                <div className="flex flex-wrap gap-3">
                  {budgetOptions.map((b) => (
                    <button key={b} type="button" onClick={() => setSelectedBudget(b)} className={chipStyle(selectedBudget === b)}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-teal-500 uppercase tracking-widest">Tem prazo para finalização?</label>
                <div className="flex flex-wrap gap-3">
                  {deadlineOptions.map((opt) => (
                    <button key={opt.id} type="button" onClick={() => setHasDeadline(opt.id)} className={chipStyle(hasDeadline === opt.id)}>
                      {opt.label}
                    </button>
                  ))}
                </div>
                <AnimatePresence>
                  {hasDeadline === "sim" && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-2">
                      <input required className={inputStyle} placeholder="Qual o prazo desejado?" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-teal-500 uppercase tracking-widest">Briefing (Resumo do projeto)</label>
                <textarea required rows={6} className={inputStyle + " resize-none"} placeholder="Escreva seu brief aqui..." />
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-orange-600 text-black font-black h-16 text-lg hover:opacity-90 transition-all rounded-lg border-none shadow-xl group uppercase">
                ENVIAR BRIEFING PARA ANÁLISE <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
          ) : (
            <div className="text-center py-20 space-y-6">
              <CheckCircle2 className="h-20 w-20 text-teal-500 mx-auto" />
              <h3 className="text-3xl font-bold text-white uppercase tracking-tighter">Briefing Recebido!</h3>
              <div className="pt-8">
                <div className="w-48 h-1 bg-white/5 mx-auto rounded-full overflow-hidden">
                   <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 4 }} className="h-full bg-teal-500 shadow-[0_0_10px_#2dd4bf]" />
                </div>
                <p className="text-[10px] mt-4 text-teal-500 uppercase tracking-[0.2em] font-black italic">Redirecionando...</p>
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            