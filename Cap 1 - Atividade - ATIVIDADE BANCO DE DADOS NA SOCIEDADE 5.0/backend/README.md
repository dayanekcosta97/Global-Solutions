# Backend Spring Boot — Guardiã do Fogo

Backend mínimo criado para demonstrar a integração:

`REST -> Spring Boot -> JDBC -> Oracle -> PL/SQL`

## Pré-requisitos

- Java 17
- Maven
- Oracle Database
- Scripts da pasta `database/` executados previamente

## Configuração

Por padrão, a aplicação tenta conectar em:

`jdbc:oracle:thin:@localhost:1521/XEPDB1`

É recomendado configurar as variáveis de ambiente:

- `ORACLE_URL`
- `ORACLE_USER`
- `ORACLE_PASSWORD`

## Executar

```bash
mvn spring-boot:run
```

A API ficará disponível em:

`http://localhost:8080`

## Endpoints

### 1. Consultar resumo de um foco

```http
GET /api/focos/1/resumo
```

Esse endpoint executa no Oracle:

- `FN_CALCULAR_NIVEL_RISCO`
- `FN_RESUMO_FOCO`

### 2. Gerar alerta para um foco

```http
POST /api/focos/1/gerar-alerta
```

Esse endpoint demonstra diretamente:

`REST -> Java -> JDBC -> Oracle -> PRC_GERAR_ALERTA`

### 3. Processar todos os focos pendentes

```http
POST /api/focos/processar-pendentes
```

Executa a `PRC_PROCESSAR_FOCOS`, que utiliza:

- `CURSOR`
- `LOOP`
- `IF`
- `EXCEPTION`

## Papel do backend

O backend demonstra a interoperabilidade Java/Oracle sem duplicar a lógica
de negócio já implementada em PL/SQL.
