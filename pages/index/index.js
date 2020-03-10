Page({
  data: {
    // 轮播图数据
    background: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    // 分类数据
    catitems:[],
    // 楼层数据
    floordata:[],
    // 屏幕滑动
    scrollTop: false
  },
  onLoad: function () {
    // 加载轮播图数据
   wx.ajax({
     url: "/home/swiperdata"
   }).then((res) => {
     this.setData({
       background: res.data.message
     })
     console.log(this.data.background)
   })
    //  加载分类数据
    wx.ajax({
      url: "/home/catitems"
    }).then((res) => {
      this.setData({
        catitems: res.data.message
      })
    })
    // 加载楼层数据
    wx.ajax({
      url: "/home/floordata"
    }).then((res) => {
      let newdata = res.data.message
      newdata = newdata.map((v)=>{
        v.product_list = v.product_list.map((v)=>{
          v.query = v.navigator_url.slice(v.navigator_url.search("=") + 1)
          return {
            ...v
          }
        })
        return {
          ...v
        }
      })
      this.setData({
        floordata: newdata
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
  },
  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  }
})
