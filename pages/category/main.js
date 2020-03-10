Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 分类数据
    categories: [],
    selectID: 0,
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 加载分类数据
    wx.ajax({
      url: "/categories"
    }).then((res) => {
      this.setData({
        categories: res.data.message
      })
    })
  },
  onShow: function () {
    wx.getStorage({
      key: 'goCart',
      success: (res) => {
        if (res.data.length === 0) {
          wx.removeTabBarBadge({
            index: 2
          })
        } else {
          wx.setTabBarBadge({
            index: 2,
            text: res.data.length + ''
          })
        }
      },
    })
  },
  categoriesChange (e) {
    this.setData({
      selectID: e.currentTarget.dataset.index,
      scrollTop: 0
    })
  }
})