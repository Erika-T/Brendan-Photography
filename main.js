$(document).ready(function(){

    //Page Transition ---------------------------------------------------------
    $(window).on('load', function() {
        $('body').removeClass('page-transition');
    });
    //Ignore "#" & "target='_blank'"
    $('a:not([href^="#"]):not([target])').on('click', function(e) {
        e.preventDefault()
        url = $(this).attr('href');
        if(url !== '') {
            $('body').addClass('page-transition');
            setTimeout(function () {
                window.location = url;
            }, 800);
        }
        return false;
    });

    // Hamburger nav ---------------------------------------------------------
    var navFlg = false;
    $('.hamburger').on('click',function(){
        $('.hamburger_line').toggleClass('active');
        $('.gnav').fadeToggle();
        if(!navFlg){
            $('.gnav_menu_item').each(function(i){
                $(this).delay(i*300).animate({
                    'margin-left' : 0,
                    'opacity' : 1,
                },500);
            });
            navFlg = true;
        } else {
            $('.gnav_menu_item').css({
                'margin-left' : 100,
                'opacity' : 0,
            });
            navFlg = false;
        }
    });

    // Global Nav Hover Background ---------------------------------------------------------
    var navList = $('.gnav_menu_item');
    var backGroundArea = $('.gnav');
    backGroundArea.prepend('<div class="gnav_fade"></div>');
    var fade = $('.gnav_fade');
    
    navList.each(function(){
        var imgUrl = $(this).find('img').attr('src');
        $(this).on('mouseover', function(){
            backGroundArea.css({
                'background':'url(' + imgUrl + ')',
            });
            fade.stop().animate({
                'opacity' : 0.7,
                'filter' : 'blur(10px)',
            },1000);
        });

        $(this).on('mouseleave', function() {
            fade.stop().animate({
                'opacity' : 1
            },1000);
        });
    });

    // Gallery Fixed Header ---------------------------------------------------------
    var height = $('#gallery_page #fixed-header').height();
    $('section#gallery').css('margin-top', height);

    // Modal Window in Gallery Pages ---------------------------------------------------------
    var winScrollTop;
    $('.js-modal-open').each(function() {
        $(this).on('click', function() {
            winScrollTop = $(window).scrollTop();
            var target = $(this).data('target');
            var modal = document.getElementById(target);
            $(modal).fadeIn();
            return false;
        });
    });
    $('.js-modal-close').on('click', function() {
        $('.js-modal').fadeOut();
        $('body,html').stop().animate({
            scrollTop:winScrollTop
        }, 300);
        return false;
    });
});