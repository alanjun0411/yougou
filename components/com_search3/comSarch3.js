// components/com_search3/comSarch3.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    defValue: {
      type: String,
      value: ''
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
    searchTo() {
      wx.redirectTo({
        url: `/pages/search/search`
      })
    }
  }
})
