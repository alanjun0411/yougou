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
    current: 1,
    //  介绍和详情的评价
    introduceID: 1,
    // 顶部标题的ID
    titleID: 1,
    // 顶部标题的透明度
    opacityNumber: 0,
    describeTop: 0,
    evaluateTop: 0,
    scrollTop: false,
    // 图片墙
    imgEvent: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      goods_id: options.id
    })
    wx.ajax({
      url: `/goods/detail?goods_id=${options.id}`
    }).then((res) => {
      let imgEvent = res.data.message.pics.map(v => {
        return v.pics_big
      })
      this.setData({
        goods_data: res.data.message,
        imgEvent
      })
      wx.hideLoading()
    })
  },
  onShow: function() {
    var query = wx.createSelectorQuery()
    query.select('.describe').boundingClientRect()
    query.select('.evaluate').boundingClientRect()
    query.exec((res) => {
      this.setData({
        describeTop: res[0].bottom + 56,
        evaluateTop: res[1].bottom + 56
      })
    })
  },
  currentchange: function(e) {
    this.setData({
      current: e.detail.current + 1
    })
  },
  onPageScroll: function(e) {
    let scrollTop = e.scrollTop > 200 ? true : false
    // 避免频繁的setData消耗大量资源设置筛选
    if (scrollTop !== this.data.scrollTop) {
      this.setData({
        scrollTop
      })
    }
    let opacityNumber = 0
    let titleID = 1
    if (e.scrollTop > 130 && e.scrollTop < 200) {
      if (opacityNumber !== 0.5) opacityNumber = 0.5
    } else if (e.scrollTop >= 200) {
      if (opacityNumber !== 1) opacityNumber = 1
    } else {
      if (opacityNumber !== 0) opacityNumber = 0
    }
    if (e.scrollTop < this.data.describeTop) {
      if (titleID !== 1) titleID = 1
    } else if (e.scrollTop >= this.data.evaluateTop) {
      if (titleID !== 3) titleID = 3
    } else {
      if (titleID !== 2) titleID = 2
    }
    if (opacityNumber === this.data.opacityNumber || titleID === this.data.titleID) {
      this.setData({
        opacityNumber,
        titleID
      })
    }
  },
  introducechange: function(e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({
      introduceID: e.currentTarget.dataset.index
    })
  },
  gotoTop: function(e) {
    wx.pageScrollTo({
      scrollTop: e.currentTarget.dataset.top,
      duration: 300
    })
  },
  toBigImg: function (e) {
    
    wx.previewImage({
      current: this.data.imgEvent[e.currentTarget.dataset.src], // 当前显示图片的http链接
      urls: this.data.imgEvent // 需要预览的图片http链接列表
    })
  }
})