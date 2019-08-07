// pages/doExam/examRecord.js
import utils from '../../utils/dbOperation'
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    doExamStudentList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    let query = new wx.BaaS.Query(),
      doExamStudentList = [],
      that = this;
    query.compare('id', '=', options.examId)
    utils.getDatum(app.globalData.examTable, (res) => {
      if ((res.data.objects)[0].doExamStudent !== undefined) {
        for (let i = 0; i < ((res.data.objects)[0].doExamStudent).length; i++) {
          doExamStudentList.push(JSON.parse(((res.data.objects)[0].doExamStudent)[i]))
        }
        that.setData({
          doExamStudentList: doExamStudentList
        })
      }
    }, query)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})