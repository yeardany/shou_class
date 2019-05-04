// pages/watchVideo/watchVideo.js
//获取应用实例
import utils from '../../utils/index'
var app = getApp()

Page({
  data: {
    title: '我的书架',
    tableID: app.globalData.tableId,
    bookList: [],
    creatingBookName: '', // 当前正在创建的书名
    editingBookName: '', // 当前正在编辑的书名
    videoUrlList: []
  },

  onLoad(options) {
    wx.BaaS.login(false).then(() => {
      this.setData({
        profile: wx.BaaS.storage.get('userinfo')
      })
      //this.fetchBookList();
      this.fetchVideoIdList();
    })
  },

  // 获取 bookList 数据
  fetchBookList() {
    utils.getBooks(wx.BaaS.storage.get('uid'), (res) => {
      this.setData({
        bookList: res.data.objects // bookList array, mock data in mock/mock.js
      })
    })
  },

  // 获取 videoIdList 数据
  fetchVideoIdList() {
    utils.getVideoIds(wx.BaaS.storage.get('uid'), (res) => {
      this.setData({
        videoIdList: res.data.objects
      })
      this.fetchVideoUrl()
    })
  },

  fetchVideoUrl() {
    let MyFile = new wx.BaaS.File(),
      videoUrlList = [],
      self = this;
    this.data.videoIdList.forEach(function (value) {
      MyFile.get(value.videoId).then((res) => {
        // success
        videoUrlList.push({
          "url": res.data.path
        })
        self.setData({
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