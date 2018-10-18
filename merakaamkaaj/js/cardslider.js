
$(document).ready(function(){
  $('.workerid').click(function(){
    var dataId = $(this).attr("href");
    alert(dataId)
    window.location.href='/search/right/worker?JobCat='+dataId
  });
});

$(document).ready(function(){
  $('.jobid').click(function(){
    var dataId = $(this).attr("href");
    alert(dataId)
    window.location.href='/search/right/jobs?jobType='+dataId
  });
});

$(document).ready(function(){
  $('.searviceid').click(function(){
    var dataId = $(this).attr("href");
    alert(dataId)
    window.location.href='/search/right/services?TypeOfService='+dataId
  });
});

$(document).ready(function(){
  var zindex = 10;
  
  $("div.card").click(function(e){
    e.preventDefault();

    var isShowing = false;

    if ($(this).hasClass("show")) {
      isShowing = true
    }

    if ($("div.cards").hasClass("showing")) {
      // a card is already in view
      $("div.card.show")
        .removeClass("show");

      if (isShowing) {
        // this card was showing - reset the grid
        $("div.cards")
          .removeClass("showing");
      } else {
        // this card isn't showing - get in with it
        $(this)
          .css({zIndex: zindex})
          .addClass("show");

      }

      zindex++;

    } else {
      // no cards in view
      $("div.cards")
        .addClass("showing");
      $(this)
        .css({zIndex:zindex})
        .addClass("show");

      zindex++;
    }
    
  });
});
