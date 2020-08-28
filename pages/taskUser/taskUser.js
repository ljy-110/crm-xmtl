// pages/taskUser/taskUser.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskid:null,
    getTaskInfoList:[],
    finish_num:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var taskid = options.task_id;
    this.setData({
      taskid:taskid,
    })
    this.getUserList()
  },
  getUserList(){
    var app = getApp();
    var userInfo = app.appData.userInfo;
    var url = app.globalData.URL + '/task/getTaskInfoList'
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
          that.setData({ getTaskInfoList: res.data.getTaskInfoList})
          that.setData({ finish_num: res.data.finish_num})
          wx.showToast({
            title: '获取成功',
            duration: 1000,
            mask:true
        })
          console.log(that.data.getTaskInfoList)
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
  addEnterprise(){
   var taskid = this.data.taskid
   console.log(taskid)
    wx.navigateTo({ url: '/pages/addEnterprise/addEnterprise?task_id='+taskid, })
  },
  getupdateNew:function(e){
    let token = e.currentTarget.dataset.token
    var taskid = this.data.taskid
   console.log(taskid)
    wx.navigateTo({ url: '/pages/addEnterprise/addEnterprise?task_id='+taskid+'&token='+token, })
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
    this.getUserList()
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
    this.getUserList()
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