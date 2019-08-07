// pages/doExam/doExamManage.js
import utils from '../../utils/dbOperation'
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    examName: '',
    examList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  tabSelect: function(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id
    })
    if (e.currentTarget.dataset.id == 1)
      this.loadSignInRecord()
  },

  examNameInput: function(e) {
    this.setData({
      examName: e.detail.value
    })
  },

  bindFormSubmit: function(e) {
    try {
      let temp = JSON.parse(e.detail.value.textarea),
        questions = []
      for (var i = 0; i < temp.length; i++) {
        let tmp = {}
        tmp['no'] = temp[i].no
        tmp['question'] = temp[i].question
        tmp['true'] = temp[i].true
        tmp['options'] = [{
            "content": temp[i].A,
            "option": "A"
          },
          {
            "content": temp[i].B,
            "option": "B"
          },
          {
            "content": temp[i].C,
            "option": "C"
          },
          {
            "content": temp[i].D,
            "option": "D"
          }
        ]
        questions.push(tmp)
      }
      console.log(this.data.examName, questions)
      let data = {
          name: this.data.examName == '' ? "未命名" : this.data.examName,
          exercises: JSON.stringify(questions)
        },
        that = this;

      utils.addDatum(app.globalData.examTable, data, (res) => {
        wx.showToast({
          title: '题库生成成功',
          icon: 'success',
          duration: 2000
        })

      })

    } catch (err) {
      wx.showToast({
        title: '题库生成失败',
        icon: 'none',
        duration: 2000
      })
      console.log(err)
    }
  },

  loadSignInRecord: function() {

    let query = new wx.BaaS.Query();
    query.compare('created_by', '=', wx.BaaS.storage.get('uid'))

    utils.getDatum(app.globalData.examTable, (res) => {
      this.setData({
        examList: res.data.objects
      })
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