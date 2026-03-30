import 'package:flutter_test/flutter_test.dart';

import 'package:mazi_mobile/app.dart';

void main() {
  testWidgets('home screen renders', (WidgetTester tester) async {
    await tester.pumpWidget(const MaziApp());
    await tester.pumpAndSettle();

    expect(find.text('Parfum Shop'), findsOneWidget);
    expect(find.text('Pickup'), findsOneWidget);
  });
}
