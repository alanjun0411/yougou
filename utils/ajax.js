const ajax = (config = {}) => {
  if (config.url.search(/^http/) === -1) {
    config.url = ajax.defaults.baseURL + config.url
  }
  config.method = config.method || "GET"
  return new Promise((resolve, reject) =>{
    wx.request({
      ...config,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      },
      complete: res => {
        ajax.onError(res)
      }
    })
  })
}
ajax.defaults = {
  // 配置基准路径
  baseURL: "http://157.122.54.189:9095"
}
ajax.onError = (res) => {
  if(res.statusCode === 500){
    console.log("拦截："+500)
  }
}
export default ajax