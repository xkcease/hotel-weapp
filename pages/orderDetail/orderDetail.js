// pages/orderDetail/orderDetail.js
const { getUserOrderRequest, deleteOrderRequest } = require('../../utils/request');
const { getFormatDate, getFormatDateTime } = require('../../utils/dateTool');

Page({
  data: {
    order: {},
    userInfo: {},
  },
  onLoad: function (options) {
    this.getUserOrder(options.oid);

    const app = getApp();
    
    this.setData({
      userInfo: app.globalData.userInfo,
    });
  },
  getUserOrder(oid) {
    wx.showLoading({title: '加载中'});
    const stateTextArray = ['未入住', '已入住', '已完成'];
    const imgArray = ['reserved-icon.png', 'occupied-icon.png', 'completed-icon.png'];

    getUserOrderRequest(wx.getStorageSync('sessionId'), oid).then(res => {
      wx.hideLoading();
      
      res.stateText = stateTextArray[res.state];
      res.imgUrl = '/image/' + imgArray[res.state];
      res.total = res.price * res.reservation_during;
      res.reservationDate = getFormatDate(res.reservation_time);
      res.placeDate = getFormatDateTime(res.place_time);
      res.checkInDate = getFormatDateTime(res.check_in_time);
      res.checkOutDate = getFormatDateTime(res.check_out_time);

      this.setData({
        order: res,
      });
    }).catch(err => {
      console.log(err);
    });
  },
  deleteOrder(e) {
    wx.showModal({
      content: '确定要删除吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({title: '加载中'});
          deleteOrderRequest(e.target.dataset.oid, e.target.dataset.rid).then(res => {
            wx.hideLoading();
            wx.showToast({
              title: res.msg,
              icon: res.state ? 'success' : 'error',
              duration: 600
            });
            
            wx.switchTab({
              url: '/pages/my/my'
            });
          }).catch(err => {
            console.log(err);
            wx.showToast({
              title: '失败',
              icon: 'error',
              duration: 600
            });
          });
        }
      }
    });
  },
  modifyOrder(e) {
    wx.navigateTo({
      url: '../pay/pay?oid=' + e.target.dataset.oid,
    });
  },
})