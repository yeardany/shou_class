//app.js
App({
  onLaunch: function() {
    let that = this,
      clientId = this.globalData.clientId

    // 引入 BaaS SDK
    require('./utils/sdk-v2.0.6')

    wx.BaaS.init(clientId, {
      autoLogin: false
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
    wx.getStorage({
      key: 'stuNumber',
      success(res) {
        that.globalData.stuNumber = res.data
      }
    });
    //获取设备信息
    wx.getSystemInfo({
      success(res) {
        const brand = res.brand;
        that.globalData.brand = brand.toLowerCase()
      }
    });
  },
  globalData: {
    userInfo: null,
    stuNumber: null,
    brand: 'other',
    clientId: '020ffa0c5924ad7a915a',
    videoIdTable: '70734', //数据表videoId
    notificationTable: '73021' //数据表notificationTable
  }
})