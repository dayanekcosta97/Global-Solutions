# Evolução opcional — API REST Oracle

**Não implementada no MVP.** Documentação prospectiva para um cenário de produção.

Uma API autenticada e com controles de acesso faria a intermediação segura entre React Native e Oracle (por exemplo, Oracle REST Data Services). O aplicativo nunca deve guardar credenciais do banco nem executar PL/SQL com conexão Oracle direta a partir do dispositivo.

Endpoints ilustrativos:

- `POST /ocorrencias` — recebe categoria, endereço, bairro e descrição; chama `pr_registrar_ocorrencia` e devolve protocolo.
- `GET /ocorrencias?status=...` — lista paginada (com controle de acesso, se aplicável).
- `PATCH /ocorrencias/{id}/status` — endpoint de servidor restrito a atendentes, chama `pr_avancar_status`.
- `GET /indicadores` — agrega contadores por categoria e situação.

A separação protege a possibilidade de evoluir do MVP local a um sistema real. A FIAP pode avaliar as rotinas Oracle separadamente nesta primeira versão; se a integração ponta a ponta for exigida na rubrica, será necessário implementar o backend.
