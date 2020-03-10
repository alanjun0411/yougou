// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noLogin: true,
    goCart: [],
    clearOrNo: false,
    selectAll: false,
    selectCart: [],
    allPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  onShow: function () {
    wx.getStorage({
      key: 'goCart',
      success:  (res1) =>{
        this.setData({
          goCart: res1.data,
          clearOrNo: false
        })
        wx.getStorage({
          key: 'selectCart',
          success: (res2) => {
            this.setData({
              selectCart: res2.data
            })
            this.calculation(res2.data)
            if (res1.data.length === res2.data.length) {
              this.setData({
                selectAll: true
              })
            } else {
              this.setData({
                selectAll: false
              })
            }
          },
        })
        if (res1.data.length === 0) {
          wx.removeTabBarBadge({
            index: 2
          })
        } else {
          wx.setTabBarBadge({
            index: 2,
            text: res1.data.length + ''
          })
        }
      },
    })
  },
  priceAddAndReduce: function (e) {
    let { index, bl } = e.currentTarget.dataset
    let good = this.data.goCart
    let select = this.data.selectCart
    let oldNum = good[index].num
    if (bl) {
      good[index].num++
    } else {
      if (good[index].num === 1) return
      good[index].num--
    }
    select.forEach(v => {
      if (good[index].goods_id === v.goods_id) {
        v.num = good[index].num
      }
    })
    if (!bl) {
      if (oldNum === 1) return
    }
    wx.setStorage({
      key: 'goCart',
      data: good,
      success: () => {
        this.setData({
          goCart: good,
          selectCart: select
        })
        this.calculation(select)
      }
    })
    wx.setStorage({
      key: 'selectCart',
      data: select
    })
  },
  clearOrNoFun: function (e) {
    if (e.currentTarget.dataset.bl === 'clear') {
      this.setData({
        clearOrNo: true
      })
      
    } else if (e.currentTarget.dataset.bl === 'cancel') {
      this.setData({
        clearOrNo: false
      })
    } else {
      const inThis = this
      wx.showModal({
        title: '提示',
        content: '你确定清空吗？',
        success(res) {
          if (res.confirm) {
            wx.setStorage({
              key: 'goCart',
              data: [],
              success: () => {
                inThis.setData({
                  goCart: [],
                  selectCart: [],
                  selectAll: true
                })
                wx.removeTabBarBadge({
                  index: 2
                })
              }
            })
            wx.setStorage({
              key: 'selectCart',
              data: [],
            })
          }
        }
      })
    }
  },
  clearOne: function (e) {
    const inThis = this
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success(res) {
        if (res.confirm) {
          let { index } = e.currentTarget.dataset
          let good = inThis.data.goCart
          let selectCart = inThis.data.selectCart
          let clearID = good.splice(index, 1).goods_id
          selectCart.forEach((v, i) => {
            if (clearID === v.goods_id) {
              selectCart.splice(i, 1)
            }
          })
          wx.setStorage({
            key: 'goCart',
            data: good,
            success: () => {
              inThis.setData({
                goCart: good,
                selectCart
              })
              if (good.length !== 0) {
                wx.setTabBarBadge({
                  index: 2,
                  text: good.length + ''
                })
              } else {
                wx.removeTabBarBadge({
                  index: 2
                })
              }
              if (good.length !== selectCart.length) {
                inThis.setData({
                  selectAll: false
                })
              } else {
                inThis.setData({
                  selectAll: true
                })
              }
            }
          })
          wx.setStorage({
            key: 'selectCart',
            data: selectCart,
          })
        }
      }
    })
  },
  selectOne: function (e) {
    let { index } = e.currentTarget.dataset
    console.log(index)
    let good = this.data.goCart
    let select = this.data.selectCart
    good[index].select = !good[index].select
    console.log(good[index].select)
    if (good[index].select) {
      select.push({...good[index]})
    } else {
      select.forEach((v, i) => {
        if (v.goods_id === good[index].goods_id) {
          select.splice(i, 1)
        }
      })
    }
    if (good.length === select.length) {
      this.setData({
        selectAll: true
      })
    } else {
      this.setData({
        selectAll: false
      })
    }
    wx.setStorage({
      key: 'goCart',
      data: good,
      success: () => {
        this.setData({
          goCart: good
        })
      }
    })
    wx.setStorage({
      key: 'selectCart',
      data: select,
      success: () => {
        this.setData({
          selectCart: select
        })
        this.calculation(select)
      }
    })
  },
  selectAll: function () {
    let good = this.data.goCart
    let selectKey = !this.data.selectAll
    let newGood = good.map(v => {
      v.select = selectKey
      return {
        ...v
      }
    })
    wx.setStorage({
      key: 'goCart',
      data: newGood,
    })
    wx.setStorage({
      key: 'selectCart',
      data: selectKey ? [...newGood] : [],
    })
    this.setData({
      goCart: newGood,
      selectAll: selectKey,
      selectCart: selectKey ? [...newGood] : []
    })
    this.calculation(selectKey ? [...newGood] : [])
    
  },
  calculation: function (data) {
    let allPrice = 0
    data.forEach(v => {
      allPrice += v.goods_price * v.num
    })
    this.setData({
      allPrice
    })
  },
  inputNum: function (e) {
    let good = this.data.goCart
    let select = this.data.selectCart
    let { index } = e.currentTarget.dataset
    let { value } = e.detail
    good[index].num = parseInt(value)
    if (good[index].select) {
      select.forEach(v => {
        if (v.goods_id === good[index].goods_id) {
          v.num = parseInt(value)
        }
      })
      wx.setStorage({
        key: 'selectCart',
        data: select,
        success: () => {
          this.setData({
            selectCart: select
          })
          this.calculation(select)
        }
      })
    }
    wx.setStorage({
      key: 'goCart',
      data: good,
      success: () => {
        this.setData({
          goCart: good
        })
      }
    })
  }
})