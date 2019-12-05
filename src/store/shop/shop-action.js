// 修改用户信息
import * as shop from './action-type';
export const savaCartFoodList = (value) => {


    return {
        type: shop.ADD_TO_CART,
        value
    }
}

export const clearCartFoodList = () => {
    return {
        type: shop.CLEAR_CART_FOOD_LIST,
    }
}

export const reduceCart = (value) => {
    return {
        type: shop.REDUCE_CART,
        value
    }
}