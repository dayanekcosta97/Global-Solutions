-- Rotinas PL/SQL executáveis em Oracle. Executar depois de 01_estrutura.sql.
-- A trigger não faz COMMIT: a transação é de responsabilidade do chamador.

CREATE OR REPLACE TRIGGER trg_historico_status
AFTER INSERT OR UPDATE OF status ON ocorrencia
FOR EACH ROW
BEGIN
  IF INSERTING THEN
    INSERT INTO historico_status
      (ocorrencia_id, status_anterior, status_novo, observacao)
    VALUES
      (:NEW.id, NULL, :NEW.status, 'Ocorrência registrada.');
  ELSIF UPDATING AND :OLD.status <> :NEW.status THEN
    INSERT INTO historico_status
      (ocorrencia_id, status_anterior, status_novo, observacao)
    VALUES
      (:NEW.id, :OLD.status, :NEW.status, 'Etapa alterada pela rotina de atendimento.');
  END IF;
END;
/

-- Operação 1: registro com protocolo único e validação de dados.
CREATE OR REPLACE PROCEDURE pr_registrar_ocorrencia (
  p_categoria_id IN NUMBER,
  p_endereco IN VARCHAR2,
  p_bairro IN VARCHAR2,
  p_descricao IN VARCHAR2,
  p_id OUT NUMBER,
  p_protocolo OUT VARCHAR2
)
AS
  v_ativo CHAR(1);
BEGIN
  IF TRIM(p_endereco) IS NULL OR TRIM(p_bairro) IS NULL
     OR LENGTH(TRIM(p_descricao)) < 10 OR TRIM(p_descricao) IS NULL THEN
    RAISE_APPLICATION_ERROR(-20001, 'Endereço, bairro e descrição (mínimo 10 caracteres) são obrigatórios.');
  END IF;

  BEGIN
    SELECT ativo INTO v_ativo FROM categoria WHERE id = p_categoria_id;
  EXCEPTION WHEN NO_DATA_FOUND THEN
    RAISE_APPLICATION_ERROR(-20002, 'Categoria inexistente.');
  END;

  IF v_ativo <> 'S' THEN
    RAISE_APPLICATION_ERROR(-20003, 'Categoria inativa.');
  END IF;

  p_protocolo := 'BED-' || TO_CHAR(SYSDATE, 'YYYY') || '-'
                || LPAD(TO_CHAR(seq_protocolo.NEXTVAL), 6, '0');

  INSERT INTO ocorrencia
    (protocolo, categoria_id, endereco, bairro, descricao)
  VALUES
    (p_protocolo, p_categoria_id, TRIM(p_endereco), TRIM(p_bairro), TRIM(p_descricao))
  RETURNING id INTO p_id;
END;
/

-- Operação 2: fluxo determinístico Aberta -> Em análise -> Em andamento -> Resolvida.
-- Concorrência: SELECT FOR UPDATE evita avanço simultâneo da mesma ocorrência.
CREATE OR REPLACE PROCEDURE pr_avancar_status (
  p_ocorrencia_id IN NUMBER,
  p_observacao IN VARCHAR2,
  p_status_novo OUT VARCHAR2
)
AS
  v_status_atual ocorrencia.status%TYPE;
BEGIN
  BEGIN
    SELECT status INTO v_status_atual
      FROM ocorrencia WHERE id = p_ocorrencia_id FOR UPDATE;
  EXCEPTION WHEN NO_DATA_FOUND THEN
    RAISE_APPLICATION_ERROR(-20004, 'Ocorrência inexistente.');
  END;

  CASE v_status_atual
    WHEN 'Aberta' THEN p_status_novo := 'Em análise';
    WHEN 'Em análise' THEN p_status_novo := 'Em andamento';
    WHEN 'Em andamento' THEN p_status_novo := 'Resolvida';
    WHEN 'Resolvida' THEN
      RAISE_APPLICATION_ERROR(-20005, 'Ocorrência já resolvida.');
    ELSE RAISE_APPLICATION_ERROR(-20006, 'Status inválido.');
  END CASE;

  UPDATE ocorrencia
    SET status = p_status_novo, atualizado_em = SYSTIMESTAMP
    WHERE id = p_ocorrencia_id;

  -- A trigger gerou o evento; personalizamos sua observação se informada.
  IF TRIM(p_observacao) IS NOT NULL THEN
    UPDATE historico_status
       SET observacao = SUBSTR(TRIM(p_observacao), 1, 500)
     WHERE id = (
       SELECT MAX(id) FROM historico_status
        WHERE ocorrencia_id = p_ocorrencia_id AND status_novo = p_status_novo
     );
  END IF;
END;
/

-- Operação 3: sumarização para o painel de indicadores.
CREATE OR REPLACE PROCEDURE pr_indicadores (
  p_resultado OUT SYS_REFCURSOR
)
AS
BEGIN
  OPEN p_resultado FOR
    SELECT c.nome AS categoria,
           COUNT(o.id) AS total,
           SUM(CASE WHEN o.status = 'Resolvida' THEN 1 ELSE 0 END) AS resolvidas,
           SUM(CASE WHEN o.status <> 'Resolvida' THEN 1 ELSE 0 END) AS em_acompanhamento
      FROM categoria c
      LEFT JOIN ocorrencia o ON o.categoria_id = c.id
     GROUP BY c.id, c.nome
     ORDER BY c.nome;
END;
/
