// pages/signIn/signInRecord.js
import utils from '../../utils/dbOperation'
import rpx2px from '../../utils/rpx2px'
import {
  Base64
} from '../../utils/base64.min'

const qrcodeWidth = rpx2px(600)

let app = getApp(),
  QRCode = require('../../utils/weapp-qrcode'),
  i

Page({

  /**
   * 页面的初始数据
   */
  data: {
    signInId: null,
    qrcodeWidth: qrcodeWidth,
    signInStudentList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.signInId,
      qrcode = new QRCode('canvas', {
        width: qrcodeWidth,
        height: qrcodeWidth,
        colorDark: "#000",
        colorLight: "white",
        correctLevel: QRCode.CorrectLevel.H,
      })

    if (id && id.length !== 0) {

      this.setData({
        signInId: id
      })

      this.getData(id);

      i = setInterval(function() {
        console.log('timer going...')
        qrcode.makeCode('https://www.jd.com?spm=' + Base64.encode(new Date().getTime() + id) + '&tn=84053098_3_dg&ie=utf-8')
      }, 3000, id)

    }
  },

  getData: function(id) {
    let query = new wx.BaaS.Query();

    query.compare('id', '=', id)

    utils.getDatum(app.globalData.signInIdTable, (res) => {
      if ((res.data.objects)[0].signInStudent !== undefined)
        this.setData({
          'signInStudentList': ((res.data.objects)[0].signInStudent).sort()
        })
    }, query)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(i)
  },

  refresh: function() {
    this.getData(this.data.signInId)
  }

})