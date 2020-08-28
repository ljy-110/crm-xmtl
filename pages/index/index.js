//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo:'',
    taskList:[],
    options:0
  },
  onPullDownRefresh () {
    
    this.getTasklist()
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    this.getTasklist()
    console.log(options.phone);
    this.setData({options:options.phone})
  },
  getTasklist(){
    // const app = getApp()
    var url = app.globalData.URL + '/task/getTaskList'
    var that = this
    // wx.getStorage({
    //   key: 'userInfo',
    //   success(res) {
    //     console.log(res.data)
    //     var dataInfo = JSON.parse(res.data)
        
    //   }
    // })
    // var app = getApp();
    var userInfo = app.appData.userInfo;
    wx.request({
      url: url,
      data:{
        user_id:userInfo.user_id,
        s_id:userInfo.s_id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res.data);
        if(res.data.ret){
          var that = this
          that.setData({ taskList: res.data.taskList})
          // console.log(that.data.taskList)
          wx.stopPullDownRefresh()
        }else if(res.data.msg == 'the tast-list is empty'){
          wx.showToast({
            title: '暂时没有任务',
            icon: 'none',
            duration: 1000,
            mask:true
        })
        wx.stopPullDownRefresh()
        }else{
          wx.showToast({
            title: '获取任务失败',
            icon: 'none',
            duration: 1000,
            mask:true
        })
        wx.stopPullDownRefresh()
        }
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getTask:function(e){
    let taskid = e.currentTarget.dataset.taskid
    var app = getApp();
    var userInfo = app.appData.userInfo;
    let user_id = userInfo.user_id
    if(user_id == 'user_phone12345678900'){
      wx.navigateTo({ 
        url: '../taskAdmin/taskAdmin?task_id=' + taskid, 
      })
    }else{
      wx.navigateTo({ 
        url: '../taskUser/taskUser?task_id=' + taskid, 
      })
    }
    
  },
  onShareAppMessage: function () {
    var app = getApp();
    var userInfo = app.appData.userInfo;
    var phone = userInfo.user_name
    console.log(phone);
    
    return {
      title:'6DGS 客户管理系统',
      path:'/pages/login4/login4?phone=' + phone
    }
   },
   onShow: function () {
    wx.hideHomeButton()
  },
})
