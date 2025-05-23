"use client";
import React, { useEffect, useState } from 'react';
import PedidoForm from '../../components/PedidoForm/PedidoForm';
import jsonServerApi from '../../services/api/jsonServer';
import './Pedidos.css';

const Pedidos: React.FC = () => {
  const [cliente, setCliente] = useState<any>(null);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await jsonServerApi.get('/clientes');
        if (response.data.length > 0) {
          setCliente(response.data[response.data.length - 1]); // Seleciona o último cliente cadastrado
        }
      } catch (error) {
        console.error('Erro ao buscar cliente:', error);
      }
    };

    fetchCliente();
  }, []);

  if (!cliente) {
    return <p>Carregando cliente...</p>;
  }

  return (
    <div className="pedidos-page">
      <PedidoForm clienteId={cliente.id} clienteNome={cliente.nome} />
    </div>
  );
};

export default Pedidos;