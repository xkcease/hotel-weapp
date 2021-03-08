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

function reserveRequest(obj) {
  return postRequest('/reserve', { ...obj });
}

function getUserOrdersRequest(sessionId, state) {
  return getRequest('/getUserOrders', { sessionId, state });
}

function getUserOrderRequest(sessionId, oid) {
  return getRequest('/getUserOrder', { sessionId, oid });
}

function deleteOrderRequest(oid, rid) {
  return postRequest('/deleteOrder', { oid, rid });
}

module.exports = {
  loginUserRequest,
  getPhoneRequest,
  getHotelIntroRequest,
  getAllRoomIntrosRequest,
  getPriceRequest,
  reserveRequest,
  getUserOrdersRequest,
  getUserOrderRequest,
  deleteOrderRequest,
};