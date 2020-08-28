// pages/login/login.js
const app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
     show: false,
     phone:'',
     password:'',
     phoneres:''
   },
   
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      console.log(options);
      wx.showToast({ 
        title:options, 
        icon:'loading', 
        duration: 3000,
        mask:true 
      }) 
   },
   register:function(){
      wx.navigateTo({ url: '/pages/register/register', })
   },
  
  getUserInfo(event) {
    console.log(event.detail);
  },
  onClose() {
    this.setData({ close: false });
  },
  getLogin(){
    wx.showToast({ 
      title:'登录中', 
      icon:'loading', 
      duration: 3000,
      mask:true 
    }) 
    var that = this
    // var url = 'http://192.168.101.171:9090/user/login_user_pwd'
    var url = app.globalData.URL + '/user/login_user_pwd'
    var random = Math.random()
    if(!this.data.phone || !this.data.password){
      wx.showToast({
        title: '不能为空',
        icon: 'none',
        duration: 2000,
        mask:true
    })
    // wx.hideToast();
    return
    }
    wx.request({
      url: url,
      data:{
        phone:this.data.phone,
        pwd:this.data.password,
        random:random
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data);
        // that.setData({teachers:res.data});
        var data  = res.data
        if(data.ret){
          wx.showToast({
            title: '登录成功',
            icon: 'succes',
            duration: 2000,
            mask:true
        })
        wx.removeStorage({
          key: 'phone',
          success (res) {
            console.log(res)
          }
        })
        // wx.hideToast();
        var app = getApp();
        app.appData.userInfo = {"user_id":res.data.user_id,"s_id":res.data.s_id,'user_name':res.data.phone};
        wx.setStorage({
          key: 'userInfo',
          data: JSON.stringify(res.data)
        })
          wx.navigateTo({ url: '/pages/index/index',})
        }else if(res.data.msg == 'phone is error'){
          wx.showToast({
            title: '手机号码错误',
            icon: 'none',
            duration: 2000,
            mask:true
        })
        // wx.hideToast();
      }else if(res.data.msg == 'pwd error'){
          wx.showToast({
            title: '密码错误',
            icon: 'none',
            duration: 2000,
            mask:true
        })
        // wx.hideToast();
        }else if(res.data.msg == 'phone unregist now!'){
          wx.showToast({
            title: '该账号还没有注册',
            icon: 'none',
            duration: 2000,
            mask:true
        })
        // wx.hideToast();
        }else{
          wx.showToast({
            title: '登录失败',
            icon: 'none',
            duration: 2000,
            mask:true
        })
        // wx.hideToast();
        }
      }
    })
    
    
  },
  getPhone(event){
    this.setData({ phone: event.detail })
  },
  getPassword(event){
    this.setData({ password: event.detail })
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
     var that = this
    wx.getStorage({
      key: 'phone',
      success (res) {
        that.setData({ phoneres: res.data,phone:res.data })
      }
    })
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