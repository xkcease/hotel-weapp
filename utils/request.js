const { postRequest, getRequest } = require('./http');

function loginUserRequest(code) {
  return postRequest('/loginUser', { code });
}

function getPhoneRequest(sessionId, encryptedData, iv) {
  return postRequest('/getPhone', { sessionId, encryptedData, iv });
}

function getHotelIntroRequest() {
  return getRequest('/getHotelIntro');
}

function getAllRoomIntrosRequest() {
  return getRequest('/getAllRoomIntros');
}

function getPriceRequest() {
  return getRequest('/getPrice');
}

module.exports = {
  loginUserRequest,
  getPhoneRequest,
  getHotelIntroRequest,
  getAllRoomIntrosRequest,
  getPriceRequest,
};