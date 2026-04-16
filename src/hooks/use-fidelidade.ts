import { useState, useEffect } from "react";
import { Cliente, ConfiguracoesFidelidade } from "@/types/fidelidade";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export const useFidelidade = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [configuracoes, setConfiguracoes] = useState<ConfiguracoesFidelidade>({ metaAdesivos: 10 });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch configs
      const { data: configData, error: configError } = await supabase
        .from('configuracoes')
        .select('*')
        .limit(1)
        .single();
      
      if (configData) {
        setConfiguracoes({ metaAdesivos: configData.metaAdesivos });
      }

      // Fetch clients
      const { data: clientesData, error: clientesError } = await supabase
        .from('clientes')
        .select('*')
        .order('nome', { ascending: true });
        
      if (clientesData) {
        setClientes(clientesData);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do Supabase", error);
    } finally {
      setLoading(false);
    }
  };

  const saveConfiguracoes = async (newConfig: ConfiguracoesFidelidade) => {
    // Usamos id 1 fixo para termos apenas 1 configuração global
    const { error } = await supabase
      .from('configuracoes')
      .upsert({ id: 1, metaAdesivos: newConfig.metaAdesivos });
      
    if (!error) {
      setConfiguracoes(newConfig);
    } else {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    }
  };

  const addCliente = async (clienteData: Omit<Cliente, "id" | "adesivos">) => {
    // Remove qualquer caractere que não seja número (pontos, traços)
    const cpfLimpo = clienteData.cpf.replace(/\D/g, "");

    const { data, error } = await supabase
      .from('clientes')
      .insert([
        { ...clienteData, cpf: cpfLimpo, adesivos: 0 }
      ])
      .select();
      
    if (!error && data) {
      setClientes([...clientes, data[0]]);
    } else {
      toast({ title: "Erro ao adicionar cliente", description: error?.message, variant: "destructive" });
    }
  };

  const updateAdesivos = async (id: string, incremento: number) => {
    const cliente = clientes.find(c => c.id === id);
    if (!cliente) return;
    
    const novosAdesivos = Math.max(0, cliente.adesivos + incremento);
    
    // Atualiza otimista localmente
    setClientes(clientes.map(c => c.id === id ? { ...c, adesivos: novosAdesivos } : c));
    
    // Atualiza no banco
    const { error } = await supabase
      .from('clientes')
      .update({ adesivos: novosAdesivos })
      .eq('id', id);
      
    if (error) {
      // Reverte em caso de erro
      fetchData();
      toast({ title: "Erro ao atualizar adesivos", description: error.message, variant: "destructive" });
    }
  };

  return {
    clientes,
    configuracoes,
    loading,
    addCliente,
    updateAdesivos,
    saveConfiguracoes,
  };
};
