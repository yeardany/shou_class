//app.js
App({
  onLaunch: function () {
    let that = this;
    // 获取系统信息
    wx.getSystemInfo({
      success: function (res) {
        // 获取可使用窗口宽度
        let clientHeight = res.windowHeight,
          // 获取可使用窗口高度
          clientWidth = res.windowWidth,
          // 算出比例
          ratio = 750 / clientWidth,
          // 算出高度(单位rpx)
          height = clientHeight * ratio;
        // 设置滚动区高度
        that.globalData.scrollHeight = (height - 60) / ratio
      }
    })
    this.firstPageDataInit()
  },
  globalData: {
    "scrollHeight": 0,
    "firstPageData": {}
  },
  firstPageDataInit: function () {
    let pageData = require("./pages/index/pageList")["1"],
      emptyPageData = require("./pages/index/emptyList")
    emptyPageData["1"] = pageData
    this.globalData.firstPageData = emptyPageData
  }
})