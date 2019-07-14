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

  },

  openScan: function() {
    let that = this;

    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success(res) {
        that.validity(res.result)
      }
    })
  },

  validity: function(d) {
    if (d && d.indexOf("https://www.jd.com?spm=") != -1 && d.indexOf("&tn=84053098_3_dg&ie=utf-8") != -1) {
      let str = d.substr(d.indexOf("?") + 1),
        arr = str.split("&"),
        code = arr[0].substr(4);
      console.log('当前时间戳--->', new Date().getTime())
      console.log('二维码时间戳--->', (Base64.decode(code)).substr(0, 13))
      console.log('差值,--->', parseInt(new Date().getTime()) - parseInt((Base64.decode(code)).substr(0, 13)))
      if (parseInt(new Date().getTime()) - parseInt((Base64.decode(code)).substr(0, 13)) <= 6000) {
        if (app.globalData.stuNumber && (app.globalData.stuNumber).length > 0)
          this.signIn((Base64.decode(code)), app.globalData.stuNumber)
      } else
        wx.showModal({
          title: '',
          content: '签到码已失效',
          showCancel: false
        })
    } else
      wx.showModal({
        title: '',
        content: '错误的签到码',
        showCancel: false
      })
  },

  signIn: function(code, stuNumber) {
    console.log('签到id--->', code.substr(13), stuNumber)

    let signInId = code.substr(13),
      data = {
        signInStudent: stuNumber
      }

    utils.updateDatum(app.globalData.signInIdTable, signInId, data, (res) => {

    }, err => {

    })
    // wx.showModal({
    //   title: '',
    //   content: '签到成功',
    //   showCancel: false,
    //   success(res) {
    //     if (res.confirm) {
    //       wx.navigateBack({
    //         delta: 1
    //       })
    //     }
    //   }
    // })


    // wx.showModal({
    //   title: '',
    //   content: '签到失败',
    //   showCancel: false
    // })
  }
})