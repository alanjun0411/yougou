//app.js
import ajax from "./utils/ajax.js"
App({
  onLaunch: function () {
    wx.ajax = ajax
  }
})