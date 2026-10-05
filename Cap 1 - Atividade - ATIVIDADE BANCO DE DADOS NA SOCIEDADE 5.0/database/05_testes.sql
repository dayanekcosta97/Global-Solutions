SET SERVEROUTPUT ON;

SELECT * FROM usuario ORDER BY id_usuario;
SELECT * FROM foco_queimada ORDER BY id_foco;
SELECT * FROM leitura_ambiental ORDER BY id_leitura;
SELECT * FROM alerta ORDER BY id_alerta;

SELECT
    id_foco,
    cidade,
    estado,
    confianca,
    distancia_km,
    fn_calcular_nivel_risco(confianca, distancia_km) AS nivel_risco
FROM foco_queimada
ORDER BY id_foco;

SELECT fn_resumo_foco(1) AS resumo FROM dual;
SELECT fn_resumo_foco(4) AS resumo FROM dual;
SELECT fn_resumo_foco(9999) AS resumo FROM dual;

BEGIN
    prc_gerar_alerta(1);
END;
/

SELECT * FROM alerta ORDER BY id_alerta;

BEGIN
    prc_processar_focos;
END;
/

SELECT
    f.id_foco,
    f.cidade,
    f.estado,
    f.confianca,
    f.distancia_km,
    fn_calcular_nivel_risco(f.confianca, f.distancia_km) AS nivel_risco,
    f.processado
FROM foco_queimada f
ORDER BY f.id_foco;

SELECT
    a.id_alerta,
    a.id_foco,
    f.cidade,
    a.nivel_risco,
    a.mensagem,
    a.status,
    a.data_criacao
FROM alerta a
JOIN foco_queimada f ON f.id_foco = a.id_foco
ORDER BY a.id_alerta;

SELECT
    f.id_foco,
    fn_resumo_foco(f.id_foco) AS resumo_foco
FROM foco_queimada f
ORDER BY f.id_foco;
