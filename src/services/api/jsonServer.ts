import axios from 'axios';

const jsonServerApi = axios.create({
  baseURL: 'http://localhost:3001',
});

export const salvarCliente = async (cliente: any) => {
  try {
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

export default jsonServerApi;