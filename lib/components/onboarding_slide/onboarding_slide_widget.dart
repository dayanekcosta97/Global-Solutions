import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import 'dart:ui';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'onboarding_slide_model.dart';
export 'onboarding_slide_model.dart';

class OnboardingSlideWidget extends StatefulWidget {
  const OnboardingSlideWidget({
    super.key,
    String? description,
    String? imgDesc,
    String? title,
  })  : this.description = description ??
            'A Guardiã do Fogo utiliza dados de satélite para apoiar o monitoramento de queimadas e áreas de risco.',
        this.imgDesc = imgDesc ??
            'https://dimg.dreamflow.cloud/v1/image/satellite%20orbiting%20earth%20forest%20fire%20monitoring%20digital%20illustration',
        this.title =
            title ?? 'Tecnologia espacial para proteger o meio ambiente';

  final String description;
  final String imgDesc;
  final String title;

  @override
  State<OnboardingSlideWidget> createState() => _OnboardingSlideWidgetState();
}

class _OnboardingSlideWidgetState extends State<OnboardingSlideWidget> {
  late OnboardingSlideModel _model;

  @override
  void setState(VoidCallback callback) {
    super.setState(callback);
    _model.onUpdate();
  }

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => OnboardingSlideModel());
  }

  @override
  void dispose() {
    _model.maybeDispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        ClipRRect(
          borderRadius: BorderRadius.circular(24.0),
          child: Container(
            width: 320.0,
            height: 320.0,
            decoration: BoxDecoration(
              color: FlutterFlowTheme.of(context).surfaceVariant,
              borderRadius: BorderRadius.circular(24.0),
              shape: BoxShape.rectangle,
            ),
            child: CachedNetworkImage(
              fadeInDuration: Duration(milliseconds: 0),
              fadeOutDuration: Duration(milliseconds: 0),
              imageUrl: valueOrDefault<String>(
                widget!.imgDesc,
                'https://dimg.dreamflow.cloud/v1/image/satellite%20orbiting%20earth%20forest%20fire%20monitoring%20digital%20illustration',
              ),
              fit: BoxFit.cover,
              alignment: Alignment(0.0, 0.0),
            ),
          ),
        ),
        Padding(
          padding: EdgeInsetsDirectional.fromSTEB(32.0, 0.0, 32.0, 0.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                valueOrDefault<String>(
                  widget!.title,
                  'Tecnologia espacial para proteger o meio ambiente',
                ),
                textAlign: TextAlign.center,
                style: FlutterFlowTheme.of(context).headlineMedium.override(
                      font: GoogleFonts.outfit(
                        fontWeight: FontWeight.bold,
                        fontStyle: FlutterFlowTheme.of(context)
                            .headlineMedium
                            .fontStyle,
                      ),
                      color: FlutterFlowTheme.of(context).primaryText,
                      letterSpacing: 0.0,
                      fontWeight: FontWeight.bold,
                      fontStyle:
                          FlutterFlowTheme.of(context).headlineMedium.fontStyle,
                      lineHeight: 1.3,
                    ),
              ),
              Text(
                valueOrDefault<String>(
                  widget!.description,
                  'A Guardiã do Fogo utiliza dados de satélite para apoiar o monitoramento de queimadas e áreas de risco.',
                ),
                textAlign: TextAlign.center,
                style: FlutterFlowTheme.of(context).bodyLarge.override(
                      font: GoogleFonts.inter(
                        fontWeight:
                            FlutterFlowTheme.of(context).bodyLarge.fontWeight,
                        fontStyle:
                            FlutterFlowTheme.of(context).bodyLarge.fontStyle,
                      ),
                      color: FlutterFlowTheme.of(context).secondaryText,
                      letterSpacing: 0.0,
                      fontWeight:
                          FlutterFlowTheme.of(context).bodyLarge.fontWeight,
                      fontStyle:
                          FlutterFlowTheme.of(context).bodyLarge.fontStyle,
                      lineHeight: 1.5,
                    ),
              ),
            ].divide(SizedBox(height: 16.0)),
          ),
        ),
      ].divide(SizedBox(height: 24.0)),
    );
  }
}
