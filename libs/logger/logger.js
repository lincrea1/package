/*
 * $Id: logger.js 55 2012-09-07 13:04:10Z logroid $
 * Logger JS v1.0
 * http://logroid.blogspot.jp/
 *
 * Copyright (c) 2012 Yohei Owa
 * GPL licenses.
 */
var LoggerLevel={
  ALL:-99,
  DEBUG:0,
  INFO:1,
  WARN:2,
  ERROR:3,
  OFF:99
};
var Logger=function(level){
  var self=this;
  self.level=isNaN(level) ? LoggerLevel.INFO : level;
  self.make();
};
Logger.prototype.make=function(){
  var self=this;
  self.debug = function(arg){
    if (LoggerLevel.DEBUG >= self.level) {
      console.log(arg);
    }
  };
  self.info = function(arg){
    if (LoggerLevel.INFO >= self.level) {
      console.log(arg);
    }
  };
  self.warn = function(arg){
    if (LoggerLevel.WARN >= self.level) {
      console.log(arg);
    }
  };
  self.error = function(arg){
    if (LoggerLevel.ERROR >= self.level) {
      console.log(arg);
    }
  };
};
