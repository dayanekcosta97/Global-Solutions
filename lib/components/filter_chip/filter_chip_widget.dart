import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'filter_chip_model.dart';
export 'filter_chip_model.dart';

class FilterChipWidget extends StatefulWidget {
  const FilterChipWidget({
    super.key,
    Color? color,
    String? label,
    String? selected,
  })  : this.color = color ?? const Color(0x00000000),
        this.label = label ?? 'Todos',
        this.selected = selected ?? 'true';

  final Color color;
  final String label;
  final String selected;

  @override
  State<FilterChipWidget> createState() => _FilterChipWidgetState();
}

class _FilterChipWidgetState extends State<FilterChipWidget> {
  late FilterChipModel _model;

  @override
  void setState(VoidCallback callback) {
    super.setState(callback);
    _model.onUpdate();
  }

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => FilterChipModel());
  }

  @override
  void dispose() {
    _model.maybeDispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsetsDirectional.fromSTEB(0.0, 0.0, 8.0, 0.0),
      child: Container(
        child: Container(
          decoration: BoxDecoration(
            color: valueOrDefault<Color>(
              valueOrDefault<String>(
                        widget!.selected,
                        'true',
                      ) ==
                      'false'
                  ? FlutterFlowTheme.of(context).secondaryBackground
                  : Color(0x00000000),
              FlutterFlowTheme.of(context).primary,
            ),
            borderRadius: BorderRadius.circular(9999.0),
            shape: BoxShape.rectangle,
            border: Border.all(
              color: valueOrDefault<Color>(
                valueOrDefault<String>(
                              widget!.selected,
                              'true',
                            ) !=
                            null &&
                        valueOrDefault<String>(
                              widget!.selected,
                              'true',
                            ) !=
                            ''
                    ? Color(0x00000000)
                    : FlutterFlowTheme.of(context).alternate,
                FlutterFlowTheme.of(context).primary,
              ),
              width: 1.0,
            ),
          ),
          child: Padding(
            padding: EdgeInsetsDirectional.fromSTEB(24.0, 8.0, 24.0, 8.0),
            child: Container(
              child: Row(
                mainAxisSize: MainAxisSize.min,
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Container(
                    width: 8.0,
                    height: 8.0,
                    decoration: BoxDecoration(
                      color: valueOrDefault<Color>(
                        valueOrDefault<String>(
                                  widget!.selected,
                                  'true',
                                ) ==
                                'false'
                            ? Color(0x00000000)
                            : FlutterFlowTheme.of(context).onPrimary,
                        FlutterFlowTheme.of(context).onPrimary,
                      ),
                      borderRadius: BorderRadius.circular(9999.0),
                      shape: BoxShape.rectangle,
                    ),
                  ),
                  Text(
                    valueOrDefault<String>(
                      widget!.label,
                      'Todos',
                    ),
                    style: FlutterFlowTheme.of(context).labelLarge.override(
                          font: GoogleFonts.inter(
                            fontWeight: FlutterFlowTheme.of(context)
                                .labelLarge
                                .fontWeight,
                            fontStyle: FlutterFlowTheme.of(context)
                                .labelLarge
                                .fontStyle,
                          ),
                          color: valueOrDefault<Color>(
                            valueOrDefault<String>(
                                      widget!.selected,
                                      'true',
                                    ) ==
                                    'false'
                                ? FlutterFlowTheme.of(context).primaryText
                                : FlutterFlowTheme.of(context).onPrimary,
                            FlutterFlowTheme.of(context).onPrimary,
                          ),
                          letterSpacing: 0.0,
                          fontWeight: FlutterFlowTheme.of(context)
                              .labelLarge
                              .fontWeight,
                          fontStyle:
                              FlutterFlowTheme.of(context).labelLarge.fontStyle,
                          lineHeight: 1.4,
                        ),
                  ),
                ].divide(SizedBox(width: 4.0)),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
