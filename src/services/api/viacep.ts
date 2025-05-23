import axios from 'axios';

const viacepApi = axios.create({
  baseURL: 'https://viacep.com.br/ws/'
});

export const buscarEnderecoPorCEP = async (cep: string) => {
  try {
    const response = await viacepApi.get(`${cep}/json/`);
    if (response.data.erro) {
      throw new Error('CEP não encontrado');
    }
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar endereço:', error);
    throw error;
  }
};