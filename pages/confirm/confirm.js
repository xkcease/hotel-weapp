// pages/confirm/confirm.js
Page({
  data: {
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
  toPay(e) {
    wx.navigateTo({
      url: '../pay/pay?type=' + e.target.dataset.type,
    });
  },
})