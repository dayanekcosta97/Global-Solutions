# Roteiro do vídeo técnico (máximo de 5 minutos)

**0:00–0:30 — Contexto e propósito.** Mostrar Bairro em Dia e explicar o problema de infraestrutura urbana; citar CitizenTech e ODS 11. Deixar claro que é MVP acadêmico, sem conexão real com prefeitura.

**0:30–1:15 — Arquitetura.** Abrir o VS Code e mostrar `App.js`, `src/domain`, `src/data` e `database`. Citar React Native com Expo, React Native Web e AsyncStorage local.

**1:15–2:40 — Três funcionalidades.** No navegador: registrar ocorrência, apresentar protocolo; filtrar e abrir acompanhamento, simular mudança de status; abrir painel de indicadores e observar a alteração.

**2:40–3:50 — Banco e automação.** Exibir MER e DER, tabelas categoria/ocorrencia/historico_status. Executar no Oracle FreeSQL `03_testes.sql` após scripts de criação, demonstrando procedures, trigger, histórico e indicadores. Explicar que esse ambiente Oracle é independente da persistência local do MVP.

**3:50–4:35 — Qualidade.** Executar `npm test`, demonstrar validação de formulário, mencionar virtualização com FlatList, useMemo e feedback acessível.

**4:35–4:55 — Encerramento.** Recapitular benefícios esperados e próximos passos: integração real via API e permissões. Publicar no YouTube como não listado e incluir o link no TXT de entrega.

**Gravação no computador:** usar OBS Studio ou a ferramenta de captura de tela disponível no Windows. Não é necessário smartphone. Não apresente capturas fictícias como se fossem registros reais.
