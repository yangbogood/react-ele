import Server from './server'
import { async } from 'q';


class HomeApi extends Server {

    async getCitys(type) {
        try {
            const res = await this.axios('get', "/v1/cities", null, {
                type: type
            })
            return res

        } catch (error) {

        }
    }

}


export default new HomeApi