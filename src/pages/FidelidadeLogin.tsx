import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import logo from "@/assets/logo-rafabike.png";
import { Bike } from "lucide-react";

const FidelidadeLogin = () => {
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cpf || !dataNascimento) {
      toast({
        title: "Atenção",
        description: "Preencha seu CPF e Data de Nascimento.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Remove pontos e traços do CPF antes de consultar
      const cpfLimpo = cpf.replace(/\D/g, "");

      // Procura o cliente que bata com o CPF e a Data de Nascimento diretamente no Supabase
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('cpf', cpfLimpo)
        .eq('dataNascimento', dataNascimento)
        .single();

      if (data && !error) {
        // Salva a sessão do cliente no localStorage (apenas o ID)
        localStorage.setItem("rafabike_logged_client", data.id);
        navigate("/fidelidade/cartao");
      } else {
        toast({
          title: "Acesso Negado",
          description: "CPF ou Data de Nascimento incorretos, ou você ainda não tem cadastro.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Erro",
        description: "Falha ao conectar com o banco de dados.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute inset-0 bg-primary/5"></div>
      
      <div className="w-full max-w-md bg-card border shadow-xl rounded-2xl overflow-hidden relative z-10">
        <div className="bg-primary/10 px-6 pt-10 pb-6 flex flex-col items-center border-b">
          <img 
            src={logo} 
            alt="Rafa Bike Logo" 
            className="h-20 w-20 rounded-xl object-cover shadow-md mb-4 ring-2 ring-primary/20"
          />
          <h1 className="font-heading text-2xl font-black text-foreground flex items-center gap-2">
            <Bike className="text-primary h-6 w-6" />
            Cartão Fidelidade
          </h1>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Acompanhe seus adesivos e resgate seus prêmios exclusivos na Rafa Bike!
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cpf">Seu CPF (Somente números)</Label>
            <Input 
              id="cpf" 
              placeholder="Ex: 00000000000" 
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="bg-muted/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dataNascimento">Sua Data de Nascimento</Label>
            <Input 
              id="dataNascimento" 
              type="date" 
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              className="bg-muted/50"
            />
            <p className="text-xs text-muted-foreground mt-1">A sua data de nascimento é a sua senha.</p>
          </div>
          
          <Button type="submit" className="w-full font-bold text-base h-12 shadow-md" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Acessar Meu Cartão"}
          </Button>

          <div className="text-center">
            <button 
              type="button" 
              onClick={() => navigate("/")}
              className="text-sm text-primary hover:underline font-medium"
            >
              Voltar para a página inicial
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FidelidadeLogin;
