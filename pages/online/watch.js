// pages/online/watch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this

    wx.request({
      url: 'https://vv.video.qq.com/getinfo?vids=' + options.videoId + '&platform=101001&charge=0&otype=json',
      success(res) {
        let temp = res.data;
        that.getVideoUrl(temp.substring(temp.indexOf('{'), temp.lastIndexOf(';')))
      }
    })

  },

  getVideoUrl: function(json) {
    try {
      let videoJson = JSON.parse(json),
        fn = videoJson['vl']['vi'][0]['fn'],
        fvkey = videoJson['vl']['vi'][0]['fvkey'],
        url = videoJson['vl']['vi'][0]['ul']['ui'][0]['url'],
        videoUrl = url + fn + '?vkey=' + fvkey;
      this.setData({
        url: videoUrl
      })
    } catch (err) {
      wx.showToast({
        title: '获取视频地址失败',
        icon: 'none',
        duration: 2000
      })
      console.log(err)
    }
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