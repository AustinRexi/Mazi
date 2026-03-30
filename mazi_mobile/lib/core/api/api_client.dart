import 'dart:convert';

import 'package:http/http.dart' as http;

import 'api_config.dart';

class ApiClient {
  ApiClient({http.Client? httpClient}) : _httpClient = httpClient ?? http.Client();

  final http.Client _httpClient;

  Future<dynamic> getJson(String path) async {
    final uri = Uri.parse('${ApiConfig.baseUrl}$path');
    final response = await _httpClient.get(
      uri,
      headers: const {
        'Accept': 'application/json',
      },
    );

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw ApiException(
        'Request failed with status ${response.statusCode}',
      );
    }

    return jsonDecode(response.body);
  }
}

class ApiException implements Exception {
  ApiException(this.message);

  final String message;

  @override
  String toString() => message;
}
