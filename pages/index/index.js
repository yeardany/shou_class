//index.js
//获取应用实例
const app = getApp(),
  pageData = require("./pageList"),
  emptyPageData = require("./emptyList"),
  nameIndex = require("./nameIndex"),
  pinyin = require("../../utils/pinYinUtil");
let nextPageNumber = 2,
  searchIndex = []

Page({
  data: {
    scrollHeigth: app.globalData.scrollHeight,
    contacts: app.globalData.firstPageData,
    listShow: false,
    schoolName: "",
    monitorName: ""
  },
  toBottom: function () {
    emptyPageData[nextPageNumber] = pageData[nextPageNumber]
    this.setData({
      contacts: emptyPageData,
    })
    nextPageNumber++
  },
  tap: function (event) {
    let data = event.currentTarget.dataset
    this.showDetail(data)
  },
  input: function (letter) {
    let state = false
    if (letter.detail.cursor >= 1 && letter.detail.cursor <= 4) {
      (Array.from(letter.detail.value, x => /^[\u4e00-\u9fa5],{0,}$/.test(x))).every((item) => {
        if (!item) {
          wx.showToast({
            title: '请输入中文',
            icon: 'none'
          })
          state = false
        } else
          state = true
        return true
      })
      if (state) {
        let firstLetter = pinyin.getFirstLetter(letter.detail.value)
        searchIndex = nameIndex[firstLetter.substring(0, 1).toLowerCase()]
      }
    }
  },
  search: function (name) {
    if (searchIndex === undefined || searchIndex == []) return
    else {
      let find = searchIndex.find((item) => {
        return item.city === name.detail.value
      })
      searchIndex = []
      this.showDetail(find)
    }
  },
  getSchoolName: function (e) {
    this.setData({
      schoolName: e.detail.value
    })
  },
  getMonitorName: function (e) {
    this.setData({
      monitorName: e.detail.value
    })
  },
  check: function () {
    if (this.data.schoolName === "上海海洋大学" && this.data.monitorName === "xdr") {
      this.setData({
        listShow: true
      })
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 1500)
    }
  },
  showDetail: function (data) {
    if (data === undefined) {
      wx.showToast({
        title: '没有找到任何信息喔～',
        icon: 'none'
      })
      return
    } else {
      let name = data.city,
        phone = data.phone === undefined ? "" : "手机：" + data.phone,
        tel = data.tel === undefined ? "" : "电话：" + data.tel,
        email = data.email === undefined ? "" : "邮箱：" + data.email,
        content = phone + tel + email === "" ? "无联系方式" : phone + "\r\n" + tel + "\r\n" + email
      wx.showModal({
        title: name,
        showCancel: false,
        confirmColor: '#333333',
        content: content.trim(),
      })
    }
  }
})