import Server from './server'
import { getUrlConcat } from '../utils/commons'
import { async } from 'q';

class msiteApi extends Server {
    /* 获取默认城市 */
    async cityGuess() {
        try {
            const res = await this.axios('get', '/v1/cities', null, {

                type: 'guess'

            })
            return res
        } catch (error) {

        }
    }
}


export default new msiteApi;