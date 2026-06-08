import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'page_indicator_model.dart';
export 'page_indicator_model.dart';

class PageIndicatorWidget extends StatefulWidget {
  const PageIndicatorWidget({
    super.key,
    String? active,
  }) : this.active = active ?? 'option_1';

  final String active;

  @override
  State<PageIndicatorWidget> createState() => _PageIndicatorWidgetState();
}

class _PageIndicatorWidgetState extends State<PageIndicatorWidget> {
  late PageIndicatorModel _model;

  @override
  void setState(VoidCallback callback) {
    super.setState(callback);
    _model.onUpdate();
  }

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => PageIndicatorModel());
  }

  @override
  void dispose() {
    _model.maybeDispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Container(
          width: valueOrDefault<double>(
            () {
              if (valueOrDefault<String>(
                    widget!.active,
                    'option_1',
                  ) ==
                  'option_2') {
                return 8.0;
              } else if (valueOrDefault<String>(
                    widget!.active,
                    'option_1',
                  ) ==
                  'option_3') {
                return 8.0;
              } else {
                return 24.0;
              }
            }(),
            24.0,
          ),
          height: 8.0,
          decoration: BoxDecoration(
            color: valueOrDefault<Color>(
              () {
                if (valueOrDefault<String>(
                      widget!.active,
                      'option_1',
                    ) ==
                    'option_2') {
                  return FlutterFlowTheme.of(context).alternate;
                } else if (valueOrDefault<String>(
                      widget!.active,
                      'option_1',
                    ) ==
                    'option_3') {
                  return FlutterFlowTheme.of(context).alternate;
                } else {
                  return FlutterFlowTheme.of(context).primary;
                }
              }(),
              FlutterFlowTheme.of(context).primary,
            ),
            borderRadius: BorderRadius.circular(9999.0),
            shape: BoxShape.rectangle,
          ),
        ),
        Container(
          width: valueOrDefault<double>(
            valueOrDefault<String>(
                      widget!.active,
                      'option_1',
                    ) ==
                    'option_2'
                ? 24.0
                : 8.0,
            8.0,
          ),
          height: 8.0,
          decoration: BoxDecoration(
            color: valueOrDefault<Color>(
              valueOrDefault<String>(
                        widget!.active,
                        'option_1',
                      ) ==
                      'option_2'
                  ? FlutterFlowTheme.of(context).primary
                  : FlutterFlowTheme.of(context).alternate,
              FlutterFlowTheme.of(context).alternate,
            ),
            borderRadius: BorderRadius.circular(9999.0),
            shape: BoxShape.rectangle,
          ),
        ),
        Container(
          width: valueOrDefault<double>(
            valueOrDefault<String>(
                      widget!.active,
                      'option_1',
                    ) ==
                    'option_3'
                ? 24.0
                : 8.0,
            8.0,
          ),
          height: 8.0,
          decoration: BoxDecoration(
            color: valueOrDefault<Color>(
              valueOrDefault<String>(
                        widget!.active,
                        'option_1',
                      ) ==
                      'option_3'
                  ? FlutterFlowTheme.of(context).primary
                  : FlutterFlowTheme.of(context).alternate,
              FlutterFlowTheme.of(context).alternate,
            ),
            borderRadius: BorderRadius.circular(9999.0),
            shape: BoxShape.rectangle,
          ),
        ),
      ].divide(SizedBox(width: 4.0)),
    );
  }
}
