$(function(){

  window.prettyPrint && prettyPrint();

  /*-------------------------------------
    Widgets
   -------------------------------------*/

  $('[data-widget]').each(function(){
    var element = $(this),
        type = element.attr('data-widget');

    if($.fn[type]){
      element[type](element.data());
    }else{
      throw 'There was an error trying to load the following component: ' + type;
    }
  });

  var effectOptions = $('#effects-group input'),
      header = $('#header'),
      nav = $('#nav li'),
      scrollOptions = $('#scrolling-group input'),
      effectSelected = true,
      scrollSelected = true,
      toggle = function(state, which){
        var options = !which ? effectOptions : scrollOptions;
        return options.prop('checked', state) && (!which ? (effectSelected = state) : (scrollSelected = state));
      },
      notification = function(item){
        var wrapper = $('<div id="ui-notifications"></div>');

        // make sure we have valid notifications object
        if($.type(item) !== 'object')
          return;

        wrapper
          // empty wrapper
          .empty()
          // append the first message in our collection
          .append('<div class="ui-notification ' + item.type + '"><span>' + item.msg + '</span></div>')
          // append to our content container
          .appendTo($('#wrapper'));

        // make sure the page is in full view
        window.scrollTo(0, 0);

        // show notification with animation
        setTimeout(function(){
          $('.ui-notification').effect('fadeInDownBig', {
            duration: '1s'
          }, function(){
            var current = $(this);
            // set delay and fade out
            setTimeout(function(){
              current.effect('fadeOutRightBig', {
                duration: '500ms'
              }, function(){
                wrapper.empty().remove();
              });
            }, 3000);
          });
        }, 350);
      };

  $('#content').effect('fadeIn', function(){
    $('#splash h1').effect('flipInY', function(){
      $('#splash h2').effect('zoomIn', function(){
        $('#download-now').effect('tada');
      });
    });
  });


  /*-------------------------------------
    Effects
   -------------------------------------*/

  $('#effects button').each(function(){
    $(this).on('click', function(){
      var img = $(this).closest('.shazam').find('.html-badge'),
          effect = $(this).data('effect');

      img.effect(effect, function(){
        $(this).effect('reset');
      });
    });
  });

  $('#transitions button').each(function(){
    var container = $('#window'),
        one = $('#one'),
        two = $('#two'),
        reverse = {
          'In': 'Out',
          'Out': 'In'
        };

    $(this).on('click', function(){
      var fx = $(this).data('effect'),
          type = (/(In|Out)/g).test(fx),
          copy = fx,
          opposite = copy.replace(RegExp.$1, '') + reverse[RegExp.$1]

      one.effect(type == 'In' ? opposite : fx, { duration: '1s' });
      two.effect(type == 'In' ? fx : opposite, { duration: '1s' });
    });
  });
  /*-------------------------------------
    Transforms
   -------------------------------------*/

  $('#animate-box').on('click', function(){
    $('#size-box').transform({ left: '-=100', top: '+=' + 60, opacity: 1, width: '+=' + 500, height: 200 }, '1s', function(){
      $('#size-box').transform({ left: '+=100', top: '-=' + 60, width: '+=' + 100, height: 100, delay: 500}, 1000, function(){
        $('#size-box').transform({ left: '-=100', top: '+=' + 60, width: '-=' + 200, height: 50}, 1000, function(){
          $('#size-box').transform({ left: '-=100', top: '+=' + 60, opacity: 1, width: '+=' + 500, height: 500 }, 1000, function(){
            $('#size-box').transform({ left: '50', top: 40, width: 200, height: 100}, 1500, function(){
              $('#size-box').transform({ left: 40, top: 100, width: 200, height: 50, opacity: 0}, 1500);
            });
          });
        });
      });
    });
  });

  $('#twist-box').on('click', function(){
    $('#boxer').transform({ rotateZ: '45deg', translate3d: '0, 10px,0' }, null, function(){
      $('#boxer').transform({ rotateZ: '0deg', opacity: '.5', width: '+=100px', translate3d: '0, 10px,0'}, null, function(){
        $('#boxer').transform({ scale: '2', opacity: '1', rotate: '360deg', width: '-=50px'}, null, function(){
          $('#boxer').transform({ scale: '1', opacity: '1', rotate: '180deg', width: '+=100px'}, null, function(){
            $('#boxer').transform({ translate3d: '10px, 10px,0', rotate: '0deg', width: 100, height: 100}, null, function(){
            });
          });
        });
      });
    });
  });

  /*-------------------------------------
    Scrolling
   -------------------------------------*/

  $('.scroll-effects').find('div[data-widget="animateScroll"]').remove();

  var list = $('#list'),
      title = $('#current');

  $('#scrolling button').each(function(){
    $(this).on('click', function(){
      var effect = $(this).data('effect'),
          last = list.data('last');

      list.removeClass(last).addClass(effect).data('last', effect);

      title.text('Demo: ' + effect.charAt(0).toUpperCase() + effect.substr(1));

    });
  });

  /*-------------------------------------
    Customize
   -------------------------------------*/

  $('a', nav).on('click', function(e){
    nav.removeClass('active');
    $(this).parent().addClass('active');
  });

  $('#toggle, #toggle-scrolling').on('click', function(){
    var isScroll = this.id === 'toggle-scrolling' || null;
    return toggle((isScroll ? scrollSelected : effectSelected) ? false : true, isScroll);
  });

  $('#effects-cb, #scrolling-cb').on('change', function(){
    return toggle(this.checked ? true : false, this.id === 'scrolling-cb');
  });

  $('#download-now').on('click', function(e){
    e.preventDefault();

    $('form').submit();
  });
});
