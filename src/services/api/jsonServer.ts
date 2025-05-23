import axios from 'axios';

const jsonServerApi = axios.create({
  baseURL: 'http://localhost:3001',
});

export const salvarCliente = async (cliente: any) => {
  try {
    const clienteExistente = await buscarClientePorCPF(cliente.cpf);
    if (clienteExistente) {
      throw new Error('CPF já cadastrado');
    }

    const response = await jsonServerApi.post('/clientes', cliente);
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar cliente:', error);
    throw error;
  }
};

export const salvarPedido = async (pedido: any) => {
  try {
    const response = await jsonServerApi.post('/pedidos', pedido);
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar pedido:', error);
    throw error;
  }
};

export const buscarClientePorCPF = async (cpf: string) => {
  try {
    const response = await jsonServerApi.get(`/clientes?cpf=${cpf}`);
    return response.data[0]; // Retorna o primeiro cliente encontrado, se existir
  } catch (error) {
    console.error('Erro ao buscar cliente por CPF:', error);
    throw error;
  }
};

export default jsonServerApi;