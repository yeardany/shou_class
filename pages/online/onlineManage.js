// pages/online/onlineManage.js
import utils from '../../utils/dbOperation'
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoName: '',
    videoId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  videoNameInput: function(e) {
    this.setData({
      videoName: e.detail.value
    })
  },

  videoVidInput: function(e) {
    this.setData({
      videoId: e.detail.value
    })
  },

  bindFormSubmit: function(e) {

    let data = {
      videoId: this.data.videoId,
      name: this.data.videoName
    }

    utils.addDatum(app.globalData.videoIdTable, data, (res) => {
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 2000
      })

    })
  },

  viewImage: function() {
    wx.previewImage({
      urls: ['http://ww3.sinaimg.cn/large/006tNc79ly1g5uiub0lyej31df0u01ky.jpg'] // 需要预览的图片http链接列表
    })
  }
})