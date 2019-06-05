// pages/study/study.js
import errCode from '../../utils/errorCode'
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    fileList: [],
    isLogin: false,
    percent: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        isLogin: true
      })
      this.getData(false)
    }
  },
  onPullDownRefresh: function() {
    if (app.globalData.userInfo) {
      this.setData({
        isLogin: true
      })
      this.getData(true)
    } else
      wx.showModal({
        title: '',
        content: '请先登录',
        showCancel: false,
        success(res) {
          if (res.confirm)
            wx.switchTab({
              url: '../mine/mine'
            })
        }
      })

  },
  tabSelect: function(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id
    })
  },
  getData: function(isPullDownRefresh) {

    let MyFile = new wx.BaaS.File()

    // 查找所有文件
    MyFile.find().then(res => {
      this.setData({
        fileList: res.data.objects
      })
      if (isPullDownRefresh)
        wx.stopPullDownRefresh()
    }, err => {
      console.log(errCode[err.code])
    })
  },
  download: function(e) {
    let that = this
    that.setData({
      isDisable: true
    })
    const downloadTask = wx.downloadFile({
      url: e.currentTarget.dataset.link,
      success(res) {
        wx.openDocument({
          filePath: res.tempFilePath
        })
      },
      complete() {
        that.setData({
          isDisable: false
        })
      }
    })

    downloadTask.onProgressUpdate((res) => {
      if (res.progress === 0 || res.progress === 100)
        this.setData({
          percent: 0
        })
      else
        this.setData({
          percent: res.progress
        })
    })
  }
})