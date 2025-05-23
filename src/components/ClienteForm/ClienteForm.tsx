"use client";

import React, { useState } from 'react';
import { buscarEnderecoPorCEP } from '../../services/api/viacep';
import { salvarCliente, buscarClientePorCPF } from '../../services/api/jsonServer';
import Lottie from 'react-lottie';
import acceptedAnimation from '../../../public/lottie/accepted-blue.json';
import declinedAnimation from '../../../public/lottie/declined-red.json';
import './ClienteForm.css';

const formatarCPF = (cpf: string) => {
  return cpf
    .replace(/\\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2') 
    .replace(/(\d{3})(\d)/, '$1.$2') 
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
};

const formatarCEP = (cep: string) => {
  return cep
    .replace(/\D/g, '') 
    .replace(/(\d{5})(\d{1,3})$/, '$1-$2'); 
};

const formatarTelefone = (telefone: string) => {
  return telefone
    .replace(/\D/g, '') 
    .replace(/(\d{2})(\d)/, '($1) $2') 
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2'); 
};

const ClienteForm: React.FC<{ cpfInicial?: string }> = ({ cpfInicial = '' }) => {
  const [cpf, setCpf] = useState(cpfInicial);
  const [nome, setNome] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mostrarAnimacao, setMostrarAnimacao] = useState(false);
  const [mostrarErroAnimacao, setMostrarErroAnimacao] = useState(false);

  const handleBuscarEndereco = async () => {
    try {
      const dados = await buscarEnderecoPorCEP(cep);
      setEndereco(dados.logradouro);
    } catch (error) {
      alert('Erro ao buscar endereço. Verifique o CEP digitado.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cliente = { cpf: cpf.replace(/\D/g, ''), nome, cep, endereco, numero, complemento, telefone };

    try {
      const clienteExistente = await buscarClientePorCPF(cliente.cpf);
      if (clienteExistente) {
        setMostrarErroAnimacao(true);
        setTimeout(() => setMostrarErroAnimacao(false), 2000); 
        return; 
      }

      await salvarCliente(cliente);
      setCpf('');
      setNome('');
      setCep('');
      setEndereco('');
      setNumero('');
      setComplemento('');
      setTelefone('');
      setMostrarAnimacao(true); 
      setTimeout(() => setMostrarAnimacao(false), 3000); 
    } catch (error) {
      alert('Erro ao salvar. Tente novamente.');
    }
  };

  const handleCPFChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    if (/^\d*$/.test(valor.replace(/\D/g, ''))) {
      setCpf(formatarCPF(valor));

      if (valor.replace(/\D/g, '').length === 11) { 
        try {
          const clienteExistente = await buscarClientePorCPF(valor.replace(/\D/g, ''));
          if (clienteExistente) {
            setNome(clienteExistente.nome || '');
            setCep(clienteExistente.cep || '');
            setEndereco(clienteExistente.endereco || '');
            setNumero(clienteExistente.numero || '');
            setComplemento(clienteExistente.complemento || '');
            setTelefone(clienteExistente.telefone || '');
          }
        } catch (error) {
          console.error('Erro ao buscar cliente:', error);
        }
      }
    }
  };

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    if (/^\d*$/.test(valor.replace(/\D/g, ''))) {
      setCep(formatarCEP(valor));
    }
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    if (/^\d*$/.test(valor.replace(/\D/g, ''))) {
      setTelefone(formatarTelefone(valor));
    }
  };

  return (
    <>
      <form className="cliente-form" onSubmit={handleSubmit}>
        <h1>Cadastro de Cliente</h1>
        <div>
          <label>CPF:</label>
          <input
            type="alphanumeric"
            value={cpf}
            onChange={handleCPFChange}
            maxLength={14} 
            required
          />
        </div>
        <div>
          <label>Nome Completo:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>CEP:</label>
          <input
            type="text"
            value={cep}
            onChange={handleCEPChange}
            maxLength={9}
            required
          />
          <button type="button" onClick={handleBuscarEndereco}>Buscar Endereço</button>
        </div>
        <div>
          <label>Endereço:</label>
          <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
        </div>
        <div>
          <label>Número:</label>
          <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} required />
        </div>
        <div>
          <label>Complemento:</label>
          <input type="text" value={complemento} onChange={(e) => setComplemento(e.target.value)} />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            type="text"
            value={telefone}
            onChange={handleTelefoneChange}
            placeholder="(11) 91234-5678"
            maxLength={15}
            required
          />
        </div>
        <button type="submit">Salvar Cadastro</button>
      </form>

      {mostrarAnimacao && (
        <div className="animacao-overlay">
          <div className="animacao-card">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: acceptedAnimation,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }}
              height={300}
              width={300}
            />
            <p>Cliente salvo com sucesso!</p>
          </div>
        </div>
      )}

      {mostrarErroAnimacao && (
        <div className="animacao-overlay">
          <div className="animacao-card erro">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: declinedAnimation,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }}
              height={300}
              width={300}
            />
            <p>Erro: CPF já cadastrado!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ClienteForm;