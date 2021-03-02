// pages/confirm/confirm.js
const { getFormatDate, getFormatNextDate } = require('../../utils/dateTool');
const { throttle } = require('../../utils/util');
const { reserveRequest } = require('../../utils/request');

Page({
  data: {
    date: {
      start: getFormatDate(Date.now()),
      end: getFormatNextDate(Date.now(), 1),
      reservation_time: Date.now(),
      reservation_during: 1,
    },
    today: getFormatDate(Date.now()),
    number: 1,
    total: 0,
    room: {},
  },
  onLoad: function (options) {
    wx.getStorage({
      key: 'roomIntro',
      success: (res) => {
        this.setData({
          room: res.data[options.index],
          total: res.data[options.index].price,
        })
      }
    });
  },
  startDateChange: function(e) {
    this.setData({
      ['date.start']: e.detail.value
    })
  },
  endDateChange: function(e) {
    let startTime = new Date(this.data.date.start);
    let endTime = new Date(e.detail.value);
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
      number: this.data.number,
      sessionId: wx.getStorageSync('sessionId'),
      reservation_time: this.data.date.reservation_time,
      reservation_during: this.data.date.reservation_during,
      type: this.data.room.type,
    };
    
    wx.showLoading({title: '加载中'});

    reserveRequest(data).then(res => {
      wx.hideLoading();

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
    })
  },
})