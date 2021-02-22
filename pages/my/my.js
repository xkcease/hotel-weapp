const app = getApp();
const { getPhoneRequest } = require('../../utils/request');

Page({
  data: {
    show: false,
    userInfo: {},
    avatarUrl: '../../image/avatar.png',
    hasUserInfo: false,
    hasPhone: false,
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        hasUserInfo: true
      });
    }

    if (app.globalData.phone) {
      this.setData({
        hasPhone: true
      });
    }
  },
  getUserInfo(e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: e.detail.userInfo,
        avatarUrl: e.detail.userInfo.avatarUrl,
        hasUserInfo: true,
      });

      if (!app.globalData.phone) {
        this.open();
      }
    }
    else {
      console.log('pity');
    }
  },
  getPhoneNumber (e) {
    this.setData({
      show: false
    });
  
    if (e.detail.encryptedData) {
      getPhoneRequest(wx.getStorageSync('sessionId'), e.detail.encryptedData, e.detail.iv).then(res => {
        if (res.state) {
          app.globalData.phone = res.phone;

          this.setData({
            hasPhone: true,
          });
          wx.showToast({
            title: '绑定成功',
            icon: 'success',
            duration: 600
          })
        }
      }).catch(err => {
        console.log(err);
      });
    }
    else {
      console.log('getPhone error');
      this.setData({
        hasPhone: false
      });
    }
  },
  open() {
    this.setData({
      show: true
    });
  }
});