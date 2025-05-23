"use client";

import React, { useEffect, useState } from 'react';
import jsonServerApi from '../../services/api/jsonServer';
import './PedidoList.css';

const PedidoList: React.FC = () => {
  const [pedidos, setPedidos] = useState<any[]>([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await jsonServerApi.get('/pedidos?_expand=cliente');
        console.log('Dados retornados pela API:', response.data); 
        setPedidos(response.data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

  const handleStatusUpdate = async (id: number) => {
    try {
      await jsonServerApi.patch(`/pedidos/${id}`, { status: 'Enviado para entrega' });
      setPedidos((prev) => prev.map((pedido) => (pedido.id === id ? { ...pedido, status: 'Enviado para entrega' } : pedido)));
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
    }
  };

  return (
    <div className="pedido-list">
      <h1>Listagem de Pedidos</h1>
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.id} className={pedido.status === 'Aguardando envio' ? 'aguardando' : 'enviado'}>
            <p><strong>Cliente:</strong> {pedido.nome}</p>
            <p><strong>Produto:</strong> {pedido.produto}</p>
            <p><strong>Status:</strong> {pedido.status}</p>
            {pedido.status === 'Aguardando envio' && (
              <button onClick={() => handleStatusUpdate(pedido.id)}>Marcar como Enviado</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PedidoList;