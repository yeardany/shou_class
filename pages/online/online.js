// pages/online/online.js
//获取应用实例
import utils from '../../utils/dbOperation'
var app = getApp()

Page({
  data: {
    videoIdList: [],
    isLogin: false,
    news: [{
      "title": "行走的课堂：我校教授博士服务团赴四川开江县开展稻渔综合种养技术服务",
      "img": "https://www.shou.edu.cn/_upload/article/images/26/71/071df2a847819b0e600de6452419/c99aa835-94ea-47f2-8528-17f0a2813437.jpg",
      "content": "7月15日至21日，由水产与生命学院院长谭洪新教授、陈立婧教授、马旭洲副教授、刘至治副教授、王春副教授和张文博博士等组成的教授博士服务团第八分团来到四川省级贫困县开江县开展稻渔综合种养技术服务，特别邀请浙江大学王岩教授参加此次科技服务活动，探索跨校协同服务新机制。"
    }, {
      "title": "行走的课堂：我校教授博士服务团赴上海青浦、浙江湖州、上海崇明开展科技服务",
      "img": "https://www.shou.edu.cn/_upload/article/images/1a/6d/7fe95d3c4af0b60d485adfe93ede/e09a5824-df8e-42a6-b64b-b85bbd355042.jpg",
      "content": "7月8日，第五分团应邀赴上海市青浦区东方绿舟调研参观、开展科技服务、洽谈合作。东方绿舟是市教委直属事业单位，位于青浦区西南，淀山湖畔，建于2000年，2002年起运行，总占地面积5600亩。东方绿舟是上海市落实科教兴国战略和大力推进素质教育的一项标志性工程，是上海最大的校外教育场所，拥有智慧大道区，国防教育区等八大园区，年接待国内外学生和社会游客150余万人次。东方绿舟党总支书记、主任杨昕详细介绍了东方绿舟的园区建成、工作组成。"
    }, {
      "title": "行走的课堂：“乡村振兴正当时，海洋青年在路上”水产与生命学院国情社情观察团开展暑期社会实践调研",
      "img": "https://www.shou.edu.cn/_upload/article/images/87/36/d89d36ef4b37806bc907d598f8c8/94597541-a34c-4df6-8290-5e4d334dcf8c.jpg",
      "content": "7月8日，国情社情观察团在崇明区新河镇进化村展开了村级集体经济发展的调研活动。进化村党支部书记、村委会主任黄宇英，村委会引进的企业负责人上海熠如农业科技有限公司总经理杨勇参加了调研座谈。新河镇进化村作为上海市崇明区乡村振兴战略实施的主战场，勇于创新，颇具创意地打造“三产融合发展”的田园综合体，着力构建“生态＋”产业体系。目前，多项“生态+”项目正在有序实施中。如两无（无农药、无除草剂残留）大米的有机生产、金边灵芝的集约化栽培、复合型景观化稻虾蟹生态种养等等项目，让大家体会到乡村发展的多样化与蓬勃生命力。"
    }]
  },

  onLoad(options) {
    if (app.globalData.userInfo && (app.globalData.stuNumber).trim() != '--') {
      this.setData({
        isLogin: true
      })
      wx.setTabBarItem({
        index: 2,
        text: '课程'
      })
      this.fetchVideoIdList(false);
    }
  },

  onPullDownRefresh: function() {
    if (app.globalData.stuNumber === null || (app.globalData.stuNumber).trim() === '--') {
      wx.showLoading({
        title: '加载中',
      })

      setTimeout(function() {
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }, 2000)

    } else if (app.globalData.userInfo) {
      this.setData({
        isLogin: true
      })
      this.fetchVideoIdList(true)
    }

  },

  //获取腾讯视频vid列表，数据表videoId
  fetchVideoIdList(isPullDownRefresh) {
    let query = new wx.BaaS.Query(),
      that = this;

    utils.getDatum(app.globalData.videoIdTable, (res) => {
      that.setData({
        videoIdList: res.data.objects
      })
      if (isPullDownRefresh)
        wx.stopPullDownRefresh()
    }, query)
  }

})