BAIRRO EM DIA — FIAP GLOBAL SOLUTION 2 / 2026
CITIZENTECH — TECNOLOGIA CENTRADA NO CIDADÃO

Projeto: aplicativo demonstrativo para registro e acompanhamento de ocorrências urbanas.
ODS: 11 — Cidades e Comunidades Sustentáveis.
Tecnologias: React Native, Expo SDK 58, React Native Web, AsyncStorage, Oracle SQL/PLSQL.

REQUISITOS NO COMPUTADOR (WINDOWS)
- Visual Studio Code
- Node.js >= 22.13
- Google Chrome (ou outro navegador moderno)
- Acesso à internet na primeira instalação de dependências

EXECUÇÃO DO APLICATIVO SEM SMARTPHONE
1. Extraia os arquivos ZIP em uma pasta, por exemplo: C:\Projetos\bairro-em-dia
2. Abra a pasta no Visual Studio Code.
3. Abra Terminal > New Terminal.
4. Execute: npm install
5. Execute: npx expo install --fix  (opcional para validar versões, recomendado)
6. Execute: npm run web
7. Acesse o endereço que o terminal mostrar (normalmente http://localhost:8081).
8. Para simular tela de celular no Chrome, F12 > Ctrl+Shift+M > escolha Pixel ou largura 390px.

TESTES AUTOMATIZADOS
npm test

TRÊS FUNCIONALIDADES OBRIGATÓRIAS
1. REGISTRAR: categoria, endereço, bairro, descrição e protocolo.
2. ACOMPANHAR: listagem, filtros, detalhe e simulação do fluxo de status/histórico.
3. INDICADORES: totais e gráficos por categoria e status.

COMPORTAMENTO DO MVP
- Primeira abertura apresenta 3 registros FICTÍCIOS para facilitar a demonstração.
- Novos registros ficam salvos no armazenamento local do navegador ou dispositivo.
- Não existe integração real com prefeitura, autenticação nem envio externo.
- O status avança apenas por simulação didática.
- Não registre dados sensíveis ou solicitações reais.

BANCO ORACLE / PLSQL
1. Abra https://freesql.com/ (ou serviço oficial Oracle FreeSQL).
2. Execute, nesta ordem, o conteúdo dos arquivos:
   database/01_estrutura.sql
   database/02_automacao.sql
   database/03_testes.sql
3. Analise saída DBMS_OUTPUT com indicação de teste bem-sucedido.
4. Para nova tentativa, execute apenas 03_testes.sql (o script faz ROLLBACK).
Obs.: Oracle e aplicativo funcionam separadamente neste MVP. O código não possui conexão REST com Oracle.

MODELOS E DOCUMENTAÇÃO
- docs/MER.md e docs/diagramas/MER.png
- docs/DER.md e docs/diagramas/DER.png
- docs/ARQUITETURA.md: descrição dos componentes, funções e tecnologias, memória e acessibilidade.
- docs/PLANO_TESTES.md: cenários de teste e resultados esperados.
- docs/BAIRRO_EM_DIA_RELATORIO_FINAL_ABNT.pdf e .docx: relatório acadêmico final formatado conforme diretrizes ABNT.
- docs/ROTEIRO_VIDEO_TECNICO.md: roteiro do pitch de até 5 minutos.
- docs/CONTRATO_API_FUTURO.md: ideia de integração posterior; não implementada.

ENTREGA À FIAP
1. Subir esta pasta para um repositório GitHub e compartilhar com o tutor.
2. Gravar vídeo técnico de até 5 minutos e publicar no YouTube como não listado.
3. Preencher entrega/links.txt com os links REAIS do GitHub e do vídeo.
4. Revisar material e cumprir o prazo formal da plataforma, preferencialmente antecipando.
Vídeo comercial da competição: opcional e NÃO necessário para a nota conforme enunciado.

JUSTIFICATIVAS TÉCNICAS
- React Native + Expo: atende plataforma obrigatória e permite simulação web e Android.
- AsyncStorage: persistência simples offline, sem configuração de servidor; limita-se a dados demonstrativos.
- PL/SQL: regra transacional de protocolo/andamento, histórico via trigger e consultas consolidadas.
- Arquitetura em módulos: separa UI, regra de negócio e acesso aos dados.
- FlatList/useMemo/React.memo: redução de renderizações e uso de memória.

REFERÊNCIAS
https://docs.expo.dev/workflow/web/
https://docs.expo.dev/workflow/android-studio-emulator/
https://docs.expo.dev/versions/v58.0.0/sdk/async-storage/
https://www.oracle.com/database/technologies/oracle-free-sql/
https://sdgs.un.org/goals/goal11
