# Pokédex

## Descrição

Este projeto consiste no desenvolvimento de uma Pokédex utilizando React.js, como parte de uma atividade acadêmica com o objetivo de praticar os conceitos de desenvolvimento front-end, consumo de APIs e componentização.

A aplicação tem como referência a Pokédex do universo Pokémon, funcionando como um catálogo interativo que permite consultar informações sobre diferentes Pokémon.

Para obter e exibir os dados, foi utilizada a [PokéAPI](https://pokeapi.co/), uma API pública e gratuita que disponibiliza informações sobre os Pokémon, seus tipos, habilidades, estatísticas e imagens.

## Tecnologias utilizadas

- Node.js: v24.14.0
- React: v19.3.1
- Vite: v8.3.4
- Oxlint: v1.88.0
- CSS3

## Funcionalidades

- **Listagem de Pokémon:** exibe os Pokémon em cards, contendo nome, número de identificação, imagem e tipos.
- **Paginação:** permite navegar entre diferentes páginas da listagem, carregando 20 Pokémon por vez.
- **Busca por nome:** permite pesquisar Pokémon pelo nome.
- **Filtro por tipo:** permite selecionar um tipo e visualizar os Pokémon associados a ele, informando a quantidade existente.
- **Detalhes do Pokémon:** permite selecionar um Pokémon para visualizar informações adicionais, como altura, peso, habilidades, estatísticas e sprites.

## Como instalar e executar o projeto

### Pré-requisitos

Antes de executar a aplicação, é necessário ter o [Node.js](https://nodejs.org/) instalado na máquina. O npm, utilizado para instalar as dependências e executar os comandos do projeto, normalmente é instalado junto com o Node.js.

Para verificar se ambos estão instalados, execute no terminal:

```bash
node -v
npm -v
```

### Instalação

1. Baixe o projeto do repositório ou obtenha seus arquivos.
2. Abra a pasta do projeto no Visual Studio Code ou em outro editor de código.
3. Abra o terminal na pasta principal do projeto.
4. Execute o comando abaixo para instalar as dependências:

```bash
npm install
```

### Execução

Após a instalação, execute:

```bash
npm run dev
```

O Vite disponibilizará um endereço local no terminal. Abra esse endereço no navegador para acessar a aplicação.

## Decisões de implementação

O projeto foi desenvolvido utilizando React.js com os hooks `useState` e `useEffect` para gerenciamento de estados e execução de efeitos colaterais.

O consumo dos dados é realizado por meio da função `fetch`, utilizando requisições HTTP à PokéAPI.

Para a listagem, foi implementada uma paginação com 20 Pokémon por página. Como o endpoint de listagem não fornece todas as informações necessárias, são realizadas requisições adicionais para obter os detalhes de cada Pokémon.

A busca por nome é realizada no próprio front-end, utilizando os dados obtidos da API. O filtro por tipo utiliza o endpoint específico de tipos da PokéAPI.

A aplicação também foi dividida em componentes para facilitar a organização, reutilização e manutenção do código.

A estilização foi realizada com CSS, utilizando Grid e Media Queries para adaptar a interface a diferentes tamanhos de tela.

## Créditos

- [PokéAPI](https://pokeapi.co/) — API utilizada para obtenção dos dados dos Pokémon.
- [Repositório de referência](https://github.com/HugusAlb/Pokedex-React) — referência utilizada durante o desenvolvimento.
