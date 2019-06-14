// pages/signIn/signInManage.js
import utils from '../../utils/dbOperation'
import rpx2px from '../../utils/rpx2px'
import {
  Base64
} from '../../utils/base64.min'

const qrcodeWidth = rpx2px(300)

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
    codePath: ''
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

      let data = {
          courseName: this.data.courseName,
          className: this.data.className
        },
        that = this;

      utils.addDatum(app.globalData.signInIdTable, data, (res) => {
        that.timer(res.data.id)
      })
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

    i = setInterval(function() {
      console.log('timer going...')
      qrcode.makeCode(Base64.encode(new Date().getTime() + id))
      // qrcode.exportImage(function(path) {
      //   console.log(path)
      //   that.setData({
      //     codePath: path
      //   })
      // })
    }, 3000, id)
  },

  preview: function() {
    wx.previewImage({
      urls: [this.data.codePath] // 需要预览的图片http链接列表
    })
  }

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