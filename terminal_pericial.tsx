import React, { useState, useMemo, useEffect } from 'react';
import {
  ShieldAlert,
  Terminal,
  Play,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Volume2,
  VolumeX,
  Sparkles,
  Award,
  Lock,
  Unlock,
  ChevronRight,
  RotateCcw,
  Zap,
  Printer,
  Star,
  User,
  BookOpen,
  Database,
  Target,
  X
} from 'lucide-react';

export interface RegistroLogistica {
  id: number;
  cliente: string;
  estado: string;
  cidade: string;
  data: string;
  valor: number;
  status: 'Entregue' | 'Em Trânsito' | 'Cancelado' | 'Devolvido';
}

export interface StageTheory {
  title: string;
  desc: string;
  syntax: string;
}

export interface Stage {
  id: number;
  title: string;
  slideRef: string;
  subtitle: string;
  lore: string;
  mission: string;
  template: string;
  hint: string;
  solution: string;
  targetCheck: (sql: string, rows: RegistroLogistica[]) => boolean;
  theory: StageTheory;
}

// BANCO DE DADOS CENTRAL DA TRANSPORTADORA
export const DATABASE: RegistroLogistica[] = [
  { id: 101, cliente: 'Alberto Silva', estado: 'SP', cidade: 'São Paulo', data: '2026-02-15', valor: 14200, status: 'Entregue' }, // ALVO FINAL
  { id: 102, cliente: 'Maria Souza', estado: 'BA', cidade: 'Salvador', data: '2026-01-20', valor: 3400, status: 'Em Trânsito' },
  { id: 103, cliente: 'Antonio Costa', estado: 'RJ', cidade: 'Rio de Janeiro', data: '2026-04-10', valor: 8900, status: 'Entregue' },
  { id: 104, cliente: 'Carlos Silva', estado: 'MG', cidade: 'Belo Horizonte', data: '2026-02-05', valor: 11000, status: 'Cancelado' },
  { id: 105, cliente: 'Beatriz Lima', estado: 'SP', cidade: 'Campinas', data: '2026-02-28', valor: 6300, status: 'Devolvido' },
  { id: 106, cliente: 'Roberto Dias', estado: 'PR', cidade: 'Curitiba', data: '2026-02-18', valor: 5100, status: 'Entregue' },
  { id: 107, cliente: 'Juliana Silva', estado: 'SP', cidade: 'Santos', data: '2026-03-02', valor: 9500, status: 'Em Trânsito' },
  { id: 108, cliente: 'Fernando Alves', estado: 'MG', cidade: 'Uberlândia', data: '2026-01-12', valor: 4200, status: 'Entregue' }
];

