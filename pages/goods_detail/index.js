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
    imgEvent: [],
    // 购物车的商品数量
    cartNumber: 0

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
    wx.getStorage({
      key: 'goCart',
      success: (res) => {
        this.setData({
          cartNumber: res.data.length
        })
        console.log(res.data.length)
      },
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
  },
  goShoppingCart: function () {
    let good = this.data.goods_data
    let oldCart = []
    let shoppingCart = {
      goods_big_logo: good.goods_big_logo,
      num: 1,
      goods_name: good.goods_name,
      goods_id: good.goods_id,
      goods_price: good.goods_price,
      select: false
    }
    wx.getStorage({
      key: 'goCart',
      success: (res) => {
        oldCart = res.data
        let key = oldCart.find(v => {
          if (v.goods_id === shoppingCart.goods_id) {
            v.num++
            return 1
          }
        })
        if (!key) oldCart.unshift(shoppingCart)
        wx.setStorage({
          key: 'goCart',
          data: oldCart,
          success: () => {
            this.setData({
              cartNumber: oldCart.length
            })
            wx.showToast({
              title: '加入成功',
              icon: 'success',
              duration: 1000
            })
          }
        })
      },
    })
  }
})