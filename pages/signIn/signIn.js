// pages/signIn/signIn.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    stuNumber: app.globalData.stuNumber,
    show: false //学号输入模态框显示/隐藏
  },
  onLoad: function() {
    //获取个人信息
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
    //更新学号
    if (!app.globalData.stuNumber)
      this.setData({
        stuNumber: '--'
      })
    else
      this.setData({
        stuNumber: app.globalData.stuNumber
      })
  },
  getUserInfo: function(e) {
    let that = this;
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      that.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
      //使用微信登录知晓云，并返回用户信息
      wx.BaaS.auth.loginWithWechat(e, {
        createUser: true,
        syncUserProfile: 'overwrite'
      }).then(user => {
        console.log('--->', user.get('stuNumber'));
        //如已存有学号字段，将不弹框输入学号，仅做登录，并把学号存到本地
        if (!user.get('stuNumber'))
          that.showModal();
        else if (user.get('stuNumber')) {
          that.setData({
            stuNumber: user.get('stuNumber')
          });
          wx.setStorage({
            key: 'stuNumber',
            data: user.get('stuNumber')
          });
          app.globalData.stuNumber = user.get('stuNumber')
        }
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
                      app.globalData.userInfo = res.userInfo
                      that.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                      });
                      //使用微信登录知晓云，并返回用户信息
                      wx.BaaS.auth.loginWithWechat({
                        "type": "getuserinfo",
                        "detail": res
                      }, {
                        createUser: true,
                        syncUserProfile: 'overwrite'
                      }).then(user => {
                        //如已存有学号字段，将不弹框输入学号，仅做登录，并把学号存到本地
                        if (!user.get('stuNumber'))
                          that.showModal();
                        else if (user.get('stuNumber')) {
                          that.setData({
                            stuNumber: user.get('stuNumber')
                          });
                          wx.setStorage({
                            key: 'stuNumber',
                            data: user.get('stuNumber')
                          });
                          app.globalData.stuNumber = user.get('stuNumber')
                        }
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
  getStuNumber(e) {
    this.setData({
      stuNumber: e.detail.value
    })
  },
  showModal() {
    this.setData({
      show: true
    })
  },
  confirmStuNumber() {
    let that = this;
    that.setData({
      show: false
    });
    //数据库更新学生学号
    wx.BaaS.auth.getCurrentUser().then(user => {
      user.set('stuNumber', that.data.stuNumber).update().then(res => {
        //学号存到本地
        wx.setStorage({
          key: 'stuNumber',
          data: that.data.stuNumber
        });
        app.globalData.stuNumber = that.data.stuNumber
      }, err => {
        // err 为 HError 对象
      })
    })
  },
  signIn: function() {
    console.log(app.globalData.userInfo)
  }
})