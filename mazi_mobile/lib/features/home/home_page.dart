import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _openFaqIndex = 0;

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    final isTablet = width >= 700;
    final isDesktop = width >= 1100;
    final horizontalPadding = isDesktop ? 64.0 : (isTablet ? 32.0 : 16.0);
    final titleSize = isDesktop ? 72.0 : (isTablet ? 56.0 : 44.0);
    final sectionTitleSize = isDesktop ? 56.0 : (isTablet ? 44.0 : 34.0);

    return Scaffold(
      backgroundColor: const Color(0xFFF9FBFB),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Container(
                height: 10,
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Color(0xFFF3FCF7), Color(0xFFDFF6EA)],
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(horizontalPadding, 52, horizontalPadding, 48),
                child: Column(
                  children: [
                    Text(
                      'Mazi',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: titleSize,
                        fontWeight: FontWeight.w800,
                        height: 0.9,
                        letterSpacing: -2,
                      ),
                    ),
                    const SizedBox(height: 14),
                    ConstrainedBox(
                      constraints: const BoxConstraints(maxWidth: 680),
                      child: Text(
                        'Your one-stop shop for your food and groceries',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: isDesktop ? 34 : (isTablet ? 28 : 22),
                          color: const Color(0xFF546073),
                          height: 1.25,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                    const SizedBox(height: 26),
                    Wrap(
                      spacing: 12,
                      runSpacing: 10,
                      alignment: WrapAlignment.center,
                      children: [
                        _storeButton('Download on iOS', dark: true, fullWidth: !isTablet),
                        _storeButton('Get it on Google Play', dark: true, fullWidth: !isTablet),
                      ],
                    ),
                    const SizedBox(height: 18),
                    const Text(
                      'Become a Vendor ->',
                      style: TextStyle(
                        color: Color(0xFF058B47),
                        fontWeight: FontWeight.w700,
                        decoration: TextDecoration.underline,
                      ),
                    ),
                  ],
                ),
              ),
              _section(
                padding: EdgeInsets.fromLTRB(horizontalPadding, 56, horizontalPadding, 64),
                child: Column(
                  children: [
                    _sectionHeading(
                      'Partner with Mazi',
                      'Join our growing network of restaurants and grocery stores. Expand your reach and serve more customers with our seamless delivery platform.',
                      sectionTitleSize,
                      isDesktop,
                      isTablet,
                    ),
                    const SizedBox(height: 30),
                    _responsiveGrid(
                      width: width - (horizontalPadding * 2),
                      columnsDesktop: 3,
                      columnsTablet: 2,
                      children: const [
                        _FeatureCard(
                          title: 'Grow your customer base',
                          text: 'Attract new customers and build repeat orders from your neighborhood.',
                          icon: Icons.trending_up_rounded,
                        ),
                        _FeatureCard(
                          title: 'Reach thousands of users',
                          text: 'Show up where active buyers are already searching for food and groceries.',
                          icon: Icons.groups_2_outlined,
                        ),
                        _FeatureCard(
                          title: 'Increase your revenue',
                          text: 'Grow sales with a reliable delivery channel that scales with your business.',
                          icon: Icons.bar_chart_rounded,
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              _section(
                background: const Color(0xFFEEFAF4),
                padding: EdgeInsets.fromLTRB(horizontalPadding, 56, horizontalPadding, 56),
                child: Column(
                  children: [
                    _sectionHeading(
                      'Why Choose Mazi',
                      'Experience convenience and quality with every order',
                      sectionTitleSize,
                      isDesktop,
                      isTablet,
                    ),
                    const SizedBox(height: 30),
                    _responsiveGrid(
                      width: width - (horizontalPadding * 2),
                      columnsDesktop: 3,
                      columnsTablet: 2,
                      children: const [
                        _FeatureCard(title: 'Fast Delivery', text: 'Get your food and groceries delivered quickly to your doorstep.', icon: Icons.flash_on_rounded),
                        _FeatureCard(title: 'All-in-One Platform', text: 'Order from restaurants and grocery stores in one place.', icon: Icons.storefront_outlined),
                        _FeatureCard(title: 'Easy Ordering', text: 'Simple and smooth user experience for quick checkout.', icon: Icons.touch_app_outlined),
                        _FeatureCard(title: 'Vendor Opportunities', text: 'Grow your business by joining as a vendor.', icon: Icons.business_center_outlined),
                        _FeatureCard(title: 'Real-Time Tracking', text: 'Track your orders from preparation to delivery.', icon: Icons.location_searching_rounded),
                        _FeatureCard(title: 'Convenience First', text: 'Built to save time and reduce stress.', icon: Icons.schedule_rounded),
                      ],
                    ),
                  ],
                ),
              ),
              _section(
                background: const Color(0xFFEEFAF4),
                padding: EdgeInsets.fromLTRB(horizontalPadding, 16, horizontalPadding, 56),
                child: LayoutBuilder(
                  builder: (context, constraints) {
                    final stack = constraints.maxWidth < 880;
                    if (stack) {
                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          _AboutCopy(),
                          SizedBox(height: 16),
                          _AboutVisual(),
                        ],
                      );
                    }
                    return Row(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Expanded(child: _AboutCopy()),
                        SizedBox(width: 18),
                        Expanded(child: _AboutVisual()),
                      ],
                    );
                  },
                ),
              ),
              _section(
                background: const Color(0xFFEEFAF4),
                padding: EdgeInsets.fromLTRB(horizontalPadding, 8, horizontalPadding, 56),
                child: Column(
                  children: [
                    _sectionHeading(
                      'What Our Users Say',
                      'Join thousands of happy customers',
                      sectionTitleSize,
                      isDesktop,
                      isTablet,
                    ),
                    const SizedBox(height: 30),
                    _responsiveGrid(
                      width: width - (horizontalPadding * 2),
                      columnsDesktop: 3,
                      columnsTablet: 2,
                      children: const [
                        _ReviewCard(
                          quote: '"Mazi has completely changed how I shop for groceries. The delivery is always on time and the products are fresh."',
                          name: 'Sarah Johnson',
                          role: 'Regular Customer',
                        ),
                        _ReviewCard(
                          quote: '"I love that I can order from my favorite restaurants and get groceries in the same app. The interface is clean and super easy to use."',
                          name: 'Michael Chen',
                          role: 'Food Enthusiast',
                        ),
                        _ReviewCard(
                          quote: '"As someone with a hectic schedule, Mazi is a lifesaver. Fast delivery, great selection, and excellent service."',
                          name: 'Emma Williams',
                          role: 'Busy Professional',
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(horizontalPadding, 56, horizontalPadding, 0),
                child: Column(
                  children: [
                    _sectionHeading(
                      'Frequently Asked Questions',
                      'Everything you need to know about Mazi',
                      sectionTitleSize,
                      isDesktop,
                      isTablet,
                    ),
                    const SizedBox(height: 28),
                    ...List.generate(_faqItems.length, (index) {
                      final item = _faqItems[index];
                      final isOpen = _openFaqIndex == index;
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 12),
                        child: Material(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          child: InkWell(
                            borderRadius: BorderRadius.circular(16),
                            onTap: () {
                              setState(() {
                                _openFaqIndex = isOpen ? -1 : index;
                              });
                            },
                            child: Container(
                              decoration: BoxDecoration(
                                border: Border.all(color: const Color(0xFFDCE6DF)),
                                borderRadius: BorderRadius.circular(16),
                              ),
                              padding: const EdgeInsets.fromLTRB(16, 18, 16, 18),
                              child: Column(
                                children: [
                                  Row(
                                    children: [
                                      Expanded(
                                        child: Text(
                                          item.question,
                                          style: TextStyle(
                                            fontSize: isTablet ? 22 : 19,
                                            fontWeight: FontWeight.w700,
                                          ),
                                        ),
                                      ),
                                      Icon(
                                        isOpen ? Icons.remove : Icons.add,
                                        color: const Color(0xFF6B7482),
                                      ),
                                    ],
                                  ),
                                  if (isOpen) ...[
                                    const SizedBox(height: 12),
                                    const Divider(height: 1),
                                    const SizedBox(height: 12),
                                    Text(
                                      item.answer,
                                      style: const TextStyle(
                                        color: Color(0xFF5C6778),
                                        height: 1.6,
                                        fontSize: 15.5,
                                      ),
                                    ),
                                  ],
                                ],
                              ),
                            ),
                          ),
                        ),
                      );
                    }),
                  ],
                ),
              ),
              Container(
                margin: const EdgeInsets.only(top: 42),
                padding: EdgeInsets.fromLTRB(horizontalPadding, 56, horizontalPadding, 56),
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Color(0xFF07A451), Color(0xFF10B962), Color(0xFF1ACB76)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                ),
                child: Column(
                  children: [
                    Text(
                      'Start ordering smarter with Mazi today',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: isDesktop ? 62 : (isTablet ? 48 : 38),
                        fontWeight: FontWeight.w800,
                        color: Colors.white,
                        height: 0.98,
                        letterSpacing: -1.5,
                      ),
                    ),
                    const SizedBox(height: 14),
                    Text(
                      'Join thousands of users enjoying fast, convenient delivery',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: isTablet ? 20 : 17,
                        color: Colors.white.withOpacity(0.92),
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(height: 26),
                    Wrap(
                      spacing: 12,
                      runSpacing: 10,
                      alignment: WrapAlignment.center,
                      children: [
                        _storeButton('Download on iOS', dark: false, fullWidth: !isTablet),
                        _storeButton('Get it on Google Play', dark: false, fullWidth: !isTablet),
                      ],
                    ),
                  ],
                ),
              ),
              Container(
                color: const Color(0xFF071633),
                padding: EdgeInsets.fromLTRB(horizontalPadding, 42, horizontalPadding, 24),
                child: Column(
                  children: [
                    LayoutBuilder(
                      builder: (context, constraints) {
                        final mobile = constraints.maxWidth < 780;
                        if (mobile) {
                          return Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              _FooterBrand(),
                              SizedBox(height: 22),
                              _FooterLinks(title: 'Quick Links', links: ['Home', 'Features', 'Become a Vendor', 'Contact']),
                              SizedBox(height: 22),
                              _FooterLinks(title: 'Support', links: ['FAQ', 'Help Center', 'Privacy Policy', 'Terms of Service']),
                              SizedBox(height: 22),
                              _FooterSocial(),
                            ],
                          );
                        }
                        return Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(flex: 2, child: _FooterBrand()),
                            Expanded(child: _FooterLinks(title: 'Quick Links', links: ['Home', 'Features', 'Become a Vendor', 'Contact'])),
                            Expanded(child: _FooterLinks(title: 'Support', links: ['FAQ', 'Help Center', 'Privacy Policy', 'Terms of Service'])),
                            Expanded(child: _FooterSocial()),
                          ],
                        );
                      },
                    ),
                    const SizedBox(height: 24),
                    Divider(color: Colors.white.withOpacity(0.08), height: 1),
                    const SizedBox(height: 18),
                    Text(
                      '© ${DateTime.now().year} Mazi. All rights reserved.',
                      style: const TextStyle(color: Color(0xFF98A5BB), fontSize: 14),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _section({required Widget child, EdgeInsets? padding, Color? background}) {
    return Container(
      color: background,
      padding: padding,
      child: child,
    );
  }

  Widget _sectionHeading(
    String title,
    String subtitle,
    double sectionTitleSize,
    bool isDesktop,
    bool isTablet,
  ) {
    return Column(
      children: [
        Text(
          title,
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: sectionTitleSize,
            fontWeight: FontWeight.w800,
            letterSpacing: -1.4,
            height: 0.98,
          ),
        ),
        const SizedBox(height: 14),
        ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 760),
          child: Text(
            subtitle,
            textAlign: TextAlign.center,
            style: TextStyle(
              color: const Color(0xFF626D7D),
              fontSize: isDesktop ? 30 : (isTablet ? 24 : 18),
              height: 1.34,
              fontWeight: FontWeight.w500,
            ),
          ),
        ),
      ],
    );
  }

  Widget _responsiveGrid({
    required double width,
    required int columnsDesktop,
    required int columnsTablet,
    required List<Widget> children,
  }) {
    final columns = width >= 1100
        ? columnsDesktop
        : width >= 700
            ? columnsTablet
            : 1;
    const gap = 16.0;
    final cardWidth = (width - ((columns - 1) * gap)) / columns;

    return Wrap(
      spacing: gap,
      runSpacing: gap,
      children: children
          .map(
            (child) => SizedBox(
              width: cardWidth,
              child: child,
            ),
          )
          .toList(),
    );
  }

  Widget _storeButton(String label, {required bool dark, required bool fullWidth}) {
    return SizedBox(
      width: fullWidth ? 360 : null,
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          elevation: dark ? 4 : 2,
          minimumSize: const Size(196, 62),
          backgroundColor: dark ? const Color(0xFF080B12) : Colors.white,
          foregroundColor: dark ? Colors.white : const Color(0xFF101828),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
            side: BorderSide(color: dark ? const Color(0xFF161D2C) : const Color(0xFFD6DDE5)),
          ),
          textStyle: const TextStyle(fontWeight: FontWeight.w700, fontSize: 16),
        ),
        onPressed: () {},
        child: Text(label),
      ),
    );
  }
}

