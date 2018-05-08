/**
 * Created by asus on 2018/1/22.
 */
// const baseUrl = 'http://47.104.193.10:80';
// const baseUrl = 'http://192.168.0.119:10020';
const baseUrl = 'http://www.zcheng2115.com';

// 请求地址
export default {
  methods: {
    $get (url, data) {
      return new Promise((resolve, reject) => {
        let queryArr = [];
        for (let key in data) {
          if (data[key] !== '') {
            queryArr.push(`${key}=${data[key]}`);
          }
        }
        const finalUrl = baseUrl + url + `${queryArr.length ? '?' : ''}${queryArr.join('&')}`;
        this.$axios.get(finalUrl).then(res => {
          if (res) {
            resolve(res);
          } else {
            const errMsg = res.message ? res.message : res.fieldErrors[0];
            console.log('错误： ' + errMsg, '提示信息');
            reject(res);
          }
        }).catch(e => {
          console.log(e,'加载失败！');
        });
      });
    },
    $post (url, data) {
      return new Promise((resolve, reject) => {
        this.$axios.post(baseUrl + url, data).then(res=>{
          if (res) {
            resolve(res);
          } else {
            const errMsg = res.message ? res.message : res.fieldErrors[0];
            console.log('错误： ' + errMsg, '提示信息');
            reject(res);
          }
        }).catch(e => {
          console.log(e,'加载失败！', '提示信息');
        });
      });
    },
    delete (url,data) {
      return new Promise((resolve,reject) =>{
        this.$axios.delete(baseUrl + url,data).then(res =>{
          if (res.ok) {
            resolve(res);
          }else{
            this.$message('删除失败')
            reject(res);
          }
        }).catch(e => {
          console.log(e,'加载失败！', '提示信息');
        })
      })
    },
    $put (url, data) {
      return new Promise((resolve, reject) => {
        this.$axios.put(baseUrl + url, data).then(res=>{
          if (res) {
            resolve(res);
          } else {
            const errMsg = res.message ? res.message : res.fieldErrors[0];
            console.log('错误： ' + errMsg, '提示信息');
            reject(res);
          }
        }).catch(e => {
          console.log(e,'加载失败！', '提示信息');
        });
      });
    },
  }
};

// 使用：
// this.$post('地址', 参数).then(data => {
//   data='返回的数据'
// })
// this.$get('地址', 参数).then(data => {
//   data='返回的数据'
// })

// 'use strict';

// Object.defineProperty(exports, "__esModule", {
//   value: true
// });

// var _promise = require('babel-runtime/core-js/promise');

// var _promise2 = _interopRequireDefault(_promise);

// function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// /**
//  * Created by asus on 2018/1/22.
//  */
// // const baseUrl = 'http://47.104.193.10:80';
// // const baseUrl = 'http://192.168.0.119:10020';
// var baseUrl = 'http://www.zcheng2115.com';

// // 请求地址
// exports.default = {
//   methods: {
//     $get: function $get(url, data) {
//       var _this = this;

//       return new _promise2.default(function (resolve, reject) {
//         var queryArr = [];
//         for (var key in data) {
//           if (data[key] !== '') {
//             queryArr.push(key + '=' + data[key]);
//           }
//         }
//         var finalUrl = baseUrl + url + ('' + (queryArr.length ? '?' : '') + queryArr.join('&'));
//         _this.$axios.get(finalUrl).then(function (res) {
//           if (res) {
//             resolve(res);
//           } else {
//             var errMsg = res.message ? res.message : res.fieldErrors[0];
//             console.log('错误： ' + errMsg, '提示信息');
//             reject(res);
//           }
//         }).catch(function (e) {
//           console.log(e, '加载失败！');
//         });
//       });
//     },
//     $post: function $post(url, data) {
//       var _this2 = this;

//       return new _promise2.default(function (resolve, reject) {
//         _this2.$axios.post(baseUrl + url, data).then(function (res) {
//           if (res) {
//             resolve(res);
//           } else {
//             var errMsg = res.message ? res.message : res.fieldErrors[0];
//             console.log('错误： ' + errMsg, '提示信息');
//             reject(res);
//           }
//         }).catch(function (e) {
//           console.log(e, '加载失败！', '提示信息');
//         });
//       });
//     },
//     delete: function _delete(url, data) {
//       var _this3 = this;

//       return new _promise2.default(function (resolve, reject) {
//         _this3.$axios.delete(baseUrl + url, data).then(function (res) {
//           if (res.ok) {
//             resolve(res);
//           } else {
//             _this3.$message('删除失败');
//             reject(res);
//           }
//         }).catch(function (e) {
//           console.log(e, '加载失败！', '提示信息');
//         });
//       });
//     },
//     $put: function $put(url, data) {
//       var _this4 = this;

//       return new _promise2.default(function (resolve, reject) {
//         _this4.$axios.put(baseUrl + url, data).then(function (res) {
//           if (res) {
//             resolve(res);
//           } else {
//             var errMsg = res.message ? res.message : res.fieldErrors[0];
//             console.log('错误： ' + errMsg, '提示信息');
//             reject(res);
//           }
//         }).catch(function (e) {
//           console.log(e, '加载失败！', '提示信息');
//         });
//       });
//     }
//   }
// };

// // 使用：
// // this.$post('地址', 参数).then(data => {
// //   data='返回的数据'
// // })
// // this.$get('地址', 参数).then(data => {
// //   data='返回的数据'
// // })
