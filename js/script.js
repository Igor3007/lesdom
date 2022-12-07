$(document).ready(function () {

  // $('input[name="number"]').numberMask({beforePoint:12});



  $('.close').click(function (event) {
    $(this).closest('form').parent().addClass('hide');
  })
  $('.message-form button').click(function (event) {

    var val = 0;
    var name = $(this).closest('form').find('input[name="name"]');
    var email = $(this).closest('form').find('input[name="email"]');
    var text = $(this).closest('form').find('textarea');
    var type = $(this).closest('form').find('.type').attr('data');
    if (EmptyField(email) && VerificationEmail(email, event)) {
      val = val + 1;
    }
    if (EmptyField(name)) {
      val = val + 1;
    }
    if (EmptyField(text)) {
      val = val + 1;
    }
    if (val == 3) {
      send(type);
    }
    return false;
  });
  $('.order_phone').click(function () {
    if ($('#order_phone').hasClass('hide')) {
      $('#order_phone').removeClass('hide');
    } else {
      $('#order_phone').addClass('hide');
    }
  })
  $('.dignity-contacts button').click(function (event) {

  });
  $('.message-form textarea').focus(function () {
    $(this).removeClass('verefy_error');
  });
  $('.message-form input').focus(function () {
    $(this).removeClass('verefy_error');
  });
  $('.filter-button').on('click', function () {
    formData = $('.filter form').serialize();
  })
  $('select.car_id').on('change', function () {
    var selected = $(this).find('option:selected').attr('value');

    THIS = $(this);
    if (selected != 0) {
      $.ajax({
        url: "/index_ajax.php",
        data: 'processor=filter&c=' + selected,
        type: "POST",
        error: function () {
          alert('Ошибка AJAX! Пожалуйста, свяжитесь с администрацией ресурса.');
        },
        success: function (result) {
          $('select.car_model').prop('disabled', false);
          $('select.car_year').prop('disabled', false);
          $('select.car_engine').prop('disabled', false);


          //$('select.car_model').html(result);   
          $('select.car_model').trigger("liszt:updated");
          $('select.car_year').trigger("liszt:updated");
          $('select.car_engine').trigger("liszt:updated");
          $('.select-block').html(result);
          $('select').next().width('91%');
          $('.chzn-drop').width('100%');
          $('.chzn-search input').width('91%');
        }
      });
    }
  });
  $('select.car_producer').on('change', function () {
    var selected = $(this).find('option:selected').attr('value');

    THIS = $(this);
    if (selected != 0) {
      $.ajax({
        url: "/index_ajax.php",
        data: 'processor=filter&p=' + selected,
        type: "POST",
        error: function () {
          alert('Ошибка AJAX! Пожалуйста, свяжитесь с администрацией ресурса.');
        },
        success: function (result) {
          $('select.car_type').prop('disabled', false);
          //$('select.car_model').html(result);   
          $('select.car_type').trigger("liszt:updated");
          $('div.car_type').html(result);
          $('select').next().width('91%');
          $('.chzn-drop').width('100%');
          $('.chzn-search input').width('91%');

        }
      });
    }
  });
  $('a[href^="#"]').click(function () {
    var target = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 300);
    return false;
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() >= 150) {
      $('.button-top').fadeIn();
    } else {
      $('.button-top').fadeOut();
    }
  });
  $('.button-top').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
  });





});


function number() {
  var i = 1;
  $(".number").each(function (indx, element) {
    $(element).html(i);
    i++;
  });
}

function VerificationEmail(el, event) {

  var tmpEmail = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,8}|[0-9]{1,3})(\]?)$\.?$/i;
  var result = tmpEmail.test($(el).val())
  if (!result) {
    $(el).removeClass('verefy');
    $(el).addClass('verefy_error');
    return false;
  } else {
    $(el).addClass('verefy');
    $(el).removeClass('verefy_error');
    return true;
  }
}

function EmptyField(el) {
  if ($(el).val() == '') {
    $(el).removeClass('verefy');
    $(el).addClass('verefy_error');
    return false;
  } else {
    $(el).addClass('verefy');
    $(el).removeClass('verefy_error');
    return true;
  }
}

function send(type) {
  formData = $('form').serialize();
  $.ajax({
    url: "/index_ajax.php",
    data: "processor=send&" + formData + "&type=" + type,
    type: "POST",
    error: function () {
      alert('Ошибка AJAX! Пожалуйста, свяжитесь с администрацией ресурса.');
    },
    success: function (result) {
      $('form.feetback').remove();
      if (type == 'phone') {
        $('#order_phone').addClass('hide');
      }
      if (type == 'rew') {
        setCookie('s__r', '1', {
          expires: 5700,
          path: "/"
        });
        $('.message-form').html('<p>Спасибо! Ваш отзыв отправлен на модерацию. Нам очень важно Ваше мнение.</p>');
      } else {
        setCookie('s__m', '1', {
          expires: 600,
          path: "/"
        });
        $('.message-form').html('<p>Спасибо! Ваше письмо отправлено. Ближайшее время с Вами свяжутся представители нашей компании.</p>');
      }
    }
  });
}

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

$(document).ready(function () {

  $('.menu .burger').click(function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $('.menu ul').removeClass('active');
    } else {
      $(this).addClass('active');
      $('.menu ul').addClass('active');
    }

  });

  /* ******************************************* */

  $(".slider-wrapper").smoothDivScroll({
    mousewheelScrolling: "allDirections",
    manualContinuousScrolling: true,
    autoScrollingMode: "onStart"
  });

  $('.scrollableArea').css({
    'width': '4400px !important'
  });

  $('.scrollWrapper').hover(function () {

    var width_bloack = $('.scrollableArea').width();
    if (!width_bloack) {
      $('.scrollableArea').css({
        'background': 'none'
      });
      $('.scrollableArea').css({
        'width': '4400px'
      });
      $(".slider-wrapper").smoothDivScroll({
        mousewheelScrolling: "allDirections",
        manualContinuousScrolling: true,
        autoScrollingMode: "onStart"
      });
      $('.scrollableArea').css({
        'width': '4400px'
      });
    }

  })


  /* ******************************************* */
  /* ******************************************* */
  /* ******************************************* */
  /* ******************************************* */


});