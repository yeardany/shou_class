// pages/homeWork/homeWork.js
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
    wx.BaaS.login(false).then(() => {
      console.log(wx.BaaS.storage.get('uid'));
      this.setData({
        profile: wx.BaaS.storage.get('userinfo')
      })
    }).then(() => {
      utils.getDatum(app.globalData.notificationTable, wx.BaaS.storage.get('uid'), (res) => {
        this.setData({
          notificationList: res.data.objects
        })
      })
    })
  }
})