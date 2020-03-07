// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品ID
    goods_id: '',
    // 商品数据
    goods_data: {},
    // 轮播图当前的index
    current: 1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      goods_id: options.id
    })
    wx.ajax({
      url: `/goods/detail?goods_id=${options.id}`
    }).then((res) => {
      console.log(res.data.message)
      this.setData({
        goods_data: res.data.message
      })
      wx.hideLoading()
    })
  },
  currentchange: function (e) {
    this.setData({
      current: e.detail.current + 1
    })
  },
  onPageScroll: function (e) {
    console.log(e)
  }
})