class _FeatureCard extends StatelessWidget {
  const _FeatureCard({
    required this.title,
    required this.text,
    required this.icon,
  });

  final String title;
  final String text;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFFF2FAF5),
        border: Border.all(color: const Color(0xFFDDEAE3)),
        borderRadius: BorderRadius.circular(18),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 50,
            height: 50,
            decoration: BoxDecoration(
              color: const Color(0xFFD8F1E4),
              borderRadius: BorderRadius.circular(14),
            ),
            child: Icon(icon, color: const Color(0xFF0B9950)),
          ),
          const SizedBox(height: 14),
          Text(
            title,
            style: TextStyle(
              fontSize: width >= 1100 ? 38 : (width >= 700 ? 30 : 25),
              fontWeight: FontWeight.w800,
              height: 1.05,
              letterSpacing: -0.6,
            ),
          ),
          const SizedBox(height: 10),
          Text(
            text,
            style: const TextStyle(
              color: Color(0xFF5E6878),
              fontSize: 16,
              height: 1.55,
            ),
          ),
        ],
      ),
    );
  }
}

class _AboutCopy extends StatelessWidget {
  const _AboutCopy();

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'About Mazi',
          style: TextStyle(
            fontSize: width >= 1100 ? 56 : (width >= 700 ? 44 : 34),
            fontWeight: FontWeight.w800,
            letterSpacing: -1.2,
            height: 0.98,
          ),
        ),
        const SizedBox(height: 12),
        const Text(
          'Mazi was created to make your life easier. We understand that your time is valuable, and getting quality food and groceries should not be a hassle.',
          style: TextStyle(color: Color(0xFF5C6778), fontSize: 16, height: 1.7),
        ),
        const SizedBox(height: 10),
        const Text(
          'Our platform brings together the best restaurants and grocery stores in your area, offering fast delivery, transparent pricing, and an exceptional user experience.',
          style: TextStyle(color: Color(0xFF5C6778), fontSize: 16, height: 1.7),
        ),
      ],
    );
  }
}

