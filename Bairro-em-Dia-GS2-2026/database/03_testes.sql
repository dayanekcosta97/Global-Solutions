-- Execute depois de 01_estrutura.sql e 02_automacao.sql.
-- Caso de teste integrado das rotinas de registro, andamento e indicadores.
SET SERVEROUTPUT ON;
DECLARE
  v_id NUMBER;
  v_protocolo VARCHAR2(32);
  v_status VARCHAR2(20);
  v_total NUMBER;
  v_historicos NUMBER;
  v_cursor SYS_REFCURSOR;
  v_categoria VARCHAR2(100);
  v_qtd NUMBER;
  v_resolvidas NUMBER;
  v_andamento NUMBER;
BEGIN
  pr_registrar_ocorrencia(
    1, 'Rua Teste, 100', 'Centro',
    'Luminária quebrada junto ao ponto de ônibus.',
    v_id, v_protocolo
  );
  DBMS_OUTPUT.PUT_LINE('Novo protocolo: ' || v_protocolo);

  pr_avancar_status(v_id, 'Equipe de triagem validou a solicitação.', v_status);
  IF v_status <> 'Em análise' THEN RAISE_APPLICATION_ERROR(-20101, 'Falha na transição 1.'); END IF;
  pr_avancar_status(v_id, 'Atendimento encaminhado para execução.', v_status);
  IF v_status <> 'Em andamento' THEN RAISE_APPLICATION_ERROR(-20102, 'Falha na transição 2.'); END IF;
  pr_avancar_status(v_id, 'Serviço finalizado em simulação.', v_status);
  IF v_status <> 'Resolvida' THEN RAISE_APPLICATION_ERROR(-20103, 'Falha na transição 3.'); END IF;

  SELECT COUNT(*) INTO v_historicos FROM historico_status WHERE ocorrencia_id = v_id;
  IF v_historicos <> 4 THEN RAISE_APPLICATION_ERROR(-20104, 'Histórico inconsistente.'); END IF;
  SELECT COUNT(*) INTO v_total FROM ocorrencia WHERE id = v_id AND status = 'Resolvida';
  IF v_total <> 1 THEN RAISE_APPLICATION_ERROR(-20105, 'Status final inconsistente.'); END IF;

  pr_indicadores(v_cursor);
  LOOP
    FETCH v_cursor INTO v_categoria, v_qtd, v_resolvidas, v_andamento;
    EXIT WHEN v_cursor%NOTFOUND;
    DBMS_OUTPUT.PUT_LINE(v_categoria || ': total=' || v_qtd || ', resolvidas=' || v_resolvidas);
  END LOOP;
  CLOSE v_cursor;

  DBMS_OUTPUT.PUT_LINE('TESTE PASSOU: registro, transições, histórico e indicadores.');
  ROLLBACK; -- Preserva apenas as categorias inseridas pelo arquivo 01.
EXCEPTION WHEN OTHERS THEN
  IF v_cursor%ISOPEN THEN CLOSE v_cursor; END IF;
  ROLLBACK;
  RAISE;
END;
/
