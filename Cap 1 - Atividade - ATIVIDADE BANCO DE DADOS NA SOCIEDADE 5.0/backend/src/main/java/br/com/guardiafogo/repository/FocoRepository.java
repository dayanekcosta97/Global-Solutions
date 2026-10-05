package br.com.guardiafogo.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class FocoRepository {

    private final JdbcTemplate jdbcTemplate;

    public FocoRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public String buscarResumo(Long idFoco) {
        String sql = "SELECT fn_resumo_foco(?) FROM dual";
        return jdbcTemplate.queryForObject(sql, String.class, idFoco);
    }

    public void gerarAlerta(Long idFoco) {
        jdbcTemplate.update("BEGIN prc_gerar_alerta(?); END;", idFoco);
    }

    public void processarFocosPendentes() {
        jdbcTemplate.execute("BEGIN prc_processar_focos; END;");
    }

    public String buscarNivelRisco(Long idFoco) {
        String sql =
            "SELECT fn_calcular_nivel_risco(confianca, distancia_km) " +
            "FROM foco_queimada WHERE id_foco = ?";

        return jdbcTemplate.queryForObject(sql, String.class, idFoco);
    }
}
