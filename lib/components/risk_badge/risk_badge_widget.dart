import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'risk_badge_model.dart';
export 'risk_badge_model.dart';

class RiskBadgeWidget extends StatefulWidget {
  const RiskBadgeWidget({
    super.key,
    Color? bgColor,
    String? label,
    Color? textColor,
  })  : this.bgColor = bgColor ?? const Color(0x00000000),
        this.label = label ?? 'CRÍTICO',
        this.textColor = textColor ?? const Color(0x00000000);

  final Color bgColor;
  final String label;
  final Color textColor;

  @override
  State<RiskBadgeWidget> createState() => _RiskBadgeWidgetState();
}

class _RiskBadgeWidgetState extends State<RiskBadgeWidget> {
  late RiskBadgeModel _model;

  @override
  void setState(VoidCallback callback) {
    super.setState(callback);
    _model.onUpdate();
  }

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => RiskBadgeModel());
  }

  @override
  void dispose() {
    _model.maybeDispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: valueOrDefault<Color>(
          widget!.bgColor,
          FlutterFlowTheme.of(context).error,
        ),
        borderRadius: BorderRadius.circular(9999.0),
        shape: BoxShape.rectangle,
      ),
      child: Padding(
        padding: EdgeInsetsDirectional.fromSTEB(16.0, 4.0, 16.0, 4.0),
        child: Container(
          child: Text(
            valueOrDefault<String>(
              widget!.label,
              'CRÍTICO',
            ),
            style: FlutterFlowTheme.of(context).labelSmall.override(
                  font: GoogleFonts.inter(
                    fontWeight: FontWeight.bold,
                    fontStyle:
                        FlutterFlowTheme.of(context).labelSmall.fontStyle,
                  ),
                  color: valueOrDefault<Color>(
                    widget!.textColor,
                    FlutterFlowTheme.of(context).onPrimary,
                  ),
                  letterSpacing: 0.0,
                  fontWeight: FontWeight.bold,
                  fontStyle: FlutterFlowTheme.of(context).labelSmall.fontStyle,
                  lineHeight: 1.2,
                ),
          ),
        ),
      ),
    );
  }
}
