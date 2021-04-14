var request = require("request");
var fs = require("fs");
var responseData = {};
const upload = (imgUrl) => {
  return new Promise(async (resolve, rej) => {
    try {
      var options = {
        url: "https://api.getlit.co.in/upload/Upload_Image",
        headers: {},
        formData: {
          image: {
            value: fs.createReadStream(imgUrl),
            options: {
              filename: imgUrl,
              contentType: null,
            },
          },
        },
      };
      responseData = await request.post(options, function (error, response) {
        if (error) throw new Error(error);
        resolve(response.body);
      });
    } catch (err) {
      rej(err);
    }
  });
};

module.exports = upload;
