// pages/doExam/eaxmList.js
import utils from '../../utils/dbOperation'
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    examList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData(false)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getData(true)
  },

  getData: function(isPullDownRefresh) {
    let query = new wx.BaaS.Query();

    utils.getDatum(app.globalData.examTable, (res) => {
      this.setData({
        examList: res.data.objects
      })
      if (isPullDownRefresh)
        wx.stopPullDownRefresh()
    }, query)
  },

  doExam: function(e) {
    let that = this;
    wx.setStorage({
      key: "exercises",
      data: (this.data.examList[e.currentTarget.dataset.index]).exercises
    })
    wx.navigateTo({
        url: '/pages/doExam/doExam?examId=' + e.currentTarget.dataset.id
    })
}
})