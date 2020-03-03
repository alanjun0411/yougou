// components/com_search2/comSearch2.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    inputValue: '',
    foucs: true,
    keyValue: [],
    newHeight: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindKeyInput: function (e) {
      const old = this.data.inputValue.trim()
      this.setData({
        inputValue: e.detail.value
      })
      if (!e.detail.value || e.detail.value.trim() === old) {
        this.setData({
          keyValue: [],
          newHeight: 0
        })
      } else {
        wx.ajax({
          url: `/goods/qsearch?query=${e.detail.value}`
        }).then((res) => {
          let heis = res.data.message.length > 6 ? '340' : ''
          this.setData({
            keyValue: res.data.message,
            newHeight: heis
          })
        })
      }
    },
    bindDeleteInput: function () {
      this.setData({
        inputValue: '',
        keyValue: [],
        newHeight: 0
      })
    },
    inputconfirm: function() {
      const hisThis = this.data.inputValue
      const inThis = this
      wx.getStorage({
        key: 'searchData',
        success(res) {
          let searchData = res.data
          if (searchData.indexOf(hisThis) !== -1) {
            searchData.splice(searchData.indexOf(hisThis),1)
          }
          searchData.unshift(hisThis)
          inThis.makeStorage(searchData)
        },
        fail(err){
          if (err) {
            let searchData = []
            searchData.unshift(hisThis)
            inThis.makeStorage(searchData)
          }
        }
      })
      wx.navigateTo({
        url: `/pages/goods_list/index?query=${hisThis}`
      }),
      setTimeout(() => {
        inThis.triggerEvent('newDataKey')
        inThis.bindDeleteInput()
        inThis.setData({
          keyValue: [],
          newHeight: 0
        })
      }, 1000)

    },
    makeStorage: function(value) {
      wx.setStorage({
        key: "searchData",
        data: value
      })
    },
    selectTo: function(e) {
      let id = e.currentTarget.id
      wx.navigateTo({
        url: `/pages/goods_detail/index?id=${id}`
      })
      this.setData({
        inputValue: '',
        keyValue: [],
        newHeight: 0
      })
    }
  }
})