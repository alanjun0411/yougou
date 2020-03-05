// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyValue: '',
    pagenum: 1,
    cid: '',
    pagesize: 20,
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      keyValue: options.query
    })
    this.getData()
  },
  getData: function () {
    wx.ajax({
      url: `/goods/search?query=${this.data.keyValue}&${this.data.pagenum}&${this.data.pagesize}`
    }).then((res) => {
      console.log(res.data.message)
      this.setData({
        total: res.data.message.total
      })
    })
  }
})