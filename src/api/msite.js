import Server from './server'
import { getUrlConcat } from '../utils/commons'
import { async } from 'q';


/**
 * 获取当前所在城市
 */
export const currentcity = number => fetch('/v1/cities/' + number);

/**
 * 获取首页默认地址
 */

export const cityGuess = async() => {
    try {
        const res = await this.axios('get', '/v1/cities', {
            type: 'guess'
        })
    } catch (error) {

    }

};


/**
 * 获取msite页面地址信息
 */

export const msiteAddress = async(geohash) => {
    try {
        console.info(geohash)
        const res = await this.axios('get', '/v2/pois/' + geohash)
    } catch (error) {

    }
}
export const searchplace = async(cityid, value) => {
    try {

    } catch (err) {

    }
}