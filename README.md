# Guardiã do Fogo — Alertas Inteligentes de Queimadas

## Sobre o projeto

A **Guardiã do Fogo** é uma aplicação mobile/web desenvolvida como parte da **Global Solution 1 — Space Connect: Tecnologia Espacial aplicada ao Monitoramento Ambiental e Climático**.

O projeto tem como objetivo demonstrar como dados espaciais e informações de satélite podem ser utilizados para apoiar o monitoramento ambiental, a prevenção de queimadas e a emissão de alertas inteligentes para áreas de risco.

A solução transforma dados ambientais em informações simples, visuais e acessíveis, permitindo que cidadãos, produtores rurais, órgãos ambientais e equipes de Defesa Civil acompanhem focos de queimadas e tomem decisões de forma mais rápida.

---

## Problema

As queimadas representam um dos principais desafios ambientais e climáticos no Brasil. Elas causam impactos diretos na biodiversidade, na qualidade do ar, na saúde da população, na segurança de comunidades e na emissão de gases poluentes.

Apesar de existirem dados de satélite capazes de identificar focos de calor e incêndios, muitas dessas informações ficam disponíveis em plataformas técnicas, dificultando o acesso rápido por parte da população e de pequenos gestores locais.

---

## Solução proposta

A **Guardiã do Fogo** é um aplicativo que utiliza dados simulados em formato compatível com bases de monitoramento por satélite, como INPE Queimadas e NASA FIRMS, para exibir focos de queimadas em mapa, classificar o nível de risco e apresentar alertas para o usuário.

No MVP acadêmico, os dados são simulados localmente para garantir a demonstração funcional da aplicação. A arquitetura foi planejada para permitir futura integração com APIs e bases públicas reais.

---

## Funcionalidades

* Painel ambiental com resumo dos focos ativos;
* Visualização de focos de queimadas em mapa;
* Classificação do risco em baixo, médio, alto e crítico;
* Lista de alertas inteligentes;
* Tela de detalhes de cada foco detectado;
* Exibição da fonte dos dados ambientais;
* Recomendações de segurança para situações de risco;
* Interface em português do Brasil;
* Aplicação preparada para uso mobile e web.

---

## Tecnologias utilizadas

* Flutter
* Dart
* FlutterFlow
* OpenStreetMap
* Dados simulados em JSON
* GitHub
* Figma ou FlutterFlow para prototipação visual

---

## Estrutura sugerida do projeto

```bash
guardia-do-fogo/
│
├── lib/
│   ├── main.dart
│   ├── models/
│   │   └── fire_hotspot.dart
│   ├── services/
│   │   ├── fire_service.dart
│   │   └── risk_service.dart
│   ├── screens/
│   │   ├── home_page.dart
│   │   ├── mapa_queimadas_page.dart
│   │   ├── alertas_page.dart
│   │   ├── detalhes_foco_page.dart
│   │   ├── fontes_dados_page.dart
│   │   └── sobre_projeto_page.dart
│   └── widgets/
│       ├── risk_card.dart
│       ├── alert_card.dart
│       └── hotspot_marker.dart
│
├── assets/
│   └── data/
│       └── fire_hotspots.json
│
├── docs/
│   ├── relatorio_tecnico.pdf
│   ├── bpmn.png
│   └── mockups.png
│
├── README.md
└── pubspec.yaml
```

---

## Modelo de dados

Exemplo de estrutura utilizada para representar um foco de queimada:

```json
{
  "id": 1,
  "city": "Belo Horizonte",
  "state": "MG",
  "latitude": -19.9167,
  "longitude": -43.9345,
  "satellite": "VIIRS",
  "source": "NASA FIRMS / INPE",
  "confidence": 87,
  "brightness": 321.5,
  "date": "08/06/2026",
  "time": "14:30",
  "distanceKm": 12,
  "risk": "Alto",
  "recommendation": "Mantenha-se informado e evite áreas com presença de fumaça."
}
```

---

## Regra de classificação de risco

A classificação de risco do MVP utiliza uma lógica simples, baseada na confiança da detecção e na distância aproximada do foco de queimada.

| Condição                                                          | Classificação |
| ----------------------------------------------------------------- | ------------- |
| Confiança maior ou igual a 90% e distância menor ou igual a 10 km | Crítico       |
| Confiança maior ou igual a 80% e distância menor ou igual a 15 km | Alto          |
| Confiança maior ou igual a 70% e distância menor ou igual a 25 km | Médio         |
| Demais casos                                                      | Baixo         |

---

## Telas principais

### Painel Ambiental

Apresenta um resumo da situação ambiental monitorada, com cards de focos ativos, alertas críticos, região monitorada e última atualização.

### Mapa de Queimadas

Exibe os focos de queimadas em um mapa ou visualização geográfica, permitindo identificar áreas de maior risco.

### Alertas

Lista os alertas gerados pela aplicação, informando local, nível de risco, horário e recomendação.

### Detalhes do Foco

Apresenta informações detalhadas sobre um foco específico, como cidade, estado, satélite, fonte dos dados, confiança da detecção e recomendação de segurança.

### Fontes de Dados

Explica as fontes previstas para evolução da solução, como INPE Queimadas, NASA FIRMS e The International Charter: Space and Major Disasters.

### Sobre o Projeto

Apresenta o objetivo acadêmico, o problema abordado, a solução proposta e o impacto esperado.

---

## Como executar o projeto

### Pré-requisitos

Antes de iniciar, é necessário ter instalado:

* Flutter SDK
* Dart
* Android Studio ou Visual Studio Code
* Git

### Passo a passo

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Acesse a pasta do projeto:

```bash
cd guardia-do-fogo
```

Instale as dependências:

```bash
flutter pub get
```

Execute o projeto:

```bash
flutter run
```

Para executar no navegador:

```bash
flutter run -d chrome
```

---

## Fontes de dados previstas

A versão MVP utiliza dados simulados. Em uma evolução futura, a aplicação poderá ser integrada com bases públicas reais, como:

* INPE — Programa Queimadas;
* NASA FIRMS;
* The International Charter: Space and Major Disasters;
* APIs climáticas e geoespaciais públicas.

---

## Impacto esperado

A solução busca apoiar a prevenção de queimadas e a conscientização ambiental por meio de uma interface simples, acessível e orientada por dados.

Entre os impactos esperados estão:

* Apoio à tomada de decisão rápida;
* Maior acesso da população a dados ambientais;
* Prevenção de riscos em áreas próximas a focos de queimadas;
* Uso de tecnologia espacial em benefício da sociedade;
* Apoio a órgãos ambientais e equipes de Defesa Civil.

---

## Entregáveis da Global Solution

* Relatório técnico;
* Vídeo pitch comercial;
* Vídeo de apresentação técnica;
* Código-fonte no GitHub;
* BPMN do processo principal;
* Mockups das telas principais.

---

## Autora

**Dayane Karine Costa**
RM: 550457
Turma: 3SIOA

---

## Status do projeto

Projeto acadêmico em desenvolvimento para a Global Solution 1 — Space Connect.

---

## Licença

Este projeto foi desenvolvido exclusivamente para fins acadêmicos.
