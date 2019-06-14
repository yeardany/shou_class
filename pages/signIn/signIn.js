// pages/signIn.js
import utils from '../../utils/dbOperation'
import {
  Base64
} from '../../utils/base64.min'

let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;

    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success(res) {
        that.signIn(res.result)
      }
    })
  },

  signIn: function(d) {
    if (d) {
      let str = d.substr(d.indexOf("?") + 1),
        arr = str.split("&"),
        code = arr[0].substr(4);
      console.log('当前时间戳--->', parseInt(new Date().getTime()))
      console.log('二维码时间戳--->', parseInt((Base64.decode(code)).substr(0, 13)))
      console.log('差值,--->', parseInt(new Date().getTime()) - parseInt((Base64.decode(code)).substr(0, 13)))
      if (parseInt(new Date().getTime()) - parseInt((Base64.decode(code)).substr(0, 13)) <= 6000)
        wx.showModal({
          title: '',
          content: '签到成功',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      else
        wx.showModal({
          title: '',
          content: '签到失败',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
    }
  }
})