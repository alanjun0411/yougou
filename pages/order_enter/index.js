// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goCart: [],
    selectCart: [],
    allPrice: 0,
    typeBuy: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      typeBuy: Number(options.type)
    })
  },
  onShow: function () {
   if (this.data.typeBuy) {
     wx.getStorage({
       key: 'selectCart',
       success: (res) => {
         this.setData({
           selectCart: res.data
         })
         this.calculation(res.data)
       },
     })
   } else {
     wx.getStorage({
       key: 'buyShopping',
       success: (res) => {
        console.log(res.data)
        this.setData({
          selectCart: res.data
        })
         this.calculation(res.data)
       },
     })
   }
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