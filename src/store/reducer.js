import * as user from './action-type'
import * as shop from './shop/action-type'
import { getStore } from '../utils/commons'
import { Cipher } from 'crypto';
let userInfo = getStore('userInfo') || {};
if (typeof userInfo === 'string') {
    userInfo = JSON.parse(userInfo);
}


let defaultState = {
    addressList: [], // 地址列表
    addressName: '', // 选中的地址
    temMessage: '', //临时姓名
    hasAddressList: [], // 已有的地址
    operate: 'edit',
    userInfo: userInfo,
    geohash: [],
    cartFoodList: {}

}

// 用户消息
export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case user.SAVE_USERINFO:
            return {
                ...state,
                userInfo: action.userInfo
            }
        case user.SAVE_ATTRINFO:
            return {...state,
                ... {
                    [action.datatype]: action.value
                }
            };
        case user.MODIFY_USERINFO:
            return {...state, userInfo: {...state.userInfo, [action.key]: action.value } };
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