export enum ApiEndpoint {
  // Auth
  AuthLogin = "/api/v1/auth/login",
  AuthRefresh = "/api/v1/auth/refresh",
  AuthLogout = "/api/v1/auth/logout",

  // Categories
  Categories = "/api/v1/categories",
  CategoriesById = "/api/v1/categories/:id",

  // Products
  Products = "/api/v1/products",
  ProductsById = "/api/v1/products/:id",

  // Discounts
  Discounts = "/api/v1/discounts",
  DiscountsById = "/api/v1/discounts/:id",

  // Promo Codes
  PromoCodes = "/api/v1/promo-codes",
  PromoCodesById = "/api/v1/promo-codes/:id",

  // Uploads
  UploadsSign = "/api/v1/uploads/sign",
}
