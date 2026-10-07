# 🛡️ CYBER-SQL // Operação Pericial: O Caso do Pedido Perdido

> **Simulador Interativo & Gamificado de Perícia Digital e Consultas SQL**  
> Desenvolvido para fixação prática dos conceitos de Banco de Dados (Aula 12 - Cláusulas SQL).

---

## 📌 Sobre o Projeto

O **CYBER-SQL** é uma aplicação interativa que coloca o estudante no papel de um perito digital cibernético investigando o desvio de uma carga de alta prioridade em uma transportadora.

A investigação é dividida em **8 fases progressivas** de desafios SQL, onde cada consulta executada no terminal pericial filtra e analisa os registros do banco de dados em tempo real até desvendar o suspeito e recuperar o pacote.

---

## 🎮 Fases da Investigação

1. **A Infiltração** (`SELECT`, `FROM`) — Mapeamento inicial de registros do banco de dados.
2. **Filtro de Alto Valor** (`WHERE`, `>`) — Filtragem de encomendas com notas fiscais de alto valor.
3. **Cruzamento Regional** (`AND`, `OR`) — Refinamento por localização geográfica.
4. **Padrão Nominal** (`LIKE`, `%`) — Rastreamento por padrões de nomes e caracteres coringa.
5. **A Janela Temporal** (`BETWEEN`) — Filtragem de registros em intervalos de datas.
6. **Priorização Pericial** (`ORDER BY`, `DESC`) — Ordenação dos registros por criticidade e valor.
7. **O Cerco Final** — Combinação de múltiplos operadores lógicos para isolar o pacote suspeito.
8. **Relatório Pericial** — Emissão de laudo final e encerramento do caso.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 & CSS3** (com estilização customizada, efeitos CRT, HUD futurista e tema escuro)
- **Tailwind CSS** (via CDN)
- **React 18** (UI reativa e controle de estados)
- **TypeScript / TSX** (definições de tipos e dados periciais)
- **Babel Standalone** (transpilação in-browser)
- **Lucide Icons & Canvas Confetti** (efeitos visuais e feedback de conclusão)

---

## 🚀 Como Executar Localmente

Como a aplicação é independente e autossuficiente no navegador, você pode executá-la de maneira muito simples:

### Opção 1: Abrir diretamente no navegador
Dê um duplo clique no arquivo `index.html` ou abra com seu navegador preferido (Chrome, Firefox, Safari, Edge).

### Opção 2: Usar uma extensão de servidor local (ex: Live Server do VS Code)
1. Instale a extensão **Live Server** no VS Code.
2. Clique com o botão direito em `index.html` e selecione **Open with Live Server**.

---

## 📂 Estrutura de Arquivos

```text
├── index.html              # Interface completa do simulador pronta para execução
├── terminal_pericial.tsx   # Componente e dados dos estágios em React/TypeScript
├── .gitignore              # Arquivos e extensões ignorados pelo Git
└── README.md               # Documentação do projeto
```

---

## 👨‍💻 Autor

Desenvolvido por **Kassio Alves** ([@kassioma](https://github.com/kassioma))
