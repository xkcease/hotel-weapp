// app.js
const { loginUserRequest, getAllRoomIntrosRequest, getPriceRequest } = require('./utils/request');

App({
  globalData: {
    userInfo: null,
    phone: null,
  },
  onLaunch() {
    getPriceRequest().then(priceRes => {
      getAllRoomIntrosRequest().then(res => {
        const typeOptions = [
          {text: '大床', number: 2}, 
          {text: '单人床', number: 1}, 
          {text: '单人床', number: 2},
        ];
        const options = [ '无', '有'];
        const windowOptions = ['无窗', '部分有窗', '都有窗'];

        res.roomIntro.forEach((item, index) => {
          item.price = priceRes[index].price;
          item.optionsArray = item.options.split(';');
          item.typeText = typeOptions[item.type].text;
          item.number = typeOptions[item.type].number;
          item.showerText = options[item.shower];
          item.tvText = options[item.tv];
          item.windowText = windowOptions[item.window];
        });

        if (res.state) {
          wx.setStorage({
            data: res.roomIntro,
            key: 'roomIntro',
          });
        }
      });
    });

    wx.login({
      success: loginRes => {
        loginUserRequest(loginRes.code).then(res => {
          if (res.state) {
            this.globalData.phone = res.data.phone;            
            wx.setStorage({
              data: res.data.sessionId,
              key: 'sessionId',
            });
          }
          else {
            console.log(res.msg);
          }
        })
      }
    });

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo;
            }
          })
        }
      }
    });
  },
})
