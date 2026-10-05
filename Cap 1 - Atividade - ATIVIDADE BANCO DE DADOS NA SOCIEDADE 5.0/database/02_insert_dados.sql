-- ============================================================
-- GUARDIÃ DO FOGO
-- Script 02 - Dados simulados para testes
-- ============================================================

INSERT INTO usuario (id_usuario, nome, email, perfil)
VALUES (1, 'Dayane Costa', 'dayane@guardiafogo.com', 'GESTOR');

INSERT INTO usuario (id_usuario, nome, email, perfil)
VALUES (2, 'Joao Silva', 'joao@guardiafogo.com', 'USUARIO');

INSERT INTO usuario (id_usuario, nome, email, perfil)
VALUES (3, 'Maria Souza', 'maria@guardiafogo.com', 'DEFESA_CIVIL');

INSERT INTO foco_queimada (
    id_foco, cidade, estado, latitude, longitude,
    satelite, fonte, confianca, brilho, distancia_km,
    data_deteccao, processado
) VALUES (
    1, 'Belo Horizonte', 'MG', -19.916700, -43.934500,
    'VIIRS', 'NASA FIRMS / INPE', 94, 332.10, 8,
    TO_TIMESTAMP('2026-10-05 10:15:00', 'YYYY-MM-DD HH24:MI:SS'), 'N'
);

INSERT INTO foco_queimada (
    id_foco, cidade, estado, latitude, longitude,
    satelite, fonte, confianca, brilho, distancia_km,
    data_deteccao, processado
) VALUES (
    2, 'Contagem', 'MG', -19.931700, -44.053600,
    'VIIRS', 'NASA FIRMS / INPE', 85, 319.70, 12,
    TO_TIMESTAMP('2026-10-05 11:20:00', 'YYYY-MM-DD HH24:MI:SS'), 'N'
);

INSERT INTO foco_queimada (
    id_foco, cidade, estado, latitude, longitude,
    satelite, fonte, confianca, brilho, distancia_km,
    data_deteccao, processado
) VALUES (
    3, 'Nova Lima', 'MG', -19.985600, -43.846700,
    'MODIS', 'INPE Queimadas', 76, 307.20, 22,
    TO_TIMESTAMP('2026-10-05 12:10:00', 'YYYY-MM-DD HH24:MI:SS'), 'N'
);

INSERT INTO foco_queimada (
    id_foco, cidade, estado, latitude, longitude,
    satelite, fonte, confianca, brilho, distancia_km,
    data_deteccao, processado
) VALUES (
    4, 'Sabara', 'MG', -19.886400, -43.806700,
    'MODIS', 'INPE Queimadas', 62, 300.90, 31,
    TO_TIMESTAMP('2026-10-05 13:30:00', 'YYYY-MM-DD HH24:MI:SS'), 'N'
);

INSERT INTO foco_queimada (
    id_foco, cidade, estado, latitude, longitude,
    satelite, fonte, confianca, brilho, distancia_km,
    data_deteccao, processado
) VALUES (
    5, 'Brumadinho', 'MG', -20.143500, -44.201200,
    'VIIRS', 'NASA FIRMS', 97, 345.50, 6,
    TO_TIMESTAMP('2026-10-05 14:05:00', 'YYYY-MM-DD HH24:MI:SS'), 'N'
);

INSERT INTO foco_queimada (
    id_foco, cidade, estado, latitude, longitude,
    satelite, fonte, confianca, brilho, distancia_km,
    data_deteccao, processado
) VALUES (
    6, 'Betim', 'MG', -19.967800, -44.198300,
    'VIIRS', 'NASA FIRMS', 82, 316.40, 14,
    TO_TIMESTAMP('2026-10-05 15:10:00', 'YYYY-MM-DD HH24:MI:SS'), 'N'
);

INSERT INTO leitura_ambiental (
    id_leitura, id_foco, temperatura_c, umidade_percentual,
    velocidade_vento, data_leitura
) VALUES (1, 1, 36.5, 24, 18.2,
    TO_TIMESTAMP('2026-10-05 10:16:00', 'YYYY-MM-DD HH24:MI:SS'));

INSERT INTO leitura_ambiental (
    id_leitura, id_foco, temperatura_c, umidade_percentual,
    velocidade_vento, data_leitura
) VALUES (2, 2, 33.8, 30, 12.5,
    TO_TIMESTAMP('2026-10-05 11:21:00', 'YYYY-MM-DD HH24:MI:SS'));

INSERT INTO leitura_ambiental (
    id_leitura, id_foco, temperatura_c, umidade_percentual,
    velocidade_vento, data_leitura
) VALUES (3, 3, 31.2, 36, 10.1,
    TO_TIMESTAMP('2026-10-05 12:12:00', 'YYYY-MM-DD HH24:MI:SS'));

INSERT INTO leitura_ambiental (
    id_leitura, id_foco, temperatura_c, umidade_percentual,
    velocidade_vento, data_leitura
) VALUES (4, 4, 28.9, 48, 7.3,
    TO_TIMESTAMP('2026-10-05 13:33:00', 'YYYY-MM-DD HH24:MI:SS'));

INSERT INTO leitura_ambiental (
    id_leitura, id_foco, temperatura_c, umidade_percentual,
    velocidade_vento, data_leitura
) VALUES (5, 5, 39.1, 19, 21.4,
    TO_TIMESTAMP('2026-10-05 14:06:00', 'YYYY-MM-DD HH24:MI:SS'));

INSERT INTO leitura_ambiental (
    id_leitura, id_foco, temperatura_c, umidade_percentual,
    velocidade_vento, data_leitura
) VALUES (6, 6, 34.4, 28, 13.7,
    TO_TIMESTAMP('2026-10-05 15:12:00', 'YYYY-MM-DD HH24:MI:SS'));

COMMIT;
