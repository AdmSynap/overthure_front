# InnovaTech - Site Institucional

Site institucional moderno para startup de inovação, tecnologia e pesquisas inovadoras.

## 🎨 Design

- **Paleta de Cores**: Preto e Dourado premium
- **Tipografia**: Playfair Display (títulos) + Inter (corpo)
- **Estilo**: Moderno, elegante e profissional
- **Inspiração**: Scale AI e outras startups de tecnologia de ponta

## 🚀 Tecnologias

- **React 19** - Framework frontend
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS 4** - Estilização utility-first
- **Framer Motion** - Animações suaves e profissionais
- **shadcn/ui** - Componentes UI modernos
- **Lucide React** - Ícones elegantes

## ✨ Funcionalidades

- ✅ Design responsivo (mobile-first)
- ✅ Animações suaves com Framer Motion
- ✅ Partículas douradas animadas no background
- ✅ Scroll suave entre seções
- ✅ Efeitos hover e micro-interações
- ✅ Navegação fixa com backdrop blur
- ✅ Gradientes dinâmicos
- ✅ Otimizado para performance

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ (LTS recomendado)
- pnpm (ou npm/yarn)

### Passos

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd innovatech-startup
   ```

2. **Instale as dependências**
   ```bash
   cd client
   pnpm install
   ```

3. **Execute em desenvolvimento**
   ```bash
   pnpm run dev
   ```

4. **Acesse no navegador**
   ```
   http://localhost:3000
   ```

## 🏗️ Build para Produção

```bash
cd client
pnpm run build
```

Os arquivos otimizados estarão em `client/dist/`

## 📂 Estrutura do Projeto

```
innovatech-startup/
├── client/
│   ├── public/          # Assets estáticos
│   ├── src/
│   │   ├── components/  # Componentes reutilizáveis
│   │   │   ├── ui/      # shadcn/ui components
│   │   │   └── ParticlesBackground.tsx
│   │   ├── pages/       # Páginas da aplicação
│   │   │   ├── Home.tsx
│   │   │   └── NotFound.tsx
│   │   ├── contexts/    # React contexts
│   │   ├── hooks/       # Custom hooks
│   │   ├── lib/         # Utilitários
│   │   ├── App.tsx      # Rotas principais
│   │   ├── main.tsx     # Entry point
│   │   └── index.css    # Estilos globais
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
├── shared/              # Constantes compartilhadas
└── README.md
```

## 🎯 Seções do Site

1. **Hero** - Apresentação impactante com animações
2. **Sobre** - Missão e visão da startup
3. **Áreas de Atuação** - IA, IoT e Sustentabilidade
4. **Diferenciais** - Por que investir na InnovaTech
5. **CTA** - Call-to-action para investidores
6. **Contato** - Informações de contato e redes sociais
7. **Footer** - Links úteis e copyright

## 🎨 Customização

### Cores

Edite `client/src/index.css`:

```css
:root {
  --primary: oklch(0.72 0.12 85);      /* Dourado */
  --secondary: oklch(0.55 0.08 75);    /* Dourado escuro */
  --background: oklch(0 0 0);          /* Preto */
  --foreground: oklch(0.985 0 0);      /* Branco */
}
```

### Fontes

Edite `client/index.html` para alterar as fontes Google:

```html
<link href="https://fonts.googleapis.com/css2?family=SuaFonte&display=swap" rel="stylesheet" />
```

### Conteúdo

Edite `client/src/pages/Home.tsx` para alterar textos, imagens e estrutura.

## 🚀 Deploy

Veja o arquivo `GUIA_IMPLANTACAO.md` para instruções detalhadas de deploy em:
- Vercel (recomendado)
- Netlify
- GitHub Pages

### Deploy Rápido (Vercel)

```bash
# Instale a CLI do Vercel
npm i -g vercel

# Faça deploy
cd innovatech-startup
vercel
```

## 📊 Performance

- ⚡ Lighthouse Score: 95+
- 🎨 First Contentful Paint: < 1.5s
- 📦 Bundle Size: ~200KB (gzipped)
- 🚀 Time to Interactive: < 2s

## 🔧 Scripts Disponíveis

```bash
pnpm run dev      # Servidor de desenvolvimento
pnpm run build    # Build de produção
pnpm run preview  # Preview do build local
pnpm run lint     # Linter (ESLint)
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é propriedade da InnovaTech. Todos os direitos reservados.

## 📧 Contato

- **Email**: contato@innovatech.com
- **LinkedIn**: [InnovaTech](https://linkedin.com/company/innovatech)
- **Twitter**: [@InnovaTech](https://twitter.com/innovatech)

---

**Desenvolvido com ❤️ pela equipe InnovaTech**

