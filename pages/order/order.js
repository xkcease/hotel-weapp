// pages/order/order.js
const { getUserOrdersRequest, deleteOrderRequest } = require('../../utils/request');
const { getFormatDate } = require('../../utils/dateTool');

Page({
  data: {
    index: 0,
    orderList: [],
  },
  onLoad: function (options) {
    this.getUserOrders(options.state);

    this.setData({
      index: parseInt(options.state),
    });
  },
  changeTab(e) {
    let index = parseInt(e.target.dataset.index);
    
    this.getUserOrders(index);
    this.setData({
      index: index,
    });
  },
  modifyOrder(e) {
    
  },
  deleteOrder(e) {
    wx.showModal({
      content: '确定要删除吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({title: '加载中'});
          deleteOrderRequest(e.target.dataset.oid, e.target.dataset.rid).then(res => {
            wx.hideLoading();

            let index = this.data.orderList.findIndex(order => {
              return order.oid === e.target.dataset.oid;
            });
            let list = this.data.orderList;
            list.splice(index, 1);

            this.setData({
              orderList: list,
            });

            wx.showToast({
              title: res.msg,
              icon: res.state ? 'success' : 'error',
              duration: 600
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
  getUserOrders(state) {
    wx.showLoading({title: '加载中'});

    getUserOrdersRequest(wx.getStorageSync('sessionId'), state).then(res => {
      wx.hideLoading();

      const stateTextArray = ['未入住', '已入住', '已完成'];

      res.forEach(order => {
        order.stateText = stateTextArray[order.state];
        order.total = order.price * order.reservation_during;
        order.reservationDate = getFormatDate(order.reservation_time);
      });

      this.setData({
        orderList: res,
      });
    }).catch(err => {
      console.log(err);
    });
  },
  toOrderDetail(e) {
    wx.navigateTo({
      url: '../orderDetail/orderDetail?=oid' + e.currentTarget.dataset.oid,
    })
  }
})