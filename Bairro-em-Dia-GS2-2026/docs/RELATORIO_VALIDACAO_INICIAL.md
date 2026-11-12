# Bairro em Dia — Relatório de validação técnica final (MVP)

**FIAP Global Solution 2 — 2026 | CitizenTech | ODS 11**  
**Data de execução informada:** 09/11/2026  
**Ambientes:** React Native + Expo Web no Windows/Chrome; Oracle FreeSQL em schema autenticado.

## Resumo executivo

- **12/12 cenários funcionais aprovados**, incluindo CT-09 restrito à inspeção visual de responsividade Web.
- **8/8 testes automatizados aprovados** no Windows com `npm.cmd test` (0 falhas, 0 ignorados), conforme saída compartilhada pela estudante.
- **Banco Oracle real:** 3 tabelas, 3 índices, 1 sequência e 5 categorias criados; 3 procedures e 1 trigger compiladas.
- `03_testes.sql` concluiu com `TESTE PASSOU: registro, transições, histórico e indicadores.`
- Consulta a `USER_OBJECTS` retornou `VALID` para as três procedures e para a trigger (captura nº 13).

**Escopo técnico:** O aplicativo armazena dados localmente; o Oracle foi executado e validado como módulo PL/SQL separado. **Não há integração Oracle ↔ Expo nem prefeitura conectada.** Testes nativos Android, acessibilidade formal e desempenho em dispositivo físico não foram realizados.

## Matriz de testes

| ID | Cenário | Resultado | Comprovação |
|---|---|---|---|
| CT-01 | Registro de ocorrência válida | **Aprovado** | Prints 03 e 10. Protocolo BED-2026-000004 criado e listado como Aberta. |
| CT-02 | Cadastro sem categoria | **Aprovado** | Teste manual relatado. Envio bloqueado por falta de categoria. |
| CT-03 | Descrição muito curta | **Aprovado** | Teste manual relatado. Validação impediu registro com descrição insuficiente. |
| CT-04 | Persistência ao atualizar página | **Aprovado** | Teste manual relatado. Após F5, protocolo, status e histórico preservados. |
| CT-05 | Filtro por situação | **Aprovado** | Teste manual relatado. Filtro por situação exibiu registros correspondentes. |
| CT-06 | Transições e histórico | **Aprovado** | Print 05. Aberta, Em análise, Em andamento, Resolvida; histórico. |
| CT-07 | Ocorrência concluída | **Aprovado** | Teste manual relatado. Mensagem de encerramento após status Resolvida. |
| CT-08 | Indicadores | **Aprovado** | Prints 06, 07 e 11. 4 registros; 3 em acompanhamento; 1 resolvida. |
| CT-09 | Responsividade na Web | **Aprovado (Web)** | Prints 01 a 11. Layout móvel simulado e desktop; não equivale a Android nativo. |
| CT-10 | Oracle: registro e histórico | **Aprovado** | Saída 14, informada. Procedimento criou BED-2026-000001; histórico validado pelo script. |
| CT-11 | Oracle: transições e indicadores | **Aprovado** | Saída 14 e print 13. Script imprimiu TESTE PASSOU; 4 objetos VALID. |
| CT-12 | Campos obrigatórios vazios | **Aprovado** | Teste manual relatado. Envio bloqueado quando os campos obrigatórios estavam vazios. |

## Evidências e rastreabilidade

- Capturas **01–11**: execução visual em navegador, nos layouts móvel simulado e desktop.
- Arquivo **12_saida_testes_automatizados.txt**: resultado 8/8 de `npm.cmd test` fornecido pela estudante.
- Captura **13_oracle_objetos_validos.png**: quatro objetos PL/SQL com `STATUS = VALID`.
- Arquivo **14_saida_oracle_execucao_informada.txt**: resultados informados dos três scripts Oracle, incluindo protocolo, indicadores e mensagem de sucesso.
- CT-02, CT-03, CT-04, CT-05, CT-07 e CT-12 foram informados como aprovados após execução manual, mas não há captura individual desses cenários. A saída Oracle foi compartilhada como texto e apenas a consulta `USER_OBJECTS` possui print.

## Resultado do banco Oracle

1. `01_estrutura.sql`: três tabelas, três índices, sequência e cinco categorias criados sem erros relatados.
2. `02_automacao.sql`: trigger `TRG_HISTORICO_STATUS` e procedures `PR_REGISTRAR_OCORRENCIA`, `PR_AVANCAR_STATUS` e `PR_INDICADORES` compiladas.
3. `03_testes.sql`: gerado `BED-2026-000001`; categoria Iluminação pública com total 1, resolvidas 1; demais com 0; saída `TESTE PASSOU`.
4. `USER_OBJECTS`: quatro objetos retornaram `VALID`.

## Pendências de produto/entrega (fora dos 12 testes definidos)

1. Publicar repositório GitHub com acesso ao tutor.
2. Gravar vídeo técnico de até cinco minutos e disponibilizar link não listado no YouTube, com links registrados em arquivo TXT.
3. Apresentar o Oracle como módulo PL/SQL independente do aplicativo e não como API integrada.
