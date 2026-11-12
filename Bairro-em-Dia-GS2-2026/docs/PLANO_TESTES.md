# Plano de testes (PLT) — Bairro em Dia

## Pré-condições

- Executar `npm install`, `npm run web` e abrir a página no Chrome.
- Na primeira execução serão exibidos **3 registros fictícios**.
- Para testes de persistência, usar a mesma aba/perfil do navegador e recarregar a página.
- Para reiniciar o conjunto de testes, abrir janela anônima limpa ou apagar os dados do site no Chrome (DevTools → Application → Storage → Clear site data).
- Para testes PL/SQL, criar as tabelas e compilar rotinas no Oracle FreeSQL antes de executar `03_testes.sql`.

| ID | Cenário | Passos | Resultado esperado |
|---|---|---|---|
| CT-01 | Caminho feliz: registrar | Registrar → escolher categoria → endereço, bairro e descrição válida → salvar | Protocolo `BED-AAAA-NNNNNN` exibido e registro listado como Aberta |
| CT-02 | Exceção: sem categoria | Abrir Registro → deixar categoria vazia → preencher demais campos → enviar | Formulário não salva; indica obrigatoriedade de categoria |
| CT-03 | Exceção: descrição curta | Preencher formulário com descrição de 5 caracteres → enviar | Mensagem pedindo pelo menos 10 caracteres |
| CT-04 | Persistência | Criar ocorrência → recarregar o navegador → acompanhar | Ocorrência continua aparecendo |
| CT-05 | Consulta e filtro | Acompanhar → selecionar Em análise | Apenas ocorrências na situação escolhida aparecem |
| CT-06 | Avanço de status | Abrir detalhe de uma ocorrência Aberta → Simular próxima etapa | Situação vira Em análise e linha do tempo cresce |
| CT-07 | Encerramento | Avançar em sequência até Resolvida | Botão de avanço é substituído por mensagem de conclusão |
| CT-08 | Indicadores | Registrar nova ocorrência → Indicadores | Total aumenta em 1; barras e contadores refletem o novo estado |
| CT-09 | Responsividade | Chrome DevTools → F12 → Ctrl+Shift+M → largura ~390px | Menu inferior visível, cadastro e listas operacionais |
| CT-10 | Oracle: registro e histórico | Executar `database/03_testes.sql` | Procedimento gera protocolo e histórico inicial |
| CT-11 | Oracle: fluxo e indicadores | Executar `database/03_testes.sql` | 3 transições, 4 eventos e mensagem `TESTE PASSOU` |
| CT-12 | Exceção: campos obrigatórios vazios | Abrir Registrar e enviar formulário sem preencher nenhum campo | Nenhuma ocorrência criada; indicar validações obrigatórias |

**Automatizado no pacote:** `npm test` cobre as regras puras de domínio. CT-01 a CT-09 e CT-12 precisam de validação manual na interface. CT-10 e CT-11 precisam ser executados em um Oracle real. Nenhum desses testes deve ser relatado como executado se ainda não for.

## Evidências recomendadas

Capturas da tela inicial, formulário preenchido, mensagens de validação, lista, detalhe com histórico, indicadores, saída de `npm test` e saída do script Oracle. Registrar no vídeo técnico o teste em navegador ou Android emulado.




## Resultado consolidado — testes de 09/11/2026

- **CT-01: Aprovado** — Registro de ocorrência válida; Prints 03 e 10.
- **CT-02: Aprovado** — Cadastro sem categoria; Teste manual relatado.
- **CT-03: Aprovado** — Descrição muito curta; Teste manual relatado.
- **CT-04: Aprovado** — Persistência ao atualizar página; Teste manual relatado.
- **CT-05: Aprovado** — Filtro por situação; Teste manual relatado.
- **CT-06: Aprovado** — Transições e histórico; Print 05.
- **CT-07: Aprovado** — Ocorrência concluída; Teste manual relatado.
- **CT-08: Aprovado** — Indicadores; Prints 06, 07 e 11.
- **CT-09: Aprovado (Web)** — Responsividade na Web; Prints 01 a 11.
- **CT-10: Aprovado** — Oracle: registro e histórico; Saída 14, informada.
- **CT-11: Aprovado** — Oracle: transições e indicadores; Saída 14 e print 13.
- **CT-12: Aprovado** — Campos obrigatórios vazios; Teste manual relatado.

**Conclusão:** 12 de 12 cenários funcionais concluídos com aprovação relatada; 8 de 8 automatizados passaram em Windows. O teste CT-09 refere-se ao Chrome responsivo, não a um Android nativo. O Oracle foi validado separadamente, sem API integrada ao aplicativo. Ver evidências em `docs/evidencias/` e relatório `RELATORIO_VALIDACAO_INICIAL.md`.
