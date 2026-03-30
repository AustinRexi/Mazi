import 'package:flutter/material.dart';

import 'features/home/home_page.dart';

class MaziApp extends StatelessWidget {
  const MaziApp({super.key});

  @override
  Widget build(BuildContext context) {
    const scaffoldColor = Color(0xFF1C1C1E);
    const cardColor = Color(0xFF2A2A2D);
    const accentColor = Color(0xFFF5C66A);

    return MaterialApp(
      title: 'Parfum Shop',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: scaffoldColor,
        colorScheme: const ColorScheme.dark(
          primary: accentColor,
          secondary: accentColor,
          surface: cardColor,
          background: scaffoldColor,
        ),
        appBarTheme: const AppBarTheme(
          backgroundColor: scaffoldColor,
          elevation: 0,
          centerTitle: true,
          titleTextStyle: TextStyle(
            color: Colors.white,
            fontSize: 20,
            fontWeight: FontWeight.w700,
          ),
        ),
        useMaterial3: true,
      ),
      home: const HomePage(),
    );
  }
}
