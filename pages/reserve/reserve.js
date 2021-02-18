// pages/reserve/reserve.js
const app = getApp()

Page({
  data: {
    rooms: [
      {
        imgUrl: '../../image/king_room.jpg',
        text: '温馨大床房',
        price: 200,
      },
      {
        imgUrl: '../../image/single_room.jpg',
        text: '静谧单人间',
        price: 100,
      },
      {
        imgUrl: '../../image/double_room.jpg',
        text: '舒适双人间',
        price: 150,
      },
    ],
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
      url: '../confirm/confirm?index=' + e.target.dataset.index,
    })
  }
})