# Cadastro de Pedidos para Lanchonete

Este é um projeto desenvolvido com **Next.js**, **React**, e **TypeScript** para gerenciar o cadastro de clientes e pedidos de uma lanchonete. O sistema utiliza o `json-server` como backend fake para simular uma API.

## Como iniciar o projeto

Siga os passos abaixo para rodar o projeto localmente:

### 1. Clonar o repositório
```bash
# Clone o repositório para sua máquina local
$ git clone <URL_DO_REPOSITORIO>

# Entre na pasta do projeto
$ cd cadastro-pedido-lanchonete
```

### 2. Instalar as dependências
Certifique-se de que você tem o **Node.js** instalado na sua máquina. Depois, instale as dependências do projeto:
```bash
# Instale as dependências
$ npm install
```

### 3. Rodar o `json-server`
O `json-server` é usado para simular o backend. Para iniciá-lo, execute o comando abaixo:
```bash
# Inicie o json-server
$ npx json-server --watch db.json --port 3001
```
Isso iniciará o servidor na porta `3001`. Certifique-se de que ele está rodando antes de iniciar o frontend.

### 4. Rodar o projeto Next.js
Agora, inicie o servidor de desenvolvimento do Next.js:
```bash
# Inicie o servidor de desenvolvimento
$ npm run dev
```
O projeto estará disponível em [http://localhost:3000](http://localhost:3000).

## Dependências principais
- **Next.js**: Framework React para renderização do lado do servidor.
- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **json-server**: Simula uma API RESTful para desenvolvimento rápido.
- **heroicons**: Ícones para interfaces (npm install @heroicons/react).
- **lottie**: (npm install react-lottie).

## Estrutura do projeto
- `db.json`: Arquivo usado pelo `json-server` para armazenar os dados de clientes e pedidos.
- `src/components`: Contém os componentes React como `ClienteForm`, `PedidoForm` e `PedidoList`.
- `src/services/api`: Contém os serviços para comunicação com APIs, como `jsonServer` e `ViaCEP`.
- `src/app`: Contém as páginas principais do projeto.

## Observações
- Certifique-se de que a porta `3001` está livre para o `json-server`.
- Caso encontre problemas, verifique os logs no terminal para identificar possíveis erros.

---

Espero que você curta o projeto! 🚀