// pages/register/register.js
const app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
      phone:' ',
      password:' ',
      sms:' ',
      tuijian: ' ',
      time:'发送验证码',
      currentTime:60,
      getRecommendPhone:'',
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {

   },
   getRegister:function(event){
      console.log(event)
      if(!this.data.phone || !this.data.password || !this.data.sms){
        wx.showToast({
          title: '值不能为空',
          icon: 'none',
          duration: 1000,
          mask:true
      })
      return
      }
      var url = app.globalData.URL + '/user/regist_phone_user'
    var random = Math.random()
    wx.request({
      url: url,
      data:{
        phone:this.data.phone,
        pwd:this.data.password,
        sms_code:this.data.sms,
        recommender:this.data.tuijian,
        adviser_phone:this.data.getRecommendPhone,
        random:random
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data);
        var data  = res.data
        var that = this
        if(data.ret){
          // wx.navigateTo({ url: '/pages/login/login', })
          
          wx.navigateBack({
            delta: 1
          })
          wx.showToast({
            title: '注册成功',
            icon: 'succes',
            duration: 1000,
            mask:true
        })
        wx.setStorage({
          key:"phone",
          data:that.data.phone
        })
        }else if(res.data.msg == 'pwd is error'){
          wx.showToast({
            title: '请输入至少六位密码',
            icon: 'none',
            duration: 1000,
            mask:true
        })
        }else if(res.data.msg == "sms_code unmatch"){
          wx.showToast({
            title: '验证码错误',
            icon: 'none',
            duration: 1000,
            mask:true
        })
        }else if(res.data.msg == 'this phone is registed'){
          wx.showToast({
            title: '账号已被注册，请直接登录',
            icon: 'none',
            duration: 1000,
            mask:true
        })
        }else{
          wx.showToast({
            title: '注册失败',
            icon: 'none',
            duration: 1000,
            mask:true
        })
        }
      }
      
    })
    
   },
   getCode(){
    wx.showToast({ 
      title:'注册中', 
      icon:'loading', 
      mask:true 
    }) 
    var that = this;
    var url = app.globalData.URL + '/user/send_sms'
    var random = Math.random()
    wx.request({
      url: url,
      data:{
        phone:this.data.phone,
        random:random
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data);
        if(res.data.ret){
          wx.showToast({
            title: '发送成功',
            icon: 'succes',
            duration: 1000,
            mask:true
        })
        wx.hideToast();
        var currentTime = that.data.currentTime;
          var interval;
          that.setData({
            time: currentTime + '秒 发送中',
            disabled: true,
          })
          interval = setInterval(function () {
            that.setData({
              time: (currentTime - 1) + ' 秒 发送中'
            })
            currentTime--;
            if (currentTime <= 0) {
              clearInterval(interval)
              that.setData({
                time: '重新获取',
                currentTime: 60,
                disabled: false
              })
            }
          }, 1000)
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
            title: '请求失败',
            icon: 'none',
            duration: 1000,
            mask:true
        })
        wx.hideToast();
        }
      }
    })
   },
   getPhone(event){
      this.setData({ phone: event.detail })
      // wx.setStorage({
      //   key:"phone",
      //   data:event.detail
      // })
    },
    getPassword(event){
      this.setData({ password: event.detail })
      // console.log(event.detail);
    },
    getcodeInput(event){
      this.setData({ sms: event.detail })
      // console.log(event.detail);
    },
    getRecommend(event){
      this.setData({ tuijian: event.detail })
      // console.log(event.detail);
    },
    getRecommendPhone(event){
      this.setData({ getRecommendPhone: event.detail })
      // console.log(event.detail);
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

   }
})