// AS 8 ETAPAS DO JOGO BASEADAS NOS SLIDES DA AULA 12
export const STAGES: Stage[] = [
  {
    id: 1,
    title: 'A Infiltração',
    slideRef: 'Slides 3 e 4: SELECT e FROM',
    subtitle: 'Comandos básicos de seleção',
    lore: 'Agente, bem-vindo à central pericial. Nosso primeiro passo é invadir o servidor da transportadora e listar todos os pacotes registrados para mapear o banco.',
    mission: "Escreva uma consulta para exibir TODAS as colunas de TODOS os registros da tabela 'logistica_db'.",
    template: `-- Fase 1: Escreva a consulta para listar todas as colunas
SELECT 
FROM logistica_db;`,
    hint: "Use 'SELECT * FROM logistica_db;' para selecionar todas as colunas com o asterisco (*).",
    solution: 'SELECT * FROM logistica_db;',
    targetCheck: (sql, rows) => {
      const upper = sql.toUpperCase();
      return upper.includes('SELECT') && upper.includes('FROM') && upper.includes('LOGISTICA_DB') && rows.length === DATABASE.length;
    },
    theory: {
      title: 'SELECT e FROM (Slides 3-4)',
      desc: 'O SELECT escolhe quais colunas exibir (o asterisco * seleciona todas). O FROM diz de qual tabela buscar as informações.',
      syntax: 'SELECT * FROM alunos;\nSELECT nome, idade FROM alunos;'
    }
  },
  {
    id: 2,
    title: 'Filtro de Alto Valor',
    slideRef: 'Slides 5 e 6: WHERE e Comparadores',
    subtitle: 'Filtragem com >, <, >=, =',
    lore: 'Ótimo acesso! O informante confidenciou que o lote desviado era de alta prioridade, com valor de nota fiscal estritamente superior a R$ 8.000.',
    mission: "Filtre todas as entregas que possuem 'valor > 8000' para eliminar pacotes de baixo custo.",
    template: `SELECT * 
FROM logistica_db 
WHERE 
  -- Adicione o filtro para valor maior que 8000
;`,
    hint: "Adicione a cláusula 'WHERE valor > 8000' logo após o FROM.",
    solution: 'SELECT * FROM logistica_db WHERE valor > 8000;',
    targetCheck: (sql, rows) => {
      const upper = sql.toUpperCase();
      const hasOp = upper.includes('VALOR') && (upper.includes('>') || upper.includes('>='));
      const correctIds = [101, 103, 104, 107];
      const matches = rows.length === 4 && rows.every((r) => correctIds.includes(r.id));
      return hasOp && matches;
    },
    theory: {
      title: 'WHERE e Operadores de Comparação (Slides 5-6)',
      desc: 'A cláusula WHERE define condições de filtro. Operadores: = (igual), != ou <> (diferente), > (maior), < (menor), >= e <=.',
      syntax: 'SELECT * FROM alunos WHERE nota >= 7;\nSELECT * FROM pedidos WHERE valor > 5000;'
    }
  },
  {
    id: 3,
    title: 'Cruzamento de Rota',
    slideRef: 'Slides 7 e 8: Operador AND',
    subtitle: 'Múltiplas condições simultâneas',
    lore: "O rastreador do veículo suspeito confirmou: a carga entrou no estado de São Paulo ('SP') e o status foi marcado como 'Entregue'. Ambas as condições devem ser verdadeiras!",
    mission: "Use o operador AND para buscar registros onde o 'estado' seja igual a 'SP' E o 'status' seja igual a 'Entregue'.",
    template: `SELECT * 
FROM logistica_db 
WHERE 
  -- Use o operador AND para combinar estado = 'SP' e status = 'Entregue'
;`,
    hint: "Combine as duas condições com AND: estado = 'SP' AND status = 'Entregue'",
    solution: "SELECT * FROM logistica_db WHERE estado = 'SP' AND status = 'Entregue';",
    targetCheck: (sql, rows) => {
      const upper = sql.toUpperCase();
      const hasAnd = upper.includes('AND') && upper.includes('ESTADO') && upper.includes('STATUS');
      return hasAnd && rows.length === 1 && rows[0].id === 101;
    },
    theory: {
      title: 'O Operador AND (Slides 7-8)',
      desc: 'O AND exige que TODAS as condições sejam verdadeiras ao mesmo tempo. É mais restritivo e refina o resultado da busca.',
      syntax: "SELECT * FROM alunos\nWHERE nota >= 7 AND cidade = 'São Paulo';"
    }
  },
  {
    id: 4,
    title: 'Pistas Falsas',
    slideRef: 'Slide 9: O Operador NOT',
    subtitle: 'Inversão lógica de condições',
    lore: "A perícia descartou prontamente qualquer encomenda cancelada! Precisamos de uma lista com todas as entregas ativas, excluindo aquelas com status 'Cancelado' usando NOT.",
    mission: "Use o operador de negação NOT para filtrar pedidos onde NÃO seja status 'Cancelado'.",
    template: `SELECT * 
FROM logistica_db 
WHERE 
  -- Use NOT para negar a condição status = 'Cancelado'
;`,
    hint: "Use a sintaxe do Slide 9: 'WHERE NOT status = \\'Cancelado\\''",
    solution: "SELECT * FROM logistica_db WHERE NOT status = 'Cancelado';",
    targetCheck: (sql, rows) => {
      const upper = sql.toUpperCase();
      const hasNot = upper.includes('NOT') && upper.includes('STATUS');
      const matches = rows.length === 7 && !rows.some((r) => r.status === 'Cancelado');
      return hasNot && matches;
    },
    theory: {
      title: 'O Operador NOT (Slide 9)',
      desc: 'O NOT inverte a condição lógica. Em vez de buscar quem atende a um critério, busca quem NÃO o atende.',
      syntax: "SELECT * FROM alunos WHERE NOT status = 'inativo';\nSELECT * FROM pedidos WHERE NOT cidade = 'Brasília';"
    }
  },
  {
    id: 5,
    title: 'Reconhecimento de Padrão',
    slideRef: 'Slide 10: O Operador LIKE e Curingas',
    subtitle: 'Busca por padrão com % e _',
    lore: "O operador da transportadora que facilitou o desvio pertence a uma conta com sobrenome 'Silva'. Como não sabemos o primeiro nome exato, devemos usar o curinga de texto %!",
    mission: "Busque todos os registros onde o nome do 'cliente' contenha 'Silva' em qualquer posição usando LIKE e o curinga %.",
    template: `SELECT * 
FROM logistica_db 
WHERE 
  -- Busque o padrão de nome usando LIKE e o curinga %
;`,
    hint: "Use 'WHERE cliente LIKE \\'%Silva%\\''. O símbolo % antes e depois indica qualquer texto ao redor.",
    solution: "SELECT * FROM logistica_db WHERE cliente LIKE '%Silva%';",
    targetCheck: (sql, rows) => {
      const upper = sql.toUpperCase();
      const hasLike = upper.includes('LIKE') && upper.includes('SILVA');
      const correctIds = [101, 104, 107];
      return hasLike && rows.length === 3 && rows.every((r) => correctIds.includes(r.id));
    },
    theory: {
      title: 'O Operador LIKE (Slide 10)',
      desc: 'O LIKE busca padrões de texto usando curingas. % representa qualquer sequência de caracteres; _ representa exatamente um caractere.',
      syntax: "WHERE nome LIKE 'Ana%'   -- Começa com Ana\nWHERE nome LIKE '%Silva%' -- Contém Silva\nWHERE nome LIKE 'A_a'     -- Três letras"
    }
  },
  {
    id: 6,
    title: 'O Cerco Regional',
    slideRef: 'Slide 11: O Operador IN',
    subtitle: 'Filtragem por lista de valores',
    lore: 'O comboio transportador operava exclusivamente no corredor Sudeste: SP, RJ ou MG. O comando com múltiplos ORs ficaria poluído; use o operador IN para um código limpo!',
    mission: "Filtre as cargas cujo 'estado' esteja na lista ('SP', 'RJ', 'MG') utilizando o operador IN.",
    template: `SELECT * 
FROM logistica_db 
WHERE 
  -- Use o operador IN com a lista ('SP', 'RJ', 'MG')
;`,
    hint: "Use 'WHERE estado IN (\\'SP\\', \\'RJ\\', \\'MG\\')'.",
    solution: "SELECT * FROM logistica_db WHERE estado IN ('SP', 'RJ', 'MG');",
    targetCheck: (sql, rows) => {
      const upper = sql.toUpperCase();
      const hasIn = upper.includes('IN') && upper.includes('ESTADO');
      const correctIds = [101, 103, 104, 105, 107, 108];
      return hasIn && rows.length === 6 && rows.every((r) => correctIds.includes(r.id));
    },
    theory: {
      title: 'O Operador IN (Slide 11)',
      desc: 'O IN verifica se um valor pertence a uma lista de opções. É a forma mais elegante e limpa de substituir múltiplos ORs.',
      syntax: "-- Em vez de: WHERE estado = 'SP' OR estado = 'RJ'\nWHERE estado IN ('SP', 'RJ', 'MG')"
    }
  },
  {
    id: 7,
    title: 'A Janela Temporal',
    slideRef: 'Slide 12: O Operador BETWEEN',
    subtitle: 'Intervalos fechados de datas',
    lore: 'O ataque aos servidores ocorreu durante o mês de fevereiro de 2026. Localize todos os pacotes despachados entre 2026-02-01 e 2026-02-28 com o operador BETWEEN.',
    mission: "Filtre os registros onde a 'data' esteja BETWEEN '2026-02-01' AND '2026-02-28'.",
    template: `SELECT * 
FROM logistica_db 
WHERE 
  -- Use o operador BETWEEN para filtrar o intervalo de datas
;`,
    hint: "Use 'WHERE data BETWEEN \\'2026-02-01\\' AND \\'2026-02-28\\''.",
    solution: "SELECT * FROM logistica_db WHERE data BETWEEN '2026-02-01' AND '2026-02-28';",
    targetCheck: (sql, rows) => {
      const upper = sql.toUpperCase();
      const hasBetween = upper.includes('BETWEEN') && upper.includes('DATA');
      const correctIds = [101, 104, 105, 106];
      return hasBetween && rows.length === 4 && rows.every((r) => correctIds.includes(r.id));
    },
    theory: {
      title: 'O Operador BETWEEN (Slide 12)',
      desc: 'O BETWEEN filtra registros em um intervalo fechado (inclusive os extremos). Funciona perfeitamente com números e datas.',
      syntax: "WHERE nota BETWEEN 6 AND 10;\nWHERE data BETWEEN '2024-01-01' AND '2024-06-30';"
    }
  },
  {
    id: 8,
    title: 'O Grande Laudo Pericial',
    slideRef: 'Slide 13: Combinando Tudo (BOSS BATTLE)',
    subtitle: 'A Consulta Completa da Aula 12',
    lore: 'HORA DA VERDADE! Esta é a missão decisiva. Como no Slide 13 da Aula 12, combine BETWEEN, IN, LIKE e NOT em uma única consulta mestra para isolar exclusivamente o pacote fraudulento!',
    mission: "Isole o ÚNICO pacote suspeito combinando:\n1. data BETWEEN '2026-02-01' AND '2026-02-28'\n2. estado IN ('SP', 'RJ', 'MG')\n3. cliente LIKE '%Silva%'\n4. NOT status = 'Cancelado'",
    template: `-- BOSS BATTLE: COMBINE TODOS OS CRITÉRIOS DA AULA 12
SELECT * 
FROM logistica_db 
WHERE 
  -- 1. Data em fevereiro/2026 (BETWEEN)
  
  -- 2. Estados do polo Sudeste (IN)
  
  -- 3. Cliente da família Silva (LIKE)
  
  -- 4. Descartar pedidos cancelados (NOT)
;`,
    hint: "Combine os 4 operadores com AND: BETWEEN ... AND estado IN ... AND cliente LIKE ... AND NOT status = 'Cancelado'",
    solution: `SELECT * 
FROM logistica_db 
WHERE data BETWEEN '2026-02-01' AND '2026-02-28'
  AND estado IN ('SP', 'RJ', 'MG')
  AND cliente LIKE '%Silva%'
  AND NOT status = 'Cancelado';`,
    targetCheck: (sql, rows) => {
      const upper = sql.toUpperCase();
      const hasAll =
        upper.includes('BETWEEN') &&
        upper.includes('IN') &&
        upper.includes('LIKE') &&
        (upper.includes('NOT') || upper.includes('!=') || upper.includes('<>'));
      return hasAll && rows.length === 1 && rows[0].id === 101;
    },
    theory: {
      title: 'Combinando Tudo: A Consulta Completa (Slide 13)',
      desc: 'Na prática pericial e corporativa, combinamos múltiplos operadores em uma consulta robusta e precisa.',
      syntax: "SELECT nome, nota, cidade FROM alunos\nWHERE nota BETWEEN 6 AND 10\n  AND cidade IN ('SP', 'RJ')\n  AND nome LIKE 'A%'\n  AND NOT status = 'inativo';"
    }
  }
];

