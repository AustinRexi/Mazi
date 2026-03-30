import 'package:flutter/material.dart';

import 'data/home_repository.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late final Future<HomeFeed> _feedFuture;
  int _selectedCategoryIndex = 0;
  bool _pickup = true;
  int _currentBottomIndex = 0;

  @override
  void initState() {
    super.initState();
    _feedFuture = HomeRepository().loadHomeFeed();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<HomeFeed>(
      future: _feedFuture,
      builder: (context, snapshot) {
        final feed = snapshot.data ??
            const HomeFeed(categories: _fallbackCategories, products: _fallbackProducts);

        return Scaffold(
          bottomNavigationBar: BottomNavigationBar(
            backgroundColor: const Color(0xFF121214),
            currentIndex: _currentBottomIndex,
            selectedItemColor: const Color(0xFFF5C66A),
            unselectedItemColor: Colors.white60,
            type: BottomNavigationBarType.fixed,
            onTap: (value) {
              setState(() {
                _currentBottomIndex = value;
              });
            },
            items: const [
              BottomNavigationBarItem(
                icon: Icon(Icons.grid_view_rounded),
                label: 'Catalog',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.person_outline),
                label: 'Profile',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.favorite_border),
                label: 'Favorites',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.shopping_bag_outlined),
                label: 'Cart',
              ),
            ],
          ),
          body: SafeArea(
            child: CustomScrollView(
              slivers: [
                SliverAppBar(
                  pinned: true,
                  backgroundColor: const Color(0xFF1C1C1E),
                  leading: IconButton(
                    onPressed: () {},
                    icon: const Icon(Icons.menu_rounded),
                  ),
                  title: const Text('Parfum Shop'),
                  actions: [
                    IconButton(
                      onPressed: () {},
                      icon: const Icon(Icons.search_rounded),
                    ),
                  ],
                ),
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(12, 8, 12, 0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _ModeSwitcher(
                          pickup: _pickup,
                          onChanged: (value) {
                            setState(() {
                              _pickup = value;
                            });
                          },
                        ),
                        const SizedBox(height: 12),
                        const _LocationCard(),
                        const SizedBox(height: 12),
                        const _NoticeBanner(),
                        const SizedBox(height: 14),
                        const _PromoBanner(),
                        const SizedBox(height: 14),
                      ],
                    ),
                  ),
                ),
                SliverPersistentHeader(
                  pinned: true,
                  delegate: _CategoryHeaderDelegate(
                    minExtent: 58,
                    maxExtent: 58,
                    child: Container(
                      color: const Color(0xFF1C1C1E),
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      child: ListView.separated(
                        scrollDirection: Axis.horizontal,
                        itemBuilder: (context, index) {
                          final category = feed.categories[index];
                          final selected = _selectedCategoryIndex == index;
                          return ChoiceChip(
                            selected: selected,
                            label: Text(category.label),
                            onSelected: (_) {
                              setState(() {
                                _selectedCategoryIndex = index;
                              });
                            },
                            backgroundColor: const Color(0xFF262628),
                            selectedColor: const Color(0xFFF5C66A),
                            labelStyle: TextStyle(
                              color: selected ? Colors.black : Colors.white,
                              fontWeight: FontWeight.w700,
                            ),
                            side: BorderSide.none,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(14),
                            ),
                          );
                        },
                        separatorBuilder: (_, __) => const SizedBox(width: 10),
                        itemCount: feed.categories.length,
                      ),
                    ),
                  ),
                ),
                SliverPadding(
                  padding: const EdgeInsets.fromLTRB(12, 8, 12, 24),
                  sliver: SliverGrid(
                    delegate: SliverChildBuilderDelegate(
                      (context, index) => _ProductCard(item: feed.products[index]),
                      childCount: feed.products.length,
                    ),
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      mainAxisSpacing: 12,
                      crossAxisSpacing: 12,
                      childAspectRatio: 0.68,
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

class _ModeSwitcher extends StatelessWidget {
  const _ModeSwitcher({
    required this.pickup,
    required this.onChanged,
  });

  final bool pickup;
  final ValueChanged<bool> onChanged;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF2A2A2D),
        borderRadius: BorderRadius.circular(18),
      ),
      padding: const EdgeInsets.all(4),
      child: Row(
        children: [
          Expanded(
            child: _ModeButton(
              label: 'Delivery',
              active: !pickup,
              onTap: () => onChanged(false),
            ),
          ),
          Expanded(
            child: _ModeButton(
              label: 'Pickup',
              active: pickup,
              onTap: () => onChanged(true),
            ),
          ),
        ],
      ),
    );
  }
}

class _ModeButton extends StatelessWidget {
  const _ModeButton({
    required this.label,
    required this.active,
    required this.onTap,
  });

  final String label;
  final bool active;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 180),
        curve: Curves.easeOut,
        padding: const EdgeInsets.symmetric(vertical: 16),
        decoration: BoxDecoration(
          color: active ? Colors.black : Colors.transparent,
          borderRadius: BorderRadius.circular(16),
        ),
        alignment: Alignment.center,
        child: Text(
          label,
          style: TextStyle(
            color: Colors.white,
            fontWeight: active ? FontWeight.w700 : FontWeight.w600,
            fontSize: 16,
          ),
        ),
      ),
    );
  }
}

class _LocationCard extends StatelessWidget {
  const _LocationCard();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
      decoration: BoxDecoration(
        color: const Color(0xFF2A2A2D),
        borderRadius: BorderRadius.circular(18),
      ),
      child: Row(
        children: const [
          Icon(Icons.location_on_outlined, color: Colors.white70),
          SizedBox(width: 10),
          Expanded(
            child: Text(
              'Smolensk, Gagarina 1',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
            ),
          ),
        ],
      ),
    );
  }
}

