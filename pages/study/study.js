// pages/study/study.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    fileList: [],
    isDisable: false,
    percent: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData(false)
  },
  onPullDownRefresh: function() {
    this.getData(true)
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
      // success
      this.setData({
        fileList: res.data.objects
      })
      if (isPullDownRefresh)
        wx.stopPullDownRefresh()
    }, err => {
      // err
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