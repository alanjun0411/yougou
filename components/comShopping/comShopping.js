// components/comShopping/comShopping.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartNumber: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotocart () {
      wx.switchTab({
        url: '/pages/cart/index',
      })
    },
    goShoppingCart: function () {
      this.triggerEvent('goShoppingCart')
    }
  }
})