class _NoticeBanner extends StatelessWidget {
  const _NoticeBanner();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      decoration: BoxDecoration(
        color: const Color(0xFFFFE9B9),
        borderRadius: BorderRadius.circular(18),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [
          Icon(Icons.warning_amber_rounded, color: Color(0xFFC58A00)),
          SizedBox(width: 10),
          Expanded(
            child: Text(
              'Be a considerate fragrance lover. Give attention without noise.',
              style: TextStyle(
                color: Color(0xFF5F4A15),
                fontWeight: FontWeight.w600,
                fontSize: 14,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _PromoBanner extends StatelessWidget {
  const _PromoBanner();

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 108,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        gradient: const LinearGradient(
          colors: [Color(0xFFF4F2EE), Color(0xFFF7A541)],
          begin: Alignment.centerLeft,
          end: Alignment.centerRight,
        ),
      ),
      child: Stack(
        children: [
          Positioned(
            right: -8,
            top: 10,
            child: Container(
              width: 112,
              height: 112,
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.22),
                borderRadius: BorderRadius.circular(28),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                DecoratedBox(
                  decoration: BoxDecoration(
                    color: Color(0xFFF28B29),
                    borderRadius: BorderRadius.all(Radius.circular(10)),
                  ),
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    child: Text(
                      'Referral program',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 12),
                const SizedBox(
                  width: 180,
                  child: Text(
                    'Fulfill conditions and receive a bonus',
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.w800,
                      fontSize: 21,
                      height: 1.05,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _ProductCard extends StatelessWidget {
  const _ProductCard({required this.item});

  final ProductCardItem item;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF262628),
        borderRadius: BorderRadius.circular(20),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  colors: [Color(0xFF422250), Color(0xFF1D1D22)],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                ),
              ),
              child: Stack(
                children: [
                  Positioned(
                    left: 12,
                    top: 12,
                    child: Row(
                      children: [
                        _MiniBadge(
                          label: item.badge,
                          color: const Color(0xFFF28B29),
                        ),
                        const SizedBox(width: 6),
                        const _MiniBadge(
                          label: 'TOP',
                          color: Color(0xFF2076F5),
                        ),
                      ],
                    ),
                  ),
                  const Positioned(
                    right: 12,
                    top: 12,
                    child: Icon(Icons.favorite_border, color: Colors.white70),
                  ),
                  Center(
                    child: Container(
                      width: 78,
                      height: 108,
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.12),
                        borderRadius: BorderRadius.circular(18),
                        border: Border.all(color: Colors.white24),
                      ),
                      alignment: Alignment.center,
                      child: Text(
                        item.title.isNotEmpty ? item.title.substring(0, 1) : 'P',
                        style: const TextStyle(
                          fontSize: 36,
                          fontWeight: FontWeight.w900,
                          color: Color(0xFFF5C66A),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 10, 12, 12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  item.title,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w800,
                    height: 1.08,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  item.subtitle.toUpperCase(),
                  style: const TextStyle(
                    color: Colors.white54,
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    letterSpacing: 0.6,
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      item.volumeLabel,
                      style: const TextStyle(
                        color: Color(0xFFF5C66A),
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    if (item.priceLabel.isNotEmpty)
                      Text(
                        item.priceLabel,
                        style: const TextStyle(
                          color: Colors.white70,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _MiniBadge extends StatelessWidget {
  const _MiniBadge({
    required this.label,
    required this.color,
  });

  final String label;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 4),
        child: Text(
          label,
          style: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.w800,
            fontSize: 10,
          ),
        ),
      ),
    );
  }
}

class _CategoryHeaderDelegate extends SliverPersistentHeaderDelegate {
  const _CategoryHeaderDelegate({
    required this.minExtent,
    required this.maxExtent,
    required this.child,
  });

  @override
  final double minExtent;

  @override
  final double maxExtent;

  final Widget child;

  @override
  Widget build(
    BuildContext context,
    double shrinkOffset,
    bool overlapsContent,
  ) {
    return child;
  }

  @override
  bool shouldRebuild(covariant _CategoryHeaderDelegate oldDelegate) {
    return oldDelegate.child != child ||
        oldDelegate.minExtent != minExtent ||
        oldDelegate.maxExtent != maxExtent;
  }
}

const List<CategoryChipItem> _fallbackCategories = [
  CategoryChipItem(id: '1', label: 'Women'),
  CategoryChipItem(id: '2', label: 'Men'),
  CategoryChipItem(id: '3', label: 'Unisex'),
  CategoryChipItem(id: '4', label: 'Oils'),
];

const List<ProductCardItem> _fallbackProducts = [
  ProductCardItem(
    id: '1',
    title: 'Signorina Misteriosa',
    subtitle: 'Oil perfume',
    badge: 'HIT',
    volumeLabel: '3 ml',
    priceLabel: '12 000',
  ),
  ProductCardItem(
    id: '2',
    title: 'Donna Trussardi',
    subtitle: 'Oil perfume',
    badge: 'TOP',
    volumeLabel: '3 ml',
    priceLabel: '14 500',
  ),
  ProductCardItem(
    id: '3',
    title: 'Velvet Rose',
    subtitle: 'Premium blend',
    badge: 'NEW',
    volumeLabel: '5 ml',
    priceLabel: '18 000',
  ),
  ProductCardItem(
    id: '4',
    title: 'Amber Smoke',
    subtitle: 'Limited edition',
    badge: 'TOP',
    volumeLabel: '6 ml',
    priceLabel: '21 000',
  ),
];
