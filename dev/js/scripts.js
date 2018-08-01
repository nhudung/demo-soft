var app = app || {};

var spBreak = 767;

app.init = function () {

  // app.sample();

};

app.isMobile = function () {
	
  return window.matchMedia('(max-width: ' + spBreak + 'px)').matches;

};

app.isOldIE = function () {

  return $('html.ie9').length || $('html.ie10').length;

};


$(function () {

  app.init();

});