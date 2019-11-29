// 全局配置

let baseUrl = ''
let imgUrl
if (process.env.NODE_ENV === 'development') {
    imgUrl = 'http://cangdu.org:8001/img/'
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = '//elm.cangdu.org'
    imgUrl = '//elm.cangdu.org/img/'
}

export {
    baseUrl,
    imgUrl
}