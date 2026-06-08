import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'recommendation_item_model.dart';
export 'recommendation_item_model.dart';

class RecommendationItemWidget extends StatefulWidget {
  const RecommendationItemWidget({
    super.key,
    String? text,
  }) : this.text = text ?? 'Evite se aproximar da área afetada.';

  final String text;

  @override
  State<RecommendationItemWidget> createState() =>
      _RecommendationItemWidgetState();
}

class _RecommendationItemWidgetState extends State<RecommendationItemWidget> {
  late RecommendationItemModel _model;

  @override
  void setState(VoidCallback callback) {
    super.setState(callback);
    _model.onUpdate();
  }

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => RecommendationItemModel());
  }

  @override
  void dispose() {
    _model.maybeDispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 0.0, 8.0),
      child: Row(
        mainAxisSize: MainAxisSize.max,
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(
            Icons.check_circle_outline_rounded,
            color: FlutterFlowTheme.of(context).success,
            size: 20.0,
          ),
          Expanded(
            flex: 1,
            child: Text(
              valueOrDefault<String>(
                widget!.text,
                'Evite se aproximar da área afetada.',
              ),
              style: FlutterFlowTheme.of(context).bodyMedium.override(
                    font: GoogleFonts.inter(
                      fontWeight:
                          FlutterFlowTheme.of(context).bodyMedium.fontWeight,
                      fontStyle:
                          FlutterFlowTheme.of(context).bodyMedium.fontStyle,
                    ),
                    color: FlutterFlowTheme.of(context).primaryText,
                    letterSpacing: 0.0,
                    fontWeight:
                        FlutterFlowTheme.of(context).bodyMedium.fontWeight,
                    fontStyle:
                        FlutterFlowTheme.of(context).bodyMedium.fontStyle,
                    lineHeight: 1.5,
                  ),
            ),
          ),
        ].divide(SizedBox(width: 16.0)),
      ),
    );
  }
}
