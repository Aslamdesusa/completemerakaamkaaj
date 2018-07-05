/*
author: Boostraptheme
author URL: https://boostraptheme.com
License: Creative Commons Attribution 4.0 Unported
License URL: https://creativecommons.org/licenses/by/4.0/
*/ 

/* ====================================================
                        ANIMATION
   ================================================= */
    $(function () {
        // animate on scroll
        new WOW().init();
    });
    
/*====================================================
                        CLIENTS
====================================================*/
$(function () {

    $("#clients-list").owlCarousel({
        items: 6,
        autoplay: true,
        smartSpeed: 700,
        loop: true,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1
          },
          480: {
            items: 3
          },
          768: {
            items: 5
          },
          992: {
            items: 6
          }
        }
    });
}); 

$(function () {
        $("#chkPassport").click(function () {
            if ($(this).is(":checked")) {
                $("#dvPassport").show();
                $("#dvPassport1").show();
                $("#dvPassport2").show();
                $("#dvPassport3").show();
                $("#dvPassport4").show();
                $("#dvPassport5").show();
                $("#dvPassport6").show();
                $("#dvPassport7").show();
                $("#dvPassport8").show();
                $("#dvPassport9").show();
                $("#AddPassport").hide();
            } else {
                $("#dvPassport").hide();
                $("#dvPassport1").hide();
                $("#dvPassport2").hide();
                $("#dvPassport3").hide();
                $("#dvPassport4").hide();
                $("#dvPassport5").hide();
                $("#dvPassport6").hide();
                $("#dvPassport7").hide();
                $("#dvPassport8").hide();
                $("#dvPassport9").hide();
                $("#AddPassport").hide();
            }
        });
    });

$(function () {
        $("#chkPassport1").click(function () {
            if ($(this).is(":checked")) {
                $("#dcPassport").show();
                $("#dcPassport1").show();
                $("#dcPassport2").show();
                $("#dcPassport3").show();
                $("#dcPassport4").show();
                $("#dcPassport5").show();
                $("#dcPassport6").show();
                $("#dcPassport7").show();
                $("#dcPassport8").show();
                $("#dcPassport9").show();
                $("#AddPassport").hide();
            } else {
                $("#dcPassport").hide();
                $("#dcPassport1").hide();
                $("#dcPassport2").hide();
                $("#dcPassport3").hide();
                $("#dcPassport4").hide();
                $("#dcPassport5").hide();
                $("#dcPassport6").hide();
                $("#dcPassport7").hide();
                $("#dcPassport8").hide();
                $("#dcPassport9").hide();
                $("#AddPassport").hide();
            }
        });
    });