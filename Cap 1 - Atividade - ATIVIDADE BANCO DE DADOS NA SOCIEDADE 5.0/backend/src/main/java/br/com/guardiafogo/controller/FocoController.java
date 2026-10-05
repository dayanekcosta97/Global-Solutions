package br.com.guardiafogo.controller;

import br.com.guardiafogo.service.FocoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/focos")
public class FocoController {

    private final FocoService service;

    public FocoController(FocoService service) {
        this.service = service;
    }

    @GetMapping("/{id}/resumo")
    public ResponseEntity<Map<String, Object>> consultarResumo(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.consultarResumo(id));
    }

    @PostMapping("/{id}/gerar-alerta")
    public ResponseEntity<Map<String, Object>> gerarAlerta(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.gerarAlerta(id));
    }

    @PostMapping("/processar-pendentes")
    public ResponseEntity<Map<String, Object>> processarPendentes() {
        return ResponseEntity.ok(service.processarPendentes());
    }
}