class _AboutVisual extends StatelessWidget {
  const _AboutVisual();

  @override
  Widget build(BuildContext context) {
    return Container(
      constraints: const BoxConstraints(minHeight: 300),
      decoration: BoxDecoration(
        color: const Color(0xFFD5F4E5),
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: const Color(0xFFD7EADD)),
      ),
      child: const Center(
        child: Text(
          'Fresh. Fast. Convenient.',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.w700,
            color: Color(0xFF0C7E47),
          ),
        ),
      ),
    );
  }
}

class _ReviewCard extends StatelessWidget {
  const _ReviewCard({
    required this.quote,
    required this.name,
    required this.role,
  });

  final String quote;
  final String name;
  final String role;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: const Color(0xFFE1E9E4)),
        borderRadius: BorderRadius.circular(18),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('★★★★★', style: TextStyle(color: Color(0xFF06AE57), letterSpacing: 2, fontSize: 17)),
          const SizedBox(height: 10),
          Text(quote, style: const TextStyle(color: Color(0xFF5E6878), fontSize: 15.5, height: 1.6)),
          const SizedBox(height: 12),
          Text(name, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 22)),
          const SizedBox(height: 4),
          Text(role, style: const TextStyle(color: Color(0xFF768193))),
        ],
      ),
    );
  }
}

