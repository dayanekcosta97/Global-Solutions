CREATE OR REPLACE FUNCTION fn_calcular_nivel_risco (
    p_confianca    IN NUMBER,
    p_distancia_km IN NUMBER
) RETURN VARCHAR2
IS
    v_nivel VARCHAR2(20);
BEGIN
    IF p_confianca IS NULL OR p_distancia_km IS NULL THEN
        RETURN 'INDEFINIDO';
    END IF;

    IF p_confianca >= 90 AND p_distancia_km <= 10 THEN
        v_nivel := 'CRITICO';
    ELSIF p_confianca >= 80 AND p_distancia_km <= 15 THEN
        v_nivel := 'ALTO';
    ELSIF p_confianca >= 70 AND p_distancia_km <= 25 THEN
        v_nivel := 'MEDIO';
    ELSE
        v_nivel := 'BAIXO';
    END IF;

    RETURN v_nivel;
EXCEPTION
    WHEN OTHERS THEN
        RETURN 'ERRO';
END;
/

CREATE OR REPLACE FUNCTION fn_resumo_foco (
    p_id_foco IN NUMBER
) RETURN VARCHAR2
IS
    v_cidade       foco_queimada.cidade%TYPE;
    v_estado       foco_queimada.estado%TYPE;
    v_confianca    foco_queimada.confianca%TYPE;
    v_distancia    foco_queimada.distancia_km%TYPE;
    v_nivel        VARCHAR2(20);
BEGIN
    SELECT cidade, estado, confianca, distancia_km
      INTO v_cidade, v_estado, v_confianca, v_distancia
      FROM foco_queimada
     WHERE id_foco = p_id_foco;

    v_nivel := fn_calcular_nivel_risco(
        p_confianca => v_confianca,
        p_distancia_km => v_distancia
    );

    RETURN v_cidade || '/' || v_estado
        || ' | Risco: ' || v_nivel
        || ' | Confianca: ' || TO_CHAR(v_confianca) || '%'
        || ' | Distancia: ' || TO_CHAR(v_distancia) || ' km';
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN 'Foco nao encontrado para o ID informado.';
    WHEN TOO_MANY_ROWS THEN
        RETURN 'Inconsistencia: mais de um foco encontrado.';
    WHEN OTHERS THEN
        RETURN 'Erro ao gerar resumo do foco: ' || SQLERRM;
END;
/
