import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useFidelidade } from "@/hooks/use-fidelidade";
import { Cliente } from "@/types/fidelidade";
import logo from "@/assets/logo-rafabike.png";
import { LogOut, Award, CheckCircle2, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const FidelidadeCard = () => {
  const navigate = useNavigate();
  const { clientes, configuracoes, loading } = useFidelidade();
  const [clienteLogado, setClienteLogado] = useState<Cliente | null>(null);

  useEffect(() => {
    if (loading) return; // Só verifica depois que os clientes chegarem do banco

    const loggedClientId = localStorage.getItem("rafabike_logged_client");
    if (!loggedClientId) {
      navigate("/fidelidade");
      return;
    }

    const clienteEncontrado = clientes.find((c) => c.id === loggedClientId);
    if (!clienteEncontrado) {
      localStorage.removeItem("rafabike_logged_client");
      navigate("/fidelidade");
    } else {
      setClienteLogado(clienteEncontrado);
    }
  }, [clientes, loading, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("rafabike_logged_client");
    navigate("/");
  };

  if (loading || !clienteLogado) {
    return <div className="min-h-screen flex items-center justify-center bg-background">Carregando seus adesivos...</div>;
  }

  const adesivos = clienteLogado.adesivos;
  const meta = configuracoes.metaAdesivos;
  const porcentagem = Math.min(100, Math.round((adesivos / meta) * 100));
  const atingiuMeta = adesivos >= meta;
  const faltaParaPremio = meta - adesivos;

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="text-muted-foreground">
          Voltar à Loja
        </Button>
        <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 text-destructive border-destructive/20 hover:bg-destructive/10">
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>

      <div className="w-full max-w-md bg-card rounded-3xl shadow-xl overflow-hidden border border-border/50 relative">
        {/* Header do Cartão */}
        <div className="bg-primary px-6 py-8 text-primary-foreground relative overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-10">
            <Award className="h-48 w-48" />
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <img 
              src={logo} 
              alt="Logo Rafa Bike" 
              className="h-16 w-16 rounded-full border-2 border-primary-foreground/30 shadow-lg object-cover bg-background"
            />
            <div>
              <p className="text-primary-foreground/80 font-medium text-sm">Olá, ciclista!</p>
              <h2 className="font-heading text-2xl font-black">{clienteLogado.nome.split(" ")[0]}</h2>
            </div>
          </div>
        </div>

        {/* Corpo do Cartão */}
        <div className="p-6 space-y-8">
          <div className="text-center">
            <h3 className="font-heading text-lg font-bold text-foreground">Seu Progresso</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {atingiuMeta 
                ? "Parabéns! Você já pode resgatar seu prêmio na loja!" 
                : `Falta${faltaParaPremio === 1 ? '' : 'm'} ${faltaParaPremio} adesivo${faltaParaPremio === 1 ? '' : 's'} para a sua recompensa.`}
            </p>
          </div>

          {/* Gráfico de Progresso Circular Customizado ou Barra (Usaremos barra para melhor responsividade no mobile) */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-bold">
              <span className="text-primary flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary" /> 
                {adesivos} Adesivos
              </span>
              <span className="text-muted-foreground">Meta: {meta}</span>
            </div>
            <Progress value={porcentagem} className="h-4 w-full bg-muted" />
          </div>

          {/* Grid de Adesivos Visuais */}
          <div className="bg-muted/30 rounded-2xl p-5 border border-border/50">
            <div className="grid grid-cols-5 gap-3">
              {Array.from({ length: meta }).map((_, index) => {
                const preenchido = index < adesivos;
                return (
                  <div 
                    key={index} 
                    className={`aspect-square rounded-full flex items-center justify-center shadow-sm transition-all duration-500
                      ${preenchido 
                        ? 'bg-primary text-primary-foreground scale-110 shadow-primary/30 ring-2 ring-primary ring-offset-2 ring-offset-background' 
                        : 'bg-background border-2 border-dashed border-muted-foreground/30 text-muted-foreground/30'}`}
                  >
                    {preenchido ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      <Star className="h-4 w-4" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mensagem Promocional */}
          <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 text-center">
            <p className="text-sm text-accent-foreground font-medium">
              Continue cuidando da sua bike com a gente e ganhe prêmios incríveis!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FidelidadeCard;
