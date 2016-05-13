'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _myspider = require('./myspider');

var _myspider2 = _interopRequireDefault(_myspider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var randomWords = require('random-words');
var fs = require('fs');
var PATH = process.cwd();

var IndexController = function () {
  function IndexController(num) {
    _classCallCheck(this, IndexController);

    num = 2000;
    this.keyWords = randomWords(num);
    this.spiders = [];
    this.init();
  }

  _createClass(IndexController, [{
    key: 'init',
    value: function init() {
      var self = this;
      this.spiders = this.keyWords.forEach(function (keyWord, index) {
        self.send(keyWord);
      });
      fs.appendFileSync(PATH + '/download.sh', '#!/bin/sh \nwget --user-agent="User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:32.0) Gecko/20100101 Firefox/32.0" -i data.txt');
      // this.send();
    }
  }, {
    key: 'send',
    value: function send(keyWord) {
      return new spiderController(keyWord);
    }
  }]);

  return IndexController;
}();

var spiderController = function () {
  function spiderController(keyWord) {
    _classCallCheck(this, spiderController);

    this.keyWord = keyWord;
    // this.url = `/search?hl=zh-CN&site=imghp&tbm=isch&source=hp&biw=1680&bih=955&q=${keyWord}&oq=${keyWord}`;

    // this.url = "http://wungcq.github.io";
    // this.url= "/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=index&fr=&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=soap&oq=soap&rsp=-1"

    this.url = '/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord=' + this.keyWord + '&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&word=' + this.keyWord + '&s=&se=&tab=&width=&height=&face=0&istype=2&qc=&nc=1&fr=&pn=90&rn=30&gsm=5a&' + Date.now();
    this.times = 0;
    this.init();
  }

  _createClass(spiderController, [{
    key: 'init',
    value: function init() {
      var self = this;
      (0, _myspider2.default)(PATH, this.url, this.saveDoc.bind(self));
    }
  }, {
    key: 'saveDoc',
    value: function saveDoc(doc) {
      this.times++;
      console.log(this.keyWord + ' finished ' + this.times);
      fs.appendFileSync(PATH + '/data.txt', doc + "\n");
    }
  }]);

  return spiderController;
}();

var m = new IndexController();