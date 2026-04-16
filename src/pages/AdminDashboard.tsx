import { useState } from "react";
import { useFidelidade } from "@/hooks/use-fidelidade";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Minus, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { clientes, configuracoes, addCliente, updateAdesivos, saveConfiguracoes } = useFidelidade();
  const { toast } = useToast();

  // Form states
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  
  // Settings state
  const [metaAdesivos, setMetaAdesivos] = useState(configuracoes.metaAdesivos.toString());

  const handleAddCliente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !cpf || !dataNascimento || !telefone) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    addCliente({ nome, cpf, dataNascimento, telefone });
    setNome("");
    setCpf("");
    setDataNascimento("");
    setTelefone("");
    
    toast({
      title: "Sucesso",
      description: "Cliente cadastrado com sucesso!",
    });
  };

  const handleSaveSettings = () => {
    const meta = parseInt(metaAdesivos);
    if (isNaN(meta) || meta <= 0) {
      toast({
        title: "Erro",
        description: "A meta deve ser um número maior que zero.",
        variant: "destructive",
      });
      return;
    }

    saveConfiguracoes({ metaAdesivos: meta });
    toast({
      title: "Sucesso",
      description: "Configurações salvas com sucesso!",
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 p-6 md:p-12">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Gerencie seus clientes e o programa de fidelidade RafaBike.</p>
          </div>
        </div>

        <Tabs defaultValue="clientes" className="space-y-6">
          <TabsList className="bg-background">
            <TabsTrigger value="clientes">Clientes e Adesivos</TabsTrigger>
            <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="clientes" className="space-y-6">
            {/* Cadastro de Cliente */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="mb-4">
                <h2 className="font-heading text-xl font-bold">Cadastrar Novo Cliente</h2>
                <p className="text-sm text-muted-foreground">Preencha os dados abaixo para adicionar um cliente ao programa.</p>
              </div>
              <form onSubmit={handleAddCliente} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="João Silva" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF (Somente números)</Label>
                  <Input id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="00000000000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nascimento">Data de Nascimento</Label>
                  <Input id="nascimento" type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="(86) 90000-0000" />
                </div>
                <div className="flex items-end sm:col-span-2 lg:col-span-4">
                  <Button type="submit" className="w-full sm:w-auto gap-2">
                    <UserPlus className="h-4 w-4" />
                    Cadastrar Cliente
                  </Button>
                </div>
              </form>
            </div>

            {/* Tabela de Clientes */}
            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="font-heading text-xl font-bold">Clientes Cadastrados</h2>
              </div>
              {clientes.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  Nenhum cliente cadastrado ainda.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>CPF</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead className="text-center">Adesivos</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clientes.map((cliente) => (
                        <TableRow key={cliente.id}>
                          <TableCell className="font-medium">{cliente.nome}</TableCell>
                          <TableCell>{cliente.cpf}</TableCell>
                          <TableCell>{cliente.telefone}</TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-3">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => updateAdesivos(cliente.id, -1)}
                                disabled={cliente.adesivos === 0}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-6 text-center font-bold text-lg">{cliente.adesivos}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 text-primary"
                                onClick={() => updateAdesivos(cliente.id, 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="configuracoes">
            <div className="rounded-xl border bg-card p-6 shadow-sm max-w-md">
              <div className="mb-4">
                <h2 className="font-heading text-xl font-bold">Configurações do Cartão Fidelidade</h2>
                <p className="text-sm text-muted-foreground">Defina as regras para o seu programa de recompensas.</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta">Meta de Adesivos para o Prêmio</Label>
                  <Input 
                    id="meta" 
                    type="number" 
                    min="1" 
                    value={metaAdesivos} 
                    onChange={(e) => setMetaAdesivos(e.target.value)} 
                  />
                  <p className="text-xs text-muted-foreground">
                    Ex: Se colocar 10, o cliente precisará juntar 10 adesivos para ganhar a revisão grátis.
                  </p>
                </div>
                <Button onClick={handleSaveSettings}>Salvar Configurações</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
