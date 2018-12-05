import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type:actionTypes.PURCHASE_BURGER_SUCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchasBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
        .then( response => {
            console.log("CONTACTDATA response:" + response);
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch( error => {
            console.log("CONTACTDATA error:" + error);
            dispatch(purchasBurgerFail( error));
        });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};