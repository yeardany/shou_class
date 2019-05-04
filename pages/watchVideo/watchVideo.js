// pages/watchVideo/watchVideo.js
//获取应用实例
import utils from '../../utils/dbOperation'
var app = getApp()

Page({
  data: {
    bookList: [],
    creatingBookName: '', // 当前正在创建的书名
    editingBookName: '', // 当前正在编辑的书名
    videoUrlList: []
  },

  onLoad(options) {
    this.fetchVideoIdList()
  },

  //获取视频id列表，数据表videoId
  fetchVideoIdList() {
    utils.getDatum(app.globalData.videoIdTable, wx.BaaS.storage.get('uid'), (res) => {
      this.setData({
        videoIdList: res.data.objects
      })
      this.fetchVideoUrl()
    })
  },

  fetchVideoUrl() {
    let MyFile = new wx.BaaS.File(),
      videoUrlList = [],
      that = this;
    this.data.videoIdList.forEach(function(value) {
      MyFile.get(value.videoId).then((res) => {
        // success
        videoUrlList.push({
          "url": res.data.path
        })
        that.setData({
          videoUrlList: videoUrlList
        });
      }, err => {
        // HError 对象
      })
    })
  },

  // 绑定添加书目的输入框事件，设置添加的数目名称
  bindCreateBookNameInput(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      creatingBookName: value
    })
  },

  // 绑定添加书目的提交按钮点击事件，向服务器发送数据
  createBook(e) {
    utils.addBook(this, (res) => {
      this.setData({
        createBookValue: '',
      })
      this.fetchBookList()
    })
  },

  // 绑定每一行书目的“编辑”按钮点击事件，控制输入框和文本显示
  editBookButtonClicked(e) {
    let that = this
    let activeIndex = e.currentTarget.dataset.index
    let bookList = this.data.bookList

    bookList.forEach((elem, idx) => {
      if (activeIndex == idx) {
        elem.isEditing = true
      } else {
        elem.isEditing = false
      }
    })

    that.setData({
      bookList
    })
  },

  // 绑定每一行书目的输入框事件，设定当前正在编辑的书名
  bindEditBookNameInput(e) {
    let bookName = e.detail.value
    this.setData({
      editingBookName: bookName,
    })
  },

  // 绑定修改书目的提交按钮点击事件，向服务器发送数据
  updateBook(e) {

    this.setData({
      curRecordId: e.target.dataset.bookId,
    })

    utils.updateBook(this, (res) => {
      this.fetchBookList()
      this.setData({
        curRecordId: ''
      })
    })
  },

  // 删除当前行的书目
  deleteBook(e) {
    this.setData({
      curRecordId: e.target.dataset.bookId,
    })
    utils.deleteBook(this, (res) => {
      this.fetchBookList()
      this.setData({
        curRecordId: ''
      })
    })
  },

})