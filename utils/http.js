const baseUrl = 'http://localhost:9092';

function getRequest(url, parmas) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      method: 'GET',
      data: {...parmas},
      success: res => {
        resolve(res.data);
      },
      fail: err => {
        reject(err);
      }
    });
  }).catch(err => {
    console.log(err);
  });
}

function postRequest(url, parmas) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      method: 'POST',
      data: {...parmas},
      success: res => {
        resolve(res.data);
      },
      fail: err => {
        reject(err);
      }
    });
  }).catch(err => {
    console.log(err);
  });
}

module.exports = {
  getRequest,
  postRequest,
};