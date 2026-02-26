import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const particles: Particle[] = [];
    const particleCount = 80; 
    
    // CORES ALTERADAS: Tons de Branco e Cinza Claro
    const colors = ["255, 255, 255", "200, 200, 200"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 1,
        speedX: (Math.random() - 0.5) * 0.3, // Velocidade levemente reduzida para elegância
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.2, // Opacidade sutil para não sobrecarregar o fundo
        color: colors[Math.floor(Math.random() * colors.length)] 
      });
    }

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        const dx = mouse.current.x - particle.x;
        const dy = mouse.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) { 
          const force = (120 - distance) / 120;
          const dirX = dx / distance;
          const dirY = dy / distance;
          particle.x -= dirX * force * 2;
          particle.y -= dirY * force * 2;
        }

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Desenho do Brilho (Glow) - Agora em Branco/Cinza
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 6
        );
        gradient.addColorStop(0, `rgba(${particle.color}, ${particle.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${particle.color}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size * 6, 0, Math.PI * 2);
        ctx.fill();

        // Desenho do Núcleo
        ctx.beginPath();
        ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}