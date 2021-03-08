// pages/reserve/reserve.js
const app = getApp()

Page({
  data: {
    roomIntro: [],
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
  },
  toConfirm(e) {
    wx.navigateTo({
      url: '../confirm/confirm?index=' + e.currentTarget.dataset.index,
    });
  },
  toPay(e) {
    wx.navigateTo({
      url: '../pay/pay?type=' + e.target.dataset.type,
    });
  },
})