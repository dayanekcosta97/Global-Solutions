import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator, FlatList, KeyboardAvoidingView, Modal, Platform,
  Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View,
} from 'react-native';
import {
  CATEGORIAS, STATUS, statusColors, validarOcorrencia,
  criarOcorrencia, avancarStatus, calcularIndicadores,
} from './src/domain/ocorrencias.mjs';
import { carregarOcorrencias, salvarOcorrencias } from './src/data/armazenamento';
import { cores as C } from './src/styles/tema';

const ABAS = [
  { id: 'inicio', icone: '⌂', nome: 'Início' },
  { id: 'registrar', icone: '+', nome: 'Registrar' },
  { id: 'acompanhar', icone: '≡', nome: 'Acompanhar' },
  { id: 'indicadores', icone: '▥', nome: 'Indicadores' },
];
const FORM_INICIAL = { categoriaId: null, endereco: '', bairro: '', descricao: '' };
const dataBR = value => {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString('pt-BR');
};
const nomeCategoria = id => CATEGORIAS.find(c => c.id === Number(id))?.nome || 'Outra';

function Botao({ texto, onPress, secundario = false, desabilitado = false, compact = false }) {
  return (
    <Pressable
      accessibilityRole="button" accessibilityLabel={texto}
      onPress={onPress} disabled={desabilitado}
      style={({ pressed }) => [s.botao, secundario && s.botaoSecundario,
        compact && s.botaoCompacto, (desabilitado || pressed) && { opacity: 0.68 }]}
    >
      <Text style={[s.botaoTexto, secundario && s.botaoSecundarioTexto]}>{texto}</Text>
    </Pressable>
  );
}

function Etiqueta({ status }) {
  const cor = statusColors[status] || C.textoSecundario;
  return (
    <View style={[s.etiqueta, { backgroundColor: `${cor}16` }]}>
      <View style={[s.etiquetaBolinha, { backgroundColor: cor }]} />
      <Text style={[s.etiquetaTexto, { color: cor }]}>{status}</Text>
    </View>
  );
}

const CartaoOcorrencia = memo(function CartaoOcorrencia({ item, onPress }) {
  return (
    <Pressable
      onPress={() => onPress(item.id)} accessibilityRole="button"
      accessibilityLabel={`Ver detalhes do protocolo ${item.protocolo}`}
      style={({ pressed }) => [s.cartaoOcorrencia, pressed && { opacity: 0.8 }]}
    >
      <View style={s.linhaEntre}>
        <Text style={s.protocolo}>{item.protocolo}</Text>
        <Etiqueta status={item.status} />
      </View>
      <Text style={s.cartaoTitulo}>{nomeCategoria(item.categoriaId)}</Text>
      <Text numberOfLines={2} style={s.cartaoDescricao}>{item.descricao}</Text>
      <View style={s.linhaEntre}>
        <Text style={s.microTexto}>{item.bairro} · {dataBR(item.criadoEm)}</Text>
        <Text style={s.linkTexto}>Ver detalhes ›</Text>
      </View>
    </Pressable>
  );
});

function BlocoNumero({ rotulo, valor, cor = C.primario }) {
  return (
    <View style={s.blocoNumero}>
      <Text style={[s.numeroGrande, { color: cor }]}>{valor}</Text>
      <Text style={s.microTexto}>{rotulo}</Text>
    </View>
  );
}

function Campo({ rotulo, erro, value, onChangeText, placeholder, multiline = false }) {
  return (
    <View style={s.grupoCampo}>
      <Text style={s.rotulo}>{rotulo}</Text>
      <TextInput
        accessibilityLabel={rotulo} value={value} onChangeText={onChangeText}
        placeholder={placeholder} placeholderTextColor="#9AA8B8"
        multiline={multiline} numberOfLines={multiline ? 4 : 1}
        maxLength={multiline ? 1000 : 200}
        style={[s.campo, multiline && s.campoMultiline, erro && s.campoErro]}
      />
      {erro ? <Text style={s.erroTexto}>{erro}</Text> : null}
    </View>
  );
}

