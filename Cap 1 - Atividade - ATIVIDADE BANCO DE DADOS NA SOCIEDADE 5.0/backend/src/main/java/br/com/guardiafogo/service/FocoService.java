package br.com.guardiafogo.service;

import br.com.guardiafogo.repository.FocoRepository;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class FocoService {

    private final FocoRepository repository;

    public FocoService(FocoRepository repository) {
        this.repository = repository;
    }

    public Map<String, Object> consultarResumo(Long idFoco) {
        Map<String, Object> resposta = new LinkedHashMap<>();
        resposta.put("idFoco", idFoco);
        resposta.put("nivelRisco", repository.buscarNivelRisco(idFoco));
        resposta.put("resumo", repository.buscarResumo(idFoco));
        return resposta;
    }

    public Map<String, Object> gerarAlerta(Long idFoco) {
        repository.gerarAlerta(idFoco);

        Map<String, Object> resposta = new LinkedHashMap<>();
        resposta.put("idFoco", idFoco);
        resposta.put("mensagem", "Processamento de alerta executado com sucesso.");
        resposta.put("nivelRisco", repository.buscarNivelRisco(idFoco));
        return resposta;
    }

    public Map<String, Object> processarPendentes() {
        repository.processarFocosPendentes();

        Map<String, Object> resposta = new LinkedHashMap<>();
        resposta.put("mensagem", "Focos pendentes processados com sucesso.");
        return resposta;
    }
}
