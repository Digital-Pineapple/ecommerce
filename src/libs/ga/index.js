// log the pageview with their URL
export const pageview = (url) => {
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    })
  }
  
  // log specific events happening.
  export const event = ({ action, params }) => {
    window.gtag('event', action, params)
  }
//Borrar el objeto de comercio electrónico
  export const addCart = (product, currency, {quantity})=> {
    dataLayer.push({ ecommerce: null });
    dataLayer.push({
      'event': 'addToCart',
      'ecommerce': {
        'currencyCode': currency,
        'add': {                                // 'add' actionFieldObject measures.
          'products': {                        //  adding a product to a shopping cart.
            'name': product.name,
            'id': product._id,
            'price': product.price,
            'brand': product.brand,
            'category':product.category,
            'quantity': quantity
           }
        }
      }
    });
  }
//
export const removeCart = (product, quantity) => {
  dataLayer.push({ ecommerce: null });
  dataLayer.push({
    'event': 'removeFromCart',
    'ecommerce': {
      'remove': {                               // 'remove' actionFieldObject measures.
        'products': [{                          //  removing a product to a shopping cart.
            'name': product.name,
            'id': product._id,
            'price': product.price,
            'brand': product.brand,
            'category': product.category,
            'quantity': quantity
        }]
      }
    }
  });
}
//
export const click = (product)=> { 
  dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object.
  dataLayer.push({
    'event': 'productClick',
    'ecommerce': {
      'click': {     // Optional list property.
        'products': [{
          'name': product.name,                      // Name or ID is required.
          'id': product._id,
          'price': product.price,
          'brand': product.brand,
          'category': product.category,
         }]
       }
     }
  });
}
//
export const onCheckout = (cart)=> {
  dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce objec
  const products = cart.map((product) => {
   return  {
      'name': product.product_id.name, 
          'id': product.product_id._id,
          'price': product.product_id.price,
          'brand': product.product_id.brand,
          'category': product.product_id.category,
          'quantity': product.quantity
    }
  });
  dataLayer.push({
    'event': 'checkout',
    'actionField': {'step': 1, 'option': 'Revisar carrito'},
    'ecommerce': {
      'checkout': {
        products
     }
   }
  });
}

export const onCheckoutFinalize = (cart,checkoutOption )=> {
  dataLayer.push({ ecommerce: null, actionField: null });  // Clear the previous ecommerce objec
  const products = cart.cart.map((product) => {
   return  {
      'name': product.product_id.name, 
          'id': product.product_id._id,
          'price': product.product_id.price,
          'brand': product.product_id.brand,
          'category': product.product_id.category,
          'quantity': product.quantity
    }
  });
  dataLayer.push({
    'event': 'checkoutFinalize',
    'purchase': {
      'actionField': {
      'id': cart.order_id,
      'subtotal':cart.superTotal.subtotal,
      'discountBusinessRule':cart.business_rule?.discount,
      'coupon': cart.coupon,
      'subtotalWithCoupon': cart.subtotalWithCoupon,
      'shipping': cart.finalShippingCosts,
      'total': cart.superTotal.total,
      'checkout_option': {
        'optionCheckout': { 'option': checkoutOption}
      }
    },
    'ecommerce': {
      'checkout': {
        products
     }
   } }
    
  });
}


