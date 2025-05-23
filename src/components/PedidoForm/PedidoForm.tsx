"use client";

import React, { useState } from 'react';
import { salvarPedido } from '../../services/api/jsonServer';
import Lottie from 'react-lottie';
import acceptedAnimation from '../../../public/lottie/accepted-blue.json';
import Image from 'next/image';
import cocaColaImage from '../../../public/images/coca-cola.png';
import hamburguerImage from '../../../public/images/hamburguer.png';
import fritasImage from '../../../public/images/fritas.png';
import comboImage from '../../../public/images/combo.png';
import './PedidoForm.css';

const PedidoForm: React.FC<{ clienteId: number; clienteNome: string }> = ({ clienteId, clienteNome }) => {
  const [produto, setProduto] = useState('');
  const [botaoConcluido, setBotaoConcluido] = useState(false);
  const [mostrarTextoConcluido, setMostrarTextoConcluido] = useState(false);
  const [mostrarAnimacao, setMostrarAnimacao] = useState(false);
  const [imagemProduto, setImagemProduto] = useState<string | null>(null);

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
      setMostrarAnimacao(true); // Exibe a animação
      setTimeout(() => {
        setBotaoConcluido(false);
        setMostrarAnimacao(false); // Oculta a animação após 3 segundos
      }, 3000);
    } catch (error) {
      alert('Erro ao salvar pedido. Tente novamente.');
    }
  };

  const handleProdutoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valor = e.target.value;
    setProduto(valor);

    switch (valor) {
      case 'Coca-Cola':
        setImagemProduto(cocaColaImage.src);
        break;
      case 'Hambúrguer':
        setImagemProduto(hamburguerImage.src);
        break;
      case 'Fritas':
        setImagemProduto(fritasImage.src);
        break;
      case 'Combo':
        setImagemProduto(comboImage.src);
        break;
      default:
        setImagemProduto(null);
    }

    // Adiciona a classe expandido para animar a altura
    const formElement = document.querySelector('.pedido-form');
    if (formElement) {
      formElement.classList.add('expandido');
      setTimeout(() => {
        const imageElement = document.querySelector('.produto-imagem');
        if (imageElement) {
          imageElement.classList.add('visivel');
        }
      }, 500); // Aguarda a transição da altura antes de exibir a imagem
    }
  };

  return (
    <>
      <form className="pedido-form" onSubmit={handleSubmit}>
        <h1>Olá, {clienteNome}!</h1>
        <h2>Realize seu pedido ⤵</h2>
        <div>
          <select value={produto} onChange={handleProdutoChange} required>
            <option value="">Selecione seu produto 😋</option>
            <option value="Coca-Cola">Coca-Cola</option>
            <option value="Hambúrguer">Hambúrguer</option>
            <option value="Fritas">Fritas</option>
            <option value="Combo">Combo</option>
          </select>
        </div>
        {imagemProduto && (
          <div className="produto-imagem">
            <Image src={imagemProduto} alt={produto} width={420} height={420} />
          </div>
        )}
        <button
          type="submit"
          className={botaoConcluido ? 'botao-concluido' : ''}
          disabled={botaoConcluido}
        >
          {botaoConcluido ? 'Concluído 🗸' : 'Concluir'}
        </button>
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
            <p>Pedido salvo com sucesso!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PedidoForm;