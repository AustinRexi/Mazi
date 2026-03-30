import '../../../core/api/api_client.dart';
import '../../../core/api/api_config.dart';

class HomeRepository {
  HomeRepository({ApiClient? apiClient}) : _apiClient = apiClient ?? ApiClient();

  final ApiClient _apiClient;

  Future<HomeFeed> loadHomeFeed() async {
    try {
      final categoriesResponse =
          await _apiClient.getJson(ApiConfig.categoriesPath) as Map<String, dynamic>;
      final productsResponse = await _apiClient.getJson(
        '${ApiConfig.featuredProductsPath}?limit=12',
      ) as Map<String, dynamic>;

      final categories = ((categoriesResponse['data'] as List?) ?? const [])
          .map(
            (item) => CategoryChipItem(
              id: '${item['id']}',
              label: item['category_name']?.toString() ??
                  item['name']?.toString() ??
                  'Category',
            ),
          )
          .toList();

      final products = ((productsResponse['data'] as List?) ?? const [])
          .map(
            (item) => ProductCardItem(
              id: '${item['id']}',
              title: item['food_name']?.toString() ??
                  item['groceries_name']?.toString() ??
                  item['name']?.toString() ??
                  'Product',
              subtitle: item['category']?['category_name']?.toString() ??
                  item['restaurant']?['restaurant_name']?.toString() ??
                  'Featured',
              badge: item['stock_status']?.toString() == 'out_of_stock'
                  ? 'OUT'
                  : 'TOP',
              imageUrl: item['food_images']?.toString() ??
                  item['food_image']?.toString() ??
                  item['groceries_images']?.toString(),
              volumeLabel: item['food_description']?.toString().isNotEmpty == true
                  ? item['food_description'].toString()
                  : '3 ml',
              priceLabel: item['food_price']?.toString() ??
                  item['groceries_price']?.toString() ??
                  '',
            ),
          )
          .toList();

      return HomeFeed(
        categories: categories.isEmpty ? _mockCategories : categories,
        products: products.isEmpty ? _mockProducts : products,
      );
    } catch (_) {
      return const HomeFeed(
        categories: _mockCategories,
        products: _mockProducts,
      );
    }
  }
}

class HomeFeed {
  const HomeFeed({
    required this.categories,
    required this.products,
  });

  final List<CategoryChipItem> categories;
  final List<ProductCardItem> products;
}

class CategoryChipItem {
  const CategoryChipItem({
    required this.id,
    required this.label,
  });

  final String id;
  final String label;
}

class ProductCardItem {
  const ProductCardItem({
    required this.id,
    required this.title,
    required this.subtitle,
    required this.badge,
    required this.volumeLabel,
    required this.priceLabel,
    this.imageUrl,
  });

  final String id;
  final String title;
  final String subtitle;
  final String badge;
  final String volumeLabel;
  final String priceLabel;
  final String? imageUrl;
}

const List<CategoryChipItem> _mockCategories = [
  CategoryChipItem(id: '1', label: 'Women'),
  CategoryChipItem(id: '2', label: 'Men'),
  CategoryChipItem(id: '3', label: 'Unisex'),
  CategoryChipItem(id: '4', label: 'Oils'),
  CategoryChipItem(id: '5', label: 'Gift Sets'),
];

const List<ProductCardItem> _mockProducts = [
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
