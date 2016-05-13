'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (PATH, uri, callback) {
  _superagent2.default.get('http://image.baidu.com' + uri).send().end(function (err, res) {
    try {
      var data = JSON.parse(res.text);
      var imageURLS = data.data.reduce(function (p, val, index) {
        if (val.hoverURL) {
          p.images.push(val.hoverURL + '\n');
          NUM--;
        }
        return p;
      }, { images: [] });
      // callback(JSON.stringify(imageURLS));
      if (NUM > 0) {
        callback(imageURLS.images.join(""));
      } else {
        console.log("已获取到20000+张图片");
        cd(PATH);
        exec("chmod +x ./download.sh");
        exec("./download.sh");
        process.exit();
      }
    } catch (e) {

      console.error(e);
    }
  });
};

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _simplecrawler = require('simplecrawler');

var _simplecrawler2 = _interopRequireDefault(_simplecrawler);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var Crawler = require("crawler");
var url = require('url');

require('shelljs/global');
var NUM = 20000;

// export default function(uri, callback){
//   var crawler = new Crawler("http://image.baidu.com");
//   crawler.initialProtocol = "http";
//   crawler.initialPath = uri;
//   crawler.userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36";
//   // crawler.hostname = "www.google.com";
//   crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
//     console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);
//     console.log("It was a resource of type %s", response.headers['content-type']);
//   });
//   console.log(uri);
//   crawler.start();
// };