Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 分类数据
    categories: [],
    selectID: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载分类数据
    wx.ajax({
      url: "/categories"
    }).then((res) => {
      this.setData({
        categories: res.data.message
      })
      console.log(this.data.categories)
    })
  },
  categoriesChange (e) {
    this.setData({
      selectID: e.currentTarget.dataset.index
    })
  }
})