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
    catitems:[]
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
      console.log(this.data.catitems)
    })
    
  }
})
