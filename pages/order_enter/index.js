// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goCart: [],
    selectCart: [],
    allPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onShow: function () {
    wx.getStorage({
      key: 'goCart',
      success:  (res1) =>{
        this.setData({
          goCart: res1.data,
        })
        wx.getStorage({
          key: 'selectCart',
          success: (res2) => {
            this.setData({
              selectCart: res2.data
            })
            this.calculation(res2.data)
          },
        })
       
      },
    })
  },
  calculation: function (data) {
    let allPrice = 0
    data.forEach(v => {
      allPrice += v.goods_price * v.num
    })
    this.setData({
      allPrice
    })
  },
  storageData: function (good) {
    wx.setStorage({
      key: 'goCart',
      data: good,
      success: () => {
        this.setData({
          goCart: good
        })
      }
    })
  }
})