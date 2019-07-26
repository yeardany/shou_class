// pages/doExam/doExam.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    realIndex: 0,
    questionCount: 0,
    optionCount: 4,
    wrong: 0,
    isSelected: false,
    questions: [{
      "true": "",
      "question": "",
      "options": [{
        "content": "",
        "option": ""
      }, {
        "content": "",
        "option": ""
      }, {
        "content": "",
        "option": ""
      }, {
        "content": "",
        "option": ""
      }],
      "img": null,
      "no": 1
    }],
    questionArrays: [],
    answerArrays: ["A", "B", "C", "D"],
    setColor: "green",
    icon: ["circle", "circle", "circle", "circle"],
    value: '',
    trueValue: ''
  },
  //乱序算法
  randSort: function() {
    return Math.random() > 0.5 ? 1 : -1;
  },
  //对数组乱序
  setList: function() {
    var newList = this.data.questionArrays.sort(this.randSort);
    this.setData({
      list: newList,
    });
  },
  //对选项乱序
  setOption: function() {
    var newOption = this.data.answerArrays.sort(this.randSort);
    this.setData({
      answerArrays: newOption
    })
  },
  //点击选项触发函数
  select: function(event) {
    let match = {
        "A": 0,
        "B": 1,
        "C": 2,
        "D": 3
      },
      value = event.currentTarget.dataset.value,
      chooseOption = event.currentTarget.dataset.option,
      trueOption = this.data.questions[this.data.realIndex].true,
      temp = this.data.questions[this.data.realIndex].options,
      trueVaule = temp[match[trueOption]].content;
    console.log("选择的选项是：" + chooseOption + " 选择的值：" + value);
    console.log("本题乱序前的选项是：" + trueOption + " 值是:" + trueVaule);

    // var icons = ["circle", "circle", "circle", "circle"];
    // icons[chooseOption] = "cancel";
    var icons = ["circle", "circle", "circle", "circle"];
    icons[chooseOption] = "success";
    this.setData({
      icon: icons,
      value: value,
      trueVaule: trueVaule
    })
  },
  //点击下一题
  next: function() {
    if (this.data.value != this.data.trueVaule) {
      this.setData({
        wrong: this.data.wrong + 1
      })
      console.log('错一题')
    }

    if (this.data.index < this.data.questionArrays.length - 1) {
      this.setData({
        isSelected: false,
        index: this.data.index + 1,
        icon: ["circle", "circle", "circle", "circle"]
      })
      this.setData({
        realIndex: this.data.questionArrays[this.data.index]
      })
      this.setData({
        questionDetail: this.data.questions[this.data.realIndex].question
      })
      // console.log("选择后的index:" + this.data.index);
      // console.log("选择后的realIndex:" + this.data.realIndex);
    } else {
      wx.showModal({
        title: '结果',
        content: '错了' + this.data.wrong + '题',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

    try {
      let questions = JSON.parse(wx.getStorageSync('exercises'))

      if (questions) {

        //在js中初始化一个数组，数组里存储正序的题号。这里题号从1开始
        this.setData({
          questions: questions,
          questionCount: questions.length
        })
        var questionArray = [];
        for (var i = 0; i < this.data.questionCount; i++) {
          questionArray.push(i);
        }
        this.setData({
          questionArrays: questionArray
        })
        //乱序题号数组、选项数组
        this.setList();
        console.log("乱序后的题号数组：" + this.data.questionArrays)
        this.setOption();
        console.log("乱序后的选项数组：" + this.data.answerArrays)
        //初始化第一个题目
        this.setData({
          realIndex: this.data.questionArrays[this.data.index]
        })
        console.log("onLoad时的index:" + this.data.index);
        console.log("onLoad时的realIndex:" + this.data.realIndex);
        this.setData({
          questionDetail: questions[this.data.realIndex].question
        })

      }

    } catch (e) {
      // Do something when catch error
    }

  }
})