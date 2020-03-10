//app.js
import ajax from "./utils/ajax.js"
App({
  onLaunch: function () {
    wx.ajax = ajax
    wx.getStorage({
      key: 'goCart',
      success: function(res) {
        if (res.data.length !== 0) {
          wx.setTabBarBadge({
            index: 2,
            text: res.data.length + ''
          })
        }
      },
      fail: function(err) {
        console.log(err)
        if (err) {
          wx.setStorage({
            key: 'goCart',
            data: [],
          })
        }
      }
    })
    wx.getStorage({
      key: 'selectCart',
      success: function (res) {
        if (res.data.length !== 0) {
          wx.setTabBarBadge({
            index: 2,
            text: res.data.length + ''
          })
        }
      },
      fail: function (err) {
        console.log(err)
        if (err) {
          wx.setStorage({
            key: 'selectCart',
            data: [],
          })
        }
      }
    })
  }
})