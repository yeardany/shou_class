// pages/notification/notificationManage.js
import utils from '../../utils/dbOperation'
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    notificationName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  notificationNameInput: function(e) {
    this.setData({
      notificationName: e.detail.value
    })
  },

  bindFormSubmit: function(e) {

    let data = {
      type: this.data.notificationName,
      content: e.detail.value.textarea
    }

    utils.addDatum(app.globalData.notificationTable, data, (res) => {
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 2000
      })

    })
  }
})