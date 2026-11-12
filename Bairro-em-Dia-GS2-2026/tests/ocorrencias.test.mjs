import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CATEGORIAS, STATUS, validarOcorrencia, proximoProtocolo,
  criarOcorrencia, avancarStatus, calcularIndicadores, dadosDemonstrativos,
} from '../src/domain/ocorrencias.mjs';

const momento = new Date('2026-11-05T13:00:00.000Z');
const valido = {
  categoriaId: 1, endereco: 'Rua do Sol, 50', bairro: 'Centro',
  descricao: 'Poste sem iluminação há vários dias',
};

test('catálogo contém cinco categorias e quatro status', () => {
  assert.equal(CATEGORIAS.length, 5);
  assert.equal(STATUS.length, 4);
});

test('validação rejeita categoria e campos obrigatórios em branco', () => {
  const erros = validarOcorrencia({ categoriaId: 99, endereco: ' ', bairro: '', descricao: 'curto' });
  assert.deepEqual(Object.keys(erros).sort(), ['bairro', 'categoriaId', 'descricao', 'endereco']);
});

test('validação aceita entrada válida', () => {
  assert.deepEqual(validarOcorrencia(valido), {});
});

test('registro fornece protocolo, status e evento inicial', () => {
  const item = criarOcorrencia(valido, [], momento);
  assert.equal(item.protocolo, 'BED-2026-000001');
  assert.equal(item.status, 'Aberta');
  assert.equal(item.historico.length, 1);
  assert.equal(item.endereco, 'Rua do Sol, 50');
});

test('protocolo avança sem duplicação dentro do mesmo ano', () => {
  const primeiro = criarOcorrencia(valido, [], momento);
  const segundo = criarOcorrencia(valido, [primeiro], momento);
  assert.equal(segundo.protocolo, 'BED-2026-000002');
  assert.equal(proximoProtocolo([primeiro, segundo], new Date('2027-01-01T12:00:00Z')), 'BED-2027-000001');
});

test('fluxo completo respeita sequenciamento e registra histórico', () => {
  let atual = criarOcorrencia(valido, [], momento);
  for (const esperado of ['Em análise', 'Em andamento', 'Resolvida']) {
    atual = avancarStatus(atual, momento);
    assert.equal(atual.status, esperado);
  }
  assert.equal(atual.historico.length, 4);
  assert.equal(avancarStatus(atual), atual);
});

test('indicadores agrupam registros e resoluções', () => {
  const a = criarOcorrencia(valido, [], momento);
  const b = avancarStatus(avancarStatus(avancarStatus(criarOcorrencia({ ...valido, categoriaId: 2 }, [a], momento), momento), momento), momento);
  const resumo = calcularIndicadores([a, b]);
  assert.deepEqual([resumo.total, resumo.abertos, resumo.resolvidos], [2, 1, 1]);
  assert.equal(resumo.porCategoria['Buracos e vias'], 1);
  assert.equal(resumo.porStatus['Resolvida'], 1);
});

test('dados demonstrativos são reproduzíveis e consistentes', () => {
  const dados = dadosDemonstrativos(momento);
  assert.equal(dados.length, 3);
  assert.equal(new Set(dados.map(x => x.protocolo)).size, 3);
  assert.equal(calcularIndicadores(dados).total, 3);
});
