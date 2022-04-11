export const types = {

    login: '[AUTH] loggin ecommerce start',
    logout: '[AUTH] logout ecommerce start',
    check_token: '[AUTH] check token',
    register: '[AUTH] register',
    resetPassword: '[AUTH] reset password client',
    forgotPassword: '[AUTH] forgot password client',

    loadProducts: '[PRODUCTS] start load products',
    addProductSelected: '[PRODUCTS] add product selected',
    loadProduct: '[PRODUCT] load product',
    filterProducts: '[PRODUCTS] filter products',
    remove_category_to_categoriesSelected: '[PRODUCTS] remove category to categoriesSelected',
    remove_brand_to_brandsSelected: '[PRODUCTS] remove brand to braindsSelected',
    clear_all_filter: '[PRODUCTS] clear all filters',
    load_products_per_category: '[PRODUCTS] load products per category',
    load_products_per_brand: '[PRODUCTS] load products per brand',
    load_products_per_pagination: '[PRODUCTS] load products per pagination',
    
    loadCategories: '[CATEGORIES] start load categories',
    loadCategoriesHome:'[CATEGORIES HOME] start load categories',
    
    load_cart_state: '[CART] load cart state',
    add_to_cart: '[CART] add to cart',
    remove_one_from_cart: '[CART] remove one from cart',
    add_one_from_cart: '[CART] add one from cart',
    remove_all_from_cart: '[CART] remove all from cart',
    clear_cart: '[CART] clear cart',
    
    loadOffers: '[Offers] load offers',
    
    loadTags: '[TAGS] load tags',
    
    loadBrand: '[BRANDS] load brand',
    loadBrands: '[BRANDS] start load brands',
    load_products_from_brand: '[BRAND] load products per brand',
    filter_products_per_category_from_brands: '[BRANDS] filter products per category from brands',
    
    loadBrandsHome: '[HOME] load brands with products home',
    addNewsletterSuscription:'[Home] add and show newsletter suscription menssage',
    loadSlidersData:'[Home] load data sliders offers',



    loadAdministrableLogo:'[Administrable] load data administrable logo',
    loadAdministrableAbout:'[Administrable] load data administrable about ',

    load_data_user: '[PROFILE] load data user',
    load_directions: '[PROFILE] load directions',
    change_default_addres: '[PROFILE] change default address',
    add_new_address: '[PROFILE] add new address',
    delete_addres: '[PROFILE] delete address',

    addProductShoppingCart:'[ShoppingCart] add product to shopping cart',
    loadShoppingCartFromLocalStorage:'[ShoppingCart] load shopping cart from loadShoppingCartFromLocalStorage',
    updatedProductQuantity:'[ShoppingCart] updated quantity product in shoppingcart',
    calculateTotalShoppingCart:'[ShoppingCart] calculate subtotal and total in shoppingCart',
    finaliceCheckoutCart:'[ShoppingCart]  start finalice checkout cart',
    loadTotalsFromCookies:'[ShoppingCart] load totals checkout from cookies',
    loadShoppingCart:'[ShoppingCart] load shopping cart from database',
    updatedShoppingCart:'[ShoppingCart] updated shoppingCart',
    removeProductShoppingCart:'[ShoppingCart] remove product shoppingcart',

    addProductShoppingCartNoLoggued:'[ShoppingCart] add product to cart clients not logged',
    loadShoppingCartNotLoggedFromLocalStorage:'[ShoppingCart] load shoppingcart clients no logged from localStorage',
    updatedProductQuantityCartNotLogged:'[ShoppingCart] updated products in shopping cart clients not logged',
    deleteProductShoppingCartNotLogged:'[ShoppingCart] delete product in shopping cart clients not logged',
    loadShoppingCartFussion:'[ShoppingCart] load shoppingcart fussion login',


    loadWishListfromLocalStorage:'[WishList] load wishlist from localStorage',


    loadSecretClientStripe : '[Checkout] load secret client stripe',
    loadSecretClientfromCookies : '[Checkout] load secret client from cookies'
   
}