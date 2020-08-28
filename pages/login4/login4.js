// pages/login4/login4.js
const app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
    loginstate: "0",
    openid: "",
    session_key:'',
    userEntity: null,
    terminal: "",
    osVersion: "",
　phoneNumber:"",
    showModal: false,//定义登录弹窗
    options:''
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
    console.log(options.phone);
    this.setData({options:options.phone})
    var that = this;
    wx.login({
      success(res) {
        console.log(res);
        var code = res.code
        var url = app.globalData.URL + '/user/tt'
        wx.request({
          url: url,
          method: "GET",
          data: {
            code: res.code
          },
          success: function (res) {
            if(res.data.ret){
              let info = res.data.info
              console.log(info);
              that.setData({openid:info.openid,session_key:info.session_key});
              that.onGotUserInfo()
              wx.showToast({
                title: '登陆中',
                icon: 'loading',
                duration: 2000,
                mask:true
            })
            }else{
              wx.showToast({
                title: '获取数据失败',
                icon: 'none',
                duration: 2000,
                mask:true
            })
            }
            
          }
        })
      }
    })
   },
   register(){
    wx.navigateTo({ url: '/pages/login/login',})
   },
   dialog(){
    // this.setData({ show: true })
    wx.showModal({
      title: '客服电话',
      content: '18277107495',
      confirmText:'复制',
      success (res) {
        if (res.confirm) {
          // wx.makePhoneCall({
          //   phoneNumber: '18277107495' 
          // })
          wx.setClipboardData({
            data: '18277107495',
            success (res) {
              wx.getClipboardData({
                success (res) {
                  console.log(res.data) // data
                }
              })
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },
   onGotUserInfo: function (e) {
      var that = this;
      var url = app.globalData.URL + '/user/isRegisted'
        wx.request({
          url: url,
          method: "GET",
          data: {
            openid: that.data.openid
          },
          success: function (res) {
            console.log(res.data);
            if(res.data.ret){
              wx.showToast({
                title: '登陆成功',
                icon: 'succes',
                duration: 1500,
                mask:true
            })
            wx.setStorage({
              key: 'userInfo',
              data: JSON.stringify(res.data)
            })
            wx.redirectTo({
              url: '/pages/index/index'
            })
            var app = getApp();
            app.appData.userInfo = {"user_id":res.data.user_id,"s_id":res.data.s_id,'user_name':res.data.phone,'recommender':res.data.recommender};
            // wx.navigateTo({ url: '/pages/index/index',})
            }else{
              that.showDialogBtn();
            }
          }
        })
    },
    getPhone(event){
      console.log(event.detail.value);
      this.setData({ phoneNumber: event.detail.value })
    },
    getPhoneNumber(){
      var that = this;
      var url = app.globalData.URL + '/user/regist_phone_user'
      var random = Math.random()
        wx.request({
          url: url,
          method: "GET",
          data: {
            phone:that.data.phoneNumber,
            openid: that.data.openid,
            recommender:that.data.options,
            random:random
          },
          success: function (res) {
            console.log(res.data);
            if(res.data.ret){
              wx.showToast({
                title: '绑定成功',
                icon: 'succes',
                duration: 2000,
                mask:true
            })
            that.onGotUserInfo()
            that.hideModal()
            }else if(res.data.msg == 'phone is error'){
              wx.showToast({
                title: '电话号码不对',
                duration: 2000,
                icon: 'none',
                mask:true
            })
            }else{
              wx.showToast({
                title: '绑定失败',
                duration: 2000,
                icon: 'none',
                mask:true
            })
            }
          }
        })
    },
    // 显示一键获取手机号弹窗
  showDialogBtn: function () {
   this.setData({
     showModal: true//修改弹窗状态为true，即显示
   })
 },
 // 隐藏一键获取手机号弹窗
 hideModal: function () {
   this.setData({
     showModal: false//修改弹窗状态为false,即隐藏
   });
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