class _FooterBrand extends StatelessWidget {
  const _FooterBrand();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Mazi', style: TextStyle(color: Colors.white, fontSize: 30, fontWeight: FontWeight.w700)),
        SizedBox(height: 10),
        Text('Your one-stop shop for food and groceries', style: TextStyle(color: Color(0xFFA2ACBE), height: 1.5)),
      ],
    );
  }
}

class _FooterLinks extends StatelessWidget {
  const _FooterLinks({required this.title, required this.links});

  final String title;
  final List<String> links;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: const TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w700)),
        const SizedBox(height: 8),
        ...links.map(
          (item) => Padding(
            padding: const EdgeInsets.only(top: 8),
            child: Text(item, style: const TextStyle(color: Color(0xFFA1ABBE))),
          ),
        ),
      ],
    );
  }
}

class _FooterSocial extends StatelessWidget {
  const _FooterSocial();

  @override
  Widget build(BuildContext context) {
    Widget bubble(String text) => Container(
          width: 36,
          height: 36,
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.1),
            borderRadius: BorderRadius.circular(18),
          ),
          alignment: Alignment.center,
          child: Text(text, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 12)),
        );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Follow Us', style: TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w700)),
        const SizedBox(height: 12),
        Row(children: [bubble('f'), const SizedBox(width: 8), bubble('x'), const SizedBox(width: 8), bubble('ig'), const SizedBox(width: 8), bubble('in')]),
      ],
    );
  }
}

class _FaqItem {
  const _FaqItem(this.question, this.answer);

  final String question;
  final String answer;
}

const _faqItems = [
  _FaqItem(
    'How does Mazi work?',
    'Simply download the Mazi app, browse restaurants and grocery stores in your area, add items to your cart, and checkout. Our delivery partners bring your order to your doorstep.',
  ),
  _FaqItem(
    'How fast is delivery?',
    'Delivery times vary depending on your location and the merchant, but most orders arrive within 30-45 minutes.',
  ),
  _FaqItem(
    'Can I track my order?',
    'Yes. Once your order is confirmed, you can track it in real-time from preparation to delivery.',
  ),
  _FaqItem(
    'How do I become a vendor?',
    'Click the Register as Vendor button and submit your business details. Our team reviews applications within 2-3 business days.',
  ),
  _FaqItem(
    'Is the app free?',
    'Yes. Downloading and using the Mazi app is free. You only pay for your orders and any delivery fees where applicable.',
  ),
];
