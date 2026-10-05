CREATE OR REPLACE PROCEDURE prc_gerar_alerta (
    p_id_foco IN NUMBER
)
IS
    v_cidade       foco_queimada.cidade%TYPE;
    v_estado       foco_queimada.estado%TYPE;
    v_confianca    foco_queimada.confianca%TYPE;
    v_distancia    foco_queimada.distancia_km%TYPE;
    v_nivel        VARCHAR2(20);
    v_qtd_alertas  NUMBER;
    v_mensagem     VARCHAR2(500);
BEGIN
    SELECT cidade, estado, confianca, distancia_km
      INTO v_cidade, v_estado, v_confianca, v_distancia
      FROM foco_queimada
     WHERE id_foco = p_id_foco;

    v_nivel := fn_calcular_nivel_risco(
        p_confianca => v_confianca,
        p_distancia_km => v_distancia
    );

    IF v_nivel IN ('ALTO', 'CRITICO') THEN
        SELECT COUNT(*)
          INTO v_qtd_alertas
          FROM alerta
         WHERE id_foco = p_id_foco
           AND status IN ('ABERTO', 'EM_ANALISE');

        IF v_qtd_alertas = 0 THEN
            v_mensagem :=
                'Foco de queimada classificado como ' || v_nivel ||
                ' em ' || v_cidade || '/' || v_estado ||
                '. Recomenda-se acompanhamento imediato.';

            INSERT INTO alerta (id_foco, nivel_risco, mensagem, status)
            VALUES (p_id_foco, v_nivel, v_mensagem, 'ABERTO');
        END IF;
    END IF;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20001,
            'Nao foi encontrado foco de queimada para o ID informado.');
    WHEN OTHERS THEN
        RAISE_APPLICATION_ERROR(-20002,
            'Erro ao gerar alerta: ' || SQLERRM);
END;
/

CREATE OR REPLACE PROCEDURE prc_processar_focos
IS
    CURSOR c_focos IS
        SELECT id_foco
          FROM foco_queimada
         WHERE processado = 'N'
         ORDER BY data_deteccao;

    v_nivel VARCHAR2(20);
BEGIN
    FOR r_foco IN c_focos LOOP
        SELECT fn_calcular_nivel_risco(confianca, distancia_km)
          INTO v_nivel
          FROM foco_queimada
         WHERE id_foco = r_foco.id_foco;

        IF v_nivel IN ('ALTO', 'CRITICO') THEN
            prc_gerar_alerta(p_id_foco => r_foco.id_foco);
        END IF;

        UPDATE foco_queimada
           SET processado = 'S'
         WHERE id_foco = r_foco.id_foco;
    END LOOP;

    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE_APPLICATION_ERROR(-20003,
            'Erro no processamento dos focos: ' || SQLERRM);
END;
/
