# Bairro em Dia

**FIAP · Global Solution 2 — 2026 · CitizenTech**  
**ODS 11 — Cidades e Comunidades Sustentáveis**

Protótipo acadêmico em **React Native + Expo** para registrar ocorrências urbanas, simular acompanhamento de status e consultar indicadores de ocorrências. **Não há integração com prefeituras e os dados iniciais são fictícios.**

## Rodar no navegador (sem smartphone)

Requer Node.js 22.13 ou superior.

```bash
npm install
npm run web
```

Abra a URL informada no terminal. No Chrome, pressione `F12` e `Ctrl+Shift+M` para simular um celular em uma janela do navegador.

Para executar testes unitários sem Expo:

```bash
npm test
```

Para Android emulado, instale Android Studio e configure um dispositivo virtual (AVD); inicie `npm start` e pressione `a` com o emulador aberto.

## O que está implementado

- **Registro:** formulário validado, categoria, bairro, endereço, descrição e protocolo.
- **Acompanhamento:** filtros, modal de detalhes, linha do tempo e botão para **simular** as próximas etapas de status.
- **Indicadores:** contadores e barras por categoria e situação.
- Persistência local com AsyncStorage e três exemplos claramente demonstrativos na primeira abertura.

**Testes locais (09/11/2026):** `npm.cmd test` executado no Windows, com 8 testes aprovados e 0 falhas. Evidência textual no repositório: `docs/evidencias/12_saida_testes_automatizados.txt`. Os testes Oracle foram executados no schema autenticado do Oracle FreeSQL e concluídos com sucesso; três procedures e uma trigger apresentaram status `VALID`.

## Banco Oracle

Os scripts em `database/` implementam **em Oracle PL/SQL**, separadamente do app, criação de tabelas, geração de protocolo, auditoria de alterações de status e geração de indicadores:

1. `01_estrutura.sql`
2. `02_automacao.sql`
3. `03_testes.sql`

Execute nesta ordem no [Oracle FreeSQL](https://www.oracle.com/database/technologies/oracle-free-sql/). **A integração Oracle ↔ Expo não está implementada nesta versão.**

## Documentos

- [README detalhado (TXT)](README.txt)
- [Arquitetura, funções e eficiência de memória](docs/ARQUITETURA.md)
- [MER conceitual](docs/MER.md) · [DER físico Oracle](docs/DER.md)
- [Relatório final em formato ABNT (PDF)](docs/BAIRRO_EM_DIA_RELATORIO_FINAL_ABNT.pdf) · [Versão editável (DOCX)](docs/BAIRRO_EM_DIA_RELATORIO_FINAL_ABNT.docx)
- [Plano de testes](docs/PLANO_TESTES.md)
- [Relatório de validação e evidências](docs/RELATORIO_VALIDACAO_INICIAL.md) · [Anexo visual em PDF](docs/RELATORIO_EVIDENCIAS_VISUAIS.pdf)
- [Roteiro do vídeo técnico](docs/ROTEIRO_VIDEO_TECNICO.md)
- [Contratos para API futura](docs/CONTRATO_API_FUTURO.md)
- [Arquivo de links para entrega](entrega/links.txt)

## Testes executados em 09/11/2026

- **Web:** 12 de 12 cenários funcionais aprovados (CT-09 limitado à responsividade no navegador); seis cenários da rodada 2 foram relatados pela estudante, sem prints individuais.
- **Node.js:** `npm.cmd test` — 8 testes passaram, 0 falhas.
- **Oracle FreeSQL:** três tabelas, sequência, índices e dados de referência criados; trigger e três procedures compiladas. `03_testes.sql` retornou `TESTE PASSOU: registro, transições, histórico e indicadores` e a consulta `USER_OBJECTS` apresentou os quatro objetos `VALID`.
- Evidências: `docs/RELATORIO_VALIDACAO_INICIAL.md`, `docs/RELATORIO_EVIDENCIAS_VISUAIS.pdf` e `docs/evidencias/`.

> O Oracle é um módulo separado do aplicativo, que continua usando persistência local. Os testes do Chrome não substituem teste nativo Android; o repositório foi publicado no GitHub; faltam o vídeo técnico e o preenchimento de seu link na entrega.

## Repositório publicado

Esta versão foi publicada dentro do repositório acadêmico existente [Global-Solutions](https://github.com/dayanekcosta97/Global-Solutions), na pasta [Bairro-em-Dia-GS2-2026](https://github.com/dayanekcosta97/Global-Solutions/tree/main/Bairro-em-Dia-GS2-2026).
