/** Regras puras de negócio — nenhuma dependência de UI ou banco. */

export const CATEGORIAS = Object.freeze([
  { id: 1, nome: 'Iluminação pública', icone: '☀' },
  { id: 2, nome: 'Buracos e vias', icone: '▱' },
  { id: 3, nome: 'Lixo e limpeza', icone: '♻' },
  { id: 4, nome: 'Calçadas e acessibilidade', icone: '♿' },
  { id: 5, nome: 'Água e vazamentos', icone: '◉' },
]);

export const STATUS = Object.freeze(['Aberta', 'Em análise', 'Em andamento', 'Resolvida']);

export const statusColors = Object.freeze({
  'Aberta': '#B65D13',
  'Em análise': '#7452B6',
  'Em andamento': '#1369AF',
  'Resolvida': '#087B5B',
});

/** Valida campos obrigatórios e retorna mensagens de erro amigáveis. */
export function validarOcorrencia(formulario) {
  const erros = {};
  if (!CATEGORIAS.some(c => c.id === Number(formulario.categoriaId))) {
    erros.categoriaId = 'Selecione uma categoria.';
  }
  if (!String(formulario.endereco ?? '').trim()) {
    erros.endereco = 'Informe o endereço ou um ponto de referência.';
  }
  if (!String(formulario.bairro ?? '').trim()) {
    erros.bairro = 'Informe o bairro.';
  }
  if (String(formulario.descricao ?? '').trim().length < 10) {
    erros.descricao = 'Descreva o problema com ao menos 10 caracteres.';
  }
  return erros;
}

/** Protocolo monotônico dentro do ano, calculado pela lista armazenada. */
export function proximoProtocolo(ocorrencias, agora = new Date()) {
  const ano = agora.getFullYear();
  const prefixo = `BED-${ano}-`;
  const maior = ocorrencias.reduce((acc, o) => {
    const protocolo = String(o.protocolo ?? '');
    if (!protocolo.startsWith(prefixo)) return acc;
    const numero = Number(protocolo.slice(prefixo.length));
    return Number.isInteger(numero) ? Math.max(acc, numero) : acc;
  }, 0);
  return `${prefixo}${String(maior + 1).padStart(6, '0')}`;
}

/** Cria uma ocorrência consistente e seu primeiro evento de histórico. */
export function criarOcorrencia(formulario, ocorrencias, agora = new Date()) {
  const erros = validarOcorrencia(formulario);
  if (Object.keys(erros).length) throw new Error(Object.values(erros).join(' '));
  const data = agora.toISOString();
  const protocolo = proximoProtocolo(ocorrencias, agora);
  return {
    id: protocolo,
    protocolo,
    categoriaId: Number(formulario.categoriaId),
    endereco: String(formulario.endereco).trim().slice(0, 200),
    bairro: String(formulario.bairro).trim().slice(0, 100),
    descricao: String(formulario.descricao).trim().slice(0, 1000),
    status: STATUS[0],
    criadoEm: data,
    atualizadoEm: data,
    historico: [{ status: STATUS[0], data, observacao: 'Ocorrência registrada.' }],
  };
}

/** Avança uma etapa do fluxo; impede alteração de registros já resolvidos. */
export function avancarStatus(ocorrencia, agora = new Date()) {
  const posicao = STATUS.indexOf(ocorrencia.status);
  if (posicao === -1) throw new Error('Situação de ocorrência desconhecida.');
  if (posicao === STATUS.length - 1) return ocorrencia;
  const proximo = STATUS[posicao + 1];
  const data = agora.toISOString();
  return {
    ...ocorrencia,
    status: proximo,
    atualizadoEm: data,
    historico: [
      ...(Array.isArray(ocorrencia.historico) ? ocorrencia.historico : []),
      { status: proximo, data, observacao: 'Avanço de situação em ambiente demonstrativo.' },
    ],
  };
}

/** Contadores e agrupamentos utilizados pelo dashboard e pelos gráficos. */
export function calcularIndicadores(ocorrencias) {
  const porStatus = Object.fromEntries(STATUS.map(s => [s, 0]));
  const porCategoria = Object.fromEntries(CATEGORIAS.map(c => [c.nome, 0]));
  for (const item of ocorrencias) {
    if (item.status in porStatus) porStatus[item.status] += 1;
    const categoria = CATEGORIAS.find(c => c.id === Number(item.categoriaId));
    if (categoria) porCategoria[categoria.nome] += 1;
  }
  return {
    total: ocorrencias.length,
    abertos: porStatus['Aberta'] + porStatus['Em análise'] + porStatus['Em andamento'],
    resolvidos: porStatus['Resolvida'],
    porStatus,
    porCategoria,
  };
}

/** Casos FICTÍCIOS e identificados como demonstração para avaliar a interface. */
export function dadosDemonstrativos(agora = new Date()) {
  const exemplos = [
    { categoriaId: 1, endereco: 'Praça das Flores, 120', bairro: 'Centro', descricao: 'Poste sem iluminação próximo à faixa de pedestres.' },
    { categoriaId: 2, endereco: 'Rua Horizonte, 38', bairro: 'Santa Clara', descricao: 'Buraco grande no asfalto atrapalha a passagem de veículos.' },
    { categoriaId: 3, endereco: 'Avenida do Parque, 500', bairro: 'Jardim Novo', descricao: 'Acúmulo de lixo na calçada em frente à praça.' },
  ];
  const base = new Date(agora);
  base.setDate(base.getDate() - 3);
  const primeiro = criarOcorrencia(exemplos[0], [], base);
  base.setDate(base.getDate() + 1);
  const segundo = criarOcorrencia(exemplos[1], [primeiro], base);
  base.setDate(base.getDate() + 1);
  const terceiro = criarOcorrencia(exemplos[2], [primeiro, segundo], base);
  const avancado = avancarStatus(segundo, agora);
  return [primeiro, avancado, terceiro];
}
