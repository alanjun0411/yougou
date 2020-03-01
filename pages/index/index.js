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
    scrollTop: 0
  },
  onLoad: function () {
    // 加载轮播图数据
   wx.ajax({
     url: "/home/swiperdata"
   }).then((res) => {
     this.setData({
       background: res.data.message
     })
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
      this.setData({
        floordata: res.data.message
      })
      console.log(this.data.floordata)
    })
  },
  gotoTop: function () {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  onPageScroll: function (e) {
    this.setData({
      scrollTop: e.scrollTop
    })
  }
})
