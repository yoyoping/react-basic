// 集中管理请求地址，所有的接口地址：
// 1.整个应用用到了哪些接口一目了然
// 2.接口地址可能变化，方便管理

/**
 * title: 接口描述
 * uri: 请求地址
 * method: 请求方式
 * const params: IParams = {
    uriCode: 'TEST01',
    bindVars: [{
        key: "id",
        value: 'xxx',
    }, {
        key: "type",
        value: 'xxx'
    }]
  }
 */

const Api = {
  'TEST01': { title: '获取banner', uri: '/banner' }, // 普通请求
  'TEST02': { title: '测试RestFul', uri: '/api/admin/companies/:id/special_privilege/:type' } // restful请求
}

export default Api;
