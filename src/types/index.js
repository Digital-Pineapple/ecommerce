export const types = {
  login: "[AUTH] loggin ecommerce start",
  loginGoogle: "[AUTH] loginGoogle ecommerce start",
  logout: "[AUTH] logout ecommerce start",
  check_token: "[AUTH] check token",
  register: "[AUTH] register",
  resetPassword: "[AUTH] reset password client",
  forgotPassword: "[AUTH] forgot password client",

  loadProducts: "[PRODUCTS] start load products",
  addProductSelected: "[PRODUCTS] add product selected",
  loadProduct: "[PRODUCT] load product",
  filterProducts: "[PRODUCTS] filter products",
  remove_filter: "[PRODUCTS] remove brand to braindsSelected",
  clear_all_filter: "[PRODUCTS] clear all filters",
  load_products_per_category: "[PRODUCTS] load products per category",
  load_products_per_brand: "[PRODUCTS] load products per brand",
  load_products_per_pagination: "[PRODUCTS] load products per pagination",
  filters_to_products: "[PRODUCTS] filters to products",
  search_products: "[PRODUCTS] seach products",
  loadBrandsWithCategories: "[PRODUCTS] load brands with categories",
  loadCategoriesWithProducts: "[PRODUSCTS] load categories with products",
  load_products_most_sold: "[PRODUCTS] load products most sold",

  loadCategories: "[CATEGORIES] start load categories",
  loadCategoriesHome: "[CATEGORIES HOME] start load categories",
  load_products_from_category: "[CATEGORIES] load porducts_form_category",
  filters_to_products_from_categories_with_brands:
    "[CATEGORIES] filters to products from categories",
  clear_filters_form_categories: "[CATEGORIES] clear filters from categories",
  load_subcategories_per_category_or_per_brand:
    "[CATEGORIES] load subcategories per category or per brand",
  load_categories_per_brand: "[CATEGORIES] load categories per brand",

  load_cart_state: "[CART] load cart state",
  add_to_cart: "[CART] add to cart",
  remove_one_from_cart: "[CART] remove one from cart",
  add_one_from_cart: "[CART] add one from cart",
  remove_all_from_cart: "[CART] remove all from cart",
  clear_cart: "[CART] clear cart",
  add_coupon: "[CART] add coupon",
  remove_coupon: "[CART] remove_coupon",

  loadOffers: "[Offers] load offers",

  loadTags: "[TAGS] load tags",

  loadBrand: "[BRANDS] load brand",
  loadBrands: "[BRANDS] start load brands",
  load_products_from_brand: "[BRAND] load products per brand",
  filter_products_per_category_from_brands:
    "[BRANDS] filter products per category from brands",
  filters_to_products_from_brand: "[BRANDS]filters to products from brand",
  clear_all_filter_from_brands: "[BRANDS] clear all filter from brands",
  load_brands_per_category: "[BRAND] load brands per category",

  loadBrandsHome: "[HOME] load brands with products home",
  addNewsletterSuscription:
    "[Home] add and show newsletter suscription menssage",
  loadSlidersData: "[Home] load data sliders offers",
  load_products_home: "[HOME] load products home",
  filter_products: "[PRODUCTS] filter products",

  loadAdministrableLogo: "[Administrable] load data administrable logo",
  loadAdministrableSlider: "[Administrable] load data administrable slider",
  loadAdministrableAbout: "[Administrable] load data administrable about ",
  accept_cookies_politicy: "[Administrable] accept cookies politicy",
  load_country_permissions: "[Administrable] load country permissions",
  load_one_country_permissions: "[Administrable] load one country permissions",
  load_policies: "[Administrable] load policies",

  load_data_user: "[PROFILE] load data user",
  load_directions: "[PROFILE] load directions",
  load_states: "[PROFILE] load states",
  load_municipalities: "[PROFILE] load municipalities",
  load_fiscal_address: "[PROFILE]load fiscal address",
  update_fiscal_address: "[PROFILE] update fiscal address",
  save_fiscal_address: "[PROFILE] save fiscal address",
  change_default_addres: "[PROFILE] change default address",
  add_new_address: "[PROFILE] add new address",
  delete_addres: "[PROFILE] delete address",
  update_image_user: "[PROFILE] update image user",
  update_data_user: "[PROFILE] update data user",
  select_one_direction: "[PROFILE] select one direction",
  update_direction_user: "[PROFILE] update direction user",
  clear_direction: "[PROFILE] clear direction",
  laod_tax_system: "[PROFILE] load tax system",

  load_subcategories: "[SUBCATEGORIES] load subcategories",
  show_subcategories: "[SUBCATEGORIES] show subcategories",
  clear_subcategories: "[SUBCATEGORIES] clear subcategories",
  clear_subcategory: "[PRODUCTS] clear subcategory",

  addProductShoppingCart: "[ShoppingCart] add product to shopping cart",
  loadShoppingCartFromLocalStorage:
    "[ShoppingCart] load shopping cart from loadShoppingCartFromLocalStorage",
  updatedProductQuantity:
    "[ShoppingCart] updated quantity product in shoppingcart",
  calculateTotalShoppingCart:
    "[ShoppingCart] calculate subtotal and total in shoppingCart",
  finaliceCheckoutCart: "[ShoppingCart]  start finalice checkout cart",
  loadTotalsFromCookies: "[ShoppingCart] load totals checkout from cookies",
  loadShoppingCart: "[ShoppingCart] load shopping cart from database",
  updatedShoppingCart: "[ShoppingCart] updated shoppingCart",
  removeProductShoppingCart: "[ShoppingCart] remove product shoppingcart",
  removeAddressFromCart: "[SoppingCart] remove address from cart",
  load_business_rules: "[ShoppingCart] load_business_rules",
  load_shipping_cost: "[ShoppingCart] load shipping cost",
  get_shipping_cost: "[ShoppingCart] get shipping cost",

  addProductShoppingCartNoLoggued:
    "[ShoppingCart] add product to cart clients not logged",
  loadShoppingCartNotLoggedFromLocalStorage:
    "[ShoppingCart] load shoppingcart clients no logged from localStorage",
  updatedProductQuantityCartNotLogged:
    "[ShoppingCart] updated products in shopping cart clients not logged",
  deleteProductShoppingCartNotLogged:
    "[ShoppingCart] delete product in shopping cart clients not logged",
  loadShoppingCartFussion: "[ShoppingCart] load shoppingcart fussion login",

  loadWishListfromLocalStorage: "[WishList] load wishlist from localStorage",
  delete_product_from_wishList: "[WishList] delete product from wishlist",
  load_wishList_from_back: "[WishList] load wishList from back",
  add_one_product_from_wishList: "[WishList] add one product to wishlist",
  remove_one_product_from_wishList:
    "[WishList] remove one product from wishlist",
  search_product: "[WishList] search product",

  loadSecretClientfromCookies: "[Checkout] load secret client from cookies",
  loadBanksAccounts: "[Checkout] load banks accounts",
  loadBankAccountSelected: "[Checkout] load bank account selected",
  loadSecretClientStripe: "[Checkout] load secret client stripe",

  loadShoppingCartFromCookies: "[ShoppingCart] load shopping cart from cookies",
  loadDirectionsShoppingCart: "[ShoppingCart] load shippingCart client",
  addDirectionInCart: "[ShoppingCart] add direction in cart",
  addAddressSelected: "[ShoppingCart] load shipping Address selected",
  successFinaliceTransfer: "[ShoppingCart] successFinaliceTrasfer",

  load_faqs: "[FAQS] load_faqs",
  load_faqs_categories: "[FAQS] load faqs categories",
  load_faqs_per_category: "[FAQS] load faqs per category",

  loadPenddingOrders: "[ORDERS] load pendding orders",
  loadOrdersCanceled: "[ORDERS] load orders canceled",
  loadOrdersApproved: "[ORDERS] load orders approved",
  loadShippedOrders: "[ORDERS] load orders shipped",
  loadCancelOrder: "[ORDERS] load order cancel",
  loadOrderById: "[ORDERS] load order by id",
  selectedOrderPendding: "[ORDERS] selected order pendding",
  upload_proof_payment_order: "[ORDERS] upload proof payment order",
  // cancel_order: '[ORDERS] cancel orders',
  cancel_order_by_id: "[ORDERS] cancel order by id",
  cancel_invoice: "[ORDERS] cancel invoice",
  invoiced_order: "[ORDER] invoiced order",
  start_load_reviews: "[REVIEWS] start load reviews",
  load_product_detail: "[ORDERS] load product detail",
  get_order_id: "[ORDERS] get order id",
  finish_order_canvas: "[ORDERS] finish order canvas",
  changed_payment_method: "[ORDERS] chenge payment method",
  start_send_images_to_canvas: "[ORDERS] start send images to canvas",

  load_countries: "[COUNTRY] load countries",
  country_selected: "[COUNTRY] country selected",

  load_currencies: "[COUNTRY] load currencys",
  load_currencies_prices: "[COUNTRY] load currencies_prices",

  load_dimensions_of_browser: "[UI] load dimensions of browser",
};