function Barra({ titulo, valor, total, cor = C.primario }) {
  const percentual = total ? (valor / total) * 100 : 0;
  return (
    <View style={{ gap: 7, marginBottom: 17 }}>
      <View style={s.linhaEntre}>
        <Text style={s.barraTitulo}>{titulo}</Text>
        <Text style={s.barraNumero}>{valor}</Text>
      </View>
      <View style={s.trilhaBarra}>
        <View style={[s.valorBarra, { width: `${percentual}%`, backgroundColor: cor }]} />
      </View>
    </View>
  );
}

function Detalhes({ item, visivel, onClose, onAdvance, ocupado }) {
  if (!item) return null;
  const resolvido = item.status === STATUS[STATUS.length - 1];
  return (
    <Modal transparent visible={visivel} onRequestClose={onClose} animationType="fade">
      <View style={s.modalFundo}>
        <View style={s.modalConteudo}>
          <ScrollView contentContainerStyle={{ padding: 24, gap: 15 }}>
            <View style={s.linhaEntre}>
              <Text style={s.modalTitulo}>Detalhes da ocorrência</Text>
              <Pressable onPress={onClose} accessibilityLabel="Fechar detalhes" accessibilityRole="button">
                <Text style={s.fechar}>✕</Text>
              </Pressable>
            </View>
            <Text style={s.protocolo}>{item.protocolo}</Text>
            <Etiqueta status={item.status} />
            <Text style={s.cartaoTitulo}>{nomeCategoria(item.categoriaId)}</Text>
            <Text style={s.infoLinha}>Endereço: {item.endereco}</Text>
            <Text style={s.infoLinha}>Bairro: {item.bairro}</Text>
            <Text style={s.infoLinha}>Registrada em: {dataBR(item.criadoEm)}</Text>
            <Text style={s.secaoTitulo}>Descrição</Text>
            <Text style={s.cartaoDescricao}>{item.descricao}</Text>
            <Text style={s.secaoTitulo}>Linha do tempo</Text>
            {(item.historico || []).map((evento, index) => (
              <View key={`${index}-${evento.data}`} style={s.timelineEvento}>
                <View style={s.timelineDot} />
                <View style={{ flex: 1 }}>
                  <Text style={s.timelineTitulo}>{evento.status}</Text>
                  <Text style={s.microTexto}>{dataBR(evento.data)} · {evento.observacao}</Text>
                </View>
              </View>
            ))}
            <View style={s.avisoDestaque}>
              <Text style={s.avisoTexto}>Ambiente de demonstração: a mudança de status abaixo simula o atendimento. Nenhum órgão público recebe esta ocorrência.</Text>
            </View>
            {resolvido
              ? <Text style={[s.rotulo, { color: C.verde }]}>Ocorrência concluída na simulação.</Text>
              : <Botao desabilitado={ocupado} texto={ocupado ? 'Atualizando...' : 'Simular próxima etapa'} onPress={() => onAdvance(item.id)} />}
            <Botao texto="Voltar" secundario onPress={onClose} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

export default function App() {
  const { width } = useWindowDimensions();
  const desktop = width >= 820;
  const [aba, setAba] = useState('inicio');
  const [ocorrencias, setOcorrencias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [ocupado, setOcupado] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erroGlobal, setErroGlobal] = useState('');
  const [form, setForm] = useState(FORM_INICIAL);
  const [erros, setErros] = useState({});
  const [filtro, setFiltro] = useState('Todas');
  const [selecionada, setSelecionada] = useState(null);

  useEffect(() => {
    let ativo = true;
    carregarOcorrencias()
      .then(dados => { if (ativo) setOcorrencias(dados); })
      .catch(() => { if (ativo) setErroGlobal('Não foi possível carregar os dados locais. Verifique o armazenamento do navegador.'); })
      .finally(() => { if (ativo) setCarregando(false); });
    return () => { ativo = false; };
  }, []);

  const indicadores = useMemo(() => calcularIndicadores(ocorrencias), [ocorrencias]);
  const ordenadas = useMemo(
    () => [...ocorrencias].sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm)),
    [ocorrencias]
  );
  const filtradas = useMemo(
    () => filtro === 'Todas' ? ordenadas : ordenadas.filter(o => o.status === filtro),
    [ordenadas, filtro]
  );
  const detalheAtual = useMemo(
    () => ocorrencias.find(o => o.id === selecionada), [ocorrencias, selecionada]
  );
  const abrirDetalhe = useCallback(id => setSelecionada(id), []);
  const navegar = useCallback(nova => { setAba(nova); setMensagem(''); setErroGlobal(''); }, []);

  async function registrar() {
    const encontrados = validarOcorrencia(form);
    setErros(encontrados);
    if (Object.keys(encontrados).length) return;
    setOcupado(true);
    setErroGlobal('');
    try {
      const nova = criarOcorrencia(form, ocorrencias);
      const atualizadas = [nova, ...ocorrencias];
      await salvarOcorrencias(atualizadas);
      setOcorrencias(atualizadas);
      setForm(FORM_INICIAL);
      setErros({});
      setMensagem(`Ocorrência ${nova.protocolo} registrada com sucesso!`);
      setFiltro('Todas');
      setAba('acompanhar');
    } catch (erro) {
      setErroGlobal(`Falha ao salvar: ${erro.message}`);
    } finally {
      setOcupado(false);
    }
  }

  async function atualizarSituacao(id) {
    setOcupado(true);
    setErroGlobal('');
    try {
      const atualizadas = ocorrencias.map(o => o.id === id ? avancarStatus(o) : o);
      await salvarOcorrencias(atualizadas);
      setOcorrencias(atualizadas);
    } catch (erro) {
      setErroGlobal(`Não foi possível atualizar a ocorrência: ${erro.message}`);
    } finally {
      setOcupado(false);
    }
  }

  function Inicio() {
    return (
      <View style={s.conteudo}>
        <View style={s.hero}>
          <Text style={s.heroEtiqueta}>CIDADANIA DIGITAL · ODS 11</Text>
          <Text style={s.heroTitulo}>Uma cidade melhor começa pela sua voz.</Text>
          <Text style={s.heroDescricao}>Registre problemas da sua região, acompanhe protocolos e visualize indicadores da comunidade.</Text>
          <View style={{ alignSelf: 'flex-start', marginTop: 14 }}>
            <Botao texto="+ Registrar ocorrência" onPress={() => navegar('registrar')} />
          </View>
        </View>
        <View style={s.painel}>
          <Text style={s.secaoTitulo}>Visão geral</Text>
          <View style={s.numerosGrid}>
            <BlocoNumero rotulo="Total de registros" valor={indicadores.total} />
            <BlocoNumero rotulo="Em acompanhamento" valor={indicadores.abertos} cor="#B65D13" />
            <BlocoNumero rotulo="Resolvidas" valor={indicadores.resolvidos} cor={C.verde} />
          </View>
        </View>
        <View style={s.linhaEntre}>
          <Text style={s.secaoTitulo}>Registros recentes</Text>
          <Pressable accessibilityRole="button" onPress={() => navegar('acompanhar')}>
            <Text style={s.linkTexto}>Ver todas ›</Text>
          </Pressable>
        </View>
        {ordenadas.length
          ? ordenadas.slice(0, 3).map(item => <CartaoOcorrencia key={item.id} item={item} onPress={abrirDetalhe} />)
          : <Text style={s.vazio}>Nenhuma ocorrência cadastrada.</Text>}
      </View>
    );
  }

  function Registrar() {
    return (
      <View style={s.conteudo}>
        <Text style={s.tituloPagina}>Nova ocorrência</Text>
        <Text style={s.subtitulo}>Conte o que precisa de atenção no seu bairro.</Text>
        <View style={s.painel}>
          <Text style={s.secaoTitulo}>1. Escolha uma categoria *</Text>
          <View style={s.categoriasGrid}>
            {CATEGORIAS.map(c => (
              <Pressable
                key={c.id} accessibilityRole="button"
                accessibilityState={{ selected: form.categoriaId === c.id }}
                onPress={() => { setForm(p => ({ ...p, categoriaId: c.id })); setErros(e => ({ ...e, categoriaId: '' })); }}
                style={[s.categoriaBotao, form.categoriaId === c.id && s.categoriaSelecionada]}
              >
                <Text style={[s.categoriaTexto, form.categoriaId === c.id && { color: C.primario }]}>{c.icone}  {c.nome}</Text>
              </Pressable>
            ))}
          </View>
          {erros.categoriaId ? <Text style={s.erroTexto}>{erros.categoriaId}</Text> : null}
          <View style={{ height: 10 }} />
          <Text style={s.secaoTitulo}>2. Onde está o problema?</Text>
          <Campo rotulo="Endereço ou referência *" value={form.endereco}
            onChangeText={endereco => setForm(p => ({ ...p, endereco }))}
            erro={erros.endereco} placeholder="Ex.: Rua das Acácias, 120" />
          <Campo rotulo="Bairro *" value={form.bairro}
            onChangeText={bairro => setForm(p => ({ ...p, bairro }))}
            erro={erros.bairro} placeholder="Ex.: Centro" />
          <Text style={s.secaoTitulo}>3. Descreva o problema</Text>
          <Campo rotulo="Descrição *" value={form.descricao} multiline
            onChangeText={descricao => setForm(p => ({ ...p, descricao }))}
            erro={erros.descricao} placeholder="Descreva o ocorrido com o máximo de clareza..." />
          <Text style={s.microTexto}>* Campos obrigatórios. Não inclua dados pessoais sensíveis.</Text>
          <Botao texto={ocupado ? 'Salvando...' : 'Registrar ocorrência'} onPress={registrar} desabilitado={ocupado} />
        </View>
      </View>
    );
  }

  function Acompanhar() {
    return (
      <View style={[s.conteudo, { flex: 1 }] }>
        <View style={s.linhaEntre}>
          <View style={{ flex: 1 }}>
            <Text style={s.tituloPagina}>Acompanhamento</Text>
            <Text style={s.subtitulo}>Consulte protocolos e simule a evolução dos atendimentos.</Text>
          </View>
          {desktop ? <Botao compact texto="+ Nova" onPress={() => navegar('registrar')} /> : null}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingVertical: 10 }} style={{ flexGrow: 0 }}>
          {['Todas', ...STATUS].map(st => (
            <Pressable key={st} accessibilityRole="button" accessibilityState={{ selected: filtro === st }}
              onPress={() => setFiltro(st)}
              style={[s.filtroBotao, filtro === st && s.filtroAtivo]}>
              <Text style={[s.filtroTexto, filtro === st && { color: C.branco }]}>{st}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <FlatList data={filtradas} keyExtractor={item => item.id}
          renderItem={({ item }) => <CartaoOcorrencia item={item} onPress={abrirDetalhe} />}
          contentContainerStyle={{ gap: 11, paddingBottom: 25, flexGrow: 1 }}
          ListEmptyComponent={<Text style={s.vazio}>Nenhuma ocorrência encontrada neste filtro.</Text>}
          initialNumToRender={8} maxToRenderPerBatch={8} windowSize={5}
        />
      </View>
    );
  }

  function Indicadores() {
    return (
      <View style={s.conteudo}>
        <Text style={s.tituloPagina}>Indicadores da comunidade</Text>
        <Text style={s.subtitulo}>Visão consolidada dos registros demonstrativos e cadastrados.</Text>
        <View style={s.painel}>
          <Text style={s.secaoTitulo}>Números gerais</Text>
          <View style={s.numerosGrid}>
            <BlocoNumero rotulo="Total" valor={indicadores.total} />
            <BlocoNumero rotulo="Em acompanhamento" valor={indicadores.abertos} cor="#B65D13" />
            <BlocoNumero rotulo="Resolvidas" valor={indicadores.resolvidos} cor={C.verde} />
          </View>
        </View>
        <View style={s.painel}>
          <Text style={s.secaoTitulo}>Por situação</Text>
          {STATUS.map(st => <Barra key={st} titulo={st}
            valor={indicadores.porStatus[st]} total={indicadores.total} cor={statusColors[st]} />)}
        </View>
        <View style={s.painel}>
          <Text style={s.secaoTitulo}>Por categoria</Text>
          {CATEGORIAS.map(c => <Barra key={c.id} titulo={c.nome}
            valor={indicadores.porCategoria[c.nome]} total={indicadores.total} />)}
        </View>
      </View>
    );
  }

  if (carregando) {
    return <View style={s.telaCarregando}><ActivityIndicator size="large" color={C.primario} /><Text style={s.subtitulo}>Carregando Bairro em Dia...</Text></View>;
  }

  return (
    <View style={s.container}>
      {desktop && (
        <View style={s.sidebar}>
          <View style={s.marca}>
            <View style={s.logo}><Text style={s.logoTexto}>B</Text></View>
            <View><Text style={s.nomeMarca}>Bairro em Dia</Text><Text style={s.marcaTag}>Cidadania conectada</Text></View>
          </View>
          <View style={{ gap: 8, marginTop: 35 }}>
            {ABAS.map(item => (
              <Pressable key={item.id} accessibilityRole="tab" accessibilityState={{ selected: aba === item.id }}
                onPress={() => navegar(item.id)}
                style={[s.navItem, aba === item.id && s.navAtivo]}>
                <Text style={[s.navIcon, aba === item.id && { color: C.primario }]}>{item.icone}</Text>
                <Text style={[s.navTexto, aba === item.id && { color: C.primario, fontWeight: '700' }]}>{item.nome}</Text>
              </Pressable>
            ))}
          </View>
          <View style={s.sidebarRodape}><Text style={s.microTexto}>Projeto acadêmico · FIAP GS2 2026</Text><Text style={s.microTexto}>Sem vínculo com prefeituras.</Text></View>
        </View>
      )}
      <View style={{ flex: 1, minWidth: 0 }}>
        <View style={s.cabecalho}>
          {!desktop && (
            <View style={s.marca}>
              <View style={[s.logo, { width: 34, height: 34 }]}><Text style={s.logoTexto}>B</Text></View>
              <Text style={s.nomeMarca}>Bairro em Dia</Text>
            </View>
          )}
          {desktop && <Text style={s.cabecalhoTexto}>Plataforma comunitária · Ambiente demonstrativo</Text>}
          <Text style={s.cabecalhoSelo}>MVP FIAP</Text>
        </View>
        {erroGlobal ? <View style={s.bannerErro}><Text style={s.erroTexto}>{erroGlobal}</Text></View> : null}
        {mensagem ? <View style={s.bannerSucesso}><Text style={{ color: C.verde, fontWeight: '700' }}>{mensagem}</Text></View> : null}
        {aba === 'acompanhar' ? Acompanhar() : (
          <ScrollView contentContainerStyle={s.scrollConteudo} keyboardShouldPersistTaps="handled">
            {aba === 'inicio' ? Inicio() : aba === 'registrar' ? Registrar() : Indicadores()}
          </ScrollView>
        )}
        {!desktop && (
          <View style={s.navInferior}>
            {ABAS.map(item => (
              <Pressable key={item.id} onPress={() => navegar(item.id)}
                accessibilityRole="tab" accessibilityState={{ selected: aba === item.id }}
                style={s.navInferiorBotao}>
                <Text style={[s.navInferiorIcone, aba === item.id && { color: C.primario }]}>{item.icone}</Text>
                <Text style={[s.navInferiorTexto, aba === item.id && { color: C.primario, fontWeight: '700' }]}>{item.nome}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
      <Detalhes item={detalheAtual} visivel={!!selecionada} onClose={() => setSelecionada(null)}
        onAdvance={atualizarSituacao} ocupado={ocupado} />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.fundo, flexDirection: 'row', minHeight: Platform.OS === 'web' ? '100vh' : undefined },
  sidebar: { width: 250, backgroundColor: C.branco, borderRightWidth: 1, borderRightColor: C.borda, paddingHorizontal: 17, paddingTop: 30 },
  marca: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { width: 42, height: 42, backgroundColor: C.primario, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  logoTexto: { color: C.branco, fontSize: 22, fontWeight: '900' },
  nomeMarca: { fontSize: 16, fontWeight: '800', color: C.texto },
  marcaTag: { fontSize: 11, color: C.textoSecundario, marginTop: 3 },
  navItem: { padding: 13, flexDirection: 'row', alignItems: 'center', borderRadius: 12, gap: 14 },
  navAtivo: { backgroundColor: C.azulClaro },
  navIcon: { fontSize: 23, width: 22, color: C.textoSecundario, textAlign: 'center' },
  navTexto: { fontSize: 14, color: C.textoSecundario },
  sidebarRodape: { marginTop: 'auto', paddingBottom: 25, gap: 4 },
  cabecalho: { height: 66, backgroundColor: C.branco, borderBottomColor: C.borda, borderBottomWidth: 1,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25 },
  cabecalhoTexto: { color: C.textoSecundario, fontSize: 13 },
  cabecalhoSelo: { color: C.primario, backgroundColor: C.azulClaro, fontSize: 11, fontWeight: '800', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, overflow: 'hidden' },
  scrollConteudo: { flexGrow: 1, padding: 20, alignItems: 'center' },
  conteudo: { width: '100%', maxWidth: 920, alignSelf: 'center', padding: 1, gap: 15 },
  hero: { backgroundColor: C.primarioEscuro, borderRadius: 22, padding: 26, marginBottom: 7 },
  heroEtiqueta: { color: '#AFC8FF', fontSize: 11, fontWeight: '800', letterSpacing: 1.1, marginBottom: 13 },
  heroTitulo: { color: C.branco, fontSize: 27, lineHeight: 34, fontWeight: '800', maxWidth: 580 },
  heroDescricao: { color: '#DAE6FF', fontSize: 14, lineHeight: 22, marginTop: 10, maxWidth: 570 },
  painel: { backgroundColor: C.branco, borderRadius: 17, borderWidth: 1, borderColor: C.borda, padding: 20, gap: 13 },
  numerosGrid: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  blocoNumero: { flexGrow: 1, flexBasis: 130, padding: 14, borderRadius: 12, backgroundColor: C.painel, gap: 4 },
  numeroGrande: { fontSize: 30, fontWeight: '800' },
  microTexto: { fontSize: 12, color: C.textoSecundario, lineHeight: 18 },
  secaoTitulo: { color: C.texto, fontSize: 17, fontWeight: '800' },
  tituloPagina: { color: C.texto, fontSize: 25, lineHeight: 32, fontWeight: '800' },
  subtitulo: { color: C.textoSecundario, fontSize: 14, lineHeight: 21 },
  linhaEntre: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  cartaoOcorrencia: { backgroundColor: C.branco, borderRadius: 15, padding: 17,
    borderWidth: 1, borderColor: C.borda, gap: 10 },
  protocolo: { color: C.primario, fontSize: 12, fontWeight: '800', letterSpacing: 0.3 },
  cartaoTitulo: { color: C.texto, fontSize: 17, fontWeight: '700' },
  cartaoDescricao: { color: C.textoSecundario, fontSize: 14, lineHeight: 21 },
  etiqueta: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', borderRadius: 20, paddingHorizontal: 9, paddingVertical: 6 },
  etiquetaBolinha: { width: 7, height: 7, borderRadius: 5 },
  etiquetaTexto: { fontSize: 11, fontWeight: '700' },
  linkTexto: { fontSize: 12, color: C.primario, fontWeight: '700' },
  categoriasGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
  categoriaBotao: { paddingHorizontal: 13, paddingVertical: 12, backgroundColor: C.painel, borderWidth: 1, borderColor: C.borda, borderRadius: 10 },
  categoriaSelecionada: { backgroundColor: C.azulClaro, borderColor: C.primario },
  categoriaTexto: { color: C.texto, fontSize: 13, fontWeight: '600' },
  grupoCampo: { gap: 7 },
  rotulo: { color: C.texto, fontSize: 13, fontWeight: '700' },
  campo: { borderColor: C.borda, borderWidth: 1, backgroundColor: C.branco, paddingHorizontal: 14,
    paddingVertical: 12, borderRadius: 10, color: C.texto, fontSize: 14, minHeight: 46 },
  campoMultiline: { height: 110, textAlignVertical: 'top' },
  campoErro: { borderColor: C.erro },
  erroTexto: { fontSize: 12, color: C.erro, lineHeight: 18 },
  botao: { backgroundColor: C.primario, borderRadius: 11, alignItems: 'center', justifyContent: 'center', paddingVertical: 14, paddingHorizontal: 18, minHeight: 44 },
  botaoTexto: { color: C.branco, fontSize: 14, fontWeight: '800' },
  botaoSecundario: { backgroundColor: C.branco, borderWidth: 1, borderColor: C.borda },
  botaoSecundarioTexto: { color: C.texto },
  botaoCompacto: { paddingHorizontal: 18, paddingVertical: 10 },
  filtroBotao: { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10, backgroundColor: C.branco, borderWidth: 1, borderColor: C.borda },
  filtroAtivo: { backgroundColor: C.primario, borderColor: C.primario },
  filtroTexto: { color: C.textoSecundario, fontWeight: '700', fontSize: 12 },
  vazio: { textAlign: 'center', color: C.textoSecundario, padding: 30, fontSize: 14 },
  trilhaBarra: { width: '100%', height: 11, backgroundColor: C.fundo, borderRadius: 6, overflow: 'hidden' },
  valorBarra: { height: '100%', borderRadius: 6 },
  barraTitulo: { fontSize: 13, color: C.texto },
  barraNumero: { fontSize: 13, color: C.texto, fontWeight: '700' },
  navInferior: { flexDirection: 'row', backgroundColor: C.branco, borderTopWidth: 1, borderColor: C.borda, paddingBottom: Platform.OS === 'ios' ? 18 : 8, paddingTop: 9 },
  navInferiorBotao: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3, padding: 5 },
  navInferiorIcone: { fontSize: 23, color: C.textoSecundario },
  navInferiorTexto: { fontSize: 10, color: C.textoSecundario },
  telaCarregando: { flex: 1, backgroundColor: C.fundo, alignItems: 'center', justifyContent: 'center', gap: 15 },
  modalFundo: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(13,28,55,0.63)', padding: 16 },
  modalConteudo: { maxWidth: 610, width: '100%', maxHeight: '92%', backgroundColor: C.branco, borderRadius: 17, overflow: 'hidden' },
  modalTitulo: { fontSize: 20, color: C.texto, fontWeight: '800', flex: 1 },
  fechar: { fontSize: 23, color: C.textoSecundario, padding: 6 },
  infoLinha: { fontSize: 13, color: C.textoSecundario },
  timelineEvento: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 7 },
  timelineDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: C.primario, marginTop: 5 },
  timelineTitulo: { color: C.texto, fontWeight: '700', fontSize: 13, marginBottom: 3 },
  avisoDestaque: { backgroundColor: '#FFF7E9', borderRadius: 10, padding: 13 },
  avisoTexto: { fontSize: 12, lineHeight: 19, color: '#855714' },
  bannerErro: { backgroundColor: '#FDE9E7', paddingHorizontal: 20, paddingVertical: 10 },
  bannerSucesso: { backgroundColor: '#E6F5EE', paddingHorizontal: 20, paddingVertical: 10 },
});
