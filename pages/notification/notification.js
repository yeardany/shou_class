// pages/notification/notification.js
import utils from '../../utils/dbOperation'
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    notificationList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    utils.getDatum(app.globalData.notificationTable, (res) => {
      this.setData({
        notificationList: res.data.objects
      })
    })
  }
})