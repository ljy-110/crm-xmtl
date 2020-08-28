// pages/adminEnterprise/adminEnterprise.js
const app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
      show: false,
      company:'',
      phone:'',
      bossName:'',
      text:'',
      recommend:'',
      recommendPhone:'',
      taskid:null,
      token:null,
      staute:0
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      var that = this
      var token = options.token
      that.setData({token:token})
      this.getInfo()
   },
   getInfo(){
    var that = this
    var token = that.data.token
    var url = app.globalData.URL + '/admin/getTaskInfo'
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
          recommendPhone:info.adviser_phone
        })
      }
    })
   },
   getPass(){
    wx.showToast({ 
      title:'通过中', 
      icon:'loading', 
      mask:true 
    }) 
    var that = this
    var token = that.data.token
    var url = app.globalData.URL + '/admin/passTask'
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
        if(res.data.ret){
          wx.showToast({
            title: '通过成功',
            icon: 'succes',
            duration: 1000,
            mask:true
        })
        wx.hideToast();
          wx.navigateBack({
          delta: 1
        })
        }else{
          wx.showToast({
            title: '通过失败',
            icon: 'none',
            duration: 1000,
            mask:true
        })
        wx.hideToast();
        }
        
      }
    })
   },
   upPass(){
    wx.showToast({ 
      title:'拒绝中', 
      icon:'loading', 
      mask:true 
    }) 
    var that = this
    var token = that.data.token
    var url = app.globalData.URL + '/admin/refuseTask'
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
        that.setData({ show: true })
        wx.hideToast();
      }
    })
      wx.hideToast()
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