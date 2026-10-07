-- ==============================================================================
-- 🛡️ OPERAÇÃO PERICIAL: O CASO DO PEDIDO PERDIDO
-- Atividade Prática de Banco de Dados 1 (Aula 12 - Consultas SQL)
-- Ambiente: MySQL Workbench (100% Offline)
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- PASSO 1: PREPARAÇÃO DO AMBIENTE PERICIAL
-- Execute este bloco inicial clicando no ícone do RAIO (⚡) no MySQL Workbench.
-- ------------------------------------------------------------------------------

CREATE DATABASE IF NOT EXISTS operacao_pericial;
USE operacao_pericial;

-- Remove versão anterior caso exista para permitir reiniciar a atividade
DROP TABLE IF EXISTS logistica_db;

-- Criação da tabela de evidências da transportadora
CREATE TABLE logistica_db (
    id INT PRIMARY KEY,
    cliente VARCHAR(100) NOT NULL,
    estado CHAR(2) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    data_envio DATE NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL
);

-- Inserção das cargas registradas nos servidores
INSERT INTO logistica_db (id, cliente, estado, cidade, data_envio, valor, status) VALUES
(101, 'Alberto Silva',  'SP', 'São Paulo',      '2026-02-15', 14200.00, 'Entregue'),
(102, 'Maria Souza',    'BA', 'Salvador',       '2026-01-20',  3400.00, 'Em Trânsito'),
(103, 'Antonio Costa',  'RJ', 'Rio de Janeiro', '2026-04-10',  8900.00, 'Entregue'),
(104, 'Carlos Silva',   'MG', 'Belo Horizonte', '2026-02-05', 11000.00, 'Cancelado'),
(105, 'Beatriz Lima',   'SP', 'Campinas',       '2026-02-28',  6300.00, 'Devolvido'),
(106, 'Roberto Dias',   'PR', 'Curitiba',       '2026-02-18',  5100.00, 'Entregue'),
(107, 'Juliana Silva',  'SP', 'Santos',         '2026-03-02',  9500.00, 'Em Trânsito'),
(108, 'Fernando Alves', 'MG', 'Uberlândia',     '2026-01-12',  4200.00, 'Entregue');

-- Verificação inicial: Deve listar 8 registros
SELECT * FROM logistica_db;


-- ==============================================================================
-- 🕵️ MISSÕES PERICIAIS (DESAFIOS PARA OS ALUNOS)
-- Cada aluno deve escrever sua consulta abaixo de cada missão e executá-la!
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- MISSÃO 1: A Infiltração (Slides 3 e 4: SELECT e FROM)
-- Lore: "Agente, acesse a base da transportadora e liste TODAS as colunas de 
--        TODOS os registros para mapear o banco."
-- ------------------------------------------------------------------------------
-- [SEU CÓDIGO AQUI]:




-- ------------------------------------------------------------------------------
-- MISSÃO 2: Crivo Financeiro (Slides 5 e 6: WHERE e Comparadores)
-- Lore: "O informante revelou que a carga desviada é de alto valor (mais de 8000).
--        Filtre todos os pedidos com valor superior a 8.000."
-- ------------------------------------------------------------------------------
-- [SEU CÓDIGO AQUI]:




-- ------------------------------------------------------------------------------
-- MISSÃO 3: Rota Confirmada (Slides 7 e 8: Operador AND)
-- Lore: "A perícia detectou que o veículo entrou em SP e o status consta como 'Entregue'.
--        Filtre registros onde estado = 'SP' E status = 'Entregue'."
-- ------------------------------------------------------------------------------
-- [SEU CÓDIGO AQUI]:




-- ------------------------------------------------------------------------------
-- MISSÃO 4: Pistas Falsas (Slide 9: Operador NOT)
-- Lore: "Descarte qualquer carga cancelada! Usando o operador de negação NOT,
--        liste todas as cargas que NÃO estejam com status 'Cancelado'."
-- ------------------------------------------------------------------------------
-- [SEU CÓDIGO AQUI]:




-- ------------------------------------------------------------------------------
-- MISSÃO 5: Reconhecimento de Padrão (Slide 10: Operador LIKE e %)
-- Lore: "O facilitador interno possui sobrenome 'Silva'. Busque todos os clientes
--        cujo nome contenha 'Silva' em qualquer posição."
-- ------------------------------------------------------------------------------
-- [SEU CÓDIGO AQUI]:




-- ------------------------------------------------------------------------------
-- MISSÃO 6: O Cerco Regional (Slide 11: Operador IN)
-- Lore: "O comboio atuava apenas no Sudeste: SP, RJ ou MG. Em vez de usar múltiplos ORs,
--        use o operador IN para filtrar cargas com estado nesses três polos."
-- ------------------------------------------------------------------------------
-- [SEU CÓDIGO AQUI]:




-- ------------------------------------------------------------------------------
-- MISSÃO 7: A Janela Temporal (Slide 12: Operador BETWEEN)
-- Lore: "O ataque ocorreu estritamente em fevereiro de 2026. Filtre todos os 
--        despachos com data_envio entre '2026-02-01' e '2026-02-28' usando BETWEEN."
-- ------------------------------------------------------------------------------
-- [SEU CÓDIGO AQUI]:




-- ------------------------------------------------------------------------------
-- MISSÃO 8: O Grande Laudo Pericial - BOSS BATTLE (Slide 13: Combinando Tudo)
-- Lore: "HORA DA VERDADE! Combine em UMA ÚNICA CONSULTA:
--        1. data_envio BETWEEN '2026-02-01' AND '2026-02-28'
--        2. estado IN ('SP', 'RJ', 'MG')
--        3. cliente LIKE '%Silva%'
--        4. NOT status = 'Cancelado'
--        Descubra o ID e o Cliente do pacote desviado!"
-- ------------------------------------------------------------------------------
-- [SEU CÓDIGO AQUI]:



-- ==============================================================================
-- 🗝️ GABARITO DO PROFESSOR (Manter oculto ou passar no encerramento)
-- ==============================================================================
/*
-- Gabarito 1:
SELECT * FROM logistica_db;

-- Gabarito 2:
SELECT * FROM logistica_db WHERE valor > 8000;

-- Gabarito 3:
SELECT * FROM logistica_db WHERE estado = 'SP' AND status = 'Entregue';

-- Gabarito 4:
SELECT * FROM logistica_db WHERE NOT status = 'Cancelado';

-- Gabarito 5:
SELECT * FROM logistica_db WHERE cliente LIKE '%Silva%';

-- Gabarito 6:
SELECT * FROM logistica_db WHERE estado IN ('SP', 'RJ', 'MG');

-- Gabarito 7:
SELECT * FROM logistica_db WHERE data_envio BETWEEN '2026-02-01' AND '2026-02-28';

-- Gabarito 8 (ALVO FINAL: ID 101 - Alberto Silva, R$ 14.200,00):
SELECT * 
FROM logistica_db 
WHERE data_envio BETWEEN '2026-02-01' AND '2026-02-28'
  AND estado IN ('SP', 'RJ', 'MG')
  AND cliente LIKE '%Silva%'
  AND NOT status = 'Cancelado';
*/
