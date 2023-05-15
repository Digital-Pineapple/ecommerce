import { useState,useEffect,useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { addProductToShoppingCart,startAddProductShoppingCart,startRemoveProductShoppingCart,startRemoveProductsShoppingCartNotLogged,startUpdateCartNoAuth,startUpdatedProductQuantity } from '../actions/shoppingCartActions';

import { helpers } from '../helpers';
import { warningNotify,notify,successNotify } from '../helpers/helpers';
import { useDebounce } from './useDebounce';

import Cookies from 'js-cookie';

const INCREASE = 1;
const DECREASE = 2;
const CHANGE = 3;

export const useCart = (logged = false,currentQuantity = 1,product = {},cart,type = 1,isAdd = false,timeToUpdate = 300) => {

    const dispatch = useDispatch();
    const { existInShoppingCart,prepareCartDataForLocalStorage,prepareProductsToFussion,SweetAlert } = helpers;

    const [loading,setLoading] = useState(false);
    const [quantity,setQuantity] = useState(currentQuantity);
    const [updatedQuantity,setUpdatedQuantity] = useState(false);
    const [productInCart,setProductInCart] = useState(false);
    const update = useDebounce(quantity,timeToUpdate);


    const currency = Cookies.get('Currency') || 'MXN';

    const getProductInCart = () => {
        const productInShoppingCart = existInShoppingCart(product?._id,cart);
        setProductInCart(productInShoppingCart);
        if (!productInShoppingCart) return;
        const { quantity } = cart.find(p => p.product_id._id === product?._id);
        setQuantity(quantity)
    }

    const updateCart = (product_id,quantity = 1) => {

        if (logged) return dispatch(startUpdatedProductQuantity({ product_id,quantity: quantity || 1 }));

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart = cart.map(cart => cart?.product_id?._id === product_id ? { ...cart,quantity: cart.quantity = quantity || 1 } : cart);

        const newCart = prepareProductsToFussion(cart);
        localStorage.setItem('cart',JSON.stringify(cart));
        dispatch(startUpdateCartNoAuth(newCart,currency,{ product_id,quantity: quantity || 1 }));
    }

    const handleChangeProductQuantity = ({ target }) => {
        if (target.value > product.quantity) {
            setUpdatedQuantity(true);
            warningNotify(`Cantidad disponible: ${product.quantity}`);
            return setQuantity(+product.quantity);
        }

        setQuantity(target.value.replace(/^0+/,''));
        setUpdatedQuantity(true);

    }

    const updateProductQuantity = (value = 1) => {
        if (value === -1)
            if (product.quantity >= 1 && quantity >= 2) {
                setQuantity(prev => Number(prev) - 1);
                setUpdatedQuantity(true);
            }
            else setQuantity(1);
        else
            if (product.quantity > 0 && product.quantity > quantity) {
                setQuantity(prev => +prev + 1);
                setUpdatedQuantity(true);
            }
            else {
                warningNotify(`Cantidad disponible: ${product.quantity}`);
                setUpdatedQuantity(false)
            }
    }

    const removeProduct = () => {
        if (logged) return dispatch(startRemoveProductShoppingCart(product._id));
        dispatch(startRemoveProductsShoppingCartNotLogged(product._id));
    }


    const addProduct = async () => {

        try {
            if (product.product_type === '2') SweetAlert('warning','Alto ahí','<p>Este producto actualmente solo esta disponible en México</p><p style="font-size: 12; margin-top: 20px"><b>Te invitamos a revisar nuestras politas de enviós y devoluciones</b></p>')
            setLoading(true);
            if (logged) {
                await dispatch(startAddProductShoppingCart({ product_id: product._id,quantity: quantity || 1 },product,isAdd));
                return setProductInCart(true);
            }

            let newCart = [];
            const product_id = await prepareCartDataForLocalStorage(product);

            await dispatch(addProductToShoppingCart({ product_id,quantity: quantity || 1 }));
            setProductInCart(true);
            if (!productInCart) {
                newCart = [...cart,{ product_id,quantity: quantity || 1 }];
            }
            else {
                newCart = cart.map(cart => cart.product_id._id === product._id ? { ...cart,quantity: cart.quantity = quantity || 1 } : cart);
            }
            localStorage.setItem('cart',JSON.stringify(newCart));
            if (!isAdd) successNotify('El producto ha sido agregado al carrito satisfactoriamente');

        } catch (error) {
            setProductInCart(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProductInCart();
    },[]);

    useEffect(() => {
        if (updatedQuantity && quantity && isAdd) {
            const product_id = product._id;
            updateCart(product_id,quantity);
            // setUpdatedQuantity(false);
        }
    },[update]);

    return { updateProductQuantity,addProduct,removeProduct,handleChangeProductQuantity,quantity,productInCart,loading }
}
