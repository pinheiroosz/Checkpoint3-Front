import React from 'react';
import PedidoList from '../../components/PedidoList/PedidoList';
import './Listagem.css';

const Listagem: React.FC = () => {
  return (
    <div className="listagem-page">
      <PedidoList />
    </div>
  );
};

export default Listagem;