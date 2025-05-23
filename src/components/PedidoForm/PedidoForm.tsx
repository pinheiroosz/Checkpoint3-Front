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

const produtos = [
  { nome: 'Coca-Cola', imagem: cocaColaImage.src, descricao: 'Clássica garrafa de vidro da Coca-Cola, com o icônico rótulo vermelho e gotas de condensação na superfície, transmitindo a sensação de uma bebida gelada e refrescante, perfeita para acompanhar a refeição.' },
  { nome: 'Hambúrguer Fenomenal', imagem: hamburguerImage.src, descricao: 'Um suculento hambúrguer artesanal com carne grelhada, queijo cheddar derretido, alface fresca, fatias de tomate e cebola roxa, tudo isso em um pão brioche dourado e macio.' },
  { nome: 'Fritas Incríveis', imagem: fritasImage.src, descricao: 'Porção de batatas fritas artesanais servidas em um saquinho rústico de papel. As batatas são cortadas grossas, crocantes por fora e macias por dentro, com coloração dourada impecável.' },
  { nome: 'Super Combo', imagem: comboImage.src, descricao: 'Delicie-se com o sabor autêntico e irresistível do nosso Combo Artesanal Especial. Ele reúne tudo o que há de melhor para uma refeição completa e cheia de personalidade!' },
];

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
      setBotaoConcluido(true); 
      setMostrarAnimacao(true); 
      setTimeout(() => {
        setBotaoConcluido(false);
        setMostrarAnimacao(false); 
      }, 3000);
    } catch (error) {
      alert('Erro ao salvar pedido. Tente novamente.');
    }
  };

  const handleProdutoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valor = e.target.value;
    setProduto(valor);

    const produtoSelecionado = produtos.find((p) => p.nome === valor);
    if (produtoSelecionado) {
      setImagemProduto(produtoSelecionado.imagem);

      const descricaoElement = document.querySelector('.produto-descricao');
      if (descricaoElement) {
        descricaoElement.textContent = produtoSelecionado.descricao;
        descricaoElement.classList.add('visivel');
      }
    }

    const formElement = document.querySelector('.pedido-form');
    if (formElement) {
      formElement.classList.add('expandido');
      setTimeout(() => {
        const imageElement = document.querySelector('.produto-imagem');
        if (imageElement) {
          imageElement.classList.add('visivel');
        }
      }, 500);
    }
  };

  return (
    <>
      <form className="pedido-form" onSubmit={handleSubmit}>
        <h1>Olá, {clienteNome}!</h1>
        <h2>Selecione seu produto 😋⤵</h2>
        <div>
          <select value={produto} onChange={handleProdutoChange} required>
            <option value="">🍔🍟🥤</option>
            {produtos.map((produto) => (
              <option key={produto.nome} value={produto.nome}>
                {produto.nome}
              </option>
            ))}
          </select>
        </div>
        {imagemProduto && (
          <div className="produto-imagem">
            <Image src={imagemProduto} alt={produto} width={450} height={450} />
          </div>
        )}
        <div className="produto-descricao"></div>
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