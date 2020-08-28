// pages/addEnterprise/addEnterprise.js
const app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
      company:'',
      phone:'',
      bossName:'',
      text:'',
      recommend:'',
      getRecommendPhone:'',
      taskid:null,
      token:null,
      statue:0,
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
    var taskid = options.task_id;
    console.log(taskid)
    console.log(options)
    this.setData({
      taskid:taskid,
    })
    var that = this
    if("token" in options){
      var token = options.token
      var url = app.globalData.URL + '/task/getTaskInfo'
      wx.request({
        url: url,
        data:{
          info_id:token
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res.data);
          let info = res.data.info
          that.setData({
            taskid:info.task_id,
            company:info.company_name,
            phone:info.phone,
            bossName:info.boss_name,
            text:info.content,
            recommend:info.adviser,
            statue:info.status,
            token:token,
            getRecommendPhone:info.adviser_phone,
          })
        }
      })
      
    }else{
    }
   },
   getAdd(){
    wx.showToast({ 
      title:'添加中', 
      icon:'loading', 
      mask:true 
    }) 
    var app = getApp();
    var userInfo = app.appData.userInfo;
    console.log(userInfo);
    wx.getStorage({
      key: 'userInfo',
      success (res) {
        console.log(res.data)
      }
    })
      var that = this
      var url = app.globalData.URL + '/task/addTaskInfo'
      if(!this.data.phone || !this.data.company || !this.data.bossName || !this.data.text){
        wx.showToast({
          title: '不能为空',
          icon: 'none',
          duration: 1000,
          mask:true
      })
      return
      }
      wx.request({
        url: url,
        data:{
         user_id:userInfo.user_id, 
         task_id:this.data.taskid, 
         company_name:this.data.company, 
         phone:this.data.phone, 
         boss_name:this.data.bossName, 
         content:this.data.text, 
         adviser:this.data.recommend,
         adviser_phone:this.data.getRecommendPhone,
         user_phone:userInfo.user_name,
         recommender:userInfo.recommender
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res.data);
          // that.setData({teachers:res.data});
          // var data  = res.data
          if(res.data.ret){
            wx.showToast({
              title: '添加成功',
              icon: 'succes',
              duration: 1000,
              mask:true
          })
          wx.hideToast();
          var taskid=that.data.taskid
          console.log(taskid);
            // wx.navigateTo({ url: '/pages/taskUser/taskUser?task_id='+taskid,})
            wx.navigateBack({
              delta: 1
            })
          }else if(res.data.msg == 'phone is error'){
            wx.showToast({
              title: '手机号码错误',
              icon: 'none',
              duration: 1000,
              mask:true
          })
          wx.hideToast();
          }else{
            wx.showToast({
              title: '添加失败',
              icon: 'none',
              duration: 1000,
              mask:true
          })
          wx.hideToast();
          }
        }
      })
      // wx.navigateTo({
      //   url: '/pages/taskUser/taskUser',
      // })
   },
   getUpdate(){
    wx.showToast({ 
      title:'修改中', 
      icon:'loading', 
      mask:true 
    }) 
    var app = getApp();
    var userInfo = app.appData.userInfo;
      var that = this
      var url = app.globalData.URL + '/task/resetTaskInfo'
      // if(!this.data.phone || !this.data.company || !this.data.bossName || !this.data.text){
      //   wx.showToast({
      //     title: '不能为空',
      //     icon: 'none',
      //     duration: 1000,
      //     mask:true
      // })
      // return
      // }
      wx.request({
        url: url,
        data:{
         user_id:userInfo.user_id, 
         info_id:this.data.token, 
         company_name:this.data.company, 
         phone:this.data.phone, 
         boss_name:this.data.bossName, 
         content:this.data.text, 
         adviser:this.data.recommend,
         adviser_phone:this.data.getRecommendPhone
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res.data);
          // that.setData({teachers:res.data});
          // var data  = res.data
          if(res.data.ret){
            wx.showToast({
              title: '修改成功',
              icon: 'succes',
              duration: 1000,
              mask:true
          })
          wx.hideToast();
          var taskid=that.data.taskid
          console.log(taskid);
            // wx.navigateTo({ url: '/pages/taskUser/taskUser?task_id='+taskid,})
            wx.navigateBack({
              delta: 1
            })
          }else if(res.data.msg == 'info_id error'){
            wx.showToast({
              title: '信息错误',
              icon: 'none',
              duration: 1000,
              mask:true
          })
          wx.hideToast();
          }else{
            wx.showToast({
              title: '修改失败',
              icon: 'none',
              duration: 1000,
              mask:true
          })
          wx.hideToast();
          }
        }
      })
   },
   getCompany(event){
      this.setData({ company: event.detail })
      // console.log(event.detail)
   },
   getPhone(event){
      this.setData({ phone: event.detail })
      // console.log(event.detail)
   },
   getBossName(event){
      this.setData({ bossName: event.detail })
      // console.log(event.detail)
   },
   bindTextAreaBlur(event){
      this.setData({ text: event.detail.value })
      // console.log(event.detail.value)
   },
   getRecommend(event){
      this.setData({ recommend: event.detail })
      // console.log(event.detail)
   },
   getRecommendPhone(event){
      this.setData({ getRecommendPhone: event.detail })
      // console.log(event.detail)
   },
   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function () {

   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {

   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function () {

   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {

   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function () {

   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function () {

   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function () {
    var app = getApp();
    var userInfo = app.appData.userInfo;
    var phone = userInfo.user_name
    return {
      title:'6DGS 客户管理系统',
      path:'/pages/login4/login4?phone=' + phone
    }
   }
})