// Funções do motor SQL
function sqlLikeToRegex(pattern: string): RegExp {
  let res = '^';
  for (let i = 0; i < pattern.length; i++) {
    const c = pattern[i];
    if (c === '%') res += '.*';
    else if (c === '_') res += '.';
    else if (/[.\\+*?[\]^$(){}=!<>|:-]/.test(c)) res += '\\' + c;
    else res += c;
  }
  res += '$';
  return new RegExp(res, 'i');
}

function evaluatePredicate(row: RegistroLogistica, predStr: string): boolean {
  const p = predStr.trim();
  if (!p) return true;

  const notMatch = p.match(/^NOT\s+(.+)$/i);
  if (notMatch) return !evaluatePredicate(row, notMatch[1]);

  const betweenMatch = p.match(/^(\w+)\s+BETWEEN\s+'?([^'\s]+)'?\s+AND\s+'?([^'\s]+)'?$/i);
  if (betweenMatch) {
    const [, col, v1, v2] = betweenMatch;
    const key = col.toLowerCase() as keyof RegistroLogistica;
    const val = row[key];
    if (typeof val === 'number') {
      return val >= Number(v1) && val <= Number(v2);
    }
    return String(val ?? '') >= v1 && String(val ?? '') <= v2;
  }

  const inMatch = p.match(/^(\w+)\s+(NOT\s+)?IN\s*\(([^)]+)\)$/i);
  if (inMatch) {
    const [, col, isNot, listStr] = inMatch;
    const items = listStr.split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, '').toUpperCase());
    const key = col.toLowerCase() as keyof RegistroLogistica;
    const val = String(row[key] ?? '').toUpperCase();
    const has = items.includes(val);
    return isNot ? !has : has;
  }

  const likeMatch = p.match(/^(\w+)\s+(NOT\s+)?LIKE\s+'([^']*)'$/i);
  if (likeMatch) {
    const [, col, isNot, pattern] = likeMatch;
    const key = col.toLowerCase() as keyof RegistroLogistica;
    const val = String(row[key] ?? '');
    const regex = sqlLikeToRegex(pattern);
    const matches = regex.test(val);
    return isNot ? !matches : matches;
  }

  const compMatch = p.match(/^(\w+)\s*(!=|<>|>=|<=|=|>|<)\s*'?(.*?)'?$/i);
  if (compMatch) {
    const [, col, op, rawVal] = compMatch;
    const targetVal = rawVal.replace(/^['"]|['"]$/g, '').trim();
    const key = col.toLowerCase() as keyof RegistroLogistica;
    const rowVal = row[key];

    if (typeof rowVal === 'number') {
      const numTarget = Number(targetVal);
      if (op === '=') return rowVal === numTarget;
      if (op === '!=' || op === '<>') return rowVal !== numTarget;
      if (op === '>') return rowVal > numTarget;
      if (op === '<') return rowVal < numTarget;
      if (op === '>=') return rowVal >= numTarget;
      if (op === '<=') return rowVal <= numTarget;
    }

    const sRow = String(rowVal ?? '').toLowerCase();
    const sTarget = targetVal.toLowerCase();
    if (op === '=') return sRow === sTarget;
    if (op === '!=' || op === '<>') return sRow !== sTarget;
    if (op === '>') return sRow > sTarget;
    if (op === '<') return sRow < sTarget;
    if (op === '>=') return sRow >= sTarget;
    if (op === '<=') return sRow <= sTarget;
  }

  return true;
}

function splitTopLevelAnd(whereClause: string): string[] {
  const betweenRegex = /\bBETWEEN\b\s+('[^']*'|\d+)\s+\bAND\b\s+('[^']*'|\d+)/gi;
  const placeholders: string[] = [];
  const masked = whereClause.replace(betweenRegex, (match) => {
    placeholders.push(match);
    return `___BETWEEN_${placeholders.length - 1}___`;
  });

  const parts = masked.split(/\s+AND\s+/i).map((part) => {
    let unmasked = part.trim();
    placeholders.forEach((ph, idx) => {
      unmasked = unmasked.replace(`___BETWEEN_${idx}___`, ph);
    });
    return unmasked;
  });

  return parts.filter(Boolean);
}

export function executeSQLQuery(sql: string): RegistroLogistica[] {
  const clean = sql
    .replace(/--.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .trim()
    .replace(/;+$/, '')
    .trim();

  const m = clean.match(/SELECT\s+([\s\S]+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+))?/i);
  if (!m) throw new Error('Sintaxe SQL inválida. Siga a estrutura: SELECT * FROM logistica_db WHERE ...');

  const [, , table, where] = m;
  if (table.toLowerCase() !== 'logistica_db') {
    throw new Error(`Tabela "${table}" desconhecida. Utilize a tabela central: logistica_db`);
  }

  if (!where || !where.trim()) {
    return [...DATABASE];
  }

  if (/\bOR\b/i.test(where) && !/\bAND\b/i.test(where)) {
    const orParts = where.split(/\s+OR\s+/i).map((s) => s.trim());
    return DATABASE.filter((row) => orParts.some((p) => evaluatePredicate(row, p)));
  }

  const andParts = splitTopLevelAnd(where);
  let res = [...DATABASE];
  for (const p of andParts) {
    res = res.filter((row) => evaluatePredicate(row, p));
  }
  return res;
}

export default function HackerTerminalGame() {
  const [currentStageId, setCurrentStageId] = useState(1);
  const [unlockedStages, setUnlockedStages] = useState<number[]>([1]);
  const [stageStars, setStageStars] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 });
  const [xp, setXp] = useState(0);
  const [agentName, setAgentName] = useState('Agente Pericial');
  const [query, setQuery] = useState(STAGES[0].template);
  const [results, setResults] = useState<RegistroLogistica[]>(DATABASE);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | 'boss-victory' | 'info';
    message: string;
    details?: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [scanlines, setScanlines] = useState(true);
  const [showCertificate, setShowCertificate] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const currentStage = STAGES.find((s) => s.id === currentStageId) || STAGES[0];

  useEffect(() => {
    setQuery(currentStage.template);
    setFeedback(null);
    setResults(DATABASE);
  }, [currentStageId, currentStage.template]);

  const rankInfo = useMemo(() => {
    if (xp >= 1400) return { title: 'DELEGADO PERICIAL MESTRE', level: 5, color: 'text-amber-400' };
    if (xp >= 1000) return { title: 'PERITO CRIMINAL FORENSE', level: 4, color: 'text-purple-400' };
    if (xp >= 600) return { title: 'INSPETOR DE REDES SQL', level: 3, color: 'text-cyan-400' };
    if (xp >= 300) return { title: 'ANALISTA DE INVESTIGAÇÃO', level: 2, color: 'text-green-400' };
    return { title: 'RECRUTA PERICIAL', level: 1, color: 'text-gray-400' };
  }, [xp]);

  const playSfx = (type: 'beep' | 'execute' | 'stage-clear' | 'error' | 'victory') => {
    if (!audioEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'beep') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'execute') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(740, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'stage-clear') {
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.12);
          gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.12);
          osc.stop(ctx.currentTime + i * 0.12 + 0.3);
        });
      } else if (type === 'error') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(160, ctx.currentTime);
        osc.frequency.setValueAtTime(120, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'victory') {
        const chords = [523.25, 659.25, 783.99, 1046.5, 1318.5];
        chords.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.08);
          gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.08);
          osc.stop(ctx.currentTime + 1.2);
        });
      }
    } catch {
      // Ignora erro se a política do navegador bloquear áudio
    }
  };

  const handleExecute = () => {
    setIsProcessing(true);
    setFeedback(null);
    playSfx('execute');

    setTimeout(() => {
      try {
        const filteredRows = executeSQLQuery(query);
        setResults(filteredRows);

        const isTargetMet = currentStage.targetCheck(query, filteredRows);

        if (isTargetMet) {
          const isFirstTime = !stageStars[currentStage.id];
          const earnedStars = 3;
          const earnedXp = isFirstTime ? 200 : 50;

          setXp((prev) => prev + earnedXp);
          setStageStars((prev) => ({ ...prev, [currentStage.id]: Math.max(prev[currentStage.id] || 0, earnedStars) }));

          if (currentStage.id < STAGES.length) {
            const nextId = currentStage.id + 1;
            if (!unlockedStages.includes(nextId)) {
              setUnlockedStages((prev) => [...prev, nextId]);
            }
          }

          if (currentStage.id === 8) {
            setGameCompleted(true);
            playSfx('victory');
            setFeedback({
              type: 'boss-victory',
              message: '💥 CASO TOTALMENTE SOLUCIONADO! O LOTE FRAUDULENTO FOI ISOLADO!',
              details: `Parabéns, ${agentName}! Você combinou com perfeição todos os operadores da Aula 12. O registro #101 foi homologado no laudo final.`
            });
          } else {
            playSfx('stage-clear');
            setFeedback({
              type: 'success',
              message: `🎯 MISSÃO CUMPRIDA: FASE ${currentStage.id} CONCLUÍDA! (+${earnedXp} XP)`,
              details: `Sua consulta atendeu precisamente aos requisitos do ${currentStage.slideRef}. Clique em AVANÇAR para o próximo desafio.`
            });
          }
        } else {
          playSfx('error');
          setFeedback({
            type: 'error',
            message: '[OBJETIVO NÃO ATINGIDO] A consulta não atendeu ao critério da fase',
            details: `Linhas retornadas: ${filteredRows.length}. Verifique o operador exigido (${currentStage.slideRef}) e compare com a missão.`
          });
        }
      } catch (err) {
        playSfx('error');
        setFeedback({
          type: 'error',
          message: '[ERRO DE SINTAXE SQL]',
          details: (err as Error).message
        });
      }

      setIsProcessing(false);
    }, 400);
  };

  const handleNextStage = () => {
    playSfx('beep');
    if (currentStage.id < STAGES.length) {
      setCurrentStageId(currentStage.id + 1);
    } else {
      setShowCertificate(true);
    }
  };

  const handleInsertSolution = () => {
    playSfx('beep');
    setQuery(currentStage.solution);
    setFeedback({
      type: 'info',
      message: 'Consulta de referência carregada no editor.',
      details: 'Pressione EXECUTAR QUERY para validar os resultados.'
    });
  };

  const totalStars = Object.values(stageStars).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-[#05080c] text-green-400 font-mono p-3 md:p-6 relative flex flex-col justify-between selection:bg-green-500 selection:text-black">
      {/* TOPO: HUD DO AGENTE */}
      <header className="max-w-7xl mx-auto w-full mb-4 border border-green-800/80 bg-black/90 p-3 md:p-4 rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.15)] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-12 h-12 bg-green-950/80 border-2 border-green-500 rounded-lg flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(74,222,128,0.4)]">
            <ShieldAlert className="w-7 h-7 text-green-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] md:text-xs font-bold tracking-widest ${rankInfo.color}`}>
                NÍVEL {rankInfo.level} · {rankInfo.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-green-600" />
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                title="Clique para editar seu codinome de perito"
                className="bg-transparent border-b border-green-800 focus:border-green-400 text-sm md:text-base font-bold text-green-300 focus:outline-none w-48 font-mono"
              />
            </div>
          </div>
        </div>

        {/* STATUS DE PROGRESSO E ESTRELAS */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end flex-wrap">
          <div className="bg-neutral-900/90 border border-green-900/80 px-3 py-1.5 rounded-lg flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] text-green-600 font-bold">XP TOTAL</div>
              <div className="text-sm font-extrabold text-green-300">{xp} XP</div>
            </div>
            <div className="h-6 w-px bg-green-900" />
            <div className="text-right">
              <div className="text-[10px] text-amber-500 font-bold">ESTRELAS</div>
              <div className="text-sm font-extrabold text-amber-400 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{totalStars} / 24</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setAudioEnabled(!audioEnabled);
                playSfx('beep');
              }}
              className="p-2 bg-neutral-900 hover:bg-green-950 border border-green-800 text-green-400 rounded transition text-xs"
              title="Alternar Áudio"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setScanlines(!scanlines)}
              className="p-2 bg-neutral-900 hover:bg-green-950 border border-green-800 text-green-400 rounded transition text-xs flex items-center gap-1"
              title="Alternar Scanlines CRT"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{scanlines ? 'CRT ON' : 'CRT OFF'}</span>
            </button>
            {gameCompleted && (
              <button
                onClick={() => setShowCertificate(true)}
                className="p-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded transition text-xs flex items-center gap-1 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
              >
                <Award className="w-4 h-4" />
                <span>LAUDO FINAL</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAPA DE FASES TÁTICO */}
      <nav className="max-w-7xl mx-auto w-full mb-6 overflow-x-auto pb-2">
        <div className="flex items-center gap-2 min-w-max p-2 bg-black/70 border border-green-900/80 rounded-xl">
          {STAGES.map((st) => {
            const isUnlocked = unlockedStages.includes(st.id);
            const isCurrent = currentStage.id === st.id;
            const stars = stageStars[st.id] || 0;
            const isBoss = st.id === 8;

            return (
              <button
                key={st.id}
                disabled={!isUnlocked}
                onClick={() => {
                  playSfx('beep');
                  setCurrentStageId(st.id);
                }}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border transition-all duration-200 text-left relative ${
                  isCurrent
                    ? isBoss
                      ? 'bg-amber-950/70 border-amber-400 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.5)] scale-105'
                      : 'bg-green-950/80 border-green-400 text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.4)] scale-105'
                    : isUnlocked
                    ? 'bg-neutral-900/70 hover:bg-green-950/40 border-green-900 text-green-500'
                    : 'bg-neutral-950/40 border-neutral-900 text-neutral-600 opacity-60 cursor-not-allowed'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs ${
                    isBoss
                      ? 'bg-amber-900/80 text-amber-200 border border-amber-500'
                      : isCurrent
                      ? 'bg-green-800 text-green-100 border border-green-400'
                      : isUnlocked
                      ? 'bg-green-950 text-green-500 border border-green-800'
                      : 'bg-neutral-900 text-neutral-600'
                  }`}
                >
                  {isUnlocked ? (isBoss ? '👑' : st.id) : <Lock className="w-3.5 h-3.5" />}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold leading-none">{st.title}</span>
                    {stars > 0 && <span className="text-[10px] text-amber-400">{'★'.repeat(stars)}</span>}
                  </div>
                  <span className="text-[10px] opacity-75 font-mono">{st.subtitle}</span>
                </div>

                {isCurrent && (
                  <span className="absolute -top-1.5 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* GRID CENTRAL: MISSÃO & CONSOLE */}
      <main className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 mb-6">
        {/* COLUNA ESQUERDA: TRANSMISSÃO DO INSPETOR & TEORIA (5 Colunas) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-black/90 border border-green-800/90 rounded-xl p-5 shadow-[0_0_25px_rgba(0,128,0,0.12)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-green-900/80 pb-3 mb-4">
                <span className="text-xs uppercase tracking-widest px-2 py-0.5 rounded bg-green-900/50 border border-green-700 text-green-300 font-bold">
                  FASE {currentStage.id} // {currentStage.title}
                </span>
                <span className="text-[11px] text-green-500 font-bold">{currentStage.slideRef}</span>
              </div>

              {/* TRANSMISSÃO DO INSPETOR */}
              <div className="bg-neutral-950/90 border border-green-900/70 p-3.5 rounded-lg mb-4 flex items-start gap-3">
                <div className="w-9 h-9 bg-green-950 border border-green-600 rounded flex items-center justify-center text-lg shrink-0">
                  <ShieldAlert className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-[10px] text-green-600 font-bold">
                    TRANSMISSÃO DO INSPETOR MENDES // CANAL FORENSE
                  </div>
                  <p className="text-xs text-green-400 leading-relaxed mt-1">"{currentStage.lore}"</p>
                </div>
              </div>

              {/* OBJETIVO DA CONSULTA */}
              <div className="bg-green-950/20 border border-green-700/60 p-4 rounded-lg mb-4">
                <div className="flex items-center gap-2 text-xs font-extrabold text-green-300 uppercase tracking-wide mb-1.5">
                  <Target className="w-4 h-4 text-green-400" />
                  <span>OBJETIVO DA CONSULTA</span>
                </div>
                <p className="text-xs md:text-sm text-green-300 font-medium leading-relaxed whitespace-pre-line">
                  {currentStage.mission}
                </p>
              </div>

              {/* TEORIA DO SLIDE */}
              <div className="bg-black border border-green-900 p-3.5 rounded-lg text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-green-300">
                  <BookOpen className="w-4 h-4 text-green-500" />
                  <span>{currentStage.theory.title}</span>
                </div>
                <p className="text-[11px] text-green-600 leading-relaxed">{currentStage.theory.desc}</p>
                <div className="bg-neutral-950 p-2 rounded border border-green-950 font-mono text-[11px] text-green-400 whitespace-pre-wrap">
                  {currentStage.theory.syntax}
                </div>
              </div>
            </div>

            {/* BOTÕES DE SUPORTE */}
            <div className="mt-5 pt-3 border-t border-green-900/60 flex items-center gap-2 flex-wrap">
              <button
                id="btn-dica"
                onClick={() => {
                  playSfx('beep');
                  setFeedback({
                    type: 'info',
                    message: `💡 DICA DE SINTAXE (${currentStage.slideRef})`,
                    details: currentStage.hint
                  });
                }}
                className="flex-1 py-2 px-3 bg-neutral-900 hover:bg-green-950 border border-green-800 text-green-400 rounded text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>DICA</span>
              </button>

              <button
                id="btn-resposta-modelo"
                onClick={handleInsertSolution}
                className="flex-1 py-2 px-3 bg-green-950/40 hover:bg-green-900/60 border border-green-700 text-green-300 rounded text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>RESPOSTA MODELO</span>
              </button>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: CONSOLE SQL & RESULTADOS (7 Colunas) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* CONSOLE DE CONSULTA SQL */}
          <div className="bg-black border border-green-800 rounded-xl shadow-[0_0_25px_rgba(0,128,0,0.18)] flex flex-col overflow-hidden">
            <div className="bg-green-950/80 px-4 py-2.5 border-b border-green-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-xs text-green-400 font-bold tracking-wider">
                  TERMINAL_SQL // FASE {currentStage.id}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-green-600 font-mono">
                <Database className="w-3.5 h-3.5" />
                <span>TABELA: logistica_db</span>
              </div>
            </div>

            <div className="p-3 bg-black/90">
              <textarea
                id="sql-textarea"
                className="w-full h-44 bg-transparent p-3 text-green-300 text-xs md:text-sm resize-y focus:outline-none focus:ring-1 focus:ring-green-500 font-mono leading-relaxed border border-green-900/40 rounded-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    e.preventDefault();
                    handleExecute();
                  }
                }}
                spellCheck="false"
                placeholder="Escreva sua consulta SQL aqui..."
              />
            </div>

            <div className="bg-neutral-900/90 border-t border-green-900 p-3 flex items-center justify-between flex-wrap gap-2">
              <button
                id="btn-restaurar-esqueleto"
                onClick={() => {
                  playSfx('beep');
                  setQuery(currentStage.template);
                }}
                className="text-xs text-green-600 hover:text-green-400 transition flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar Esqueleto</span>
              </button>

              <button
                id="btn-executar-query"
                onClick={handleExecute}
                disabled={isProcessing}
                className="flex items-center gap-2 bg-gradient-to-r from-green-900 to-green-600 hover:from-green-600 hover:to-green-400 hover:text-black border border-green-500 text-green-200 font-bold py-2.5 px-6 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.3)] disabled:opacity-50 text-xs md:text-sm tracking-wide cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin mr-1">⚙️</span>
                    <span>EXECUTANDO...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>EXECUTAR QUERY</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* CARD DE FEEDBACK */}
          {feedback && (
            <div
              className={`p-4 border rounded-xl flex items-start gap-3 transition-all duration-300 ${
                feedback.type === 'error'
                  ? 'bg-red-950/40 border-red-600 text-red-400 shadow-[0_0_20px_rgba(220,38,38,0.25)]'
                  : feedback.type === 'boss-victory'
                  ? 'bg-amber-950/60 border-amber-400 text-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.5)] animate-pulse'
                  : feedback.type === 'success'
                  ? 'bg-green-950/60 border-green-400 text-green-300 shadow-[0_0_25px_rgba(34,197,94,0.35)]'
                  : 'bg-blue-950/40 border-blue-500 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
              }`}
            >
              {feedback.type === 'error' && <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />}
              {feedback.type === 'success' && <CheckCircle className="w-6 h-6 text-green-400 shrink-0 mt-0.5" />}
              {feedback.type === 'boss-victory' && <Award className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />}
              {feedback.type === 'info' && <HelpCircle className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />}

              <div className="flex-1">
                <div className="font-bold text-xs md:text-sm tracking-wide">{feedback.message}</div>
                {feedback.details && <div className="text-xs opacity-90 mt-1 leading-relaxed">{feedback.details}</div>}
              </div>

              {feedback.type === 'success' && (
                <button
                  id="btn-proxima-fase"
                  onClick={handleNextStage}
                  className="px-4 py-2 bg-green-500 hover:bg-green-400 text-black font-extrabold text-xs rounded-lg transition shadow-[0_0_15px_rgba(74,222,128,0.5)] shrink-0 self-center flex items-center gap-1.5 cursor-pointer"
                >
                  <span>PRÓXIMA FASE</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {feedback.type === 'boss-victory' && (
                <button
                  id="btn-emitir-laudo"
                  onClick={() => setShowCertificate(true)}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-lg transition shadow-[0_0_20px_rgba(245,158,11,0.6)] shrink-0 self-center cursor-pointer"
                >
                  EMITIR LAUDO FINAL
                </button>
              )}
            </div>
          )}

          {/* TABELA DE RESULTADOS DO BANCO */}
          <div className="bg-black border border-green-800 rounded-xl overflow-hidden shadow-[0_0_25px_rgba(0,128,0,0.15)] flex flex-col flex-1">
            <div className="bg-green-950/80 px-4 py-2.5 border-b border-green-800 flex items-center justify-between">
              <div className="text-xs text-green-400 font-bold tracking-wider">
                REGISTROS RETORNADOS: <span className="text-white">logistica_db</span>
              </div>
              <span className="text-[11px] text-green-500 font-mono">
                {results.length} de {DATABASE.length} LINHAS
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap font-mono">
                <thead className="bg-green-950/40 text-green-500 border-b border-green-900/80 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3 font-semibold w-16">ID</th>
                    <th className="p-3 font-semibold">CLIENTE</th>
                    <th className="p-3 font-semibold">ESTADO</th>
                    <th className="p-3 font-semibold">CIDADE</th>
                    <th className="p-3 font-semibold">DATA</th>
                    <th className="p-3 font-semibold">VALOR (R$)</th>
                    <th className="p-3 font-semibold">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-green-900/40">
                  {results.map((row) => {
                    const isBossTarget = row.id === 101 && results.length === 1 && currentStage.id === 8;
                    return (
                      <tr
                        key={row.id}
                        className={`transition-colors ${
                          isBossTarget
                            ? 'bg-amber-950/40 text-amber-300 shadow-[inset_0_0_20px_rgba(245,158,11,0.3)] font-bold'
                            : 'hover:bg-green-950/30'
                        }`}
                      >
                        <td className="p-3 font-bold text-green-500 flex items-center gap-1.5">
                          {isBossTarget && <span className="text-amber-400 animate-bounce">⭐</span>}
                          #{row.id}
                        </td>
                        <td className="p-3 text-green-300">{row.cliente}</td>
                        <td className="p-3">
                          <span className="px-1.5 py-0.5 rounded bg-green-950 border border-green-800 text-green-400 text-[10px]">
                            {row.estado}
                          </span>
                        </td>
                        <td className="p-3 text-green-500">{row.cidade}</td>
                        <td className="p-3 text-green-400">{row.data}</td>
                        <td className="p-3 text-green-300 font-semibold">
                          R$ {row.valor.toLocaleString('pt-BR')}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                              row.status === 'Entregue'
                                ? 'bg-green-900/40 text-green-300 border-green-700'
                                : row.status === 'Cancelado'
                                ? 'bg-red-900/40 text-red-400 border-red-700'
                                : row.status === 'Devolvido'
                                ? 'bg-orange-900/40 text-orange-400 border-orange-700'
                                : 'bg-yellow-900/40 text-yellow-400 border-yellow-700'
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {results.length === 0 && (
                <div className="p-8 text-center text-green-700 space-y-2">
                  <div className="text-2xl">⚠️</div>
                  <div className="font-bold text-sm">NENHUM REGISTRO RETORNADO</div>
                  <div className="text-xs text-green-800">
                    Os filtros eliminaram todos os dados. Revise a cláusula WHERE.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* RODAPÉ DO JOGO */}
      <footer className="max-w-7xl mx-auto w-full text-center text-[11px] text-green-700 border-t border-green-900/60 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          BANCO DE DADOS 1 · <strong>AULA 12</strong> (SELECT, FROM, WHERE, AND, OR, NOT, LIKE, IN, BETWEEN)
        </div>
        <div className="text-green-800">Operação Forense Digital · Todos os direitos reservados</div>
      </footer>

      {/* MODAL DO LAUDO PERICIAL FINAL (CERTIFICADO DE VITÓRIA) */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-neutral-950 border-2 border-amber-400 rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-[0_0_60px_rgba(245,158,11,0.4)] relative">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 text-green-600 hover:text-green-300 transition text-xl"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center border-b-2 border-amber-500/80 pb-4 mb-6">
              <div className="inline-block p-3 bg-amber-950/80 border border-amber-400 rounded-xl text-3xl mb-2 shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                <Award className="w-8 h-8 text-amber-400" />
              </div>
              <h2 className="text-xl md:text-2xl font-black text-amber-300 tracking-widest">
                LAUDO DE HOMOLOGAÇÃO PERICIAL
              </h2>
              <p className="text-xs text-amber-500 font-mono mt-1">
                CERTIFICADO OFICIAL DE CONCLUSÃO · OPERAÇÃO AULA 12
              </p>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="bg-black/90 p-4 rounded-xl border border-amber-900/60 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="text-[10px] text-amber-600 uppercase font-bold">PERITO HOMOLOGADO</div>
                  <div className="text-base font-extrabold text-amber-300">{agentName}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-amber-600 uppercase font-bold">PATENTE FINAL</div>
                  <div className="text-sm font-bold text-green-400">{rankInfo.title}</div>
                </div>
              </div>

              <div className="bg-black/80 p-4 rounded-xl border border-green-900 space-y-2">
                <div className="text-[10px] text-green-500 uppercase font-bold">
                  RESUMO DA OPERAÇÃO PERICIAL
                </div>
                <p className="text-green-300 leading-relaxed text-[11px]">
                  Certifico que o perito concluiu com aproveitamento máximo todos os 8 estágios da investigação,
                  aplicando os operadores <strong>SELECT</strong>, <strong>FROM</strong>, <strong>WHERE</strong>,{' '}
                  <strong>AND</strong>, <strong>OR</strong>, <strong>NOT</strong>, <strong>LIKE</strong>,{' '}
                  <strong>IN</strong> e <strong>BETWEEN</strong>.
                </p>
                <div className="p-2.5 bg-neutral-950 rounded border border-green-800 text-[11px] text-green-400">
                  <strong>LOTE FRAUDULENTO ISOLADO:</strong> ID #101 · Alberto Silva · SP (São Paulo) · 2026-02-15 · R$
                  14.200 (Entregue).
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2.5 bg-neutral-950 border border-green-900 rounded-lg">
                  <div className="text-[10px] text-green-600 font-bold">ESTRELAS</div>
                  <div className="text-sm font-extrabold text-amber-400">{totalStars} / 24 ⭐</div>
                </div>
                <div className="p-2.5 bg-neutral-950 border border-green-900 rounded-lg">
                  <div className="text-[10px] text-green-600 font-bold">XP ACUMULADO</div>
                  <div className="text-sm font-extrabold text-green-300">{xp} XP</div>
                </div>
                <div className="p-2.5 bg-neutral-950 border border-green-900 rounded-lg">
                  <div className="text-[10px] text-green-600 font-bold">STATUS</div>
                  <div className="text-sm font-extrabold text-green-400">100% FECHADO</div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') window.print();
                  }}
                  className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-green-300 border border-green-700 font-bold rounded-lg text-xs transition flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>IMPRIMIR LAUDO</span>
                </button>
                <button
                  onClick={() => setShowCertificate(false)}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-extrabold rounded-lg text-xs transition shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                >
                  CONCLUIR INVESTIGAÇÃO
                </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* OVERLAY VISUAL DE SCANLINES CRT (ISOLADO E SEM INTERFERIR NOS CLIQUES) */}
        {scanlines && (
          <div
            className="fixed inset-0 pointer-events-none z-40 opacity-25"
            style={{
              background:
                'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.35) 50%), linear-gradient(90deg, rgba(0, 255, 0, 0.03), rgba(0, 0, 0, 0.01), rgba(0, 255, 0, 0.03))',
              backgroundSize: '100% 4px, 3px 100%'
            }}
          />
        )}
      </div>
    );
  }