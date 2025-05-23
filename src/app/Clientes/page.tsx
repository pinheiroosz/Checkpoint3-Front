import React from 'react';
import ClienteForm from '../../components/ClienteForm/ClienteForm';
import './Clientes.css';

const Clientes: React.FC = () => {
  return (
    <div className="clientes-page">
      <ClienteForm />
    </div>
  );
};

export default Clientes;