// pages/signIn.js
import utils from '../../utils/dbOperation'
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    signInIdList: [],
    code: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;

    // wx.getLocation({
    //   type: 'wgs84',
    //   success(res) {
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     const speed = res.speed
    //     const accuracy = res.accuracy
    //   }
    // })


    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success(res) {
        that.setData({
          code: res.result
        })
      }
    })
    // utils.getDatum(app.globalData.signInIdTable, (res) => {
    //   this.setData({
    //     signInIdList: res.data.objects
    //   })
    // })
  },

  signIn: function(e) { 
    console.log(e.currentTarget.dataset.si)
    console.log(e.currentTarget.dataset.cn)
    console.log(e.currentTarget.dataset.ci)
    console.log(e.currentTarget.dataset.tn)
  }
})