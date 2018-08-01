
// Show PC view in Tablet devices

app.tabletViewport = function () {

  var metaViewport = document.getElementById('viewport');
  var tabletWidth = 768;
  var pcWidth = 1024;

  var viewports = {
    default: metaViewport.getAttribute('content'),
    tablet: 'width=1024, user-scalable=0'
  };

  var viewportSet = function () {
    if (screen.width >= tabletWidth && screen.width < pcWidth) {
      metaViewport.setAttribute('content', viewports.tablet);
    } else {
      metaViewport.setAttribute('content', viewports.default);
    }
  };

  viewportSet();

  window.onload = function () {
    viewportSet();
  };

  window.onresize = function () {
    viewportSet();
  };

};


// Sample Btn_Top fixes above Footer

app.btnTop = function () {

  var btnTop = $('#btn-top');

  btnTop.click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  });

  btnTopFade();
  btnTopFixed();

  $(window).on('load scroll resize', function () {
    btnTopFade();
    btnTopFixed();
  });

  function btnTopFade() {
    if ($(window).scrollTop() > $(window).height() * 0.2) {
      if (!btnTop.is(':visible')) {
        btnTop.css('opacity', 0).show();
        btnTop.animate({
          opacity: 1
        }, 400);
      }
    } else {
      if (btnTop.is(':visible') && !btnTop.is(':animated')) {
        btnTop.animate({
          opacity: 0
        }, 400, function () {
          btnTop.css('opacity', 1).hide();
        });
      }
    }
  }

  function btnTopFixed() {
    if (!app.isMobile()) {
      var gutter = 20;
      var footer = $('footer');
      var footerLine = $('html').height() - footer.outerHeight() - gutter;
      var winBottomLine = $(window).scrollTop() + $(window).height();
      var distance = winBottomLine - footerLine;
      if (distance > gutter) {
        btnTop.css('bottom', distance + 'px');
      } else {
        btnTop.css('bottom', gutter + 'px');
      }
    }
  }
};


// Example Fixed header

app.fixedHeader = function () {

  var element, distance;

  if (!app.isMobile() && $('#header').length) {

    $('#header').clone().removeAttr('id').addClass('header-fixed').appendTo('body');

    element = $('.header-fixed');
    distance = 400;

    toogleHeaderActive();
    toogleHeaderLeft();

    $(window).on('load scroll resize', function () {
      toogleHeaderActive();
      toogleHeaderLeft();
    });

  }

  function toogleHeaderActive() {
    if ($(window).scrollTop() > distance) {
      element.addClass('active');
    } else {
      element.removeClass('active');
    }
  }

  function toogleHeaderLeft() {
    var winLeft = $(window).scrollLeft();
    if (winLeft > 0) {
      element.css('left', -winLeft + 'px');
    } else {
      element.css('left', 0);
    }
  }

  if (app.isMobile()) {
    $('#header').clone().addClass('header_fixed').appendTo('body');
    $(window).on('load scroll resize', function () {
      var innerHeight = $('#header').innerHeight();
      if ($(window).scrollTop() > innerHeight) {
        $('.header_fixed').addClass('visible');
      } else {
        if (!$(".btn-menu").hasClass("is-down")) {
          $('.header_fixed').removeClass('visible');
        }
      }
    });
  }

};


// Example for scrollReveal plugin (https://scrollrevealjs.org/)

app.scrollReveal = function () {
  window.sr = ScrollReveal();
  var config = {
    reset: true,
    mobile: true,
    origin: 'bottom',
    scale: 1,
    duration: 800,
    delay: 400
  };

  if (app.isOldIE()) {
    return false;
  }

  sr.reveal('.animated', config);
  config.viewFactor = 0.1;
  sr.reveal('.animated-first', config);

  if (!app.isMobile()) {
    sr.reveal('.animated-pc', config);
  }
  if (app.isMobile()) {
    sr.reveal('.animated-sp', config);
  }
};


// Flexbox for Old IE

app.olderIE = function () {

  if (app.isOldIE()) {
    flexibility(document.documentElement);
  }

};