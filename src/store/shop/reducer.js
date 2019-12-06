import * as shop from './action-type';


let defaultState = {
    cartFoodList: {}
}

// 用户消息
export const shopData = (state = defaultState, action = {}) => {
    switch (action.type) {
        case shop.ADD_TO_CART:
            let cart = state.cartFoodList;
            let shops = cart[action.value.shopid] = (cart[action.value.shopid] || {});
            let category = shops[action.value.category_id] = (shops[action.value.category_id] || {});
            let item = category[action.value.item_id] = (category[action.value.item_id] || {});
            if (item[action.value.food_id]) {
                item[action.value.food_id]['num']++;
            } else {
                item[action.value.food_id] = {
                    "num": 1,
                    "food_id": action.value.food_id,
                    "name": action.value.name,
                    "price": action.value.price,
                    "specs": action.value.specs,
                    "packing_fee": action.value.packing_fee,
                    "sku_id": action.value.sku_id,
                    "stock": action.value.stock
                };
            }
            state.cartFoodList = {...cart };
            return {
                ...state,
                cartFoodList: state.cartFoodList
            };
        case shop.REDUCE_CART:

        case shop.CLEAR_CART_FOOD_LIST:
            return {...state, cartFoodList: {} }
        default:
            return state
    }
}