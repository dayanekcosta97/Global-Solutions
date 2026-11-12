# Arquitetura técnica do Bairro em Dia

## Objetivo e público

Permitir que moradores registrem e acompanhem, em um protótipo demonstrativo, problemas cotidianos em espaços públicos. A solução é inspirada em fluxos de gestão de solicitações, mas não se conecta a um serviço de prefeitura, não envia chamados reais e não exige login.

**Relação com ODS 11 (Cidades e Comunidades Sustentáveis):** organização de registros sobre infraestrutura, conservação e acessibilidade, e visão consolidada para orientar prioridades. Contribuição demonstrada no projeto é potencial; não há dados de impacto real.

## Camadas

1. **Interface (App.js):** quatro telas; formulários, feedback de validação, lista com filtros, detalhes, linha do tempo e painéis de contadores e barras.
2. **Domínio (`src/domain/ocorrencias.mjs`):** regras de validação, geração de protocolo, criação, avanço de status e indicadores; funções puras e testáveis sem Expo.
3. **Persistência do MVP (`src/data/armazenamento.js`):** AsyncStorage local em navegador ou emulador Android. Primeira execução inclui três **registros fictícios**.
4. **Modelo relacional e automação Oracle (`database/`):** DDL, trigger, procedures e casos de teste PL/SQL, executados separadamente no Oracle FreeSQL. Nesta etapa, não há API nem sincronização com o AsyncStorage.

## Escolhas técnicas e vantagens

- **React Native + Expo SDK 58:** atende à linguagem exigida e permite desenvolvimento multiplataforma.
- **React Native Web:** executa as mesmas telas num navegador de desktop sem telefone.
- **AsyncStorage 2.2:** simplifica o MVP offline e mantém registros no mesmo navegador/dispositivo; não é criptografado e não é apropriado para informações sensíveis.
- **Oracle PL/SQL:** demonstra automação transacional de registro, atualização e indicadores no banco relacional.
- **Node.js test runner:** valida regras de domínio sem dependência de emulador.

## Fluxos principais

### Registro

Selecionar categoria → informar endereço, bairro e descrição → validar obrigatórios e descrição mínima → gerar protocolo → registrar primeiro evento no histórico → salvar no armazenamento local → navegar para acompanhamento.

### Acompanhamento

Exibir registros → filtrar por situação → abrir detalhe → visualizar linha do tempo → simular próxima etapa (Aberta → Em análise → Em andamento → Resolvida). A atualização do status é **exclusivamente demonstrativa**.

### Indicadores

Recalcular totais, pendentes e resolvidas por categoria/situação a partir da lista memorizada na aplicação. Exibir barras proporcionais em componentes nativos de `View`, sem biblioteca gráfica extra.

## Gerenciamento de memória e desempenho

- `FlatList` com virtualização da lista, `initialNumToRender=8`, `maxToRenderPerBatch=8` e `windowSize=5`; evita renderizar todos os cartões de uma vez.
- `useMemo` para listas ordenadas, filtradas, indicadores e detalhe selecionado; recalcula apenas quando dependências mudam.
- `React.memo` no cartão para reduzir renderizações sem mudança de propriedades.
- `useCallback` para navegação e abertura de detalhes estáveis.
- `useEffect` com sinalizador de descarte, impedindo atualização de estado após desmontagem durante carregamento assíncrono.
- Limites de caracteres nos campos e ausência de mídia em memória; no protótipo são armazenados apenas textos curtos.
- Separação da lógica pura permite testes unitários sem carregar UI nem bibliotecas nativas.

**Limitação:** AsyncStorage carrega toda a lista em memória; adequado para volume pequeno de demonstração, não para uma plataforma municipal de produção. Para escala real seriam necessários backend paginado, autenticação, proteção de dados, moderação, observabilidade e controle de permissões.

## Acessibilidade

- Rótulos `accessibilityLabel` em formulários, ações e controles de navegação.
- Tipografia legível, contraste de texto e áreas de toque amplas.
- Situações identificadas por **texto + cor** (a cor isolada nunca é a única informação).
- Tratamento de campos obrigatórios com mensagens textuais.
- Interface adaptável a larguras de navegador e celular.

## Classes, componentes e funções

| Módulo | Função ou componente | Responsabilidade |
|---|---|---|
| `App.js` | `App` | Estado e navegação principal; orquestra as quatro telas. |
| `App.js` | `Botao` | Ação reutilizável com feedback visual. |
| `App.js` | `Etiqueta` | Representação textual e visual da situação. |
| `App.js` | `CartaoOcorrencia` | Exibição resumida, memoizada, de uma ocorrência. |
| `App.js` | `Campo` | Campo de formulário com validação visível. |
| `App.js` | `Barra` e `BlocoNumero` | Indicadores por categoria, situação e total. |
| `App.js` | `Detalhes` | Modal com linha do tempo e simulação de andamento. |
| `ocorrencias.mjs` | `validarOcorrencia` | Verifica categoria, endereço, bairro e tamanho da descrição. |
| `ocorrencias.mjs` | `proximoProtocolo` | Gera protocolo sequencial por ano no armazenamento local. |
| `ocorrencias.mjs` | `criarOcorrencia` | Cria objeto e histórico inicial. |
| `ocorrencias.mjs` | `avancarStatus` | Aplica transição ordenada e registra histórico. |
| `ocorrencias.mjs` | `calcularIndicadores` | Contagem por situação e categoria. |
| `ocorrencias.mjs` | `dadosDemonstrativos` | Cria três ocorrências fictícias da primeira execução. |
| `armazenamento.js` | `carregarOcorrencias` | Busca registros do dispositivo/navegador. |
| `armazenamento.js` | `salvarOcorrencias` | Persiste registros localmente. |
| `02_automacao.sql` | `trg_historico_status` | Grava histórico em cada abertura/mudança de situação. |
| `02_automacao.sql` | `pr_registrar_ocorrencia` | Valida, gera protocolo e insere ocorrência. |
| `02_automacao.sql` | `pr_avancar_status` | Avança situação com bloqueio transacional. |
| `02_automacao.sql` | `pr_indicadores` | Retorna cursor com consolidação por categoria. |

A aplicação privilegia componentes funcionais e funções puras, por isso não há classes de negócio construídas manualmente. Os objetos de ocorrência e histórico representam os modelos do domínio.

## Segurança e privacidade

O aplicativo acadêmico não possui autenticação, não coleta identidade dos cidadãos e armazena dados de teste localmente. **Não deve ser utilizado para reportar problemas reais**. Endereços informados pelo usuário são locais do problema, não dados de sua residência pessoal; recomenda-se usar apenas informação fictícia durante a demonstração.
