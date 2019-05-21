// pages/study/study.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    fileList: []
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
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id
    })
  }
})