// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyValue: '',
    pagenum: 1,
    cid: '',
    pagesize: 20,
    total: 0,
    paramsKey: '',
    goods: [],
    gcomprehensive_B: false,
    params_price_style: '',
    loadings: false,
    // 屏幕滑动
    scrollTop: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      keyValue: options.query
    })
    wx.showLoading({
      title: '加载中',
    })
    this.getData()
  },
  getData: function () {
    wx.ajax({
      url: `/goods/search?query=${this.data.keyValue}&pagenum=${this.data.pagenum}&pagesize=${this.data.pagesize}`
    }).then((res) => {
      let { goods } = res.data.message
      let obj = this.data.goods
      obj.push(...goods)
      this.setData({
        goods: obj,
        loadings: false,
        total: res.data.message.total
      })
      wx.hideLoading()
    })
  },
  comprehensive: function (e) {
    let { index } = e.currentTarget.dataset
    this.setData({
      gcomprehensive_B: !this.data.gcomprehensive_B
    })
    this.paramsKeyFun(index)
  },
  sales: function (e) {
    let { index } = e.currentTarget.dataset
    this.paramsKeyFun(index)
  },
  price:function (e) {
    let { index } = e.currentTarget.dataset
    if (this.data.params_price_style === '' || this.data.params_price_style === 'down') {
      this.setData({
        params_price_style: 'up'
      })
    } else {
      this.setData({
        params_price_style: 'down'
      })
    }
    this.paramsKeyFun(index)
  },
  paramsKeyFun: function (index) {
    if (!this.data.paramsKey) {
      this.setData({
        paramsKey: index
      })
    } else {
      if (index !== 'comprehensive') {
        this.setData({
          gcomprehensive_B: false
        })
      }
      if (this.data.paramsKey !== index){
        this.setData({
          paramsKey: index
        })
      } else {
        this.setData({
          paramsKey: ''
        })
      }
    }
  },
  goTogoods: function (e) {
    wx.navigateTo({
      url: `/pages/goods_detail/index?id=${e.currentTarget.dataset.index}`
    })
  },
  onReachBottom: function (e) {
    this.setData({
      pagenum: this.data.pagenum + 1,
      loadings: true
    })
    console.log(this.data.pagenum)
    this.getData()
    console.log(123)
  },
  mainEvent: function () {
    this.setData({
      gcomprehensive_B: false
    })
  },
  gotoTop: function () {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  onPageScroll: function (e) {
    let scrollTop = e.scrollTop > 100 ? true : false
    // 避免频繁的setData消耗大量资源设置筛选
    if (scrollTop === this.data.scrollTop) return
    this.setData({
      scrollTop
    })
  }
})