import Server from './server'
import { getUrlConcat } from '../utils/commons'

class SHOP extends Server {
    async getFoodList(restaurant_id) {
        try {
            let result = await this.axios('get', '/shopping/v2/menu/', null, {

                restaurant_id,


            })
            return result
        } catch (error) {

        }
    }

    async getShopDetailedInfo(shopid) {
        try {
            let result = await this.axios('get', '/shopping/restaurant/' + `${shopid}`)
            return result
        } catch (error) {

        }
    }
    async getRatingList(shopid, params) {
        try {
            let res = await this.axios('GET', '/ugc/v2/restaurants/' + `${shopid}` + '/ratings', null, params);
            return res
        } catch (error) {

        }
    }

    async getTagList(shopid) {
        try {
            let res = await this.axios('GET', '/ugc/v2/restaurants/' + `${shopid}` + '/ratings/tags', null);
            return res
        } catch (error) {

        }
    }

    async getRatings(shopid) {
        try {
            let res = await this.axios('GET', '/ugc/v2/restaurants/' + `${shopid}` + '/ratings/scores', null);
            return res
        } catch (error) {

        }
    }
}

export default new SHOP();