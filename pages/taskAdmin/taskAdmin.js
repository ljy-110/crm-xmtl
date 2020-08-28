// pages/taskAdmin/taskAdmin.js
const app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
      taskid:null,
      getTaskInfoList:[]
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      var taskid = options.task_id;
    this.setData({
      taskid:taskid,
    })
    this.getAdmin()
   },
   getAdmin(){
    var app = getApp();
    var userInfo = app.appData.userInfo;
    var url = app.globalData.URL + '/admin/getTaskInfoList'
    var that = this
    wx.request({
      url: url,
      data:{
        user_id:userInfo.user_id,
        task_id:that.data.taskid, 
        begin:0, 
        len:1000
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res.data);
        if(res.data.ret){
          var that = this
          that.setData({ getTaskInfoList: res.data.taskStatusList})
          wx.showToast({
            title: '获取成功',
            duration: 1000,
            mask:true
        })
          wx.stopPullDownRefresh()
        }else if(res.data.msg == 'the list is empty'){
          wx.showToast({
            title: '暂时没有信息',
            icon: 'none',
            duration: 1000,
            mask:true
        })
        wx.stopPullDownRefresh()
        }else{
          wx.showToast({
            title: '获取列表失败',
            icon: 'none',
            duration: 1000,
            mask:true
        })
        wx.stopPullDownRefresh()
        }
      }
    })
   },
   getCom(e){
      let token = e.currentTarget.dataset.token
      wx.navigateTo({
        url: '../adminEnterprise/adminEnterprise?token='+token,
      })
   },
   fastRead(){
    var app = getApp();
    var userInfo = app.appData.userInfo;
    var url = app.globalData.URL + '/admin/fastRead'
    var that = this
    wx.request({
      url: url,
      data:{
        user_id:userInfo.user_id,
        task_id:that.data.taskid, 
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        console.log(res.data);
        if(res.data.ret){
          let token = res.data.info.token_y
          wx.navigateTo({
            url: '../adminEnterprise/adminEnterprise?token='+token,
          })
          wx.stopPullDownRefresh()
        }else if(res.data.msg == 'no find'){
          wx.showToast({
            title: '没有待审核的任务',
            icon: 'none',
            duration: 1000,
            mask:true
        })
        wx.stopPullDownRefresh()
        }else{
          wx.showToast({
            title: '快速审核失败',
            icon: 'none',
            duration: 1000,
            mask:true
        })
        wx.stopPullDownRefresh()
        }
      }
    })
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
    this.getAdmin()
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
    this.getAdmin()
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