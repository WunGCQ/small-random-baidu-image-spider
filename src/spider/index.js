import mySpider from './myspider';
var randomWords = require('random-words');
var fs = require('fs');
var PATH = process.cwd();

class IndexController {
  constructor(num){

    num = 2000;
    this.keyWords = randomWords(num);
    this.spiders = [];
    this.init();
  }
  init(){
    var self = this;
    this.spiders = this.keyWords.forEach((keyWord,index)=>{
      self.send(keyWord);
    })
    fs.appendFileSync(`${PATH}/download.sh`,
      `\n#!/bin/sh \nwget --user-agent="User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:32.0) Gecko/20100101 Firefox/32.0" -i data.txt -p images`
    );
    // this.send();
  }
  send(keyWord){
    return new spiderController(keyWord);
  }
}

class spiderController{
  constructor(keyWord){

    this.keyWord = keyWord;
    // this.url = `/search?hl=zh-CN&site=imghp&tbm=isch&source=hp&biw=1680&bih=955&q=${keyWord}&oq=${keyWord}`;

    // this.url = "http://wungcq.github.io";
    // this.url= "/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=index&fr=&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=soap&oq=soap&rsp=-1"

    this.url = `/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord=${this.keyWord}&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&word=${this.keyWord}&s=&se=&tab=&width=&height=&face=0&istype=2&qc=&nc=1&fr=&pn=90&rn=30&gsm=5a&${Date.now()}`
    this.times = 0;
    this.init();

  }

  init(){
    var self = this;
    mySpider(PATH,this.url, this.saveDoc.bind(self));
  }

  saveDoc(doc){
    this.times++;
    console.log(`${this.keyWord} finished ${this.times}`);
    fs.appendFileSync(`${PATH}/data.txt`, doc+"\n");
  }
}

var m = new IndexController();
