// components/comShopping/comShopping.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    cartNumber: 99
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotocart () {
      wx.switchTab({
        url: '/pages/cart/index',
      })
    }
  }
})
