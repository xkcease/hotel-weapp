// pages/pay/pay.js
const { getFormatDate, getFormatNextDate } = require('../../utils/dateTool');
const { throttle } = require('../../utils/util');
const { reserveRequest, getUserOrderRequest } = require('../../utils/request');

Page({
  data: {
    phone: '',
    room: {},
    date: {
      start: getFormatDate(Date.now()),
      end: getFormatNextDate(Date.now(), 1),
      reservation_time: Date.now(),
      reservation_during: 1,
    },
    today: getFormatDate(Date.now()),
    number: 1,
    total: 0,
    oid: '',
  },
  onLoad: function (options) {
    if (options.oid) {        // 修改订单
      getUserOrderRequest(wx.getStorageSync('sessionId'), options.oid).then(res => {
        this.setData({
          room: res,
          phone: res.contact,
          ['date.start']: getFormatDate(res.reservation_time),
          ['date.end']: getFormatNextDate(res.reservation_time, res.reservation_during),
          ['date.reservation_time']: res.reservation_time,
          ['date.reservation_during']: res.reservation_during,
          oid: options.oid,
        });
      });
    }
    else {          // 新订单
      const app = getApp();

      this.setData({
        phone: app.globalData.phone,
      });
      
      wx.getStorage({
        key: 'roomIntro',
        success: (res) => {
          this.setData({
            room: res.data[options.type], 
            total: res.data[options.type].price,
          });
        }
      })
    }
  },
  startDateChange: function(e) {
    let startTime = new Date(e.detail.value).getTime();
    let endTime = new Date(this.data.date.end).getTime();
    let during = (endTime - startTime) / 86400000

    this.setData({
      ['date.start']: e.detail.value,
      ['date.reservation_time']: startTime,
      ['date.reservation_during']: during,
      total: this.data.number * this.data.room.price * during,
    })
  },
  endDateChange: function(e) {
    let startTime = new Date(this.data.date.start).getTime();
    let endTime = new Date(e.detail.value).getTime();
    let during = (endTime - startTime) / 86400000
    
    this.setData({
      ['date.end']: e.detail.value,
      ['date.reservation_time']: startTime,
      ['date.reservation_during']: during,
      total: this.data.number * this.data.room.price * during,
    });
  },
  minusNumber() {
    (throttle(() => {
      this.setData({
        number: this.data.number > 1 ? --this.data.number : 1,
        total: this.data.number * this.data.room.price * this.data.date.reservation_during,
      });
    }, 100))();
  },
  addNumber() {
    (throttle(() => {
      this.setData({
        number: ++this.data.number,
        total: this.data.number * this.data.room.price * this.data.date.reservation_during,
      });
    }, 80))();
  },
  reserve() {
    let data = {
      phone: this.data.phone,
      number: this.data.number,
      sessionId: wx.getStorageSync('sessionId'),
      reservation_time: this.data.date.reservation_time,
      reservation_during: this.data.date.reservation_during,
      type: this.data.room.type,
      oid: this.data.oid,
    };
    
    if (data.reservation_during < 1) {
      wx.showToast({
        title: '不能小于1晚',
        icon: 'error',
        duration: 800
      });
      return;
    }

    wx.showLoading({title: '加载中'});

    reserveRequest(data).then(res => {
      wx.hideLoading();

      wx.showToast({
        title: res.msg,
        icon: res.state ? 'success' : 'error',
        duration: 600
      });

      wx.switchTab({
        url: '/pages/reserve/reserve'
      });
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: '失败',
        icon: 'error',
        duration: 600
      });
    });
  },
})