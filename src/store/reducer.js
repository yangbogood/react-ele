import * as user from './action-type'

import { getStore } from '../utils/commons'


let userInfo = getStore('userInfo') || {};
console.info(typeof userInfo)
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
}

// 用户消息
export default (state = defaultState, action = {}) => {
    console.info(defaultState)
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
        default:
            return state
    }
}