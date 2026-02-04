import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import PortfolioPage from "./pages/PortfolioPage";
import ContatoForm from "./pages/ContatoForm"; 
import Investor from "./pages/Investor";
import ProjectDetails from "./pages/ProjectDetails"; // 1. IMPORTAÇÃO DA NOVA PÁGINA

function Router() {
  const [, setLocation] = useLocation();

  return (
    <Switch>
      <Route path="/" component={Home} />
      
      <Route path="/investidor" component={Investor} />

      {/* 2. ROTA DINÂMICA ADICIONADA (Obrigatória para os cards funcionarem) */}
      <Route path="/project/:id" component={ProjectDetails} />

      {/* Rota para o Portfólio Completo */}
      <Route path="/portfolio">
        {() => (
          <PortfolioPage 
            onBack={() => {
              window.scrollTo(0, 0);
              setLocation("/");
            }} 
          />
        )}
      </Route>

      {/* Rota para o Formulário de Contato */}
      <Route path="/contato-form" component={ContatoForm} />

      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          {/* INJEÇÃO DE ESTILO GLOBAL PARA SMOOTH SCROLL */}
          <style dangerouslySetInnerHTML={{ __html: `
            html {
              scroll-behavior: smooth;
            }
            /* Evita que o título das seções fique escondido sob o menu fixo */
            #sobre, #areas, #diferenciais, #contato, #servicos, #portfolio {
              scroll-margin-top: 80px;
            }
          `}} />
          
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;