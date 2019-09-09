// pages/signIn/signInManage.js
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
    TabCur: 0,
    userID: '',
    courseName: null,
    className: null,
    qrcodeWidth: qrcodeWidth,
    signInIdList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      userID: wx.BaaS.storage.get('uid')
    })

  },

  onUnload: function() {
    clearInterval(i)
  },

  onPullDownRefresh: function() {

  },

  tabSelect: function(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id
    })
    if (e.currentTarget.dataset.id == 1)
      this.loadSignInRecord()
  },

  courseNameInput: function(e) {
    this.setData({
      courseName: e.detail.value
    })
  },

  classNameInput: function(e) {
    this.setData({
      className: e.detail.value
    })
  },

  ok: function() {

    if (this.data.courseName && this.data.className) {
      if ((this.data.courseName).trim().length > 0 && (this.data.className).trim().length > 0) {
        let data = {
            courseName: this.data.courseName,
            className: this.data.className
          },
          that = this;

        utils.addDatum(app.globalData.signInIdTable, data, (res) => {
          that.timer(res.data.id)
        })
      }
    }
  },

  timer: function(id) {

    let qrcode = new QRCode('canvas', {
      width: qrcodeWidth,
      height: qrcodeWidth,
      colorDark: "#000",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    })

    qrcode.makeCode('https://www.jd.com?spm=' + Base64.encode(new Date().getTime() + id) + '&tn=84053098_3_dg&ie=utf-8')

    i = setInterval(function() {
      console.log('timer going...')
      qrcode.makeCode('https://www.jd.com?spm=' + Base64.encode(new Date().getTime() + id) + '&tn=84053098_3_dg&ie=utf-8')
      //qrcode.exportImage(function(path) {})
    }, 3000, id)
  },

  loadSignInRecord: function() {
    let query = new wx.BaaS.Query();
    query.compare('created_by', '=', this.data.userID)

    utils.getDatum(app.globalData.signInIdTable, (res) => {
      this.setData({
        signInIdList: res.data.objects
      })
    }, query)
  }

  // preview: function() {
  //   wx.previewImage({
  //     urls: [],
  //     fail: (res) => {
  //       console.log(res)
  //     }
  //   })
  // }

  // 长按保存
  // save: function() {
  //   wx.showActionSheet({
  //     itemList: ['保存图片'],
  //     success: function(res) {
  //       if (res.tapIndex == 0) {
  //         qrcode.exportImage(function(path) {
  //           wx.saveImageToPhotosAlbum({
  //             filePath: path,
  //           })
  //         })
  //       }
  //     }
  //   })
  // }
})