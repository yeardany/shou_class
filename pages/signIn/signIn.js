// pages/signIn/signIn.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    let that = this;
    if (e.detail.userInfo) {
      console.log(e.detail.userInfo)
      app.globalData.userInfo = e.detail.userInfo
      that.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    } else {
      wx.showModal({
        title: '用户未授权',
        content: '如需正常使用小程序功能，请在弹出页面授权用户信息',
        showCancel: false,
        success: res => {
          if (res.confirm) {
            wx.openSetting({
              success(res) {
                wx.showToast({
                  title: res.authSetting['scope.userInfo'] ? '已授权' : '未授权',
                  icon: 'none'
                });
                if (res.authSetting['scope.userInfo']) {
                  wx.getUserInfo({
                    success: res => {
                      console.log(res.userInfo)
                      app.globalData.userInfo = res.userInfo
                      that.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                      })
                    }
                  })
                }
              }
            })
          }
        }
      })
    }
  },
  signIn: function() {
    console.log(app.globalData.userInfo)
  }
})