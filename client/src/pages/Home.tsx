import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Lightbulb, Rocket, Target, Mail, Instagram, Layers, ShieldCheck, Zap, Star, Shield, Headphones, Cpu, Code2, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionValueEvent } from "framer-motion";
import { useLocation } from "wouter";
import ParticlesBackground from "@/components/ParticlesBackground";
import roboVideo from "./robo.mp4";

// --- INÍCIO DO COMPONENTE CUBO BINÁRIO (Hero) ---
const BinaryCube = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
        if(canvas.parentElement) {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        }
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const size = 260; 
    const perspective = 1000; 
    const barThickness = 18; 
    
    const colorLightGray = "#d1d5db"; 
    const colorMediumGray = "#9ca3af"; 

    const shrink = 0.88; 
    const offset = 1.05; 

    const faces = [
      { color: colorLightGray, highlight: false, verts: [{x: -shrink, y: -shrink, z: -offset}, {x: shrink, y: -shrink, z: -offset}, {x: shrink, y: shrink, z: -offset}, {x: -shrink, y: shrink, z: -offset}] },
      { color: colorLightGray, highlight: false, verts: [{x: -shrink, y: -shrink, z: offset}, {x: shrink, y: -shrink, z: offset}, {x: shrink, y: shrink, z: offset}, {x: -shrink, y: shrink, z: offset}] },
      { color: colorLightGray, highlight: true,  verts: [{x: -offset, y: -shrink, z: -shrink}, {x: -offset, y: shrink, z: -shrink}, {x: -offset, y: shrink, z: shrink}, {x: -offset, y: -shrink, z: shrink}] },
      { color: colorLightGray, highlight: false, verts: [{x: offset, y: -shrink, z: -shrink}, {x: offset, y: shrink, z: -shrink}, {x: offset, y: shrink, z: shrink}, {x: offset, y: -shrink, z: shrink}] },
      { color: colorLightGray, highlight: false, verts: [{x: -shrink, y: -offset, z: -shrink}, {x: shrink, y: -offset, z: -shrink}, {x: shrink, y: -offset, z: shrink}, {x: -shrink, y: -offset, z: shrink}] },
      { color: colorLightGray, highlight: false, verts: [{x: -shrink, y: offset, z: -shrink}, {x: shrink, y: offset, z: -shrink}, {x: shrink, y: offset, z: shrink}, {x: -shrink, y: offset, z: shrink}] }
    ];

    let angleX = 0;
    let angleY = 0;
    let animationFrameId: number;

    const getBinaryString = (length: number) => {
        let str = "";
        for(let i=0; i<length; i++) str += Math.random() > 0.5 ? "1" : "0";
        return str;
    };

    const project = (v: {x: number, y: number, z: number}, cx: number, cy: number) => {
        const x1 = v.x * Math.cos(angleY) - v.z * Math.sin(angleY);
        const z1 = v.z * Math.cos(angleY) + v.x * Math.sin(angleY);
        const y2 = v.y * Math.cos(angleX) - z1 * Math.sin(angleX);
        const z2 = z1 * Math.cos(angleX) + v.y * Math.sin(angleX);
        const scale = perspective / (perspective + z2 * size + 500);
        return {
            x: x1 * size * scale + cx,
            y: y2 * size * scale + cy,
            z: z2,
            scale: scale 
        };
    };

    const drawBar3D = (v1: {x:number, y:number, z:number}, v2: {x:number, y:number, z:number}, isHighlight: boolean, cx: number, cy: number) => {
        const dx = v2.x - v1.x;
        const dy = v2.y - v1.y;
        const dz = v2.z - v1.z;
        const len = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (len < 0.01) return;

        const ux = dx/len, uy = dy/len, uz = dz/len;
        let up = {x:0, y:1, z:0};
        if (Math.abs(uy) > 0.9) up = {x:1, y:0, z:0};
        
        const sx = up.y*uz - up.z*uy;
        const sy = up.z*ux - up.x*uz;
        const sz = up.x*uy - up.y*ux;
        const slen = Math.sqrt(sx*sx + sy*sy + sz*sz);
        const sideX = sx/slen, sideY = sy/slen, sideZ = sz/slen;
        const topX = uy*sideZ - uz*sideY;
        const topY = uz*sideX - ux*sideZ;
        const topZ = ux*sideY - uy*sideX;

        const w = barThickness / (size * 2);
        const barVerts = [];
        for(let i=0; i<2; i++) {
            const p = i===0 ? v1 : v2;
            barVerts.push({x: p.x - sideX*w + topX*w, y: p.y - sideY*w + topY*w, z: p.z - sideZ*w + topZ*w});
            barVerts.push({x: p.x + sideX*w + topX*w, y: p.y + sideY*w + topY*w, z: p.z + sideZ*w + topZ*w});
            barVerts.push({x: p.x + sideX*w - topX*w, y: p.y + sideY*w - topY*w, z: p.z + sideZ*w - topZ*w});
            barVerts.push({x: p.x - sideX*w - topX*w, y: p.y - sideY*w - topY*w, z: p.z - sideZ*w - topZ*w});
        }

        const projBarVerts = barVerts.map(v => project(v, cx, cy));
        const bFaces = [[0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7], [0, 1, 2, 3], [4, 5, 6, 7]];

        const color = isHighlight ? colorMediumGray : colorLightGray;
        const edgeColor = "rgba(209, 213, 219, 0.2)";

        bFaces.sort((a, b) => {
            const zA = (projBarVerts[a[0]].z + projBarVerts[a[1]].z + projBarVerts[a[2]].z + projBarVerts[a[3]].z) / 4;
            const zB = (projBarVerts[b[0]].z + projBarVerts[b[1]].z + projBarVerts[b[2]].z + projBarVerts[b[3]].z) / 4;
            return zB - zA;
        });

        bFaces.forEach((f) => {
            const p0 = projBarVerts[f[0]], p1 = projBarVerts[f[1]], p2 = projBarVerts[f[2]], p3 = projBarVerts[f[3]];
            
            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y); ctx.lineTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.lineTo(p3.x, p3.y);
            ctx.closePath();
            ctx.strokeStyle = edgeColor;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            ctx.save();
            ctx.clip(); 
            const cxF = (p0.x + p1.x + p2.x + p3.x) / 4;
            const cyF = (p0.y + p1.y + p2.y + p3.y) / 4;
            const d01 = Math.hypot(p1.x - p0.x, p1.y - p0.y);
            const d12 = Math.hypot(p2.x - p1.x, p2.y - p1.y);
            
            let ang = d01 > d12 ? Math.atan2(p1.y - p0.y, p1.x - p0.x) : Math.atan2(p2.y - p1.y, p2.x - p1.x);
            if (Math.abs(ang) > Math.PI / 2) ang += Math.PI;
            
            ctx.translate(cxF, cyF);
            ctx.rotate(ang);
            
            const sAvg = (p0.scale + p2.scale) / 2;
            const fSize = Math.max(9, (barThickness - 4) * sAvg);
            
            ctx.fillStyle = color;
            ctx.font = `${fSize}px monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            
            const maxDim = Math.max(d01, d12);
            const nChars = Math.max(1, Math.floor(maxDim / (fSize * 0.6)));
            ctx.fillText(getBinaryString(nChars), 0, fSize * 0.1);
            ctx.restore();
        });
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        angleX += 0.003;
        angleY += 0.005;

        const barsToDraw: any[] = [];
        faces.forEach(face => {
          for(let i=0; i<4; i++) {
            const v1 = face.verts[i];
            const v2 = face.verts[(i+1)%4];
            const midZ = (project(v1, cx, cy).z + project(v2, cx, cy).z) / 2;
            barsToDraw.push({ v1, v2, highlight: face.highlight, z: midZ });
          }
        });

        barsToDraw.sort((a, b) => b.z - a.z);
        barsToDraw.forEach(bar => drawBar3D(bar.v1, bar.v2, bar.highlight, cx, cy));

        animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
        window.removeEventListener('resize', updateSize);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div 
        ref={containerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        className="w-full h-full flex items-center justify-center relative overflow-hidden"
    >
        <canvas ref={canvasRef} className="block w-full h-full" />
        
        <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
                opacity: isHovering ? 1 : 0, 
                scale: isHovering ? 1 : 0.5
            }}
            transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
            className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-10 origin-center"
            style={{
                x: smoothX,
                y: smoothY,
                translateX: "-50%",
                translateY: "-50%",
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                maskImage: "radial-gradient(circle, black 20%, transparent 70%)",
                WebkitMaskImage: "radial-gradient(circle, black 20%, transparent 70%)"
            }}
        />
    </div>
  );
};
// --- FIM DO COMPONENTE CUBO BINÁRIO ---

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

const servicesList = [
  { icon: Layers, title: "Desenvolvimento Web & Mobile", description: "Criação de aplicações web e mobile modernas." },
  { icon: Zap, title: "Criação de Sites", description: "Sites profissionais, modernos e otimizados para SEO." },
  { icon: ShieldCheck, title: "Registro de domínio", description: "Registro e gerenciamento completo de domínios." },
  { icon: Mail, title: "E-mail profissional", description: "Configuração de e-mails corporativos personalizados." },
  { icon: Instagram, title: "Gestão de Redes Sociais", description: "Criação, administração e otimização de contas." },
  { icon: Rocket, title: "Desenvolvimento de Software", description: "Softwares personalizados desenvolvidos do zero." },
  { icon: Target, title: "Chatbots Completos", description: "Desenvolvimento de chatbots inteligentes." },
  { icon: Lightbulb, title: "Design & Branding de Marca", description: "Desenvolvimento de identidades visuais inteligentes." }
];

export default function Home() {
  const [, setLocation] = useLocation();
  const lenisRef = useRef<any>(null);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // --- LÓGICA DE ANIMAÇÃO DA SEÇÃO DE SERVIÇOS ---
  const servicosRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null); 

  const { scrollYProgress: servicosProgress } = useScroll({
    target: servicosRef,
    offset: ["start start", "end end"]
  });

  const smoothServicosProgress = useSpring(servicosProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // --- SINCRONIZANDO O VÍDEO COM O SCROLL ---
  useMotionValueEvent(smoothServicosProgress, "change", (latest) => {
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = latest * videoRef.current.duration;
    }
  });

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
    <div className="min-h-screen bg-background text-foreground relative">
      
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <ParticlesBackground />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        html.lenis { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto !important; }
        .lenis.lenis-stopped { overflow: hidden; }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: transparent; border-radius: 10px; transition: background 0.3s; }
        
        html.lenis-scrolling ::-webkit-scrollbar-thumb { background: #ffffff; }
        
        html { scrollbar-width: thin; scrollbar-color: transparent transparent; transition: scrollbar-color 0.3s; }
        html.lenis-scrolling { scrollbar-color: #ffffff transparent; }
      `}} />

      {/* Navegação */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/20"
      >
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">Overthure</h1>
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
                onClick={() => {
                    if (item.id === 'contato') {
                        setLocation("/contato-form");
                    } else {
                        scrollToSection(item.id);
                    }
                }}
                initial="initial"
                whileHover="hover"
                className="group relative py-2 text-sm font-medium overflow-hidden"
              >
                <div className="relative flex overflow-hidden">
                  {item.label.split("").map((char, index) => (
                    <span 
                      key={index} 
                      className="relative inline-block"
                      style={{ minWidth: char === " " ? "0.4em" : "auto" }}
                    >
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
                        className="absolute left-0 top-0 text-[#EDD187]"
                      >
                        {char}
                      </motion.span>
                    </span>
                  ))}
                </div>
                <motion.span 
                  variants={{
                    initial: { scaleX: 0 },
                    hover: { scaleX: 1 }
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-[#EDD187] origin-left"
                />
              </motion.button>
            ))}
          </div>

          <Button 
            onClick={() => setLocation("/contato-form")}
            variant="default" 
            className="relative overflow-hidden bg-white text-black border-0 group font-bold"
          >
            <span className="absolute inset-0 w-full h-full bg-[#EDD187] origin-left -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 z-0" />
            <span className="relative z-10 flex items-center justify-center">
              Fale Conosco
            </span>
          </Button>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-[110vh] flex items-center justify-center z-10 pt-20 overflow-hidden">
        
        <div className="absolute bottom-0 right-[-180px] lg:bottom-10 lg:right-[-120px] w-[500px] h-[500px] lg:w-[850px] lg:h-[850px] z-0 opacity-40 lg:opacity-70">
            <BinaryCube />
        </div>

        <motion.div 
          style={{ scale, opacity }}
          className="w-full relative z-10 -mt-48"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          
          <div className="container relative">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="space-y-8 text-left max-w-3xl"
            >
              <motion.div variants={fadeInUp} className="inline-block px-4 py-2 bg-[#1a1a1a] border border-white/10 rounded-full mb-4">
                <span className="text-white/80 text-sm font-medium">Inovação que Transforma o Futuro</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-7xl font-bold leading-tight">
                Desenvolvendo o <span className="text-zinc-500">Amanhã</span> com Tecnologia de Ponta
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-muted-foreground">
                Com foco e dedicação à pesquisa e desenvolvimento de soluções inovadoras que revolucionam indústrias e criam valor sustentável.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 pt-4">
                
                <Button 
                  onClick={() => scrollToSection('portfolio')} 
                  size="lg" 
                  className="relative overflow-hidden bg-white text-black border-0 group w-full sm:w-auto font-bold"
                >
                  <span className="absolute inset-0 w-full h-full bg-[#EDD187] origin-left -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 z-0" />
                  <span className="relative z-10 flex items-center justify-center">
                    Conheça Nossos Projetos <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>

                <Button 
                  onClick={() => setLocation("/investidor")} 
                  size="lg" 
                  className="bg-[#1a1a1a] border border-white/10 text-white hover:bg-[#262626] transition-colors w-full sm:w-auto font-medium"
                >
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
              A Overthure Tech nasceu da visão de transformar ideias ousadas em realidade tecnológica. O trabalho desenvolvido caracteriza-se por uma visão multidisciplinar, integrando pesquisa e engenharia para criar soluções à prova de futuro.
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
                <Card className="p-8 bg-card border-white/10 hover:border-[#EDD187]/50 transition-all duration-300 group h-full">
                  <div className="w-16 h-16 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#EDD187]/10 transition-colors">
                    <box.icon className="h-8 w-8 text-zinc-500 group-hover:text-[#EDD187] transition-colors" />
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm">
                <span className="flex items-center gap-1"><Sparkles className="w-4 h-4" /> Projetos Realizados</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white">Conheça Nosso <br /> <span className="text-zinc-600">Portfólio</span></h2>
              <p className="text-lg text-gray-400 max-w-xl leading-relaxed">Explore uma seleção dos nossos melhores projetos.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
              <motion.div 
                onClick={() => setLocation("/project/abela-mielo")}
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                whileHover={{ y: -10 }}
                className="aspect-square rounded-[40px] border border-white/5 grid-pattern relative flex flex-col justify-between p-10 bg-[#080808] group cursor-pointer hover:border-[#EDD187]/30"
              >
                <div className="flex justify-end">
                  <Code2 className="text-zinc-700 w-10 h-10 group-hover:text-[#EDD187] transition-colors" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-3xl mb-1">Abela Mielo</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-zinc-500 font-medium text-sm group-hover:text-[#EDD187]/70">Brand Design & Website</p>
                    <div className="bg-white/5 p-2.5 rounded-full border border-white/10 group-hover:bg-[#EDD187] group-hover:text-black transition-all">
                      <ArrowRight className="w-5 h-5 -rotate-45" />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                onClick={() => setLocation("/project/core-engine")}
                initial={{ opacity: 0, y: 40 }} 
                whileInView={{ opacity: 1, y: 20 }} 
                whileHover={{ y: 10 }}
                className="aspect-square rounded-[40px] border border-white/5 grid-pattern relative flex flex-col justify-between p-10 bg-[#080808] group cursor-pointer hover:border-[#EDD187]/30"
              >
                <div className="flex justify-end">
                  <Sparkles className="text-zinc-700 w-10 h-10 group-hover:text-[#EDD187] transition-colors" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-3xl mb-1">Core Engine</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-zinc-500 font-medium text-sm group-hover:text-[#EDD187]/70">Software Financeiro</p>
                    <div className="bg-white/5 p-2.5 rounded-full border border-white/10 group-hover:bg-[#EDD187] group-hover:text-black transition-all">
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
                <Card className="p-8 bg-card border-white/10 hover:border-[#EDD187]/50 transition-all duration-300 group h-full">
                  <div className="w-16 h-16 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#EDD187]/10 transition-colors">
                    <area.icon className="h-8 w-8 text-zinc-500 group-hover:text-[#EDD187] transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{area.title}</h3>
                  <p className="text-muted-foreground">{area.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
{/* SEÇÃO NOSSOS SERVIÇOS */}
{/* SEÇÃO NOSSOS SERVIÇOS */}
<section id="servicos" ref={servicosRef} className="h-[250vh] relative bg-black z-10">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="container h-full flex items-center">
            
            {/* Lado Esquerdo - O VÍDEO DO ROBÔ (Visível em Desktop) */}
            <div className="hidden lg:flex w-2/5 h-full flex-col justify-center items-center pr-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: false }} 
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center w-full relative"
              >
                <video 
                  ref={videoRef}
                  src={roboVideo} 
                  muted 
                  playsInline
                  preload="auto"
                  // Aumentamos o max-w e adicionamos scale-[1.4] para ele ficar 40% maior!
                  className="w-full max-w-[600px] object-contain scale-[1.4] xl:scale-[1.5]" 
                  style={{
                    mixBlendMode: "screen",
                    filter: "contrast(1.2)",
                    clipPath: "inset(0px 15% 0px 0px)" 
                  }}
                />
              </motion.div>
            </div>
            
            {/* Lado Direito - Lista Dinâmica de Títulos (Scroll Reveal) */}
            <div className="w-full lg:w-3/5 flex flex-col justify-center pl-0 lg:pl-16">
              
              {/* Vídeo Visível Apenas no Mobile */}
              <div className="lg:hidden mb-12 flex flex-col items-center">
                <video 
                  src={roboVideo} 
                  autoPlay
                  loop
                  muted
                  playsInline
                  // Mudamos de w-48 (pequeno) para w-80 (bem maior no celular) e scale-110
                  className="w-72 sm:w-80 object-contain mb-4 scale-110"
                  style={{ 
                    mixBlendMode: "screen", 
                    filter: "contrast(1.2)",
                    clipPath: "inset(0px 15% 0px 0px)"
                  }}
                />
                <p className="text-sm text-zinc-500 mt-2 uppercase tracking-widest font-bold">Role para explorar os serviços</p>
              </div>

              {/* LISTA DE TÍTULOS */}
              <div className="flex flex-col space-y-1 md:space-y-2 px-2 py-8">
                {servicesList.map((service, index) => {
                  const total = servicesList.length;
                  
                  const center = index / (total - 1);
                  const start = (index - 1) / (total - 1);
                  const end = (index + 1) / (total - 1);
                  
                  const color = useTransform(
                    smoothServicosProgress,
                    [start, center, end],
                    ["#27272a", "#ffffff", "#27272a"] 
                  );

                  return (
                    <motion.div key={index} style={{ color }} className="transition-colors duration-100 ease-linear py-1">
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-normal font-extrabold uppercase tracking-tight cursor-default">
                        {service.title}
                      </h3>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
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
              <motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.6, delay: index * 0.1 }} className="flex gap-4 group cursor-default">
                <div className="flex-shrink-0 w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center group-hover:border-[#EDD187]/50 group-hover:bg-[#EDD187]/10 transition-colors">
                  <span className="text-zinc-500 font-bold text-xl group-hover:text-[#EDD187] transition-colors">{item.number}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#EDD187] transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Revolução */}
      <section className="py-24 relative overflow-hidden z-20 bg-background">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-white/[0.02]"></div>
        </div>
        <div className="container relative z-10 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Pronto para Fazer Parte da Revolução?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            
            {/* BOTÃO BRANCO 3: AGENDAR REUNIÃO */}
            <Button 
              onClick={() => setLocation("/contato-form")} 
              size="lg" 
              className="relative overflow-hidden bg-white text-black border-0 group font-bold"
            >
              <span className="absolute inset-0 w-full h-full bg-[#EDD187] origin-left -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 z-0" />
              <span className="relative z-10 flex items-center justify-center">
                Agendar Reunião <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>

            <Button size="lg" className="bg-[#1a1a1a] border border-white/10 text-white hover:bg-[#262626] transition-colors font-medium">Baixar Pitch Deck</Button>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-24 bg-card/30 relative z-10">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }} className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">Entre em Contato</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <a href="mailto:contato@overthuretech.com" className="flex items-center gap-2 text-white hover:text-[#EDD187] transition-colors">
                <Mail className="h-5 w-5 text-white" /> <span>contato@overthuretech.com</span>
              </a>
              <div className="flex items-center gap-4">
                <Instagram className="h-6 w-6 text-white cursor-pointer hover:text-[#EDD187] transition-colors" />
                <WhatsappIcon className="h-6 w-6 text-white cursor-pointer hover:text-[#EDD187] transition-colors" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 relative z-10 bg-background/80 backdrop-blur-sm">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">© 2026 Overthure Tech. Todos os direitos reservados.</span>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-[#EDD187] transition-colors">Privacidade</a>
              <a href="#" className="hover:text-[#EDD187] transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}