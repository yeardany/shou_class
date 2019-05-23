// pages/study/study.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    fileList: [],
    isDisable: false,
    percent: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let MyFile = new wx.BaaS.File()

    // 查找所有文件
    MyFile.find().then(res => {
      // success
      this.setData({
        fileList: res.data.objects
      })
    }, err => {
      // err
    })
  },
  tabSelect: function(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id
    })
  },
  download: function(e) {
    const downloadTask = wx.downloadFile({
      url: e.currentTarget.dataset.link,
      success(res) {

      },
      fail() {

      }
    })

    downloadTask.onProgressUpdate((res) => {
      if (res.progress === 0 || res.progress === 100)
        this.setData({
          isDisable: false,
          percent: ''
        })
      else
        this.setData({
          isDisable: true,
          percent: res.progress
        })
    })
  }
})