// home.js
// 获取应用实例
const app = getApp();
const { getHotelIntroRequest } = require('../../utils/request');

Page({
  data: {
    hotelIntro: {},
    roomIntro: {},
  },
  onLoad() {
    wx.getStorage({
      key: 'roomIntro',
      success: (res) => {
        this.setData({
          roomIntro: res.data, 
        })
      }
    })
    getHotelIntroRequest().then(res => {
      if (res.state) {
        res.hotelIntro.optionsArray = res.hotelIntro.options.split(';');

        this.setData({
          hotelIntro: res.hotelIntro,
        });
      }
      else {
        console.log(res.msg);
      }
    });
  },
  toReserve() {
    wx.switchTab({
      url: '/pages/reserve/reserve'
    })
  }
})
