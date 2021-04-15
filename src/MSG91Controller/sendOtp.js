let MSG91Controller = function () {};
const request = require("request");
const SendOtp = require("sendotp");
const sendOtp = new SendOtp("309721AFL6VLWdU5e00c487P1");

MSG91Controller.Send_OTP = async (PhoneNumber, OTP) => {
  sendOtp.send(9100779400, "VXPACE", OTP, function (error, data) {
    if (error) return error;
    console.log(data);
  });
};

module.exports = MSG91Controller;
