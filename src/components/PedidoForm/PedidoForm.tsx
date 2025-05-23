"use client";

import React, { useState } from 'react';
import { salvarPedido } from '../../services/api/jsonServer';
import './PedidoForm.css';

const PedidoForm: React.FC<{ clienteId: number; clienteNome: string }> = ({ clienteId, clienteNome }) => {
  const [produto, setProduto] = useState('');
  const [botaoConcluido, setBotaoConcluido] = useState(false);
  const [mostrarTextoConcluido, setMostrarTextoConcluido] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!produto) {
      alert('Selecione um produto.');
      return;
    }

    const pedido = { clienteId, produto, status: 'Aguardando envio' };

    try {
      await salvarPedido(pedido);
      setProduto('');
      setBotaoConcluido(true); // Ativa o estado de botão concluído
      setTimeout(() => setMostrarTextoConcluido(true), 500); // Mostra o texto após 500ms
      setTimeout(() => {
        setBotaoConcluido(false);
        setMostrarTextoConcluido(false);
      }, 3000); // Reseta o estado após 3 segundos
    } catch (error) {
      alert('Erro ao salvar pedido. Tente novamente.');
    }
  };

  return (
    <form className="pedido-form" onSubmit={handleSubmit}>
        <h1>Olá, {clienteNome}!</h1>
      <h2>Realize seu pedido ⤵</h2>
      <div>
        <select value={produto} onChange={(e) => setProduto(e.target.value)} required>
          <option value="">Selecione seu produto 😋</option>
          <option value="Coca-Cola">Coca-Cola</option>
          <option value="Hambúrguer">Hambúrguer</option>
          <option value="Fritas">Fritas</option>
        </select>
      </div>
      <button
        type="submit"
        className={botaoConcluido ? 'botao-concluido' : ''}
        disabled={botaoConcluido}
      >
        {mostrarTextoConcluido ? 'Concluído 🗸' : 'Concluir'}
      </button>
    </form>
  );
};

export default PedidoForm;