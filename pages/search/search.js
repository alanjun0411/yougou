// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyKey:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()

  },
  searchTo: function (e) {
    const historyKey = this.data.historyKey
    const value = e.currentTarget.dataset.item
    if (historyKey.indexOf(value) !== -1) {
      historyKey.splice(historyKey.indexOf(value), 1)
    }
    historyKey.unshift(value)
    wx.setStorage({
      key: "searchData",
      data: historyKey
    })
    wx.navigateTo({
      url: `/pages/goods_list/index?query=${value}`,
    })
    setTimeout(()=>{
      this.getData()
    },1000)
  },
  getData: function () {
    const inThis = this
    wx.getStorage({
      key: 'searchData',
      success(res) {
        inThis.setData({
          historyKey: res.data
        })
      }
    })
  },
  removeData: function () {
    if (this.data.historyKey.length === 0)  return
    const inThis = this
    wx.showModal({
      title: '警告',
      content: '确定清除搜索记录吗?',
      success(res) {
        if (res.confirm) {
          wx.setStorage({
            key: "searchData",
            data: [],
            success() {
              wx.showToast({
                title: '清除成功',
                icon: 'success',
                duration: 2000
              })
            }
          })
          inThis.setData({
            historyKey: []
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '取消清除',
            duration: 2000
          })
        }
      }
    })
    
  }
})